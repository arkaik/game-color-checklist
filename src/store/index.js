import Vue from 'vue'
import Vuex from 'vuex'
import LocalForage from 'localforage'
import products from '../data.js'
import equivalences from '../data2.js'

Vue.use(Vuex)

LocalForage.config({
  name: "Checklist: Game Color",
  storeName: "checklist-game-color-store"
})

/*async function initState(store) {

  var initialState = {
    products,
    checkMap: products.reduce((map, prod) => {
      map[prod.code] = false
      return map
    }, {})
  }

  var savedState = await LocalForage.getItem('fullstate')

  var mixedState = Object.assign({}, initialState, savedState)

  store.replaceState(mixedState)
}


const persistPlugin = store => {

  initState(store)

  store.subscribe((mutations, state) => {
      LocalForage.setItem('fullstate', state)
  })
}*/

async function initState(store) {

  var initialState = {
    products,
    equivalences,
    checkMap: products.reduce((map, prod) => {
      map[prod.code] = false
      return map
    }, {})
  }

  var savedState = await LocalForage.getItem('fullstate')

  var mixedState = Object.assign({}, initialState, savedState)

  store.replaceState(mixedState)
}


const persistPlugin = store => {

  initState(store)

  store.subscribe((mutations, state) => {
      LocalForage.setItem('fullstate', state.checkMap)
  })
}

export default new Vuex.Store({
  mutations: {
    updateValue (state, {code, value}) {
      state.checkMap[code] = value
    }
  },
  actions: {
    deleteData (context) {
      LocalForage.dropInstance()
    }
  },
  plugins: [persistPlugin]
})
