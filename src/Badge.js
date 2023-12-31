import OutputView from './View/OutputView.js';

class Badge {
  #badge = null;
  constructor(discount) {
    this.#grant(discount);
  }

  #grant(discount) {
    this.#badge = this.#determineBadge(discount);
  }

  #determineBadge(discount) {
    if (discount >= 20000) return '산타';
    if (discount >= 10000) return '트리';
    if (discount >= 5000) return '별';
    return null;
  }

  printBadge() {
    const badgeMessage = this.#badge ? this.#badge : '없음';
    OutputView.printReceivedBadge(badgeMessage);

    return badgeMessage;
  }
}

export default Badge;
