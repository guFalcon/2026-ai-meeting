import { ObservableMap } from '../../src/utils/observableMap'

describe('ObservableMap', () => {
  it('should create an empty map', () => {
    const map = new ObservableMap()
    expect(map.size).toBe(0)
  })

  it('should create a map from an existing map', () => {
    const existingMap = new Map([['foo', 'bar'], ['baz', 'qux']])
    const map = new ObservableMap(existingMap)
    expect(map.size).toBe(2)
    expect(map.get('foo')).toBe('bar')
    expect(map.get('baz')).toBe('qux')
  })

  it('should set a value in the map', () => {
    const map = new ObservableMap()
    map.set('foo', 'bar')
    expect(map.size).toBe(1)
    expect(map.get('foo')).toBe('bar')
  })

  it('should get a value from the map', () => {
    const map = new ObservableMap()
    map.set('foo', 'bar')
    expect(map.get('foo')).toBe('bar')
  })

  it('should delete a value from the map', () => {
    const map = new ObservableMap()
    map.set('foo', 'bar')
    map.delete('foo')
    expect(map.size).toBe(0)
    expect(map.get('foo')).toBeUndefined()
  })

  it('should clear the map', () => {
    const map = new ObservableMap()
    map.set('foo', 'bar')
    map.set('baz', 'qux')
    map.clear()
    expect(map.size).toBe(0)
    expect(map.get('foo')).toBeUndefined()
    expect(map.get('baz')).toBeUndefined()
  })
})
