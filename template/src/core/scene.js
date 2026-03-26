import { Container } from "pixi.js"

export default class Scene extends Container {
  constructor(width, height) {
    super()

    this.exit()
  }

  enter(context) {
    this.visible = true
  }

  exit() {
    this.visible = false
  }

  resize(width, height) {

  }
}
