const { get } = require('lodash');
const decorate = require('../utils/decorate.util');

class PostgreSQLToDeliveryCenterDT {
  constructor({ decoratorOptions = {} }) {
    if (decoratorOptions) {
      decorate(this, decoratorOptions);
    }
  }
  
  async transform({ product, store_id, productCategory }) {
    return {
      product: {
        condition: 'new',
        currency: 'BRL',
        brand: 'Loft',
        category_id: String(get(productCategory, 'category_id')),
        model: get(product, 'familia'),
        store_id,
        title: get(product, 'descriacaoproduto'),
        price: get(product, 'preco'),
        available_quantity: get(product, 'qtestoque'),
        external_code: get(product, 'sku'),
        sku: get(product, 'sku'),
        gtin: get(product, 'ean'),
        short_description: '',
        description: get(product, 'descriacaoproduto'),
        weight: Number(get(product, 'peso_bruto')) * 100,
        provider: 'LINK_API',
      },
    };
  }
}

module.exports = PostgreSQLToDeliveryCenterDT;
