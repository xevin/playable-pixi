import { sdk } from "@smoud/playable-sdk";
import { Assets, Container, Sprite, Text } from "pixi.js";
import App from "./core/app"

export class Game extends App {
  init(width, height) {
    this.bg = new Sprite({
      texture: Assets.get("bg"),
      anchor: 0.5,
      scale: Math.max(width/1080, height/1920)
    })

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
      anchor: 0.5,
      eventMode: "static",
    })

    title.on("pointerdown", () => {
      sdk.install()
    })

    this.scene = new Container({
      label: "Scene",
      children: [
        title
      ]
    })
    this.addChild(this.bg, this.scene)
  }

  resize(width, height) {
    super.resize(width, height)

    this.bg.scale.set(Math.max(width/1080, height/1920))
  }
}
