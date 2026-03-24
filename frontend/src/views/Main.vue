<template>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        {{ $t('test') }}
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
@import 'index.scss';
</style>

<script lang="js">

export default {
  name: 'Main',

  data: () => ({
    result: {},
    loading: false
  }),

  methods: {
    bgColor () {
      return this.$vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-3'
    }
  },

  async mounted () {
    console.log('Main component mounted.')
  }
}
</script>
