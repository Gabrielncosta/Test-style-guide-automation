const moment = require('moment');
const CustomError = require('../utils/custom-error.util')

class FormatDateHelper {
  getDateToDecreaseFromToday({ daysToDecreaseFromToday }) {
    if(!daysToDecreaseFromToday) {
      throw new CustomError('This helper needs parameters to run')
    } 

    const initialDate = moment()
      .subtract(daysToDecreaseFromToday, 'days')
      .format('YYYY-MM-DD');

    return `${initialDate}T00:00:00.000Z`;
  }
}

module.exports = FormatDateHelper;
