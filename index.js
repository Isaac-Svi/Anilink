class Chain {
  constructor(defaultMs, mode = 'delay') {
    this.ms = defaultMs
    this.queue = []
    this.cleanupQueue = []
    this.duration = 0

    this.mode = mode
  }

  static delay(ms) {
    return new Promise((res) => setTimeout(res, ms))
  }

  /**
   * @param {*} element A string or HTMLElement
   * @description Sets and returns element if element is a string or HTMLElement
   * @returns {HTMLElement} Found or entered HTML element
   */
  setElement(element) {
    if (typeof element === 'object' && element instanceof HTMLElement) return element

    if (typeof element === 'string') return document.querySelector(element)

    throw new Error('Invalid element')
  }

  /**
   * @description Delays next animate function by set ms
   * @param {*} ms
   * @returns this
   */
  delay(ms = this.ms) {
    this.duration += ms

    const func = async () => await Animation.delay(ms)
    this.queue.push(func)
    return this
  }

  animate(element, css, transitionTime = this.ms) {
    this.duration += transitionTime

    const el = this.setElement(element)
    this.cleanupQueue.push(el)

    const setStyles = async () => {
      el.style.transition = transitionTime + 'ms'
      for (let i in css) {
        el.style[i] = css[i]
      }

      if (this.mode === 'simultaneous') return

      await Animation.delay(transitionTime)
    }

    this.queue.push(setStyles)
    return this
  }

  cb(func, ms = this.ms) {
    const CB = async () => {
      func()
      if (this.mode === 'simultaneous') return

      await Animation.delay(ms)
    }
    this.queue.push(CB)
    return this
  }

  cleanup() {
    this.cleanupQueue.forEach((x) => {
      if (x instanceof HTMLElement) {
        x.style.transition = '0ms'
      }
    })
  }

  async exec() {
    for (let func of this.queue) {
      await func()
    }
    setTimeout(this.cleanup.bind(this), this.duration)
  }
}

module.exports = Chain
