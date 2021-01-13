const CustomErrorUtil = require("./custom-error.util");
class EmptyErrorUtil extends CustomErrorUtil {
  constructor(message, traceName) {
    super(message, "EMPTY", traceName);
  }
};

module.exports = EmptyErrorUtil;