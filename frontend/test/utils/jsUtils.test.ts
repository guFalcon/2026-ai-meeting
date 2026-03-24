import { singleton as jsUtils } from '../../src/utils/jsUtils'

describe('replaceVariables', () => {
  it('should replace variables in a string', async () => {
    const text = 'Hello, $' + '{name}! You are $' + '{age} years old.'
    const expected = 'Hello, John! You are 30 years old.'
    const replacerFunction = (match, p1) => {
      switch (p1) {
        case 'name':
          return 'John'
        case 'age':
          return 30
        default:
          return ''
      }
    }
    const result = await jsUtils.replaceVariables(text, replacerFunction)
    expect(result).toEqual(expected)
  })

  it('should handle multiple variables in a string', async () => {
    const text = 'The $' + '{animal} jumped over the $' + '{color} $' + '{object}.'
    const expected = 'The quick brown fox jumped over the lazy dog.'
    const replacerFunction = (match, p1) => {
      switch (p1) {
        case 'animal':
          return 'quick brown fox'
        case 'color':
          return 'lazy'
        case 'object':
          return 'dog'
        default:
          return ''
      }
    }
    const result = await jsUtils.replaceVariables(text, replacerFunction)
    expect(result).toEqual(expected)
  })

  it('should handle missing variables in a string', async () => {
    const text = 'Hello, $' + '{name}! You are $' + '{age} years old.'
    const expected = 'Hello, ! You are  years old.'
    const replacerFunction = (match, p1) => {
      switch (p1) {
        case 'name':
          return ''
        case 'age':
          return ''
        default:
          return ''
      }
    }
    const result = await jsUtils.replaceVariables(text, replacerFunction)
    expect(result).toEqual(expected)
  })

  it('should handle empty string input', async () => {
    const text = ''
    const expected = ''
    const replacerFunction = () => {
      return ''
    }
    const result = await jsUtils.replaceVariables(text, replacerFunction)
    expect(result).toEqual(expected)
  })
})

describe('extractVariables', () => {
  it('should extract variables from a string', async () => {
    const text = 'Hello, $' + '{name}! You are $' + '{age} years old.'
    const expected = ['name', 'age']
    const result = await jsUtils.extractVariables(text)
    expect(result).toEqual(expected)
  })

  it('should handle multiple variables in a string', async () => {
    const text = 'The $' + '{animal} jumped over the $' + '{color} $' + '{object}.'
    const expected = ['animal', 'color', 'object']
    const result = await jsUtils.extractVariables(text)
    expect(result).toEqual(expected)
  })

  it('should handle missing variables in a string', async () => {
    const text = 'Hello, world!'
    const expected = []
    const result = await jsUtils.extractVariables(text)
    expect(result).toEqual(expected)
  })

  it('should handle empty string input', async () => {
    const text = ''
    const expected = []
    const result = await jsUtils.extractVariables(text)
    expect(result).toEqual(expected)
  })
})

describe('toggleItem()', () => {
  it('should add an item to an array if it is not present', () => {
    const item = 'foo'
    const array = ['bar']
    jsUtils.toggleItem(item, array)
    expect(array).toEqual(['bar', 'foo'])
  })

  it('should remove an item from an array if it is present', () => {
    const item = 'foo'
    const array = ['foo', 'bar']
    jsUtils.toggleItem(item, array)
    expect(array).toEqual(['bar'])
  })
})

describe('addItem()', () => {
  it('should add an item to an array if it is not present', () => {
    const item = 'foo'
    const array = ['bar']
    jsUtils.addItem(item, array)
    expect(array).toEqual(['bar', 'foo'])
  })

  it('should not add an item to an array if it is already present', () => {
    const item = 'foo'
    const array = ['foo', 'bar']
    jsUtils.addItem(item, array)
    expect(array).toEqual(['foo', 'bar'])
  })
})

describe('removeItem()', () => {
  it('should remove an item from an array if it is present', () => {
    const item = 'foo'
    const array = ['foo', 'bar']
    jsUtils.removeItem(item, array)
    expect(array).toEqual(['bar'])
  })

  it('should not modify the array if the item is not present', () => {
    const item = 'foo'
    const array = ['bar']
    jsUtils.removeItem(item, array)
    expect(array).toEqual(['bar'])
  })

  it('should not modify the array if the input is not an array', () => {
    const item = 'foo'
    const array = 'not an array'
    jsUtils.removeItem(item, array)
    expect(array).toEqual('not an array')
  })
})

describe('containsItem()', () => {
  it('should return true if the item is present in the array', () => {
    const item = 'foo'
    const array = ['foo', 'bar']
    const result = jsUtils.containsItem(item, array)
    expect(result).toBe(true)
  })

  it('should return false if the item is not present in the array', () => {
    const item = 'foo'
    const array = ['bar']
    const result = jsUtils.containsItem(item, array)
    expect(result).toBe(false)
  })

  it('should return true if the item is equal to the array', () => {
    const item = 'foo'
    const array = 'foo'
    const result = jsUtils.containsItem(item, array)
    expect(result).toBe(true)
  })

  it('should return false if the item is not equal to the array', () => {
    const item = 'foo'
    const array = 'bar'
    const result = jsUtils.containsItem(item, array)
    expect(result).toBe(false)
  })
})

