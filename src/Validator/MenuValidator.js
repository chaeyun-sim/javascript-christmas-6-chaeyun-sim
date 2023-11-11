import CustomError from '../lib/CustomError.js';
import { ERROR_MESSAGE, MAX_MENUS, MENU } from '../constants/constants.js';

class MenuValidator {
  checkDuplicates(names) {
    const STACK = [];

    names.forEach(item => {
      if (STACK.includes(item)) {
        throw new CustomError(ERROR_MESSAGE.invalidMenu);
      }
      STACK.push(item);
    });
  }

  checkEachItem(names, menuNames) {
    names.forEach(item => {
      if (!isNaN(item) || !menuNames.includes(item) || !item) {
        throw new CustomError(ERROR_MESSAGE.invalidMenu);
      }
    });
  }

  checkAllDrinks(names) {
    const DRINKS = MENU.drinks.map(drink => drink.name);

    if (names.every(item => DRINKS.includes(item))) {
      throw new CustomError(ERROR_MESSAGE.invalidMenu);
    }
  }

  checkRangeOfCount(counts) {
    if (counts.filter(el => el < 1 || el > MAX_MENUS).length > 0) {
      throw new CustomError(ERROR_MESSAGE.invalidMenu);
    }
  }

  checkFormat(input) {
    input.forEach(item => {
      if (!item.includes('-')) {
        throw new CustomError(ERROR_MESSAGE.invalidMenu);
      }

      if (!/^[\uAC00-\uD7A3]+-\d+$/) {
        throw new CustomError(ERROR_MESSAGE.invalidMenu);
      }
    });
  }

  isMenuValid(input, menuNames) {
    if (!input || input.length < 4) {
      throw new CustomError(ERROR_MESSAGE.invalidMenu);
    }

    const SPLITED = input.split(',');
    const ORDERED_NAMES = SPLITED.map(item => item.split('-')[0]);
    const ORDERED_COUNT = SPLITED.map(item => item.split('-')[1]);

    this.checkFormat(SPLITED);
    this.checkEachItem(ORDERED_NAMES, menuNames);
    this.checkAllDrinks(ORDERED_NAMES);
    this.checkRangeOfCount(ORDERED_COUNT);
    this.checkDuplicates(ORDERED_NAMES);
  }
}

export default MenuValidator;
