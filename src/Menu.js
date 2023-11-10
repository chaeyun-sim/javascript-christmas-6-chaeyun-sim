import MenuValidator from "./Validator/MenuValidator.js";
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

  returnValue() {
    return this.#ordered.map(item => {
      const [name, count] = item.split('-');
      const cnt = Number(count);
      return { name, cnt };
    })
  }
}

export default Menu;