import OutputView from "./View/OutputView.js";

class BonusMenu {
  #isValid
  constructor(total) {
    this.#isValid = total > 120000
  }

  printBonus() {
    OutputView.printBonusMenu(this.#isValid)
  }
}

export default BonusMenu;