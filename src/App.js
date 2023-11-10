import InputView from './View/InputView.js'
import Date from './Date.js'
import Menu from './Menu.js'
import { MissionUtils } from '@woowacourse/mission-utils';
import Discount from './Discount.js';
import BonusMenu from './BonusMenu.js'

class App {
  #date
  #orders
  #total
  async run() {
    await this.requestVisitDate();
    await this.requestOrderMenu();
    this.requestBonusMenu();
    this.requestBenefitCalculation();
  }

  async requestVisitDate() {
    try {
      const INPUT = await InputView.readDate();
      this.#date = new Date(INPUT).returnValue();
    } catch (error) {
      MissionUtils.Console.print(`${error.message}`)
      await this.requestVisitDate();
    }
  }

  async requestOrderMenu() {
    try {
      const INPUT = await InputView.readMenu();

      this.menu = new Menu(INPUT)
      this.menu.printOrderedMenu(this.#date);
      this.menu.calculateTotalAmount();

      this.#orders = this.menu.returnValue();
      this.#total = this.menu.returnTotalAmount();
    } catch (error) {
      MissionUtils.Console.print(`${error.message}`)
      await this.requestOrderMenu();
    }
  }
  requestBonusMenu() {
    new BonusMenu(this.#total).printBonus()
  }

  requestBenefitCalculation() {
    this.discount = new Discount(this.#date, this.#orders, this.#total);
    this.discount.printDiscount();
    this.discount.printTotalDiscountAmount();
  }
}

export default App;
