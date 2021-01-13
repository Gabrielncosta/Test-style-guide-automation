const Dictionary = require('@linkapi.solutions/nodejs-sdk/dictionary');
const decorate = require('../utils/decorate.util');

class DictionaryHelper {
  constructor({ decoratorOptions = {} }) {
    if (decoratorOptions) { decorate(this, decoratorOptions); }
  }

  async get({ keyName, groupName }) {
    return Dictionary.get(keyName, groupName);
  }

  async create({ keyName, dataToStore, groupName, allowUpdateKey = false }) {
    return Dictionary.set(
      keyName,
      dataToStore,
      groupName,
      { allowUpdateKey }
    );
  }
}

module.exports = DictionaryHelper;
