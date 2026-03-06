import { sdk } from "@smoud/playable-sdk"
import { Assets, Sprite, Text } from "pixi.js"
import config from "./config"
import App from "./core/app"

export class Game extends App {
  init(width, height) {
    this.bg = new Sprite({
      texture: Assets.get("background"),
      anchor: 0.5,
    })
    this.backgroundHeight = this.bg.height
    this.backgroundWidth = this.bg.width
    this.bg.scale.set(Math.max(width/this.backgroundWidth, height/this.backgroundHeight))

    let title = new Text({
      text: "Title",
      style: {
        ...config.defaultFontStyles,
      },
      anchor: 0.5,
      eventMode: "static",
    })

    title.on("pointerdown", () => {
      sdk.install()
    })

    this.addChild(
      this.bg,
      title,
      new Sprite({
        texture: Assets.get("star"),
        anchor: 0.5,
        y: -70,
      })
    )
  }

  resize(width, height) {
    super.resize(width, height)

    const scaleCover = Math.max(width/this.backgroundWidth, height/this.backgroundHeight)
    this.bg.scale.set(scaleCover)
  }
}
