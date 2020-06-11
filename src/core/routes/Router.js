import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

// import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selected is not provided in Router')
    }
    this.$placehoder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placehoder.clear()
    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard

    this.page = new Page(ActiveRoute.param)

    this.$placehoder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
