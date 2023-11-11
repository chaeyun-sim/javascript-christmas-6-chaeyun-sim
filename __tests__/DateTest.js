import Date from '../src/Date';

describe('Date 클래스 테스트', () => {
  test('유효한 날짜 입력', () => {
    expect(() => {
      new Date('25');
    }).not.toThrow();
  });

  test('값이 없다면 예외가 발생한다.', () => {
    expect(() => {
      new Date('');
    }).toThrow('[ERROR]');
  });

  test.each(['asdf', '12-30'])(
    '숫자 외의 문자를 입력했을 경우 예외가 발생한다.',
    input => {
      expect(() => {
        new Date(input);
      }).toThrow('[ERROR]');
    },
  );

  test.each(['0', '32'])(
    '범위를 벗어난 숫자를 입력했을 경우 예외가 발생한다.',
    input => {
      expect(() => {
        new Date(input);
      }).toThrow('[ERROR]');
    },
  );
});
