const automation = require('../../../automations/update-product-at-deliverycenter.automation');

// MOCKS
const mockedPostgreSQLProducts = require('../../../mocks/postgresql-products.mocks');
const mockedUpdatedProduct = require('../../../mocks/postgresql-products.mocks');

// SERVICES
const PostgreSQLProductService = require('../../../services/postgresql-product.service');
const DeliveryCenterProductService = require('../../../services/deliverycenter-product.service');

describe('Update product from PostgreSQL to Delivery Center', () => {
  beforeEach(() => {
    jest.spyOn(PostgreSQLProductService.prototype, 'list').mockImplementation(
      () => Promise.resolve(mockedPostgreSQLProducts)
    );

    jest.spyOn(DeliveryCenterProductService.prototype, 'update').mockImplementation(
      () => Promise.resolve(mockedUpdatedProduct)
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to update products at Delivery Center', async () => {
    const ctx = {
      store_id: 599,
      daysToGetProductsFromNow: 10,
      codigo_empresa: '053'
    };

    const result = await automation.run(ctx);
    await expect(result).toEqual({ status: 'SUCCESS' });
  });

  it('Should not be able to update products at Delivery Center when called without parameters', async () => {
    const result = await automation.run();
    await expect(result).toEqual({ status: 'FAILED' });
  });
});
