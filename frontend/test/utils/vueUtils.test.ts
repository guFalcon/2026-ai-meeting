import { singleton as vueUtils } from '../../src/utils/vueUtils'

describe('toEqualBuckets()', () => {
  it('should group an array of objects in groups of a specified size', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Alice' },
      { id: 5, name: 'Gerald' }
    ]
    const size = 2
    const result = vueUtils.toEqualBuckets(array, size)
    expect(result).toEqual([
      [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ],
      [
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'Alice' }
      ],
      [
        { id: 5, name: 'Gerald' }
      ]
    ])
  })
})

describe('VueUtils.getNumberedTranslationObjectArray()', () => {
  it('should return an array of numbered translation objects', () => {
    const i18n = {
      locale: 'en',
      messages: {
        en: {
          'path.title1': 'Title 1',
          'path.title2': 'Title 2',
          'path.title3': 'Title 3',
          'path.description1': 'Description 1',
          'path.description2': 'Description 2'
        }
      }
    }
    const path = 'path'
    const mainFieldName = 'title'
    const additionalFieldNames = ['description']
    const result = vueUtils.getNumberedTranslationObjectArray(i18n, path, mainFieldName, additionalFieldNames)
    expect(result).toEqual([
      { title: 'Title 1', description: 'Description 1' },
      { title: 'Title 2', description: 'Description 2' },
      { title: 'Title 3' }
    ])
  })
})

describe('shiftHexColor', () => {
  it('should shift a hex color by a positive amount', () => {
    const hexColor = '#FF0000'
    const amount = 50
    const expected = '#FF3232'
    const result = vueUtils.shiftHexColor(hexColor, amount)
    expect(result).toEqual(expected)
  })

  it('should shift a hex color by a negative amount', () => {
    const hexColor = '#FF0000'
    const amount = -50
    const expected = '#CD0000'
    const result = vueUtils.shiftHexColor(hexColor, amount)
    expect(result).toEqual(expected)
  })

  it('should clamp the RGB components to 0-255', () => {
    const hexColor = '#FFFFFF'
    const amount = 500
    const expected = '#FFFFFF'
    const result = vueUtils.shiftHexColor(hexColor, amount)
    expect(result).toEqual(expected)
  })

  it('should throw an error for an invalid hex color format', () => {
    const hexColor = '#FF000'
    const amount = 50
    expect(() => vueUtils.shiftHexColor(hexColor, amount)).toThrow('Invalid hex color format.')
  })

  it('should throw an error for a null hex color', () => {
    const hexColor = null
    const amount = 50
    expect(() => vueUtils.shiftHexColor(hexColor, amount)).toThrow('Invalid hex color format.')
  })

  it('should throw an error for a non-string hex color', () => {
    const hexColor = 123
    const amount = 50
    expect(() => vueUtils.shiftHexColor(hexColor, amount)).toThrow('Invalid hex color format.')
  })
})
