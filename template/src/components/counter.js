import { Container, Sprite, Text } from "pixi.js"
import gsap from "gsap"

export default class CounterComponent extends Container {
  value = 0
  constructor(props) {
    super(props)

    this.prefix = props?.prefix ?? ""
    this.postfix = props?.postfix ?? ""
    // количество нулей после запятой
    this.zeroes = props?.zeroes ?? 0

    this.style = props?.style
    this.texture = props?.texture
    this.textureOffset = props?.textureOffset ?? {x: 0, y: 0}
    this.value = props?.value ?? 0

    this.valueLabel = new Text({
      text: this.getFormattedValue(),
      anchor: 0.5,
    })

    if(this?.style) {
      this.valueLabel.style = this.style
    }

    if (this?.texture) {
      this.addChild(new Sprite({
        texture: this.texture,
        anchor: 0.5,
        x: this.textureOffset.x,
        y: this.textureOffset.y,
      }))
    }

    this.addChild(
      this.valueLabel,
    )
  }

  getFormattedValue() {
    return this.prefix + this.value.toFixed(this.zeroes) + this.postfix
  }

  animateValue(value, duration=1) {
    gsap.to(this, {
      value: value,
      duration,
      onUpdate: () => {
        this.valueLabel.text = this.getFormattedValue()
      }
    })
  }
}
