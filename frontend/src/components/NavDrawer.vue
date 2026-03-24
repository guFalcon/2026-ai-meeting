<template>
  <v-container>
    <div v-for="(item, i) in mnu" :key="i">
      <v-list
        nav
        style="cursor: pointer !important"
        dense
        class="ml-n2 mb-n3"
        v-if="!item.role || keycloakClientRoles.includes(item.role)"
      >
        <v-list-item
          v-if="
            item.link === 'SPACER' && jsUtils.callIfFuncOrReturnValue(item.test)
          "
          dense
          class="ma-0 pa-0"
        ></v-list-item>
        <div
          v-if="
            item.link !== 'SPACER' && jsUtils.callIfFuncOrReturnValue(item.test)
          "
        >
          <v-tooltip top :open-delay="openDelay" :disabled="!tooltips">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                :class="`rounded-tr-lg rounded-tl-0 rounded-b-0 my0 py-0 elevation-0 ${
                  item.color || 'accent'
                } pt-1`"
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-content
                  class="ma-0 pa-0"
                  @click="setVisible(item.pathStart)"
                >
                  <v-list-item-title class="title">
                    <v-icon :class="'ma-0 mr-1 mt-n1'" :size="22">{{
                      item.icon
                    }}</v-icon>
                    <span :style="`font-size: 13px`">
                      {{ $t(item.key) }}
                    </span>
                    <div style="float: right" class="ma-0 pa-0">
                      <v-icon v-if="!item.expanded">expand_more</v-icon>
                      <v-icon v-else>expand_less</v-icon>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <div v-html="$t('tooltip.' + item.key)"></div>
          </v-tooltip>
        </div>

        <v-card
          elevation="0"
          color="grey lighten-3"
          class="rounded-t-0 rounded-br-xl mt-n1"
        >
          <div v-for="(subItem, j) in item.subs" :key="j">
            <v-list-item
              v-if="
                subItem.link === 'SPACER' &&
                jsUtils.callIfFuncOrReturnValue(subItem.tes)
              "
              dense
              class="ma-0 pa-0"
            ></v-list-item>
            <div
              v-if="
                (!subItem.role || keycloakClientRoles.includes(subItem.role)) &&
                item.expanded &&
                jsUtils.callIfFuncOrReturnValue(subItem.test)
              "
            >
              <v-tooltip
                v-if="
                  subItem.link !== 'SPACER' &&
                  jsUtils.callIfFuncOrReturnValue(subItem.test)
                "
                top
                :open-delay="openDelay"
                :disabled="!tooltips"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item
                    :to="subItem.link"
                    @click="setDrawerVisible({ val: false, time: 0 })"
                    dense
                    v-bind="attrs"
                    v-on="on"
                    :class="{
                      'rounded-br-xl': j === item.subs.length - 1,
                      'last-item': j === item.subs.length - 1
                    }"
                  >
                    <v-list-item-content>
                      <v-list-item-title style="font-size: 12px" class="ml-3">
                        {{ $t(subItem.key) }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon class="mr-n1">
                      <v-icon size="17" left v-bind="attrs" v-on="on">{{
                        subItem.icon
                      }}</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </template>
                <div v-html="$t('tooltip.' + subItem.key)"></div>
              </v-tooltip>
            </div>
          </div>
        </v-card>
      </v-list>
    </div>
  </v-container>
</template>

<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import { singleton as vueUtils } from '@/utils/vueUtils'
import { singleton as jsUtils } from '@/utils/jsUtils'

export default {
  name: 'NavDrawer',

  props: {
    mnu: {
      default: []
    }
  },

  components: {
  },

  data: () => ({
    vueUtils,
    jsUtils
  }),

  computed: {
    ...mapGetters('gui/tooltips', {
      tooltips: 'tooltips',
      openDelay: 'openDelay'
    }),
    ...mapGetters('keycloak', {
      keycloakClientRoles: 'clientRoles'
    })
  },

  methods: {
    async setVisible (pathStart) {
      for (const mainItem of this.mnu) {
        if (mainItem.pathStart === pathStart) {
          mainItem.expanded = !mainItem.expanded
          for (const subItem of mainItem.subs) {
            if (subItem.link.startsWith(`/${pathStart}/`)) {
              subItem.visible = !(subItem.visible || false)
            } else {
              subItem.visible = false
            }
          }
        } else {
          mainItem.expanded = false
        }
      }
    },
    ...mapActions('gui', {
      setDrawerVisible: 'drawerVisible'
    })
  },

  mounted () {
    let p = window.location.pathname
    p = p.substring(1, p.indexOf('/', 1))
    this.setVisible(p)
  }
}
</script>

<style scoped>
.last-item::before {
  border-bottom-right-radius: 18px;
}
</style>
