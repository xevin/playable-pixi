import { Container, Text } from "pixi.js"
import gsap from "gsap"

export default class CounterComponent extends Container {
  value = 0
  constructor(props) {
    super(props)

    this.prefix = props?.prefix ?? ""
    this.postfix = props?.postfix ?? ""
    // количество нулей после запятой
    this.zeroes = props?.zeroes ?? 0

    this.style = props?.style ?? {}
    this.background = props?.background
    this.value = props?.value ?? 0

    this.valueLabel = new Text({
      text: this.getFormattedValue(),
      style: {
        ...this.style
      },
      anchor: 0.5
    })
    this.addChild(
      this.background,
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

  async play() {
    //
  }
}
