import CustomError from '../lib/CustomError.js'
import { ERROR_MESSAGE } from '../constants/constants.js'

const Validator = {
  isDateValid(input) {
    if (!input) {
      throw new CustomError(ERROR_MESSAGE.invalidDate)
    };

    if (isNaN(input)) {
      throw new CustomError(ERROR_MESSAGE.invalidDate)
    };

    if (input < 1 || input > 31) {
      throw new CustomError(ERROR_MESSAGE.invalidDate)
    };
  }
}


export default Validator