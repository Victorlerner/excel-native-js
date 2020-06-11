export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Method getRoot should implemented')
  }

  afterRender() {}

  destroy() {}
}
