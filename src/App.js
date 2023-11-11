import InputView from './View/InputView.js'
import Date from './Date.js'
import Menu from './Menu.js'
import { MissionUtils } from '@woowacourse/mission-utils';
import BonusMenu from './BonusMenu.js'
import Badge from './Badge.js'
import DiscountCalculator from './DiscountCalculator.js';
import DiscountManager from './DiscountManager.js';

class App {
  #date
  #orders
  #total
  #totalDiscount
  async run() {
    await this.requestVisitDate();
    await this.requestOrderMenu();
    this.requestBonusMenu();
    this.requestDiscountCalculator();
    this.requestDiscountManager();
    this.requestDecemberBadge();
  }

  async requestVisitDate() {
    try {
      const INPUT = await InputView.readDate();
      this.#date = new Date(INPUT).returnDate();
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

      this.#orders = this.menu.returnOrdered();
      this.#total = this.menu.returnTotalAmount();
    } catch (error) {
      MissionUtils.Console.print(`${error.message}`)
      await this.requestOrderMenu();
    }
  }
  requestBonusMenu() {
    new BonusMenu(this.#total).printBonus()
  }

  requestDiscountCalculator() {
    new DiscountCalculator(this.#date, this.#orders, this.#total);
  }

  requestDiscountManager() {
    this.manager = new DiscountManager(this.#date, this.#orders, this.#total)

    this.manager.printDiscount();
    this.manager.printTotalDiscountAmount();
    this.manager.printAmountAfterDiscount();

    this.#totalDiscount = this.manager.returnDiscount();
  }

  requestDecemberBadge() {
    this.badge = new Badge(this.#totalDiscount)
    this.badge.printBadge();
  }
}

export default App;
