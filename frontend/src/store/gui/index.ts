import tooltips from './toolTips'
import { singleton as jsUtils } from '@/utils/jsUtils'

const store = {

  namespaced: true,

  modules: {
    tooltips
  },

  state: () => ({
    modalLoading: false,
    modalProgress: -1,
    drawerVisible: false,
    lastMdAndUp: true,

    compareName: '',
    compareFunctionSets: [],
    compareSetId: null,
    compareIndexSelected: null,
    compareSubscriptionIds: [],
    compareIdsHidden: [],
    lastActiveTab: null
  }),

  mutations: {
    modalLoading (state, value) {
      state.modalLoading = value
    },
    modalProgress (state, value) {
      state.modalProgress = value
    },
    drawerVisible (state, value) {
      state.drawerVisible = value
    },
    toggleDrawerVisible (state) {
      state.drawerVisible = !state.drawerVisible
    },
    lastMdAndUp (state, value) {
      state.lastMdAndUp = value
    },

    compareSubscriptionIds (state, value) {
      state.compareSubscriptionIds = value
    },
    addCompareSubscriptionId (state, value) {
      jsUtils.addItem(value, state.compareSubscriptionIds)
    },
    removeCompareSubscriptionId (state, value) {
      jsUtils.removeItem(value, state.compareSubscriptionIds)
      if (jsUtils.containsItem(value, state.compareSubscriptionIds)) {
        jsUtils.removeItem(value, state.compareIdsHidden)
      }
    },
    toggleCompareSubscriptionId (state, value) {
      jsUtils.toggleItem(value, state.compareSubscriptionIds)
      if (jsUtils.containsItem(value, state.compareSubscriptionIds)) {
        jsUtils.removeItem(value, state.compareIdsHidden)
      }
    },
    addCompareIdHidden (state, value) {
      jsUtils.addItem(value, state.compareIdsHidden)
    },
    removeCompareIdHidden (state, value) {
      jsUtils.removeItem(value, state.compareIdsHidden)
    },
    toggleCompareIdHidden (state, value) {
      jsUtils.toggleItem(value, state.compareIdsHidden)
    },
    compareIdsHidden (state, value) {
      state.compareIdsHidden = value
    },
    compareName (state, value) {
      state.compareName = value
    },
    compareFunctionSets (state, value) {
      state.compareFunctionSets = value
    },
    compareSetId (state, value) {
      state.compareSetId = value
    },
    compareIndexSelected (state, value) {
      state.compareIndexSelected = value
    },
    lastActiveTab (state, value) {
      state.lastActiveTab = value
    }
  },

  actions: {
    modalLoading (context, value) {
      context.commit('modalLoading', value)
      return Promise.resolve()
    },
    modalProgress (context, value) {
      context.commit('modalProgress', value)
      return Promise.resolve()
    },
    drawerVisible (context, { value, time }) {
      setTimeout(() => {
        context.commit('drawerVisible', value)
      }, time)
      return Promise.resolve()
    },
    toggleDrawerVisible (context) {
      context.commit('toggleDrawerVisible')
      return Promise.resolve()
    },
    lastMdAndUp (context, value) {
      context.commit('lastMdAndUp', value)
      return Promise.resolve()
    },

    compareSubscriptionIds (context, value) {
      context.commit('compareSubscriptionIds', value)
      return Promise.resolve()
    },
    addCompareSubscriptionId (context, value) {
      context.commit('addCompareSubscriptionId', value)
      return Promise.resolve()
    },
    removeCompareSubscriptionId (context, value) {
      context.commit('removeCompareSubscriptionId', value)
      return Promise.resolve()
    },
    toggleCompareSubscriptionId (context, value) {
      context.commit('toggleCompareSubscriptionId', value)
      return Promise.resolve()
    },
    compareIdsHidden (context, value) {
      context.commit('compareIdsHidden', value)
      return Promise.resolve()
    },
    addCompareIdHidden (context, value) {
      context.commit('addCompareIdHidden', value)
      return Promise.resolve()
    },
    removeCompareIdHidden (context, value) {
      context.commit('removeCompareIdHidden', value)
      return Promise.resolve()
    },
    toggleCompareIdHidden (context, value) {
      context.commit('toggleCompareIdHidden', value)
      return Promise.resolve()
    },
    compareName (context, value) {
      context.commit('compareName', value)
      return Promise.resolve()
    },
    compareFunctionSets (context, value) {
      context.commit('compareFunctionSets', value)
      return Promise.resolve()
    },
    compareSetId (context, value) {
      context.commit('compareSetId', value)
      return Promise.resolve()
    },
    compareIndexSelected (context, value) {
      context.commit('compareIndexSelected', value)
      return Promise.resolve()
    },
    lastActiveTab (context, value) {
      context.commit('lastActiveTab', value)
      return Promise.resolve()
    }
  },

  getters: {
    modalLoading: state => {
      return state.modalLoading
    },
    modalProgress: state => {
      return state.modalProgress
    },
    drawerVisible: state => {
      return state.drawerVisible
    },
    lastMdAndUp: state => {
      return state.lastMdAndUp
    },

    compareSubscriptionIds: state => {
      return state.compareSubscriptionIds
    },
    compareIdsHidden: state => {
      return state.compareIdsHidden
    },
    compareName: state => {
      return state.compareName
    },
    compareFunctionSets: state => {
      return state.compareFunctionSets
    },
    compareSetId: state => {
      return state.compareSetId
    },
    compareIndexSelected: state => {
      return state.compareIndexSelected
    },
    lastActiveTab: state => {
      return state.lastActiveTab
    }
  }

}

export default store
