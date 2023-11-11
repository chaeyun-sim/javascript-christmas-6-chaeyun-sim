import InputView from './View/InputView.js'
import Date from './Date.js'
import Menu from './Menu.js'
import { MissionUtils } from '@woowacourse/mission-utils';
import Discount from './Discount.js';
import BonusMenu from './BonusMenu.js'
import Badge from './Badge.js'

class App {
  #date
  #orders
  #total
  #totalDiscount
  async run() {
    await this.requestVisitDate();
    await this.requestOrderMenu();
    this.requestBonusMenu();
    this.requestBenefitCalculation();
    this.requestDecemberBadge();
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
    this.discount.printAmountAfterDiscount();

    this.#totalDiscount = this.discount.returnDiscount();
  }

  requestDecemberBadge() {
    this.badge = new Badge(this.#totalDiscount)
    this.badge.printBadge();
  }
}

export default App;
