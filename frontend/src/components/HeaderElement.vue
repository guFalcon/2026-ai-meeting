<template>
  <div>
    <v-app-bar
      app
      clipped-left
      short
      dense
      color="primary"
      elevation="0"
      z-index="99999990"
    >
      <v-app-bar-nav-icon @click="toggleDrawerVisible" class="hidden-md-and-up">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-img
        v-if="customLogo && $vuetify.breakpoint.smAndUp"
        min-width="250px"
        max-width="250px"
        height="46px"
        contain
        alt="logo"
        :src="customLogo"
      ></v-img>
      <v-img
        v-if="customLogo === null && $vuetify.breakpoint.smAndUp"
        min-width="250px"
        max-width="250px"
        height="46px"
        alt="CMS"
        contain
        :src="require(`@/assets/logo-small-white.png`)"
      ></v-img>
      <v-spacer></v-spacer>
      <h3
        :class="
          'nav-drawer-white text-button ' +
          ($vuetify.breakpoint.smAndDown ? 'small' : '')
        "
      >
        {{ $route.name !== null ? $t('pageTitle.' + $route.name) : '' }}
      </h3>
      <v-spacer></v-spacer>
      <div
        v-if="preferencesUtils.moduleVisible('events')"
        @click="goto('/events/events')"
        class="ma-0 pa-0 pr-4"
      >
        <TrafficLights></TrafficLights>
      </div>
      <AppBarMenu></AppBarMenu>
    </v-app-bar>
  </div>
</template>

<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import AppBarMenu from '@/components/AppBarMenu.vue'

export default {
  name: 'HeaderElement',

  components: {
    AppBarMenu
  },

  data: () => ({
    customLogo: undefined
  }),

  computed: {
    ...mapGetters('gui/tooltips', {
      tooltips: 'tooltips',
      openDelay: 'openDelay'
    })
  },

  methods: {
    goto (destination) {
      if (this.$router.currentRoute.path !== destination) {
        this.$router.push(destination)
      }
    },
    async getLogo () {
      // console.log('Fetching logo...')
      const b = this.$store.getters['preferences/logoFileId']
      if (!b) {
        console.log('No custom logo set in preferences.')
        this.customLogo = null
      }
    },
    ...mapActions('gui', {
      toggleDrawerVisible: 'toggleDrawerVisible'
    })
  },

  mounted () {
    this.getLogo()
  }
}
</script>

<style lang="scss" scoped>
.small {
  font-size: 10px !important;
}

// Fix for vuetify z-index issue in app-bar.
.v-sheet {
  z-index: 99999990;
}
</style>
