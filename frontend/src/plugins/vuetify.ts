import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'

Vue.use(Vuetify)

export const themes = [
  {
    name: 'Default',
    light: {
      primary: '#1976D2',
      secondary: '#45A8C7',
      accent: '#FFE18D',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#1976D2',
      navDrawer: '#FFFBE6',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#135DA7',
      secondary: '#2194A0',
      accent: '#B59F63',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#135DA7',
      navDrawer: '#d4cdae',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'Gerald',
    light: {
      primary: '#7519d2',
      secondary: '#45A8C7',
      accent: '#FFE18D',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#1976D2',
      navDrawer: '#FFFBE6',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#7519d2',
      secondary: '#2194A0',
      accent: '#B59F63',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#135DA7',
      navDrawer: '#d4cdae',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'ÖBB',
    light: {
      primary: '#ff0000',
      secondary: '#ff6954',
      accent: '#BABDBF',
      success: colors.green,
      info: '#ffc107',
      warning: colors.yellow,
      error: colors.red,

      anchor: '#ff0000',
      navDrawer: '#E6E6E6',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#d40000',
      secondary: '#d65847',
      accent: '#787575',
      success: '#4caf50',
      info: '#ffc107',
      warning: '#ff9800',
      error: '#ff5722',

      anchor: '#d40000',
      navDrawer: '#9c9898',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'BWHT',
    light: {
      primary: '#1976D2',
      secondary: '#45A8C7',
      accent: '#FFE18D',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#1976D2',
      navDrawer: '#FFFBE6',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#135DA7',
      secondary: '#2194A0',
      accent: '#B59F63',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#135DA7',
      navDrawer: '#d4cdae',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'Lidl',
    light: {
      primary: '#0050AA',
      secondary: '#3C86CA',
      accent: '#FFE26A',
      success: '#4CAF50',
      info: '#21BDF3',
      warning: '#ED8400',
      error: '#F03131',

      anchor: '#47C1F6',
      navDrawer: '#FFFBC8',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#0050AA',
      secondary: '#306CA3',
      accent: '#BAA449',
      success: '#3D8D40',
      info: '#1A94BE',
      warning: '#AC2121',
      error: '#FF5252',

      anchor: '#4E9EC1',
      navDrawer: '#C3C09C',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'Enns',
    light: {
      primary: '#C03930',
      secondary: '#CD564E',
      accent: '#d8c0c0',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#cf1169',
      navDrawer: '#FEEEEC',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#C03930',
      secondary: '#CD564E',
      accent: '#7C5858',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#fc3290',
      navDrawer: '#AA7E77',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'Welser Heimstätte',
    light: {
      primary: '#278062',
      secondary: '#3fb4ce',
      accent: '#a3d8aa',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#274580',
      navDrawer: '#f2fcfa',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#278062',
      secondary: '#3299b1',
      accent: '#136123',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#5d9fd7',
      navDrawer: '#278062',
      admin: '#9f4fa7',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'ILL',
    light: {
      primary: '#a7b7a7',
      secondary: '#40BAD2',
      accent: '#339966',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#003399',
      navDrawer: '#f2fcfa',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#a7a7a7',
      secondary: '#2e8c9e',
      accent: '#246e49',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#0244c7',
      navDrawer: '#777777',
      admin: '#9f4fa7',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'RTBF',
    light: {
      primary: '#21517a',
      secondary: '#c9c53a',
      accent: '#478cc9',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#1976D2',
      navDrawer: '#c1def7',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#21517a',
      secondary: '#8f8b17',
      accent: '#478cc9',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#135DA7',
      navDrawer: '#5d6c78',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  },
  {
    name: 'Lawog',
    light: {
      primary: '#3b3b3c',
      secondary: '#C03930',
      accent: '#CD564E',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#cf1169',
      navDrawer: '#FEEEEC',
      admin: '#eab5ff',
      adminBackground: '#f9ebff'
    },
    dark: {
      primary: '#C03930',
      secondary: '#CD564E',
      accent: '#7C5858',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',

      anchor: '#fc3290',
      navDrawer: '#AA7E77',
      admin: '#7e14a8',
      adminBackground: '#39084d'
    }
  }
]

export const vuetify = new Vuetify({
  preset,
  icons: {
    iconfont: 'md'
  },
  rtl: false,
  theme: {
    dark: false,
    themes: {
    }
  }
})

export function setTheme (theme, vuetify) {
  console.log('setTheme()')
  const name = theme.name
  const dark = theme.dark
  const light = theme.light
  // Set themes.
  Object.keys(dark).forEach(i => {
    vuetify.theme.themes.dark[i] = dark[i]
  })
  Object.keys(light).forEach(i => {
    vuetify.theme.themes.light[i] = light[i]
  })
  // Save theme name as well.
  vuetify.theme.themes.name = name
}
