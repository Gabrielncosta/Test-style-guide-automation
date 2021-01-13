const decorate = require("./decorate.util");
const { traceHandler } = require("./decorator.util");

class Logger {
  constructor({ uniqueKey, SessionUtil }) {
    this.uniqueKey = uniqueKey;
    this.SessionUtil = SessionUtil;
  }

  add({ obj, methods }) {
    const methodsToDecorate = methods.reduce((total, key) => {
      total[key] = traceHandler({ uniqueKey: this.uniqueKey, SessionUtil: this.SessionUtil });
      return total;
    }, {});

    decorate(obj, methodsToDecorate);
    return this;
  }
}

module.exports = Logger;
