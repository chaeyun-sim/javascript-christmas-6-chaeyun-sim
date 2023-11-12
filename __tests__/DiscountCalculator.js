import DiscountCalculator from '../src/DiscountCalculator';
import { DAILY_DISCOUNT, MENU } from '../src/constants/constants';

describe('DiscountCalculator 클래스 테스트 - 총 금액', () => {
  test('총 금액이 10000원 이하일 때 혜택은 없다.', () => {
    const date = 26;
    const order = [
      ['타파스', '1'],
      ['제로콜라', '1'],
    ];
    const total = 8500;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount).toEqual({
      '주말 할인': 0,
      '증정 이벤트': 0,
      '크리스마스 디데이 할인': 0,
      '특별 할인': 0,
      '평일 할인': 0,
    });
  });
});

describe('크리스마스 특별 할인 테스트', () => {
  let order;
  let total;

  beforeEach(() => {
    order = [
      ['티본스테이크', '1'],
      ['바비큐립', '1'],
    ];
    total = 109000;
  });

  test.each([
    [1, 1000],
    [10, 1900],
    [11, 2000],
    [20, 2900],
    [21, 3000],
    [25, 3400],
  ])(
    '12월 %s일의 크리스마스 디데이 할인 금액은 %i이다. ',
    (date, expectedDiscount) => {
      const discount = new DiscountCalculator(
        date,
        order,
        total,
      ).returnDiscount();
      expect(discount['크리스마스 디데이 할인']).toBe(expectedDiscount);
    },
  );

  test('12월 26일 크리스마스 디데이 할인 마감 다음날의 할인 금액은 0원이다.', () => {
    const date = 26;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['크리스마스 디데이 할인']).toBeFalsy();
  });
});

describe('평일 할인 테스트', () => {
  test('주문 목록에 디저트가 없을 때 평일 할인은 이루어지지 않는다.', () => {
    const date = 4;
    const order = [
      ['티본스테이크', '1'],
      ['바비큐립', '1'],
    ];
    const total = 109000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['평일 할인']).toBeFalsy();
  });

  test('주말에는 평일 할인이 이루어지지 않는다.', () => {
    const date = 8;
    const order = [
      ['티본스테이크', '1'],
      ['초코케이크', '1'],
    ];
    const total = 70000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['평일 할인']).toBeFalsy();
  });
});

describe('주말 할인 테스트', () => {
  test('주문 목록에 메인이 없을 때 주말 할인은 이루어지지 않는다.', () => {
    const date = 5;
    const order = [
      ['초코케이크', '1'],
      ['아이스크림', '1'],
    ];
    const total = 20000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['주말 할인']).toBeFalsy();
  });

  test.each([3, 7, 25])('평일에는 주말 할인이 이루어지지 않는다.', date => {
    const order = [
      ['티본스테이크', '1'],
      ['초코케이크', '1'],
    ];
    const total = 70000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['주말 할인']).toBeFalsy();
  });
});

describe('특별 할인 테스트', () => {
  let order;
  let total;

  beforeEach(() => {
    order = ['초코케이크', '1', '아이스크림', '1'];
    total = 20000;
  });

  test.each([4, 11, 18])(
    '크리스마스를 제외한 월요일은 특별 할인이 없다.',
    date => {
      const discount = new DiscountCalculator(
        date,
        order,
        total,
      ).returnDiscount();
      expect(discount['특별 할인']).toBeFalsy();
    },
  );

  test('크리스마스에는 특별할인이 적용된다.', () => {
    const date = 25;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['특별 할인']).not.toBeFalsy();
  });

  test.each([3, 10, 17, 24, 31])('일요일에는 특별할인이 적용된다.', date => {
    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();
    expect(discount['특별 할인']).toEqual(1000);
  });
});

describe('중복 할인 테스트', () => {
  test.each([24, 25])('평일 할인과 특별 할인 중복 테스트', date => {
    // 별이 표시된 일요일 하루와 크리스마스 테스트

    const order = [['초코케이크', '2']];
    const total = 30000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();

    expect(discount['평일 할인']).toEqual(DAILY_DISCOUNT * 2);
    expect(discount['특별 할인']).toEqual(1000);
  });

  test('증정 이벤트와 평일 할인 중복 테스트', () => {
    const date = 5;
    const order = [
      ['티본스테이크', '2'],
      ['초코케이크', '1'],
    ];
    const total = 125000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();

    expect(discount['증정 이벤트']).toBeTruthy();
    expect(discount['평일 할인']).toEqual(DAILY_DISCOUNT);
  });

  test('증정 이벤트와 주말 할인 중복 테스트', () => {
    const date = 8;
    const order = [
      ['티본스테이크', '2'],
      ['초코케이크', '1'],
    ];
    const total = 125000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();

    expect(discount['증정 이벤트']).toBeTruthy();
    expect(discount['주말 할인']).toEqual(DAILY_DISCOUNT * 2);
  });
});

describe('혜택 다중 중복 확인 테스트', () => {
  test('크리스마스 - 평일 혜택, 특별 혜택, 크리스마스 디데이 이벤트, 증정 이벤트 테스트', () => {
    const date = 25;
    const order = [
      ['티본스테이크', '2'],
      ['초코케이크', '1'],
    ];
    const total = 125000;

    const discount = new DiscountCalculator(
      date,
      order,
      total,
    ).returnDiscount();

    expect(discount).toEqual({
      '주말 할인': 0,
      '증정 이벤트': 25000,
      '크리스마스 디데이 할인': 3400,
      '특별 할인': 1000,
      '평일 할인': 2023,
    });
  });
});
