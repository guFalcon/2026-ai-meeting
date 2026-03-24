
import { singleton as jsUtils } from '@/utils/jsUtils'
import { singleton as vueUtils } from '@/utils/vueUtils'
import { Lists } from '@/utils/lists'

interface NumberWithFormat {
  value: number;
  formattedValue: string;
  unitShiftRelative: number;
  unitShiftAbsolute: number;
}
class PageUtils {
  private static instanceField: PageUtils

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new PageUtils())
    }
    return this.instanceField
  }

  public resolveComparison (value, operator, comparison) {
    // console.log({ value }, { operator }, { comparison })
    switch (operator) {
      case '=':
      case '==':
      case '===':
        return value === comparison
      case '!=':
      case '!==':
      case '!===':
        return value !== comparison
      case '<':
        return value < comparison
      case '>':
        return value > comparison
      case '<=':
        return value <= comparison
      case '>=':
        return value >= comparison
      default:
        return false
    }
  }

  getRelativeClickCoordsFor (event, referenceElement, scale = 1) {
    let position = { x: 0, y: 0 }
    if (event.type === 'touchstart' || event.type === 'touchmove' || event.type === 'touchend' || event.type === 'touchcancel') {
      const touch = event.touches[0] || event.changedTouches[0]
      position = {
        x: touch.pageX,
        y: touch.pageY
      }
    } else {
      position = {
        x: event.pageX,
        y: event.pageY
      }
    }
    const offset = {
      left: referenceElement.offsetLeft,
      top: referenceElement.offsetTop
    }
    let reference = referenceElement.offsetParent
    while (reference) {
      offset.left += reference.offsetLeft
      offset.top += reference.offsetTop
      reference = reference.offsetParent
    }
    return {
      x: ((position.x - offset.left) / scale),
      y: ((position.y - offset.top) / scale)
    }
  }

  async getState (on, onValue, disabled, disabledValue) {
    let state = 'off'
    if (jsUtils.isSet(on?.operator) && jsUtils.isSet(on?.comparison)) {
      state = this.resolveComparison(onValue, on.operator, on.comparison) ? 'on' : 'off'
    }
    if (jsUtils.isSet(disabled?.operator) && jsUtils.isSet(disabled?.comparison)) {
      if (this.resolveComparison(disabledValue, disabled.operator, disabled.comparison)) {
        state = 'disabled'
      }
    }
    return state
  }

  public formatWithShift (value: number, originalShift = 0, maxFractionalDigits = 2): NumberWithFormat {
    if (value < 0) {
      return this.internalFormatWithShift(true, -value, originalShift, maxFractionalDigits)
    }
    return this.internalFormatWithShift(false, value, originalShift, maxFractionalDigits)
  }

  private internalFormatWithShift (isNegative: boolean, value: number, originalShift = 0, maxFractionalDigits = 2): NumberWithFormat {
    let val = value
    if (originalShift !== 0) {
      val = Lists.applyUnitShift(originalShift, value)
    }
    let power = 0
    if (val !== 0) {
      while (val >= 1000) {
        val /= 1000
        power = power + 3
      }
      while (val < 1) {
        val *= 1000
        power = power - 3
      }
    }

    let formattedValue = val % 1 === 0 || val.toFixed(0).length > 1 ? val.toFixed(0) : val.toFixed(maxFractionalDigits).replace(/\.?0+$/, '')
    formattedValue = formattedValue.replace(/\./, ',') // replace decimal point with comma, for display purposes
    return {
      value: isNegative ? -value : value,
      formattedValue: formattedValue,
      unitShiftRelative: power - originalShift,
      unitShiftAbsolute: power
    }
  }

  public formatPower (value: number, cap: boolean): string {
    if (value < 0) {
      return '-' + this.formatPower(-value, cap)
    }

    if (value < 1) {
      return cap ? '1 W' : '0 W'
    }

    const units = ['W', 'kW', 'MW', 'GW', 'TW']
    let power = 0
    while (value >= 1000 && power < units.length - 1) {
      value /= 1000
      power++
    }

    const formattedValue = value % 1 === 0 || value.toFixed(0).length > 1 ? value.toFixed(0) : value.toFixed(2).replace(/\.?0+$/, '')
    return `${formattedValue} ${units[power]}`
  }

  public formatNumber (val: number, cap: boolean) {
    let value = val
    if (val < 0) {
      value *= -1
    }

    if (value < 1) {
      return {
        value: cap ? '1' : '0',
        unit: ''
      }
    }

    const units = ['', 'k', 'M', 'G', 'T']
    let power = 0
    while (value >= 1000 && power < units.length - 1) {
      value /= 1000
      power++
    }

    const formattedValue = value % 1 === 0 || value.toFixed(0).length > 1 ? value.toFixed(0) : value.toFixed(2).replace(/\.?0+$/, '')
    return {
      value: val < 0 ? '-' + formattedValue : formattedValue,
      unit: units[power]
    }
  }

  public getColorIndex (name) {
    return ['ongreen', 'offgreen', 'onyellow', 'offyellow', 'onred', 'offred', 'on', 'off', 'error', 'disabled', 'transparent', 'link'].indexOf(name)
  }

  getAlarmColor (greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable, isSolid = false) {
    if (redAlarms.length > 0) {
      return 'red'
    }
    if (yellowAlarms.length > 0) {
      return '#FF8C00'
    }
    if (greenAlarms.length > 0) {
      return 'green'
    }
    if (clickable) {
      return borderColors[colorIndex]
    }
    return isSolid ? 'grey' : 'transparent'
  }

  getAlarmBorder (greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable, overrideBorderWidth) {
    const a = vueUtils.adaptive([3, 4, 5, 5, 6])
    if (redAlarms.length > 0) {
      return a + 'px dotted ' + this.getAlarmColor(greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable)
    }
    if (yellowAlarms.length > 0) {
      return a + 'px dotted ' + this.getAlarmColor(greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable)
    }
    if (greenAlarms.length > 0) {
      return a + 'px dotted ' + this.getAlarmColor(greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable)
    }
    if (clickable) {
      return (overrideBorderWidth !== undefined ? overrideBorderWidth : a) + 'px solid ' + this.getAlarmColor(greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable)
    }
    return '0px solid ' + this.getAlarmColor(greenAlarms, yellowAlarms, redAlarms, borderColors, colorIndex, clickable)
  }
}

export const singleton = PageUtils.getInstance()
