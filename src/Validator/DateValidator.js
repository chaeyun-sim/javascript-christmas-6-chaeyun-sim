import CustomError from '../lib/CustomError.js';
import { ERROR_MESSAGE } from '../constants/constants.js';

class DateValidator {
  isDateValid(input) {
    if (!input || isNaN(input) || input < 1 || input > 31) {
      throw new CustomError(ERROR_MESSAGE.invalidDate);
    }
  }
}

export default DateValidator;
