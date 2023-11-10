import OutputView from './View/OutputView.js'

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
    return getWeekendByDay(0);
  }

  getSaturday() {
    return getWeekendByDay(6);
  }

  calculateChristmasDiscount() {
    if (this.#date >= 1 && this.#date <= 25) {
      this.#discounts.forChristmas = (this.#date + 9) * 100;
    }
  }
}

export default Discount;