import { Assets } from "pixi.js";

Assets.addBundle("main", {
  logo: "<base64>"
})

Assets.load({
  src: "<base64>",
  data: {
    family: "MyFont"
  }
})
