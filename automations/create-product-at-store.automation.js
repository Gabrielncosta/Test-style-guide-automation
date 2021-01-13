const { get } = require('lodash');
const Logger = require('@linkapi.solutions/nodejs-sdk/logger');
const parallelExec = require('@linkapi.solutions/nodejs-sdk/parallel');

// DATA-TRANSFORMATION
const PostgreSQLCreateToDeliveryCenterDT = require('../data-transformations/postgrelsql-product-create-to-deliverycenter.dt');

// HELPERS
const DictionaryHelper = require('../helpers/dictionary.helper');
const FormatDateHelper = require('../helpers/format-date.helper');

// UTILS
const { TraceHandlerUtil } = require('../utils/decorator.util');
const SessionUtil = require('../utils/session.util');
const CustomError = require('../utils/custom-error.util');

// SERVICES
const PostgreSQLProductService = require('../services/postgresql-product.service');
const DeliveryCenterProductService = require('../services/deliverycenter-product.service');
const DeliveryCenterCategoryService = require('../services/deliverycenter-category.service');

class Automation {
  async run(ctx = {}) {
    const sessionUtil = new SessionUtil();

    try {
      const { store_id, daysToGetProductsFromNow, codigo_empresa, limitQuery = false } = ctx;

      if (!store_id || !daysToGetProductsFromNow || !codigo_empresa) {
        throw new CustomError('This automation needs parameters to run', 422, 'Wrong parameters');
      }

      const postgreSQLProductService = new PostgreSQLProductService();

      const queryDate = FormatDateHelper.getDatetoDecreaseFromToday({
        daysToDecreaseFromToday: daysToGetProductsFromNow,
      });

      const query = `select * from ishop.vw_dvc_novo where data_cadastro >\
      '${queryDate}' and codigo_empresa = '${codigo_empresa}'`;

      const products = await postgreSQLProductService.list({ query, limitQuery });

      if (!products || !products.length) {
        return sessionUtil.log({
          status: 'NORESULTS',
          name: 'There are no products to integrate',
          data: products,
          finalLog: true,
        });
      }

      sessionUtil.log({
        status: 'SUCCESS',
        name: 'Products found in PostgreSQL',
        data: products.length,
      });

      const options = {
        parallelExecutions: 1,
        uniqueKeyPath: 'sku',
        filterDuplicates: true,
        interval: 1000,
      };

      await parallelExec(
        products,
        async (product, uniqueKey) => {
          try {
            const traceHandlerUtil = TraceHandlerUtil({
              uniqueKey,
              SessionUtil: sessionUtil,
            });

            const productId = get(product, 'sku');

            const dictionaryHelper = new DictionaryHelper({
              decoratorOptions: {
                create: [traceHandlerUtil],
              }
            });

            const productAlreadyCreated = await dictionaryHelper.get({
              keyName: productId,
              groupName: 'created-products'
            });

            if (productAlreadyCreated) {
              sessionUtil.increaseReport({
                type: 'reject',
                data: {
                  message: `This product has already been created ${productId}`
                }
              });

              return;
            }

            Logger.log({
              uniqueKey,
              status: 'SUCCESS',
              name: 'PostgreSQL product',
              data: product,
              finalLog: true
            });

            if (!productId) {
              sessionUtil.increaseReport({
                type: 'reject',
                data: {
                  message: `Product SKU is missing ${productId}`,
                },
              });

              return;
            }

            const deliveryCenterCategoryService = new DeliveryCenterCategoryService(
              {
                decoratorOptions: {
                  getByTitle: [traceHandlerUtil],
                },
              }
            );

            const productCategory = await deliveryCenterCategoryService.getByTitle(
              { descriacaoproduto: product.descriacaoproduto }
            );

            const postgreSQLToDeliveryCenterDT = new PostgreSQLCreateToDeliveryCenterDT(
              {
                decoratorOptions: {
                  transform: [traceHandlerUtil],
                },
              }
            );

            const deliveryCenterProduct = await postgreSQLToDeliveryCenterDT.transform(
              {
                product,
                store_id,
                productCategory,
              }
            );

            const deliveryCenterProductService = new DeliveryCenterProductService(
              {
                decoratorOptions: {
                  create: [traceHandlerUtil],
                },
              }
            );

            await deliveryCenterProductService.create({
              product: deliveryCenterProduct,
            });

            await dictionaryHelper.create({
              keyName: product,
              groupName: 'created-products',
              dataToStore: {
                productId,
              },
            });

            sessionUtil.increaseReport({ type: 'success', data: {} });
          } catch (err) {
            Logger.log({
              uniqueKey,
              status: 'ERROR',
              name: 'Failed to complete this flow',
              data: {
                err: err.response ? err.response : undefined,
                stack: err.stack,
              },
              finalLog: true,
            });

            sessionUtil.increaseReport({
              type: 'error',
              data: {},
            });
          }
        },
        options
      );

      sessionUtil.consolidateReport();
      sessionUtil.finish({ status: 'SUCCESS' });
      return { status: 'SUCCESS' };
    } catch (error) {
      sessionUtil.log({
        status: 'ERROR',
        name: 'Unexpected error',
        data: error.message || error,
      });
      sessionUtil.consolidateReport();
      sessionUtil.finish({
        status: 'ERROR',
        error: error.stack || error.message || error,
      });
      return { status: 'FAILED' };
    }
  }
}

module.exports = new Automation();
