import MenuValidator from './Validator/MenuValidator.js';
import OutputView from './View/OutputView.js';
import { MENU } from './constants/constants.js';

class Menu {
  #ordered;
  #total;
  #priceMap;

  constructor(ordered) {
    this.#validate(ordered);
    this.#ordered = ordered.split(',');
    this.#buildPriceMap();
  }

  #validate(ordered) {
    this.validator = new MenuValidator();
    this.validator.isMenuValid(ordered, this.getNamesInMenu());
  }

  getNamesInMenu() {
    return Object.values(MENU)
      .flat()
      .map(item => item.name);
  }

  getPricesInMenu() {
    return Object.values(MENU)
      .flat()
      .map(item => item.price);
  }

  #buildPriceMap() {
    this.#priceMap = {};
    Object.values(MENU)
      .flat()
      .forEach(item => {
        this.#priceMap[item.name] = item.price;
      });
  }

  detailCalculation() {
    let result = 0;

    this.#ordered.forEach(item => {
      const [name, count] = item;
      if (this.#priceMap[name]) {
        result += this.#priceMap[name] * Number(count);
      }
    });

    return result;
  }

  calculateTotalAmount() {
    this.#total = this.detailCalculation();
    this.printTotalAmount();
  }

  printTotalAmount() {
    OutputView.printAmountBeforeDiscount(this.#total);
  }

  printOrderedMenu(date) {
    const orderedFormatted = this.#ordered.map(item => item.split('-'));

    OutputView.printPreview(date);
    OutputView.printMenu(orderedFormatted);

    this.#ordered = orderedFormatted;
  }

  returnOrdered() {
    return this.#ordered;
  }

  returnTotalAmount() {
    return this.#total;
  }
}

export default Menu;
