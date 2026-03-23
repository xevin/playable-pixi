import { Container } from "pixi.js"

export default class DisclaimerText extends Container {
  constructor(props) {
    super(props)

    let text = new Text({
      text: "For illustrative purposes only",
      style: {
        fontFamily: "sans-serif",
        fontSize: 20,
        fontWeight: 500,
        fill: "#FFFFFF",
        align: "center",
        stroke: {
          width: 4,
          color: 0x000000,
        },
        anchor: {
          x: 0.5,
          y: 0,
        },
      }
    })

    if(AD_NETWORK && AD_NETWORK === "ironsource") {
      this.addChild(text)
    }
  }

  resize(width, height) {
    if (width > height) {
      // ландшафтный
    } else {
      // портретный
    }
  }
}
