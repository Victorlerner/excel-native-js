import {Page} from '@core/Page'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {debounce, storage} from '@core/untils'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initalState'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListeners = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListeners)
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })
    // excel.render()

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }
}