describe('gcd()', () => {
  it('should return the greatest common denominator of two numbers', () => {
    const a = 12
    const b = 18
    const result = jsUtils.gcd(a, b)
    expect(result).toBe(6)
  })

  it('should return the absolute value of the greatest common denominator', () => {
    const a = -12
    const b = 18
    const result = jsUtils.gcd(a, b)
    expect(result).toBe(6)
  })

  it('should return the input number if the other number is 0', () => {
    const a = 12
    const b = 0
    const result = jsUtils.gcd(a, b)
    expect(result).toBe(12)
  })

  it('should return 0 if both input numbers are 0', () => {
    const a = 0
    const b = 0
    const result = jsUtils.gcd(a, b)
    expect(result).toBe(0)
  })
})

describe('getChanges', () => {
  describe('added', () => {
    it('should return an object with one added entry', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['d', 5]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.added.length).toBe(1)
      expect(changes.added[0]).toEqual({ key: 'c', value: 3 })
    })

    it('should return an object with multiple added entries', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2],
        ['d', 5],
        ['e', 6]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.added.length).toBe(2)
      expect(changes.added[0]).toEqual({ key: 'd', value: 5 })
      expect(changes.added[1]).toEqual({ key: 'e', value: 6 })
    })

    it('should return an object with no added entries', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.added.length).toBe(0)
    })
  })

  describe('removed', () => {
    it('should return an object with one removed entry', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.removed.length).toBe(1)
      expect(changes.removed[0]).toEqual({ key: 'c', value: 3 })
    })

    it('should return an object with multiple removed entries', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.removed.length).toBe(2)
      expect(changes.removed[0]).toEqual({ key: 'c', value: 3 })
      expect(changes.removed[1]).toEqual({ key: 'd', value: 4 })
    })

    it('should return an object with no removed entries', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.removed.length).toBe(0)
    })
  })

  describe('updated', () => {
    it('should return an object with one updated entry', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 4],
        ['c', 3]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.updated.length).toBe(1)
      expect(changes.updated[0]).toEqual({ key: 'b', value: 4 })
    })

    it('should return an object with multiple updated entries', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 4],
        ['c', 5]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.updated.length).toBe(2)
      expect(changes.updated[0]).toEqual({ key: 'b', value: 4 })
      expect(changes.updated[1]).toEqual({ key: 'c', value: 5 })
    })

    it('should return an object with no updated entries', () => {
      const templateMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const targetMap = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ])
      const changes = jsUtils.getChanges(templateMap, targetMap)
      expect(changes.updated.length).toBe(0)
    })
  })

  describe('prettyPrintTime', () => {
    it('should return "0s" for 0 seconds', () => {
      expect(jsUtils.prettyPrintTime(0)).toBe('0s')
    })

    it('should return "1m" for 90 seconds', () => {
      expect(jsUtils.prettyPrintTime(90)).toBe('1m 30s')
    })

    it('should return "2h" for 7200 seconds', () => {
      expect(jsUtils.prettyPrintTime(7200)).toBe('2h')
    })

    it('should return "1d" for 86400 seconds', () => {
      expect(jsUtils.prettyPrintTime(86400)).toBe('1d')
    })

    it('should return "1w" for 604800 seconds', () => {
      expect(jsUtils.prettyPrintTime(604800)).toBe('1w')
    })

    it('should return "1M" for 2592000 seconds', () => {
      expect(jsUtils.prettyPrintTime(2592000)).toBe('1M')
    })

    it('should return "1Y" for 31536000 seconds', () => {
      expect(jsUtils.prettyPrintTime(31536000)).toBe('1Y')
    })
  })

  describe('formatBytes', () => {
    it('should return "1 B" for 1 byte', () => {
      expect(jsUtils.formatBytes(1)).toBe('1 B')
    })

    it('should return "1 KB" for 1024 bytes', () => {
      expect(jsUtils.formatBytes(1024)).toBe('1 KB')
    })

    it('should return "1.5 KB" for 1536 bytes', () => {
      expect(jsUtils.formatBytes(1536)).toBe('1.50 KB')
    })

    it('should return "1 MB" for 1048576 bytes', () => {
      expect(jsUtils.formatBytes(1048576)).toBe('1 MB')
    })

    it('should return "1.5 MB" for 1572864 bytes', () => {
      expect(jsUtils.formatBytes(1572864)).toBe('1.50 MB')
    })

    it('should return "1 GB" for 1073741824 bytes', () => {
      expect(jsUtils.formatBytes(1073741824)).toBe('1 GB')
    })

    it('should return "1.5 GB" for 1610612736 bytes', () => {
      expect(jsUtils.formatBytes(1610612736)).toBe('1.50 GB')
    })
  })

  describe('deepOverlay', () => {
    it('should overlay properties from source to target', () => {
      const target = { a: 1, b: 2, c: { d: 3 } }
      const source = { b: 3, c: { e: 4 } }
      const result = jsUtils.deepOverlay(target, source)
      expect(result).toEqual({ a: 1, b: 3, c: { d: 3, e: 4 } })
    })

    it('should not modify properties in target that are not in source', () => {
      const target = { a: 1, b: 2 }
      const source = { c: 3 }
      const result = jsUtils.deepOverlay(target, source)
      expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should not modify the source object', () => {
      const target = { a: 1 }
      const source = { b: 2 }
      jsUtils.deepOverlay(target, source)
      expect(source).toEqual({ b: 2 })
    })
  })
})
