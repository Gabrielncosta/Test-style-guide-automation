const Logger = require('@linkapi.solutions/nodejs-sdk/logger');
const ErrorUtil = require('./error.util');

const TraceHandlerUtil = ({
  uniqueKey,
  startTransaction = false,
  SessionUtil = null,
}) => async (method, property, args, className) => {
  try {
    // if (startTransaction) {
    //   await Logger.transaction.start(uniqueKey);
    // }
    await Logger.log({
      uniqueKey,
      status: 'SUCCESS',
      name: `${className} ${property} - INPUT`,
      data: args.filter((arg) => arg.constructor.name != 'Component'),
    });

    const result = await method(...args);

    await Logger.log({
      uniqueKey,
      status: 'SUCCESS',
      name: `${className} ${property} - OUTPUT`,
      data: result,
    });

    return result;
  } catch (error) {
    console.log('ERROR ====>', error);
    await ErrorUtil.handle({
      uniqueKey,
      error,
      traceName: `ERROR: ${className}.${property}`,
      SessionUtil,
    });

    throw error;
  }
};

module.exports = { TraceHandlerUtil };
