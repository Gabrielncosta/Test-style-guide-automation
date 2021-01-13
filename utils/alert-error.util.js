const CustomErrorUtil = require("./custom-error.util");

class AlertErrorUtil extends CustomErrorUtil {
  constructor(message, traceName) {
    super(message, "ALERT", traceName);
  }
};

module.exports = AlertErrorUtil;
