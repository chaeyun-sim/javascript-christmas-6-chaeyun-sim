import DiscountManager from '../src/DiscountManager';

describe('DiscountManager 클래스 테스트 - 총 할인 금액', () => {
  test('총 할인 금액 테스트', () => {
    const date = 24;
    const orders = [
      ['티본스테이크', '1'],
      ['초코케이크', '1'],
      ['제로콜라', '1'],
    ];
    const total = 73000;
    const expectedResult = 3300 + 2023 + 1000;

    const result = new DiscountManager(
      date,
      orders,
      total,
    ).printTotalDiscountAmount();

    expect(result).toEqual(expectedResult);
  });

  test('할인 금액이 없을 때', () => {
    const date = 24;
    const orders = [['아이스크림', '1']];
    const total = 5000;
    const expectedResult = 0;

    const result = new DiscountManager(
      date,
      orders,
      total,
    ).printTotalDiscountAmount();

    expect(result).toEqual(expectedResult);
  });
});

describe('DiscountManager 클래스 테스트 - 할인 이후 총 금액', () => {
  test('총 금액이 10000원 이하일 때 할인 이전 금액과 이후 금액은 동일하다.', () => {
    const date = 24;
    const orders = [['아이스크림', '1']];
    const total = 5000;
    const expectedResult = total;

    const result = new DiscountManager(
      date,
      orders,
      total,
    ).printAmountAfterDiscount();

    expect(result).toBe(expectedResult);
  });
});
