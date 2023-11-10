import Validator from './Validator/Validator.js'

class Date {
  #date

  constructor(number) {
    this.#validate(number)
    this.#date = number;
  }

  #validate(number) {
    Validator.isDateValid(number)
  }

  returnValue() {
    return Number(this.#date)
  }
}

export default Date;