import InputView from './View/InputView.js'

class App {
  async run() {
    await this.requestVisitDate();
  }

  async requestVisitDate() {
    const DATE = await InputView.readDate();
    
    console.group(DATE)
  }
}

export default App;
