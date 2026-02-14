import { Assets } from "pixi.js"
import robotoFont from "assets/Roboto-VariableFont.ttf"
import bg from "assets/bg.png"

let images = {
  bg,
}


let aliasList = []
for(let i in images) {
  aliasList.push({
    alias: i,
    src: images[i],
  })
}


export async function loadAssets() {
  await Assets.load(aliasList)

  await Assets.load({
    src: robotoFont,
    data: {
      family: "Roboto"
    }
  })
}
