import OutputView from './View/OutputView.js';
import { CHRISTMAS, MENU } from './constants/constants.js';

class Discount {
  #date;
  #orders;
  #discounts;
  #total;
  
  constructor(date, orders, total) {
    this.#date = Number(date);
    this.#orders = orders;
    this.#total = Number(total);
    this.#discounts = {
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
    };
    this.#calculateDiscounts()
  }

  #calculateDiscounts() {
    if (this.#date >= 1 && this.#date <= CHRISTMAS) {
      this.calculateChristmasDiscount();
    }

    switch (new Date(2023, 11, this.#date).getDay()) {
      case 0:
        this.calculateSpecialDiscount();
      case 1:
        if (this.#date === CHRISTMAS) {
          this.calculateSpecialDiscount();
        }
        this.calculateDailyDiscount();
        break;
      case 5: case 6:
        this.calculateWeekendDiscount();
        break;
      default:
        this.calculateDailyDiscount();
        break;
    }
  }

  calculateChristmasDiscount() {
    this.#discounts['크리스마스 디데이 할인'] = (this.#date + 9) * 100;
  }

  calculateSpecialDiscount() {
    this.#discounts['특별 할인'] = 1000;
  }

  calculateDailyDiscount() {
    this.#discounts['평일 할인'] = this.calculateDiscountForItems(MENU.desserts);
  }

  calculateWeekendDiscount() {
    this.#discounts['주말 할인'] = this.calculateDiscountForItems(MENU.mains);
  }

  calculateDiscountForItems(items) {
    let discount = 0

    this.#orders.forEach(order => {
      const itemNames = items.map(item => item.name)

      if (itemNames.includes(order[0])) {
        discount += 2023
      }
    })

    return discount
  }

  printDiscount() {
    const IS_VALID =
      this.#total < 10000 || !Object.values(this.#discounts).reduce((a, b) => a + b)
    OutputView.printBenefits(this.#discounts, IS_VALID)
  }
}

export default Discount;