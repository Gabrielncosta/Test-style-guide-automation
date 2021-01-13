// HELPERS
const FormatDate = require('../../helpers/format-date.helper');
const CustomError = require('../../utils/custom-error.util')

let formatDate;

describe('Format data with moment', () => {
  beforeEach(() => {
    formatDate = new FormatDate();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to return date from specified days ago', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 10, 30, 12));

    const daysToDecreaseFromToday = 10;

    const result = formatDate.getDateToDecreaseFromToday({daysToDecreaseFromToday});

    await expect(result).toEqual('2020-11-20T00:00:00.000Z');
  });

  it.only('Should not be able to return date if no parameters have been', async () => {  
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 10, 30, 12));

    const daysToDecreaseFromToday = 10;

    await expect(() =>
      formatDate.getDateToDecreaseFromToday({ 
        daysToDecreaseFromToday 
      }),
    ).toThrowError(CustomError);
  });
}); 

