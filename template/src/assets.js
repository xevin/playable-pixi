import { Assets, Cache, loadTextures, Spritesheet } from "pixi.js"
import SoundManager from "./sound_manager"
import { capitalizeFirstLetter } from "./utils"

// Шрифты
import robotoFont from "assets/fonts/Roboto-VariableFont.ttf"


// Изображения
import pointer from "assets/images/pointer.webp"


// Анимации
// import lightingAnimationConfig from "assets/animations/arrow_lighting.png.json"
// import lightingAnimationFrames from "assets/animations/arrow_lighting.png"


// Звуки
import clickSound from "assets/sounds/click.mp3"


let fonts = {
  // <fontFamily>: <base64>
  roboto: robotoFont,
}

let images = {
  // <assetName>: <base64>
  pointer,
}

let sounds = {
  clickSound,
}

let animations = [
  // {
  //   alias: "lighting",
  //   config: lightingAnimationConfig,
  //   frames: lightingAnimationFrames
  // },
]

// с этим конфигом, должно работать на FB (https://developers.facebook.com/tools/playable-preview)
// иначе возникает ошибка `TypeError: Failed to fetch at window.fetch`
loadTextures.config = {
  /**
   * When set to `true`, loading and decoding images will happen with Worker thread,
   * if available on the browser. This is much more performant as network requests
   * and decoding can be expensive on the CPU. However, not all environments support
   * Workers, in some cases it can be helpful to disable by setting to `false`.
   * @default true
   */
  // If true we will use a worker to load the ImageBitmap
  preferWorkers: true,

  /**
   * The crossOrigin value to use for images when `preferCreateImageBitmap` is `false`.
   * @default 'anonymous'
   */
  // crossOrigin: 'anonymous',

  /**
   * When set to `true`, loading and decoding images will happen with `createImageBitmap`,
   * otherwise it will use `new Image()`.
   * @default true
   */
  // If false we will use new Image() instead of createImageBitmap,
  // we'll also disable the use of workers as it requires createImageBitmap
  preferCreateImageBitmap: false,
}


function objectToAssetArray(obj) {
  let result = []
  for(let key in obj) {
    result.push({
      alias: key,
      src: obj[key],
    })
  }

  return result
}


function objectToFontAssetList(obj) {
  let result = []
  for(let key in obj) {
    result.push({
      src: obj[key],
      data: {
        family: capitalizeFirstLetter(key.toLowerCase())
      }
    })
  }

  return result
}


async function loadAnimations(alias, config, texture) {
  /* не понял как грузить анимации из json через Assets.load()
    что-бы потом собрать весь проект в один файл

    Поэтому самостоятельно разбираем json, создаём Spritesheet и добавляем в Cache
  * */

  let framesConfig = JSON.parse(config)
  let framesAlias = alias + "Frames"

  await Assets.load({
    alias: framesAlias,
    src: texture
  })

  const sheet = new Spritesheet(
    Assets.get(framesAlias),
    framesConfig
  )

  await sheet.parse()
  Cache.set(alias, sheet)
}


export async function loadAssets() {
  // грузим изображения
  let imageList = objectToAssetArray(images)
  await Assets.load(imageList)

  // грузим анимации станут доступны через Cache.get("animation_name")
  for(let i of animations) {
    await loadAnimations(i.alias, i.config, i.frames)
  }

  // Грузим звуки
  // FB прерывает запуск превью, если грузить звуки через Assets.load()
  // await Assets.load(objectToAssetArray(sounds))

  // поэтому костымлим загрузку через ArrayBuffer
  const sound = SoundManager.getInstance()
  for (let soundKey in sounds) {
    sound.load(soundKey, sounds[soundKey])
  }

  // грузим шрифты в Ассеты
  let fontList = objectToFontAssetList(fonts)
  await Assets.load(fontList)
}
