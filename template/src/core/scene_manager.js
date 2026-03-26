import StateMachine from "./fsm"

export default class SceneManager {
  #fsm
  #scenes = new Map()

  constructor(initialScene=null) {
    this.#fsm = new StateMachine(initialScene)
  }

  setCurrent(sceneName) {
    this.#fsm.setInitialState(sceneName)
  }

  start() {
    this.#fsm.start()
  }

  addScene(sceneName, scene) {
    this.#scenes.set(sceneName, scene)

    this.#fsm.addState(sceneName, {
      onEnter: (context) => {
        scene.enter(context)
      },
      onExit: () => {
        scene.exit()
      }
    })
  }

  to(sceneName, context=null) {
    this.#fsm.transitionTo(sceneName, context)
  }

  resize(width, height) {
    this.#scenes.values().forEach(scene => {
      scene.resize(width, height)
    })
  }
}
