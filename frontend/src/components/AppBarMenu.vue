<template>
  <div></div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'
import { Debouncer } from '@/utils/debouncer'

import { Lists } from '@/utils/lists'

export default {
  name: 'AppBarMenu',

  data: () => ({
    Lists,
    serverSendsOfflineNotifications: false,
    debouncer: new Debouncer(500),
    navMenu: false,
    languagesOpen: false,
    languages: null,
    availablePages: [],
    passwordResetMailSent: false
  }),

  watch: {
    navMenu: {
      handler (value) {
        if (!value) {
          this.languagesOpen = false
        }
      },
      deep: true
    }
  },

  computed: {
    twoWayTooltips: {
      get () {
        return this.$store.state.gui.tooltips.tooltips
      },
      set (value) {
        this.$store.dispatch('gui/tooltips/tooltips', value)
      }
    },
    ...mapGetters('gui/tooltips', {
      tooltips: 'tooltips',
      openDelay: 'openDelay'
    })
  },

  methods: {
    // noop
  },

  mounted () {
    // noop
  }
}
</script>
