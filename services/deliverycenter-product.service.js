const Component = require('@linkapi.solutions/nodejs-sdk/component');
const decorate = require('../utils/decorate.util');

const DeliveryCenterComponent = new Component('delivery-center-api');

class DeliveryCenterProductService {
  constructor({ decoratorOptions = {} }) {
    if (decoratorOptions) { decorate(this, decoratorOptions); }
  }

  static async list() {
    const httpMethod = 'GET';
    const resource = 'products';
    const options = {
    };

    return DeliveryCenterComponent.request(httpMethod, resource, options);
  }

  async create({ product }) {
    const httpMethod = 'POST';
    const resource = 'products';
    const options = {
      body: product
    };

    return DeliveryCenterComponent.request(httpMethod, resource, options);

  }

  async update({ product, external_code }) {
    const httpMethod = 'PUT';
    const resource = 'products/{external_code}';
    const options = {
      body: product,
      urlParams: {
        external_code,
      }
    };

    return DeliveryCenterComponent.request(httpMethod, resource, options);
  }
}

module.exports = DeliveryCenterProductService;
