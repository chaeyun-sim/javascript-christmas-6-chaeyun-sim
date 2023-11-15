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
    this.#priceMap = this.getNamesInMenu().reduce((acc, cur, idx) => {
      acc[cur] = this.getPricesInMenu()[idx];
      return acc;
    }, {});
  }

  detailCalculation() {
    let result = 0;

    this.#ordered.forEach(item => {
      const [name, count] = item;
      result += this.#priceMap[name] * Number(count);
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
    const ORDERED = this.#ordered.map(item => item.split('-'));
    this.#ordered = ORDERED;

    OutputView.printPreview(date);
    OutputView.printMenu(ORDERED);
  }

  returnOrdered() {
    return this.#ordered;
  }

  returnTotalAmount() {
    return this.#total;
  }
}

export default Menu;
