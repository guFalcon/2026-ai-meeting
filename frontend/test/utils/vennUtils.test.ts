import { singleton as vennUtils } from '../../src/utils/vennUtils'

describe('VennUtils', () => {
  it('should return a set from an array', () => {
    const array = [1, 2, 3]
    const result = vennUtils.asSet(array)
    expect(result).toEqual(new Set([1, 2, 3]))
  })

  it('should return the distinct elements in A that are not in B', () => {
    const aArray = [1, 2, 3]
    const bArray = [2, 3, 4]
    const result = vennUtils.distinctInA(aArray, bArray)
    expect(result).toEqual(new Set([1]))
  })

  it('should return the distinct elements in B that are not in A', () => {
    const aArray = [1, 2, 3]
    const bArray = [2, 3, 4]
    const result = vennUtils.distinctInB(aArray, bArray)
    expect(result).toEqual(new Set([4]))
  })

  it('should return the distinct elements in A and B', () => {
    const aArray = [1, 2, 3]
    const bArray = [2, 3, 4]
    const result = vennUtils.distinctSet(aArray, bArray)
    expect(result).toEqual(new Set([1, 4]))
  })

  it('should return the intersection of A and B', () => {
    const aArray = [1, 2, 3]
    const bArray = [2, 3, 4]
    const result = vennUtils.intersectionSet(aArray, bArray)
    expect(result).toEqual(new Set([2, 3]))
  })
})
