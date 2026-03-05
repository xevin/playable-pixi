import { sdk } from "@smoud/playable-sdk"
import { Assets, Sprite, Text } from "pixi.js"
import config from "./config"
import App from "./core/app"

export class Game extends App {
  init(width, height) {
    this.bg = new Sprite({
      texture: Assets.get("bg"),
      anchor: 0.5,
      scale: Math.max(width/config.width, height/config.height)
    })

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
    )
  }

  resize(width, height) {
    super.resize(width, height)

    this.bg.scale.set(Math.max(width/1080, height/1920))
  }
}
