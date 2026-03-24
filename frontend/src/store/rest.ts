import { singleton as env } from '@/utils/env'

const store = {

  namespaced: true,

  state: () => ({
    config: {
      servers: {
        elite: {
          protocol: env.get('PROTOCOL', 'http'), // DEV-local
          address: env.get('ADDRESS', 'localhost'), // DEV-local
          port: env.get('PORT', '8080') // DEV-local
        }
      },
      endpoint: {
        application: {
          name: '/',
          version: '/version',
          health: '/health',
          datetime: '/datetime'
        }
      }
    }
  }),

  mutations: {
  },

  actions: {
  },

  getters: {
    config: state => {
      return state.config
    }
  }

}

export default store
