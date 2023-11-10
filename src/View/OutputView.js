import { Console } from "@woowacourse/mission-utils";
import { GUIDE_MESSAGE } from '../constants/constants'

const OutputView = {
    printMenu(menus) {
        Console.print(GUIDE_MESSAGE.menuList);

        menus.forEach(menu => Console.print(`${menu.name} ${menu.count}개`))
    },

    printPreview(date) {
        Console.print(`12월 ${date}일${GUIDE_MESSAGE.preview}`)
    },

    printAmountBeforeDiscount(money) {
        Console.print(GUIDE_MESSAGE.totalAmountBeforeDiscount)

        Console.print(`${money}원`)
    },

    printBonusMenu() {
        Console.print(GUIDE_MESSAGE.bonusMenu)
    },

    printBenefits(list) {
        Console.print(GUIDE_MESSAGE.discountList)

        list.forEach(item => Console.print(`${item.name}: ${item.money}원`))
    },

    printTotalBenefitAmount(money) {
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