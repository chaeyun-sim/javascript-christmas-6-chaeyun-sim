import { Console } from "@woowacourse/mission-utils";
import { GUIDE_MESSAGE } from '../constants/constants.js'
import FormatNumbers from '../lib/FormatNumbers.js'

const OutputView = {
  print(message) {
    Console.print(message)
  },

  printMenu(menus) {
    Console.print(GUIDE_MESSAGE.menuList);

    menus.forEach(menu => {
      const [ name, count ] = menu;
      Console.print(`${name} ${count}개`)
    })
  },

  printPreview(date) {
    Console.print(`12월 ${date}일${GUIDE_MESSAGE.preview}`)
  },

  printAmountBeforeDiscount(money) {
    Console.print(GUIDE_MESSAGE.totalAmountBeforeDiscount)
    Console.print(`${FormatNumbers.formatWithComma(money)}원`)
  },

  printBonusMenu(isValid) {
    Console.print(GUIDE_MESSAGE.bonusMenu)
    Console.print(isValid ? '샴페인 1개' : '없음')
  },

  printBenefits(list, isEmpty) {
    Console.print(GUIDE_MESSAGE.discountList)

    if (!isEmpty) {
      Object.keys(list).forEach(key => {
        if (list[key]) {
          Console.print(`${key}: -${list[key]}원`);
        }
      });
      return;
    }
    Console.print('없음')
  },

  printTotalBenefitAmount() {
    Console.print(GUIDE_MESSAGE.totalDiscountAmount)
  },

  printEstimatedPaymentAmount(){
    Console.print(GUIDE_MESSAGE.estimatedPaymentAmount)
  },

  printisBadgeReceived() {
    Console.print(GUIDE_MESSAGE.eventBadge)
  }
}


export default OutputView