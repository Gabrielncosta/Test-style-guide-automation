const moment = require('moment');
const Logger = require('@linkapi.solutions/nodejs-sdk/logger');

class SessionUtil {
  constructor() {
    this.key = this.generateSessionKey();

    this.successReport = {
      number: 0,
      data: []
    };

    this.errorReport = {
      number: 0,
      data: []
    };

    this.alertReport = {
      number: 0,
      data: []
    };

    this.rejectReport = {
      number: 0,
      data: []
    };

    this.emptyReport = {
      number: 0,
      data: []
    };
  }

  generateSessionKey() {
    const key = moment().format('DD-MM-YYYY-H:mm:ss');
    return `session-${key}`;
  }

  increaseReport({ type = 'success', data = {} }) {
    const property = `${[type]}Report`;

    this[property].number += 1;
    this[property].data.push(data);
  }

  log({ status, name, data, finalLog = false }) {
    return Logger.log({ uniqueKey: this.key, status, name, data, finalLog });
  }

  finish({ status = 'SUCCESS', error = {} }) {
    return (status === 'SUCCESS')
      ? this.log({ status: 'SUCCESS', name: 'Session finished', data: {}, finalLog: true })
      : this.log({ status: 'ERROR', name: 'EXCEPTION', data: error.stack || error.message || error, finalLog: true });
  }

  consolidateReport() {
    Object.keys(this).forEach(async (key) => {
      if ((typeof key.includes('Report')) && (this[key].number > 0)) {
        await this.log({ status: 'SUCCESS', name: key, data: this[key] });
      }
    });
  }
}

module.exports = SessionUtil;
