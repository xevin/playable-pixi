import { loadCustomFont, loadTextureFromBase64 } from "./utils";

export const images = {
  logo: "<base64>"
}


export const fonts = {
  "CustomFont": {
    src: "<base64>",
    // config: {
    //   weight: ""
    // }
  },
}

export const sounds = {
  soundName: "<base64>",
}


export async function assetsLoad() {
  let _images = {...images}

  for(let key in images) {
    _images[key] = await loadTextureFromBase64(images[key])
  }

  return _images
}


export async function loadFonts() {
  for(let key in fonts) {
    await loadCustomFont(key, fonts[key].src)
  }
}
