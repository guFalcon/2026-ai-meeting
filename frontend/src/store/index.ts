import Vue from 'vue'
import Vuex from 'vuex'
import gui from '@/store/gui'
import rest from '@/store/rest'
import { singleton as env } from '@/utils/env'

Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {
    gui,
    rest
  },

  state: () => ({
    version: env.get('VERSION', ''),
    defaultLanguage: 'en'
  }),

  mutations: {
    defaultLanguage (state, value) {
      state.defaultLanguage = value
    }
  },

  actions: {
    defaultLanguage (context, value) {
      context.commit('defaultLanguage', value)
      return Promise.resolve()
    }
  },

  getters: {
    version: state => {
      return state.version
    },
    defaultLanguage: state => {
      return state.defaultLanguage
    }
  }
})

export default store
