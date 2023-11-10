import InputView from './View/InputView.js'
import Date from './Date.js'
import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  #date
  async run() {
    await this.requestVisitDate();
  }

  async requestVisitDate() {
    try {
      const INPUT = await InputView.readDate();
      this.#date = new Date(INPUT).returnValue();
    } catch (error) {
      MissionUtils.Console.print(`${error.message}`)
      await this.requestVisitDate();
    }
  }
}

export default App;
