import BonusMenu from '../src/BonusMenu';

describe('증정 혜택 (BonusMenu 클래스) 테스트', () => {
  test('총 금액이 120000원 이상일 때', () => {
    const input = 119999;
    const bonus = new BonusMenu(input).printBonus();

    expect(bonus).toEqual('없음');
  });

  test('총 금액이 120000원 미만일 때', () => {
    const input = 120001;
    const bonus = new BonusMenu(input).printBonus();

    expect(bonus).toEqual('샴페인 1개');
  });
});
