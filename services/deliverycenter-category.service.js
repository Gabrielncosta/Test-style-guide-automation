const Component = require('@linkapi.solutions/nodejs-sdk/component');
const decorate = require('../utils/decorate.util');

const DeliveryCenterComponent = new Component('delivery-center-api');

class DeliveryCenterCategoryService {
  constructor({ decoratorOptions = {} }) {
    if (decoratorOptions) { decorate(this, decoratorOptions); }
  }

  async getByTitle({ descriacaoproduto }) {
    const httpMethod = 'GET';
    const resource = 'category';
    const options = {
      queryString: {
        productTitle: descriacaoproduto
      }
    };

    return DeliveryCenterComponent.request(httpMethod, resource, options);
  }
}

module.exports = DeliveryCenterCategoryService;
