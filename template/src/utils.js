import { FillGradient, Graphics } from "pixi.js"

export function capitalizeFirstLetter(s) {
  return s && String(s[0]).toUpperCase() + String(s).slice(1)
}

export function rotateArray(arr, startIndex) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  const index = ((startIndex % arr.length) + arr.length) % arr.length;
  return [...arr.slice(index), ...arr.slice(0, index)];
}

export function getCyclicElement(arr, index) {
  // Проверка на пустой массив
  if (!arr || arr.length === 0) {
    return undefined;
  }

  // Вычисление циклического индекса
  const cyclicIndex = index % arr.length;

  // Для отрицательных индексов
  const normalizedIndex = cyclicIndex >= 0 ? cyclicIndex : arr.length + cyclicIndex;

  return arr[normalizedIndex];
}

export function createRect(x, y, w, h, fill=null) {
  let graphics = new Graphics()
  graphics.rect(x, y, w, h)

  if (fill !== null) {
    graphics.fill(fill)
  }

  return graphics
}

export function createRoundRect(x, y, w, h, radius, fill=null) {
  let graphics = new Graphics()
  graphics.roundRect(x, y, w, h, radius)

  if (fill !== null) {
    graphics.fill(fill)
  }

  return graphics
}

export function createCircle(x, y, radius, fill=null) {
  let graphics = new Graphics()
  graphics.circle(x, y, radius)

  if (fill !== null) {
    graphics.fill(fill)
  }

  return graphics
}

export function svgToBase64(svgString) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
}

export function verticalGradient(fromColor, toColor) {
  return new FillGradient({
    type: "linear",
    end: { x: 0, y: 1 },
    colorStops: [
      { offset: 0, color: fromColor, alpha: 1 },
      { offset: 1, color: toColor, alpha: 1 }
    ]
  })
}
