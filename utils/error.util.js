const Logger = require('@linkapi.solutions/nodejs-sdk/logger');
const CustomError = require('./custom-error.util');

class ErrorUtil {
  async handle({
    uniqueKey,
    startTransaction,
    error,
    traceName,
    tags = ['EXCEPTION_ERROR'],
    SessionUtil
  }) {
    // if (startTransaction) {
    //   await linkapi.transaction.start(uniqueKey);
    // }

    if (error instanceof CustomError) {
      await Logger.log({
        uniqueKey,
        status: error.name,
        name: error.traceName || traceName || error.name,
        data: error.message,
      });

      if (SessionUtil) {
        await SessionUtil.increaseReport({ type: error.type, error });
      }

      // return linkapi.transaction[error.type](uniqueKey);
    }

    await Logger.log({
      uniqueKey,
      status: 'ERROR',
      name: traceName || 'Exception error',
      data: error,
    });

    if (SessionUtil) {
      await SessionUtil.increaseReport({ type: 'error', error });
    }

    // await linkapi.transaction.failed(uniqueKey, tags);
  }
}

module.exports = new ErrorUtil();
