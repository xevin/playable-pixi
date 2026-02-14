import { sdk } from "@smoud/playable-sdk";
import { Cache, Container, Sprite, Text } from "pixi.js";
import App from "./common/app"

export class Game extends App {
  init(width, height) {
    this.bg = new Sprite({
      texture: Cache.get("bg"),
      anchor: 0.5,
      scale: Math.max(width/1080, height/1920)
    })
    this.app.stage.addChild(this.bg)

    this.scene = new Container()
    this.app.stage.addChild(this.scene)

    let title = new Text({
      text: "Title",
      style: {
        fontFamily: "Roboto",
        fontSize: 60,
        fill: 0xFFFFFF,
        stroke: {
          color: 0x000000,
          width: 4,
        }
      },
      anchor: 0.5
    })
    title.eventMode = "static"
    title.on("pointerdown", () => {
      sdk.install()
    })
    this.scene.addChild(title)
  }

  resize(width, height) {
    super.resize(width, height)

    this.bg.scale.set(Math.max(width/1080, height/1920))
  }
}
