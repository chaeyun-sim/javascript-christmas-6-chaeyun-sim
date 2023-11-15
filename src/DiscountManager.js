import DiscountCalculator from './DiscountCalculator.js';
import OutputView from './View/OutputView.js';
import { MIN_AMOUNT_TO_GET_BONUS } from './constants/constants.js';

class DiscountManager {
  #discounts;
  #total;

  constructor(date, orders, total) {
    this.#total = Number(total);
    this.#discounts = new DiscountCalculator(
      date,
      orders,
      total,
    ).returnDiscount();
  }

  #calculateIsValid() {
    return (
      this.#total < 10000 ||
      !Object.values(this.#discounts).reduce((a, b) => a + b)
    );
  }

  #calculateTotalDiscount() {
    return Object.values(this.#discounts).reduce((a, b) => a + b);
  }

  addBonus(result) {
    return result + (this.#total >= MIN_AMOUNT_TO_GET_BONUS ? 25000 : 0);
  }

  printDiscount() {
    const isValid = this.#calculateIsValid();
    OutputView.printBenefits(this.#discounts, isValid);
  }

  printTotalDiscountAmount() {
    const TOTAL_DISCOUNT = this.#calculateTotalDiscount();

    OutputView.printTotalBenefitAmount(TOTAL_DISCOUNT);

    return TOTAL_DISCOUNT;
  }

  printAmountAfterDiscount() {
    const TOTAL_DISCOUNT = this.#calculateTotalDiscount();
    const result = this.addBonus(this.#total - TOTAL_DISCOUNT);

    OutputView.printEstimatedPaymentAmount(result);

    return result;
  }

  returnDiscount() {
    return this.#calculateTotalDiscount();
  }
}

export default DiscountManager;
