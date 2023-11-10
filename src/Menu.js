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

  printOrderedMenu(date) {
    const ORDERED = this.#ordered.map(item => item.split('-'))

    OutputView.printPreview(date)
    OutputView.printMenu(ORDERED)
  }

  returnValue() {
    return 
  }
}

export default Menu;