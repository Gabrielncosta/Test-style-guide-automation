const { get } = require('lodash');
const decorate = require('../utils/decorate.util');

class PostgreSQLToDeliveryCenterDT {
  constructor({ decoratorOptions = {} }) {
    if (decoratorOptions) {
      decorate(this, decoratorOptions);
    }
  }

  async transform({ product, store_id }) {
    return {
      store_id,
      price: get(product, 'preco'),
      available_quantity: get(product, 'qtestoque'),
      gtin: get(product, 'ean'),
      description: get(product, 'descriacaoproduto'),
      provider_code: 'LINK_API',
    };
  }
}

module.exports = PostgreSQLToDeliveryCenterDT;
