import Menu from '../src/Menu';

describe('Menu 클래스 테스트', () => {
  test('유효한 날짜 입력', () => {
    expect(() => {
      new Menu('타파스-1,제로콜라-2');
    }).not.toThrow();
  });

  test('값이 없다면 예외가 발생한다.', () => {
    expect(() => {
      new Menu('');
    }).toThrow('[ERROR]');
  });

  test.each(['123', 'iiiii-ii,iiiii=2', '제로콜라-1,,,,', '타파스-b'])(
    '메뉴 형식이 다른 경우 예외가 발생한다.',
    input => {
      expect(() => {
        new Menu(input);
      }).toThrow('[ERROR]');
    },
  );

  test.each(['zerocoke-1', 'asdfasdfasdf-10', '제로콜ㄹr-1'])(
    '이름이 한글이 아니라면 예외가 발생한다.',
    input => {
      expect(() => {
        new Menu(input);
      }).toThrow('[ERROR]');
    },
  );

  test.each(['생일케이크-1', '크리스마스-1,크리스마스파스타-1'])(
    '기존 메뉴에 포함된 이름이 아니라면 예외가 발생한다.',
    input => {
      expect(() => {
        new Menu(input);
      }).toThrow('[ERROR]');
    },
  );

  test('이름이 없다면 예외가 발생한다.', () => {
    expect(() => {
      new Menu('-10');
    }).toThrow('[ERROR]');
  });

  test.each(['제로콜라-21', '양송이수프-0'])(
    '주문한 메뉴의 개수난 1개 이상, 총 20개 이하여야한다.',
    input => {
      expect(() => {
        new Menu(input);
      }).toThrow('[ERROR]');
    },
  );

  test('모든 주문한 메뉴가 음료일 경우 예외가 발생한다.', () => {
    expect(() => {
      new Menu('제로콜라-3,레드와인-1,샴페인-1');
    }).toThrow('[ERROR]');
  });

  test('메뉴를 중복해서 주문하면 예외가 발생한다.', () => {
    expect(() => {
      new Menu('시저샐러드-1,시저샐러드-1');
    }).toThrow('[ERROR]');
  });
});
