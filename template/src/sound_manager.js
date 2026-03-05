import { sound } from "@pixi/sound"
import Singleton from "./common/singleton"

export default class SoundManager extends Singleton {
  play(soundName) {
    console.log("SoundManager.play()", soundName)
    sound.play(soundName)
  }

  stop(soundName) {
    console.log("SoundManager.stop()", soundName)
    sound.stop(soundName)
  }

  base64ToArrayBuffer(base64) {
    const data = base64.split(",").slice(1).join(",")
    const binary_string = atob(data)
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  load(name, base64) {
    // sound.add(name, base64)
    sound.add(name, this.base64ToArrayBuffer(base64))
  }
}
