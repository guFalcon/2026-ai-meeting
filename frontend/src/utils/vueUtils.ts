import { vuetify } from '@/plugins/vuetify'
import * as colors from 'vuetify/lib/util/colors'

export type RouteType = {
  name: string;
  path: string;
  redirect: string;
  component: any;
}

class VueUtils {
  private static instanceField: VueUtils

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new VueUtils())
    }
    return this.instanceField
  }

  private getBaseAndShadeModifier (colorString: string) {
    const colorParts = colorString.split(' ')
    const base = colorParts[0]
    let shadeModifier = 'base'
    if (colorParts.length > 1) {
      shadeModifier = colorParts[1].replaceAll('-', '')
    }
    return { base, shadeModifier }
  }

  public materialColorFromVuetifyString (colorString) {
    const { base, shadeModifier } = this.getBaseAndShadeModifier(colorString)
    console.log(colors)
    return colors[base][shadeModifier]
  }

  public themeColorFromVuetifyString (colorString, vuetify) {
    const { base, shadeModifier } = this.getBaseAndShadeModifier(colorString)
    const isDark = vuetify.theme.dark
    let theme = vuetify.theme.themes.light
    if (isDark) {
      theme = vuetify.theme.themes.dark
    }
    return theme[base]
  }

  public shiftHexColor (hexColor: string, amount: number): string | null {
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
    if (!hexRegex.test(hexColor)) {
      throw new Error('Invalid hex color format.')
    }

    const normalizedHex = hexColor.length === 4 ? `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}` : hexColor
    const m = normalizedHex.match(/\w\w/g)
    if (m === null) {
      throw new Error('Invalid hex color format.')
    }
    const [r, g, b] = m.map(x => parseInt(x, 16))
    const displacedRgb = [r, g, b].map(c => {
      const displaced = c + amount
      return displaced > 255 ? 255 : displaced < 0 ? 0 : displaced
    })

    return `#${(displacedRgb[0] << 16 | displacedRgb[1] << 8 | displacedRgb[2]).toString(16).padStart(6, '0')}`.toUpperCase()
  }

  public adaptive (array: object[] | number[]) {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']
    const index = breakpoints.indexOf(vuetify.framework.breakpoint.name)
    return array[index >= 0 ? index : 4]
  }

  public getHeadingFieldColor (vuetify) {
    return vuetify.theme.dark ? 'rgba(1, 1, 1, 0.35)' : 'rgba(1, 1, 1, 0.25)'
  }

  public getTextFieldColor (vuetify, darkerAccent = false) {
    if (darkerAccent) {
      return vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-1'
    }
    return vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-2'
  }

  public getRoutes (router) {
    return router.options.routes.map(({ name, path, redirect, component }) => ({
      name,
      path,
      redirect,
      component
    }))
  }

  public select (refs, fieldToSelect, mode) {
    const element = refs[fieldToSelect].$el.querySelector('input')
    switch (mode) {
      case 'all':
        element.select()
        return
      case 'first':
        element.focus()
        element.setSelectionRange(0, 0, 'forward')
        return
    }
    element.focus()
  }

  /**
   * This method gets the correct image (light/dark) for the currently selected theme.
   *
   * @param isDark send this.$vuetify.theme.dark here
   * @param namePreDelimiter the part of the file-name that goes before the black/white part
   * @param namePostDelimiter the part of the file-name that goes after the black/white part
   * @returns the string of the image that matches the theme-mode
   */
  public getThemedImage (isDark: boolean, namePreDelimiter: string, namePostDelimiter: string) {
    return namePreDelimiter + (isDark ? 'white' : 'black') + namePostDelimiter
  }

  /**
   * Groups the give array into groups of the given size (at max).
   *
   * @param array the input array
   * @param groupSize the number of items one group should contain at max
   */
  public toEqualBuckets (array: object[], groupSize: number) {
    const result: object[] = []
    let newGroup: object[] = []
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      newGroup.push(element)
      if ((i + 1) % groupSize === 0) {
        result.push(newGroup)
        newGroup = []
      }
    }
    if (newGroup.length > 0) {
      result.push(newGroup)
    }
    return result
  }

  /**
   * Follows the one-based indexed main-field-name in the translation-keys of the currently selected language until it is
   * not set any longer (example: mainFieldName='title', title1, title2, title3...) and retrieves its values along with
   * the values of any given additional-column-name (optional, string or array of strings; those are just not set if there
   * are not present in the current translation-index)
   *
   * @param i18n the this.$i18n object
   * @param path the base-path to prefix in front of the mainFieldName and additionalFieldNames (without a dot)
   * @param mainFieldName the main field to follow (index is started with 1 and incremented, until it is no longer set)
   * @param additionalFieldNames any additional fields to retrieve
   * @returns an object containing the main-field-content (the name of this field is the mainFieldName you entered) and
   * all of the additional-field-content, if they were present (the name of those filds is the corresponding
   * additionalFieldName)
   */
  public getNumberedTranslationObjectArray (i18n, path, mainFieldName, additionalFieldNames) {
    if (!mainFieldName) {
      return {}
    }
    if (additionalFieldNames && !Array.isArray(additionalFieldNames)) {
      additionalFieldNames = [additionalFieldNames]
    }

    const locale = i18n.locale
    const basePath = i18n.messages[locale]
    const result: object[] = []
    let i = 1
    let main = basePath[`${path}.${mainFieldName}${i}`]
    while (main && main != null) {
      const item = {}
      item[mainFieldName] = main
      if (additionalFieldNames) {
        additionalFieldNames.forEach(element => {
          const value = basePath[`${path}.${element}${i}`]
          if (value) {
            item[element] = value
          }
        })
      }
      result.push(item)
      i++
      main = basePath[`${path}.${mainFieldName}${i}`]
    }
    // console.log(result)
    return result
  }
}

export const singleton = VueUtils.getInstance()
