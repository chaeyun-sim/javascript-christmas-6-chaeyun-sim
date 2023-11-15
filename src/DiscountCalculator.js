import {
  MENU,
  CHRISTMAS,
  MIN_AMOUNT_TO_GET_BONUS,
  MIN_DISCOUNT,
  DAILY_DISCOUNT,
  MIN_AMOUNT,
} from './constants/constants.js';

class DiscountCalculator {
  #date;
  #orders;
  constructor(date, orders, total) {
    this.#date = Number(date);
    this.#orders = orders;
    this.discounts = {
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
      '증정 이벤트': 0,
    };
    this.#calculateDiscounts(total);
  }

  getDayOfWeek() {
    return new Date(2023, 11, this.#date).getDay();
  }

  #calculateDiscounts(total) {
    if (total >= MIN_AMOUNT) {
      this.#calculateBonusDiscount(total);
      this.#calculateDiscountByDay(this.getDayOfWeek());
      this.#calculateChristmasDiscount();
    }
  }

  #calculateBonusDiscount(total) {
    if (total >= MIN_AMOUNT_TO_GET_BONUS) {
      this.discounts['증정 이벤트'] = 25000;
    }
  }

  #calculateDiscountByDay(dayOfWeek) {
    if (dayOfWeek === 0 || this.#date === CHRISTMAS) {
      this.#calculateSpecialDiscount();
    }

    if (dayOfWeek >= 0 && dayOfWeek < 5) {
      this.#calculateDailyDiscount();
    }

    if ([5, 6].includes(dayOfWeek)) {
      this.#calculateWeekendDiscount();
    }
  }

  #calculateChristmasDiscount() {
    if (this.#date >= 1 && this.#date <= CHRISTMAS) {
      this.discounts['크리스마스 디데이 할인'] = (this.#date + 9) * 100;
    }
  }

  #calculateSpecialDiscount() {
    this.discounts['특별 할인'] = MIN_DISCOUNT;
  }

  #calculateDailyDiscount() {
    this.discounts['평일 할인'] = this.#calculateDiscountForItems(
      MENU.desserts,
    );
  }

  #calculateWeekendDiscount() {
    this.discounts['주말 할인'] = this.#calculateDiscountForItems(MENU.mains);
  }

  #calculateDiscountForItems(items) {
    const itemNames = items.map(item => item.name);
    let discount = 0;

    this.#orders.forEach(order => {
      const [name, count] = order;

      if (itemNames.includes(name)) {
        discount = DAILY_DISCOUNT * Number(count);
      }
    });

    return discount;
  }

  returnDiscount() {
    return this.discounts;
  }
}

export default DiscountCalculator;
