import { pixiPipes } from "@assetpack/core/pixi"

export default {
  entry: './_raw_assets',
  output: './assets',
  pipes: [
    ...pixiPipes({
      // manifest: {
      //   trimExtensions: true
      // },
      resolutions: {
        default: 1,
      },
      cacheBust: false,
      texturePacker: {
        texturePacker: {
          padding: 2,
          removeFileExtension: true,
          allowRotation: false,
        },
        resolutionOptions: {
          // template: "@%%x",
          // fixedResolution: "default",
          maximumTextureSize: 10240,
        },
      },
      audio: {
        outputs: [
          {
            formats: ['.mp3'],
            recompress: true,
            options: {
              audioBitrate: 96,
              audioChannels: 1,
              audioFrequency: 48000,
            },
          },
        ]
      },
      compression: {
        webp: { quality: 75, alphaQuality: 80, },
        avif: false,
        bc7: false,
        astc: false,
        basis: false,
        etc: false
      }
    }),
  ],
}
