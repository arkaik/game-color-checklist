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

const persistPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type !== 'initData') {
      LocalForage.setItem('fullstate', state.checkMap)
    }
  })
}

export default new Vuex.Store({
  state: {
    products,
    equivalences,
    checkMap: products.reduce((map, prod) => {
      map[prod.code] = false
      return map
    }, {})
  },
  mutations: {
    updateValue (state, {code, value}) {
      Vue.set(state.checkMap, code, value)
    },
    initData (state, savedData) {
      let mixed = Object.assign({}, state.checkMap, savedData.checkMap)
      Vue.set(state, 'checkMap', mixed)
    }
  },
  actions: {
    deleteData (context) {
      LocalForage.dropInstance()
    },
    initDataAsync (context) {
      LocalForage.getItem('fullstate').then(checkMap => {
        context.commit('initData', {checkMap})
      })
    }
  },
  plugins: [persistPlugin]
})
