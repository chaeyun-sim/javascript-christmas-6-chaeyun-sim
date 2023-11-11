import OutputView from './View/OutputView.js';
import { MIN_AMOUNT_TO_GET_BONUS } from './constants/constants.js';

class BonusMenu {
  #isValid;
  constructor(total) {
    this.#isValid = total > MIN_AMOUNT_TO_GET_BONUS;
  }

  printBonus() {
    OutputView.printBonusMenu(this.#isValid);
  }
}

export default BonusMenu;
