<template>
  <div id="main">
    <v-app>
      <v-navigation-drawer
        app
        v-model="twoWayDrawerVisible"
        clipped
        color="navDrawer"
        content-class="navDrawer"
        width="208"
        style="z-index: 99999989"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :temporary="!$vuetify.breakpoint.mdAndUp"
      >
        <NavDrawer
          :class="
            'pr-0 pl-0 ' +
            vueUtils.adaptive(['mt-9 ', 'mt-9 ', 'mt-n3', 'mt-n3', 'mt-n3'])
          "
          :mnu="mnu"
        ></NavDrawer>
      </v-navigation-drawer>
      <HeaderElement></HeaderElement>
      <v-main>
        <ModalLoading></ModalLoading>
        <ModalProgress></ModalProgress>
        <!-- The key=fullPath lets the router recognize if a query-param changed and so lets it reload the page in that case. -->
        <router-view class="pt-8" :key="$route.fullPath"
          >Loading...</router-view
        >
      </v-main>
    </v-app>
    <input type="hidden" id="hiddenCopyField" />
  </div>
</template>

<script lang="js">
import { Debouncer } from '@/utils/debouncer'
import { singleton as vueUtils } from '@/utils/vueUtils'
import NavDrawer from '@/components/NavDrawer.vue'
import ModalLoading from '@/components/ModalLoading.vue'
import ModalProgress from '@/components/ModalProgress.vue'
import HeaderElement from '@/components/HeaderElement.vue'

export default {
  name: 'App',

  components: {
    NavDrawer,
    ModalLoading,
    ModalProgress,
    HeaderElement
  },

  data: () => ({
    locale: null,
    interval: null,
    vueUtils,
    visibleMenuItems: [],
    numberOfVisibleSubMenues: 0,
    windowSize: {
      x: 0,
      y: 0
    },
    background: null,
    debouncer: new Debouncer()
  }),

  computed: {
    twoWayDrawerVisible: {
      get () {
        return this.$store.state.gui.drawerVisible
      },
      set (value) {
        this.$store.dispatch('gui/drawerVisible', { value, time: 0 })
      }
    }
  },

  watch: {
    '$i18n.locale': {
      handler: function () {
        console.log('locale change triggered', this.$i18n.locale)
        const oldValue = this.locale
        this.locale = this.$i18n.locale

        if (oldValue === null) {
          return
        }

        console.log('locale changed ... reloading to reload GoogleCharts')
        this.$nextTick(() => {
          window.location.reload()
        })
      },
      deep: true
    }
  },

  methods: {
    init () {
      // noop
    }
  },

  mounted () {
    this.init()

    const mnu = [
      {
        icon: 'notifications_active',
        key: 'maindrawer.name',
        pathStart: 'main',
        expanded: false,
        test: true,
        subs: [
          {
            name: 'main',
            link: '/main/main',
            icon: 'home',
            key: 'pageTitle.main',
            test: true
          }
        ]
      }
    ]
  },

  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="scss">
@import 'styles/index.scss';
// Fix for vuetify displaying the vertical scrollbar on the right side of the page despite not needing to.
html {
  overflow-y: auto;
}

.v-app {
  min-height: 100vh;
  max-height: 100vh;
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.navDrawer {
  width: 208px;
}

.nav-drawer-white {
  color: white;
}
</style>
