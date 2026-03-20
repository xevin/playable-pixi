import { sdk } from "@smoud/playable-sdk"
import { loadAssets } from "./assets"
import Translation from "./core/translation"
import { Game } from "./game"
import localeData from "./locale_data"
import "./index.css"

const tr = Translation.getInstance()
tr.setData(localeData)
// константа LANGUAGE предоставляется playable-sdk
tr.setLang(LANGUAGE)

sdk.init(async (width, height) => {
  await loadAssets()

  let app = new Game(width, height)

  sdk.start()
  sdk.on("resize", (w, h) => {
    app.resize(w, h)
  })
})

if (__DEV__) {
  console.log("%c Playable: Development mode ", "background-color: crimson; color: white")
}
