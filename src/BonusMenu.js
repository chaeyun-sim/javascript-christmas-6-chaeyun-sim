import OutputView from './View/OutputView.js';
import { MIN_AMOUNT_TO_GET_BONUS } from './constants/constants.js';

class BonusMenu {
  #isValid;
  constructor(total) {
    this.#isValid = total >= Number(MIN_AMOUNT_TO_GET_BONUS);
  }

  printBonus() {
    const result = this.#isValid ? '샴페인 1개' : '없음';
    OutputView.printBonusMenu(result);
    return result;
  }
}

export default BonusMenu;
