import { Console } from '@woowacourse/mission-utils';
import { GUIDE_MESSAGE } from '../constants/constants.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(GUIDE_MESSAGE.insertDate);
    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(GUIDE_MESSAGE.insertMenu);
    return input;
  },
};

export default InputView;
