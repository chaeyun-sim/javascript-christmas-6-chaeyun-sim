import Badge from '../src/Badge';

describe('Badge 클래스 테스트', () => {
  test.each([
    [0, '없음'],
    [4999, '없음'],
    [5001, '별'],
    [9999, '별'],
    [10001, '트리'],
    [19999, '트리'],
    [20001, '산타'],
    [20000000, '산타'],
  ])('총 혜택 금액이 %i일 때 뱃지는 %s이다.', (total, expectedBadge) => {
    const result = new Badge(total).printBadge();

    expect(result).toBe(expectedBadge);
  });
});
