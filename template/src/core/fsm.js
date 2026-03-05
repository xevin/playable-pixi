/*
Пример использования

const fsm = new StateMachine("menu")

fsm.addState("menu", {
  onEnter: () => {
    menu.show()
  },
  onExit: () => {
    menu.hide()
  }
)

fsm.addState("game", {
  onEnter: () => {
    game.show()
  },
  onExit: () => {
    game.hide()
  }
)

this.fsm.start()

// При клике кнопки старт в меню переходим на сцену игры
menu.on("gameStart", () => {
  fsm.transitionTo("game")
})

*/

export default class StateMachine {
  constructor(initialState = null) {
    this.currentState = null;
    this.states = new Map();
    this.initialState = initialState;
  }

  /**
   * Добавить состояние
   * @param {string} name - Название состояния
   * @param {Object} handlers - Объект с методами onEnter, onExit, onUpdate
   */
  addState(name, handlers = {}) {
    this.states.set(name, {
      onEnter: handlers.onEnter || (() => {}),
      onExit: handlers.onExit || (() => {}),
      onUpdate: handlers.onUpdate || (() => {})
    });
    return this;
  }

  /**
   * Установить начальное состояние
   * @param {string} name - Название состояния
   */
  setInitialState(name) {
    if (!this.states.has(name)) {
      throw new Error(`State '${name}' is not defined`);
    }
    this.initialState = name;
    return this;
  }

  /**
   * Перейти в состояние
   * @param {string} name - Название состояния
   * @param {any} context - Контекст, передаваемый в обработчики
   */
  async transitionTo(name, context = null) {
    if (!this.states.has(name)) {
      throw new Error(`State '${name}' is not defined`);
    }

    if (this.currentState === name) {
      return;
    }

    // Выход из текущего состояния
    if (this.currentState !== null) {
      const currentState = this.states.get(this.currentState);
      await Promise.resolve(currentState.onExit(context));
    }

    const previousState = this.currentState;
    this.currentState = name;

    // Вход в новое состояние
    const newState = this.states.get(this.currentState);
    await Promise.resolve(newState.onEnter(context, previousState));

    return this;
  }

  /**
   * Обновить текущее состояние
   * @param {any} context - Контекст, передаваемый в onUpdate
   */
  async update(context = null) {
    if (this.currentState !== null) {
      const state = this.states.get(this.currentState);
      await Promise.resolve(state.onUpdate(context));
    }
  }

  /**
   * Проверить, находится ли машина в указанном состоянии
   * @param {string} name - Название состояния
   * @returns {boolean}
   */
  isInState(name) {
    return this.currentState === name;
  }

  /**
   * Получить текущее состояние
   * @returns {string}
   */
  getCurrentState() {
    return this.currentState;
  }

  /**
   * Запустить машину состояний
   */
  async start() {
    if (this.initialState !== null) {
      await this.transitionTo(this.initialState);
    }
    return this;
  }

  /**
   * Остановить машину состояний
   */
  async stop() {
    if (this.currentState !== null) {
      const state = this.states.get(this.currentState);
      await Promise.resolve(state.onExit(null));
      this.currentState = null;
    }
    return this;
  }
}
