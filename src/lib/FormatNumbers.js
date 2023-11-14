const FormatNumbers = {
  formatWithComma(number) {
    const NUMBER = String(number);
    let result = '';
    let count = 0;

    for (let i = NUMBER.length - 1; i >= 0; i--) {
      result += NUMBER[i];
      count++;

      if (count === 3 && i !== 0) {
        result += ',';
        count = 0;
      }
    }

    return result.split('').reverse().join('');
  },
};

export default FormatNumbers;
