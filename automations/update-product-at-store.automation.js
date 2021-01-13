const { get } = require('lodash');
const Logger = require('@linkapi.solutions/nodejs-sdk/logger');
const parallelExec = require('@linkapi.solutions/nodejs-sdk/parallel');

// DATA-TRANSFORMATION
const PostgreSQLUpdateToDeliveryCenterDT = require('../data-transformations/postgresql-product-update-to-deliverycenter.dt');

// HELPERS
const FormatDateHelper = require('../helpers/format-date.helper');

// UTILS
const { TraceHandlerUtil } = require('../utils/decorator.util');
const SessionUtil = require('../utils/session.util');

// SERVICES
const PostgreSQLProductService = require('../services/postgresql-product.service');
const DeliveryCenterProductService = require('../services/deliverycenter-product.service');

class Automation {
  async run(ctx = {}) {
    const sessionUtil = new SessionUtil();

    try {
      const { store_id, daysToGetProductsFromNow, codigo_empresa, limitQuery = false } = ctx;

      if(!store_id || !daysToGetProductsFromNow || !codigo_empresa) {

        throw Error('This automation needs parameters to run')
      }
      
      const queryDate = FormatDateHelper.getDatetoDecreaseFromToday({
        daysToDecreaseFromToday: daysToGetProductsFromNow,
      });

      const postgreSQLProductService = new PostgreSQLProductService();

      const query = `select * from ishop.vw_dvc_novo where codigo_empresa = \
      '${codigo_empresa}' AND ( dtpreco > '${queryDate}' OR dtestoque > \
      '${queryDate}' )`;

      const products = await postgreSQLProductService.list({ query, limitQuery });

      if (!products || !products.length) {
        return sessionUtil.log({
          status: 'NORESULTS',
          name: 'There are no products to integrate',
          data: [],
          finalLog: true,
        });
      }

      sessionUtil.log({
        status: 'SUCCESS',
        name: 'Products found in PostgreSQL',
        data: products.length,
      });

      const options = {
        parallelExecutions: 2,
        uniqueKeyPath: 'sku',
        filterDuplicates: true,
        interval: 200,
      };

      await parallelExec(
        products,
        async (product, uniqueKey) => {
          try {
            const traceHandlerUtil = TraceHandlerUtil({
              uniqueKey,
              SessionUtil: sessionUtil,
            });

            Logger.log({
              uniqueKey,
              status: 'SUCCESS',
              name: 'PostgreSQL product',
              data: { product },
              finalLog: true,
            });

            const productId = get(product, 'sku');

            if (!productId) {
              Logger.log({
                uniqueKey,
                status: 'REJECTED',
                name: 'Product SKU is missing',
                data: { product },
              });

              sessionUtil.increaseReport({
                type: 'alert',
                data: { message: 'Product SKU is missing' },
              });

              return;
            }

            const postgreSQLToDeliveryCenterDT = new PostgreSQLUpdateToDeliveryCenterDT(
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
              }
            );

            const deliveryCenterProductService = new DeliveryCenterProductService(
              {
                decoratorOptions: {
                  update: [traceHandlerUtil],
                },
              }
            );

            await deliveryCenterProductService.update({
              product: deliveryCenterProduct,
              external_code: productId,
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
