import bg from "assets/bg.webp"
import robotoFont from "assets/Roboto-VariableFont.ttf"
import { Assets, Cache, Texture } from "pixi.js"

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

export const imageAssets = images


export async function loadCustomFont(fontFamily, fontBase64Data) {
  return new Promise((resolve) => {
    try {
      // Создаем стиль для загрузки шрифта
      const fontFace = new FontFace(
        fontFamily,
        `url(${fontBase64Data})`,
        {
          style: 'normal',
          // weight: '400'
        }
      );

      fontFace.load().then((loadedFont) => {
        // Добавляем шрифт в документ
        document.fonts.add(loadedFont);
        console.log('Шрифт успешно загружен');
        resolve(true);
      }).catch((error) => {
        console.error('Ошибка загрузки шрифта:', error);
        resolve(false);
      });

    } catch (error) {
      console.error('Ошибка при загрузке шрифта:', error);
      resolve(false);
    }
  });
}


export function loadTextureFromBase64(base64Data) {
  return new Promise((resolve) => {
    try {
      const cleanBase64 = base64Data.replace(/\s/g, '')
      const img = new Image()

      img.onload = () => {
        resolve(Texture.from(img))
      }

      img.onerror = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 100
        canvas.height = 100
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#FF00FF'
          ctx.fillRect(0, 0, 100, 100)
          ctx.fillStyle = '#FFFFFF'
          ctx.font = '14px Arial'
          ctx.fillText('Player', 20, 50)
        }

        resolve(Texture.from(canvas))
      };

      img.src = cleanBase64
    } catch (error) {
      resolve(Texture.EMPTY)
    }
  });
}

// Не работает на https://developers.facebook.com/tools/playable-preview
export async function loadPixiAssets() {
  await Assets.load(aliasList)

  await Assets.load({
    src: robotoFont,
    data: {
      family: "Roboto"
    }
  })
}

// Работает на https://developers.facebook.com/tools/playable-preview
export async function loadAssets() {
  for(let i in imageAssets) {
    Cache.set(i, await loadTextureFromBase64(imageAssets[i]))
  }

  await Assets.load({
    src: robotoFont,
    data: {
      family: "Roboto"
    }
  })

  // Альтернативный вариант загрузки шрифтов
  // await loadCustomFont("Roboto", robotoFont)
}
