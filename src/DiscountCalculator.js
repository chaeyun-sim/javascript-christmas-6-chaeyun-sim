import {
  MENU,
  CHRISTMAS,
  MIN_AMOUNT_TO_GET_BONUS,
  MIN_DISCOUNT,
  DAILY_DISCOUNT,
} from './constants/constants.js';

class DiscountCalculator {
  #date;
  #orders;
  #discounts;
  constructor(date, orders, total) {
    this.#date = Number(date);
    this.#orders = orders;
    this.#discounts = {
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
      '증정 이벤트': 0,
    };
    this.#calculateDiscounts(total);
  }

  #calculateDiscounts(total) {
    const dayOfWeek = new Date(2023, 11, this.#date).getDay();

    this.#calculateBonusDiscount(total);
    this.#calculateDiscountByDay(dayOfWeek);
    this.#calculateChristmasDiscount();
  }

  #calculateBonusDiscount(total) {
    if (total > MIN_AMOUNT_TO_GET_BONUS) {
      this.#discounts['증정 이벤트'] = 25000;
    }
  }

  #calculateDiscountByDay(dayOfWeek) {
    if ([0, 1, 2, 3, 4].includes(dayOfWeek)) {
      this.#calculateDailyDiscount();

      if (this.#date === CHRISTMAS || dayOfWeek === 0) {
        this.#calculateSpecialDiscount();
      }
    } else if ([5, 6].includes(dayOfWeek)) {
      this.#calculateWeekendDiscount();
    }
  }

  #calculateChristmasDiscount() {
    if (this.#date >= 1 && this.#date <= CHRISTMAS) {
      this.#discounts['크리스마스 디데이 할인'] = (this.#date + 9) * 100;
    }
  }

  #calculateSpecialDiscount() {
    this.#discounts['특별 할인'] = MIN_DISCOUNT;
  }

  #calculateDailyDiscount() {
    this.#discounts['평일 할인'] = this.#calculateDiscountForItems(
      MENU.desserts,
    );
  }

  #calculateWeekendDiscount() {
    this.#discounts['주말 할인'] = this.#calculateDiscountForItems(MENU.mains);
  }

  #calculateDiscountForItems(items) {
    let discount = 0;

    this.#orders.forEach(order => {
      const itemNames = items.map(item => item.name);

      if (itemNames.includes(order[0])) {
        discount += DAILY_DISCOUNT * Number(order[1]);
      }
    });

    return discount;
  }

  returnDiscount() {
    return this.#discounts;
  }
}

export default DiscountCalculator;
