import Singleton from "./singleton"

/*
  Переводы

  Пример использования:

    let data = {
      "GAME_OVER": {
      "ru": "Конец игры" ,
      "en": "Game Over"
    }

    let tr = Translation.getInstance()
    tr.setData(data)
    tr.setLang("ru")

    tr.msg("GAME_OVER") // выведет "Конец игры"
    tr.setLang("en")
    tr.msg("GAME_OVER") // выведет "Game Over"

* */

export default class Translation extends Singleton {
  #dict
  #lang

  setLang(lang) {
    this.#lang = lang
  }

  setData(dict) {
    this.#dict = dict
  }

  msg(text) {
    return this.#dict?.[text]?.[this.#lang] ?? text
  }
}
