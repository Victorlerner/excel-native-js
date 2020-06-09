import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import './scss/index.scss'
import {storage, debounce} from '@core/untils'
import {initialState} from '@/redux/initalState'

const store = createStore(rootReducer, initialState)

const stateListeners = debounce( state => {
  console.log('App state', state)
  storage('excel-state',state)
}, 300)

store.subscribe(stateListeners)
const excel= new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})
excel.render()
