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
      forChristmas: 0,
      forDaily: 0,
      forWeekend: 0,
      forStarDays: 0,
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
    this.#discounts.forChristmas = (this.#date + 9) * 100;
  }

  calculateSpecialDiscount() {
    this.#discounts.forStarDays = 1000;
  }

  calculateDailyDiscount() {
    this.#discounts.forDaily = this.calculateDiscountForItems(MENU.desserts);
  }

  calculateWeekendDiscount() {
    this.#discounts.forWeekend = this.calculateDiscountForItems(MENU.mains);
  }

  calculateDiscountForItems(items) {
    let discount = 0

    this.#orders.forEach(order => {
      const itemNames = items.map(item => item.name)

      if (itemNames.includes(order[0])) {
        discount -= 2023
      }
    })

    return discount
  }
}

export default Discount;