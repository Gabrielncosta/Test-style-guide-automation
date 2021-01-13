const Component = require('@linkapi.solutions/nodejs-sdk/component');

const PostgreSQLComponent = new Component('delivery-center-postgresql-db');

class PostgreSQLProductService {
  async list({ query, limitQuery }) {
    const httpMethod = 'products';
    const resource = 'list';
    const options = {
      query,
      limitQuery,
    };

    return PostgreSQLComponent.request(httpMethod, resource, options);
  }
}

module.exports = PostgreSQLProductService;
