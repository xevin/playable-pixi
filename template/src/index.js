import { sdk } from "@smoud/playable-sdk"
import { loadAssets } from "./assets"
import { Game } from "./game"

sdk.init(async (width, height) => {
  await loadAssets()

  let app = new Game(width, height)

  sdk.start()
  sdk.on("resize", (w, h) => {
    app.resize(w, h)
  })
})
