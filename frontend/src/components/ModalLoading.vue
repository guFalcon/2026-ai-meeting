<template>
  <div class="text-center ma-0" style="z-index: 99999980">
    <v-row justify="center">
      <v-dialog v-model="modalLoadingVisible" width="150px" persistent>
        <v-card primary align="center" height="150px">
          <v-card-title>{{ $t('loading') }}</v-card-title>
          <v-card-text>
            <v-progress-circular
              class="mt-4"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'

export default {
  name: 'ModalLoading',

  computed: {
    ...mapGetters('gui', {
      modalLoadingVisible: 'modalLoading'
    })
  }
}
</script>

<style lang="scss" scoped></style>
