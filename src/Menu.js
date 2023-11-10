import MenuValidator from "./Validator/MenuValidator.js";
import OutputView from "./View/OutputView.js";
import { ERROR_MESSAGE, MENU } from "./constants/constants.js";
import CustomError from "./lib/CustomError.js";

class Menu {
  #ordered
  #menuNames = Object.values(MENU).flat().map(item => item.name);
  #menuPrice = Object.values(MENU).flat().map(item => item.price);

  constructor(ordered) {
    this.#validate(ordered)
    this.#ordered = ordered.split(',')
  }

  
  #validate(ordered) {
    this.validator = new MenuValidator();
    this.validator.isMenuValid(ordered, this.#menuNames);
  }

  calculateTotalAmount() {
    let total = 0

    this.#ordered.forEach(item => {
      const [name, count] = item;

      const map = this.#menuNames.reduce((acc, cur, idx) => {
        acc[cur] = this.#menuPrice[idx]
        return acc
      }, {})

      total += map[name] * Number(count)
    })

    this.printTotalAmount(total)
  }

  printTotalAmount(total) {
    OutputView.printAmountBeforeDiscount(total)
  }

  printOrderedMenu(date) {
    const ORDERED = this.#ordered.map(item => item.split('-'))
    this.#ordered = ORDERED

    OutputView.printPreview(date)
    OutputView.printMenu(ORDERED)
  }

  returnValue() {
    return this.#ordered
  }
}

export default Menu;