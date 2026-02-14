import { Application } from "pixi.js"

export default class App {
  constructor(width, height) {
    this.app = new Application()
    const gameWrapper = document.getElementById("app")

    // для плагина в браузере
    // Pixi Devtools (https://chromewebstore.google.com/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon)
    globalThis.__PIXI_APP__ = this.app

    this.app.init({
      background: 0x001100,
      width,
      height,
    }).then(() => {
      gameWrapper.appendChild(this.app.canvas)
      this.#placeToCenterOfScreen(width, height)
      this.init(width, height)
    })
  }

  init(width, height) {
    // для потомков
  }

  #placeToCenterOfScreen(width, height) {
    this.app.stage.position.x = width / 2
    this.app.stage.position.y = height / 2
  }

  resize(width, height) {
    console.log(`App.resize(${width}, ${height})`)
    this.app.renderer.resize(width, height)

    this.#placeToCenterOfScreen(width, height)
  }
}
