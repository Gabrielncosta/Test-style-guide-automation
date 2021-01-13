const automation = require('../../../automations/create-product-at-store.automation');

describe('Create product from PostgreSQL to John Doe Store', () => {
  it('Should be able to create products at John Doe Store', async () => {
    // our test goes here
  });
});


it('Should not be able to create products at John Doe Store when called without parameters', async () => {
  const result = await automation.run();
  await expect(result).toEqual({ status: 'FAILED' });
});

const ctx = {
  store_id: 599,
  daysToGetProductsFromNow: 10,
  codigo_empresa: '053'
};

const result = await automation.run(ctx);
await expect(result).toEqual({ status: 'SUCCESS' });


const automation = require('../../../automations/create-product-at-deliverycenter.automation');

// MOCKS
const mockedPostgreSQLProducts = require('../../../mocks/postgresql-products.mocks');
const mockedCreatedProduct = require('../../../mocks/create-product.mocks');
const mockedProductCategory = require('../../../mocks/create-product-category.dt.mocks');

// SERVICES
const PostgreSQLProductService = require('../../../services/postgresql-product.service');
const DeliveryCenterProductService = require('../../../services/deliverycenter-product.service');
const DeliveryCenterCategoryService = require('../../../services/deliverycenter-category.service');


beforeEach(() => {
  jest.spyOn(PostgreSQLProductService.prototype, 'list').mockImplementation(
    () => Promise.resolve(mockedPostgreSQLProducts)
  );

  jest.spyOn(DeliveryCenterProductService.prototype, 'create').mockImplementation(
    () => Promise.resolve(mockedCreatedProduct)
  );

  jest.spyOn(DeliveryCenterCategoryService.prototype, 'getByTitle').mockImplementation(
    () => Promise.resolve(mockedProductCategory)
  );
});

afterAll(() => {
  jest.restoreAllMocks();
});
