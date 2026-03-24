<template>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        <v-card
          mx-auto
          max-width="600"
          :class="bgColor() + ' mb-2'"
          align="left"
          elevation="8"
          outlined
        >
          <v-toolbar flat color="secondary lighten-2">
            <v-toolbar-title>
              <div class="title headline font-weight-black">Your App</div>
              <div class="text-subtitle-1 font-weight-medium ml-2">
                {{ $t('test') }}
              </div>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="text-right">
            <div class="text-overline font-italic">version</div>
            <div class="ma-0 pa-0 mt-n2 mb-n2 font-weight-bold ml-2">
              {{ version }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
@import 'index.scss';
</style>

<script lang="js">
import { mapGetters } from 'vuex'
import { singleton as applicationService } from '@/utils/webservices/applicationService'
import { singleton as dateUtils } from '@/utils/dateUtils'
import { singleton as cmsUtils } from '@/utils/cmsUtils'

export default {
  name: 'About',

  data: () => ({
    result: {},
    loading: false,
    cmsUtils
  }),

  computed: {
    ...mapGetters({
      version: 'version'
    }),
    ...mapGetters('rest', {
      axios: 'axios'
    })
  },

  methods: {
    bgColor () {
      return this.$vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-3'
    },
    isoDateOf (d) {
      return dateUtils.getIsoDateOf(d)
    },
    isoTimeOf (d) {
      return dateUtils.getIsoTimeOf(d)
    }
  },

  async mounted () {
    this.loading = true
    applicationService.getVersion().then((response) => {
      this.result = response
      this.loading = false
    })
  }
}
</script>
