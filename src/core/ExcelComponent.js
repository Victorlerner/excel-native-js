import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsebsribers = []

    this.prepare()
  }

  // setup our component before init
  prepare() {

  }

  /**
   * return template
   * @return {string}
   */
  toHTML() {
    return ''
  }

  // emit listeners about event change
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // subscribe to event

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsebsribers.push(unsub)
  }

  // iniit component and add DOM Listeners
  init() {
    this.initDOMListeners()
  }

  // delete component and clear Listeners
  destroy() {
    this.removeDOMListeners()
    this.unsebsribers.forEach(unsub => unsub())
  }
}
