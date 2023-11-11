import DateValidator from './Validator/DateValidator.js';

class Date {
  #date;

  constructor(number) {
    this.#validate(number);
    this.#date = number;
  }

  #validate(number) {
    this.validator = new DateValidator();
    this.validator.isDateValid(number);
  }

  returnDate() {
    return Number(this.#date);
  }
}

export default Date;
