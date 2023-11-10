import OutputView from './View/OutputView.js'
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
    this.isValid = Number(total) > 10000;
    this.#discounts = {
      forChristmas: 0,
      forDaily: 0,
      forWeekend: 0,
      forStarDays: 0,
    };
  }

  getWeekendByDay(dayOfWeek) {
    const days = [];

    for (let day = 1; day <= 31; day++) {
      const today = new Date(2023, 11, day);
      if (today.getDay() === dayOfWeek) {
        days.push(day);
      }
    }

    return days;
  }
  
  getSunday() {
    return this.getWeekendByDay(0);
  }

  getSaturday() {
    return this.getWeekendByDay(6);
  }

  getFriday() {
    return this.getWeekendByDay(5)
  }

  calculateChristmasDiscount() {
    if (this.#date >= 1 && this.#date <= 25) {
      this.#discounts.forChristmas = (this.#date + 9) * 100;
    }
  }

  calculateDailyDiscount() {
    const WEEKEND_DAYS = [...this.getSaturday(), ...this.getFriday()]

    if (!WEEKEND_DAYS.includes(this.#date)) {
      this.#discounts.forDaily = this.getMatchedDessert();
      return;
    }

    this.#discounts.forWeekend = this.getMatchedMainDishes();
  }

  calculateSpecialDiscount() {
    const STAR_DAYS = [...this.getSunday(), CHRISTMAS]

    if (STAR_DAYS.includes(this.#date)) {
      this.#discounts.forStarDays = 1000;
    }
  }

  getMatchedDessert() {
    let discount = 0

    this.#orders.forEach(order => {
      const dessertNames = MENU.desserts.map(item => item.name)

      if (dessertNames.includes(order[0])) {
        discount -= 2023
      }
    })

    return discount
  }

  getMatchedMainDishes() {
    let discount = 0

    this.#orders.forEach(order => {
      const mainDishesNames = MENU.mains.map(item => item.name)

      if (mainDishesNames.includes(order[0])) {
        discount -= 2023
      }
    })

    return discount
  }
}

export default Discount;