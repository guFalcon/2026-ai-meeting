<template>
  <div class="text-center ma-0">
    <v-row justify="center">
      <v-dialog v-model="showModalProgress" persistent width="400px">
        <v-card primary>
          <v-card-title class="align-center justify-center">{{
            $t('progress.title')
          }}</v-card-title>
          <v-card-text>
            <v-progress-linear
              class="mt-1"
              color="secondary"
              v-model="progress"
              height="25"
            >
              <strong>{{ Math.ceil(progress) }}%</strong>
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="js">

export default {
  name: 'ModalProgress',

  computed: {
    // Progress is a float-value between 0 and 1.
    progress () {
      return this.$store.getters['gui/modalProgress'] * 100
    },
    showModalProgress () {
      return this.$store.getters['gui/modalProgress'] >= 0
    }
  }
}
</script>
