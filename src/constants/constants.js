const CHRISTMAS = 25;
const MAX_MENUS = 20;
const MIN_AMOUNT = 10000;
const MIN_DISCOUNT = 1000;
const DAILY_DISCOUNT = 2023;
const MIN_AMOUNT_TO_GET_BONUS = 120000;

const MENU = Object.freeze({
  appetizers: [
    { name: '양송이수프', price: 6000 },
    { name: '타파스', price: 5500 },
    { name: '시저샐러드', price: 8000 },
  ],
  mains: [
    { name: '티본스테이크', price: 55000 },
    { name: '바비큐립', price: 54000 },
    { name: '해산물파스타', price: 35000 },
    { name: '크리스마스파스타', price: 25000 },
  ],
  desserts: [
    { name: '초코케이크', price: 15000 },
    { name: '아이스크림', price: 5000 },
  ],
  drinks: [
    { name: '제로콜라', price: 3000 },
    { name: '레드와인', price: 60000 },
    { name: '샴페인', price: 25000 },
  ],
});

const GUIDE_MESSAGE = Object.freeze({
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  insertDate:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  insertMenu:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  preview: '에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  menuList: '<주문 메뉴>',
  totalAmountBeforeDiscount: '<할인 전 총주문 금액>',
  bonusMenu: '<증정 메뉴>',
  discountList: '<혜택 내역>',
  totalDiscountAmount: '<총혜택 금액>',
  estimatedPaymentAmount: '<할인 후 예상 결제 금액>',
  eventBadge: '<12월 이벤트 배지>',
});

const ERROR_MESSAGE = Object.freeze({
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidMenu: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

export {
  CHRISTMAS,
  MAX_MENUS,
  MIN_AMOUNT,
  MIN_DISCOUNT,
  DAILY_DISCOUNT,
  MIN_AMOUNT_TO_GET_BONUS,
  MENU,
  GUIDE_MESSAGE,
  ERROR_MESSAGE,
};
