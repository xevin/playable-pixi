import { Container } from "pixi.js"
import { createRect } from "../utils"
import config from "../config"

export default class ShadowBackground extends Container {
  constructor(props) {
    super(props)

    this.opacity = props?.opacity ?? 0.5

    let bg = createRect(
      -config.width,
      -config.height,
      config.width*2,
      config.height*2,
      "#000000",
    )

    bg.alpha = this.opacity

    this.addChild(bg)
  }

  resize(width, height) {
    const scaleCover = Math.max(width/config.width, height/config.height)
    this.scale.set(scaleCover)
  }
}
