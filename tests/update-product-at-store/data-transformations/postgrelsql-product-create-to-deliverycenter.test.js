// MOCKS
const MockedPostgreSQLProducts = require('../../mocks/postgresql-products.mocks');
const MockedDataTransformation = require('../../mocks/create-product-dt.mocks');

// DATA TRANSFORMATION
const CreatedProductDT = require('../../data-transformations/postgrelsql-product-create-to-deliverycenter.dt');

describe('Transform product from bling into shopify format', () => {
  let createdProductDT;
  let firstMockedPostgreSQLProduct;

  beforeEach(() => {
    createdProductDT = new CreatedProductDT({ decoratorOptions: '' });

    [firstMockedPostgreSQLProduct] = MockedPostgreSQLProducts;
  });


  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be able to transform PostgreSQL product into DeliveryCenter product format for creation', async () => {
    const productCategory = {
      category_id: 6686
    };

    const result = await createdProductDT.transform(
      { product: firstMockedPostgreSQLProduct, store_id: 599, productCategory, }
    );

    await expect(result).toEqual(MockedDataTransformation);
  });
});
