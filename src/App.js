import InputView from './View/InputView.js'
import Date from './Date.js'
import Menu from './Menu.js'
import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  #date
  async run() {
    await this.requestVisitDate();
    await this.requestOrderMenu();
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

  async requestOrderMenu() {
    try {
      const INPUT = await InputView.readMenu();

      this.menu = new Menu(INPUT)
      this.menu.printOrderedMenu(this.#date);
    } catch (error) {
      MissionUtils.Console.print(`${error.message}`)
      await this.requestOrderMenu();
    }
  }
}

export default App;
