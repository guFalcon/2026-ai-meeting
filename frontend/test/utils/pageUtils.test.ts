import { singleton as pageUtils } from '../../src/utils/pageUtils'

describe('formatPower', () => {
  it('should format a positive number in watts', () => {
    expect(pageUtils.formatPower(50, false)).toEqual('50 W')
  })

  it('should format a negative number in watts', () => {
    expect(pageUtils.formatPower(-50, false)).toEqual('-50 W')
  })

  it('should format a number smaller than 1 in watts', () => {
    expect(pageUtils.formatPower(0.5, false)).toEqual('0 W')
  })

  it('should format a number smaller than 1 in watts without capping', () => {
    expect(pageUtils.formatPower(0.5, true)).toEqual('1 W')
  })

  it('should format a number larger than 1 kW', () => {
    expect(pageUtils.formatPower(1500, false)).toEqual('1.5 kW')
  })

  it('should format a number larger than 1 MW', () => {
    expect(pageUtils.formatPower(1500000, false)).toEqual('1.5 MW')
  })

  it('should format a number larger than 1 MW with fractions rounding down', () => {
    expect(pageUtils.formatPower(1552000, false)).toEqual('1.55 MW')
  })

  it('should format a number larger than 1 MW with fractions rounding up', () => {
    expect(pageUtils.formatPower(1556000, false)).toEqual('1.56 MW')
  })

  it('should format a number larger than 10 MW without fractions', () => {
    expect(pageUtils.formatPower(15560000, false)).toEqual('16 MW')
  })

  it('should format a number larger than 100 MW without fractions', () => {
    expect(pageUtils.formatPower(155600000, false)).toEqual('156 MW')
  })
})

describe('getRelativeClickCoordsFor()', () => {
  it('should return the relative click coordinates for an event', () => {
    const event = {
      pageX: 100,
      pageY: 200
    }
    const referenceElement = {
      offsetLeft: 50,
      offsetTop: 100,
      offsetParent: {
        offsetLeft: 10,
        offsetTop: 20,
        offsetParent: null
      }
    }
    const scale = 2
    const result = pageUtils.getRelativeClickCoordsFor(event, referenceElement, scale)
    expect(result).toEqual({
      x: 20,
      y: 40
    })
  })
})

describe('formatWithShift', () => {
  it('should format zero with no shift', () => {
    const result = pageUtils.formatWithShift(0, 0)
    expect(result).toEqual({
      value: 0,
      formattedValue: '0',
      unitShiftRelative: 0,
      unitShiftAbsolute: 0
    })
  })

  it('should format a positive number with no shift', () => {
    const result = pageUtils.formatWithShift(1500)
    expect(result).toEqual({
      value: 1500,
      formattedValue: '1,5',
      unitShiftRelative: 3,
      unitShiftAbsolute: 3
    })
  })

  it('should format a negative number with no shift', () => {
    const result = pageUtils.formatWithShift(-1500)
    expect(result).toEqual({
      value: -1500,
      formattedValue: '1,5',
      unitShiftRelative: 3,
      unitShiftAbsolute: 3
    })
  })

  it('should format a positive number with a shift', () => {
    const result = pageUtils.formatWithShift(1500000, 3)
    expect(result).toEqual({
      value: 1500000,
      formattedValue: '1,5',
      unitShiftRelative: 6,
      unitShiftAbsolute: 9
    })
  })

  it('should format a number smaller than 1 with no shift', () => {
    const result = pageUtils.formatWithShift(0.001)
    expect(result).toEqual({
      value: 0.001,
      formattedValue: '1',
      unitShiftRelative: -3,
      unitShiftAbsolute: -3
    })
  })

  it('should format a number smaller than 1 with a shift', () => {
    const result = pageUtils.formatWithShift(0.001, -3)
    expect(result).toEqual({
      value: 0.001,
      formattedValue: '1',
      unitShiftRelative: -3,
      unitShiftAbsolute: -6
    })
  })
})
