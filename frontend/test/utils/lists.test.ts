import { Lists } from '../../src/utils/lists'

describe('getUnitShiftToBase', () => {
  it('should return 0 for null prefix', () => {
    const result = Lists.getUnitShiftToBase(null)
    expect(result).toBe(0)
  })

  it('should return 0 for undefined prefix', () => {
    const result = Lists.getUnitShiftToBase(undefined)
    expect(result).toBe(0)
  })

  it('should return 0 for empty prefix', () => {
    const result = Lists.getUnitShiftToBase('')
    expect(result).toBe(0)
  })

  it('should return 0 for NONE prefix', () => {
    const result = Lists.getUnitShiftToBase('NONE')
    expect(result).toBe(0)
  })

  it('should return -3 for MILLI prefix', () => {
    const result = Lists.getUnitShiftToBase('MILLI')
    expect(result).toBe(-3)
  })

  it('should return 3 for KILO prefix', () => {
    const result = Lists.getUnitShiftToBase('KILO')
    expect(result).toBe(3)
  })

  it('should return 6 for MEGA prefix', () => {
    const result = Lists.getUnitShiftToBase('MEGA')
    expect(result).toBe(6)
  })

  it('should return 0 for invalid prefix', () => {
    const result = Lists.getUnitShiftToBase('INVALID')
    expect(result).toBe(0)
  })
})

describe('applyUnitShift', () => {
  it('should apply the correct unit shift', () => {
    const value = 1000000
    const unitShift = -6
    const result = Lists.applyUnitShift(unitShift, value)
    expect(result).toEqual(1)
  })

  it('should return the original list when unit shift is 0', () => {
    const value = 100
    const unitShift = 0
    const result = Lists.applyUnitShift(unitShift, value)
    expect(result).toEqual(100)
  })
})
