import { sdk } from "@smoud/playable-sdk"
import { loadAssets } from "./assets"
import Translation from "./core/translation"
import { GameApp } from "./game_app"
import localeData from "./locale_data"
import "./index.css"
import gsap from "gsap"
import SoundManager from "./core/sound_manager"


globalThis.gsap = gsap
globalThis.sound = SoundManager.getInstance()
globalThis.tr = Translation.getInstance()


tr.setData(localeData)
// константа LANGUAGE предоставляется playable-sdk
tr.setLang(LANGUAGE)

sdk.init(async (width, height) => {
  await loadAssets()

  let app = new GameApp(width, height)

  sdk.start()
  sdk.on("resize", (w, h) => {
    app.resize(w, h)
  })
})

if (__DEV__) {
  console.log("%c Playable: Development mode ", "background-color: crimson; color: white")
}
