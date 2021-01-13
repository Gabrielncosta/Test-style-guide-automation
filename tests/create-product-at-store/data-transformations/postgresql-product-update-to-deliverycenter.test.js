// MOCKS
const MockedPostgreSQLProducts = require('../../mocks/postgresql-products.mocks');
const MockedDataTransformation = require('../../mocks/update-product-dt.mocks');

// DATA TRANSFORMATION
const UpdateProductDT = require('../../data-transformations/postgresql-product-update-to-deliverycenter.dt');

describe('Transform product from bling into shopify format', () => {
  let updateProductDT;
  let firstMockedPostgreSQLProduct;

  beforeEach(() => {
    updateProductDT = new UpdateProductDT({ decoratorOptions: '' });

    [firstMockedPostgreSQLProduct] = MockedPostgreSQLProducts;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be able to transform PostgreSQL product into DeliveryCenter product format for update', async () => {
    const result = await updateProductDT.transform(
      { product: firstMockedPostgreSQLProduct, store_id: 599 }
    );

    await expect(result).toEqual(MockedDataTransformation);
  });
});
