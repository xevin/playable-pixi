import { Application } from "pixi.js"
import config from "../config"

export default class App {
  constructor(width, height) {
    this.app = new Application()
    const gameWrapper = document.getElementById("app")

    // для плагина в браузере
    // Pixi Devtools (https://chromewebstore.google.com/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon)
    globalThis.__PIXI_APP__ = this.app

    this.app.init({
      width,
      height,
      background: config?.backgroundColor ?? "#000000",
      antialias: config.antialias,
      resolution: config.resolution,
      autoDensity: true,
      // preference: "canvas"
    }).then(() => {
      gameWrapper.appendChild(this.app.canvas)
      this.#placeToCenterOfScreen(width, height)
      this.init(width, height)
    })
  }

  init(width, height) {
    // для потомков
  }

  addChild(...args) {
    this.app.stage.addChild(...args)
  }

  #placeToCenterOfScreen(width, height) {
    this.app.stage.position.x = width / 2
    this.app.stage.position.y = height / 2
  }

  resize(width, height) {
    this.app.renderer.resize(width, height)
    this.#placeToCenterOfScreen(width, height)
  }
}
