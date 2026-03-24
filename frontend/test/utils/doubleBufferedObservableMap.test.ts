import { DoubleBufferedObservableMap } from '../../src/utils/doubleBufferedObservableMap'

describe('DoubleBufferedObservableMap', () => {
  it('should create an empty map', () => {
    const map = new DoubleBufferedObservableMap()
    expect(map.size).toBe(0)
  })

  it('should create a map from an existing map', () => {
    const d = new DoubleBufferedObservableMap(new Map([['foo', 'bar'], ['baz', 'qux']]))
    expect(d.size).toBe(2)
    expect(d.get('foo')).toBe('bar')
    expect(d.get('baz')).toBe('qux')
  })

  it('should set a value in the map', () => {
    const d = new DoubleBufferedObservableMap(new Map([['foo', 'bar']]))
    expect(d.size).toBe(1)
    expect(d.get('foo')).toBe('bar')
  })

  it('should overwrite an existing value', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar']]))
    map.set('foo', 'baz')
    map.swap()
    expect(map.get('foo')).toBe('baz')
  })

  it('should get a value from the map', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar']]))
    expect(map.get('foo')).toBe('bar')
  })

  it('should delete a value from the map', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar']]))
    map.delete('foo')
    map.swap()
    expect(map.size).toBe(0)
    expect(map.get('foo')).toBeUndefined()
  })

  it('should clear the map', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar'], ['baz', 'qux']]))
    map.clear()
    map.swap()
    expect(map.size).toBe(0)
    expect(map.get('foo')).toBeUndefined()
    expect(map.get('baz')).toBeUndefined()
  })

  it('should swap the shadow map', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar'], ['baz', 'qux']]))
    expect(map.size).toBe(2)
    expect(map.get('foo')).toBe('bar')
    expect(map.get('baz')).toBe('qux')
    map.set('foo', 'baz')
    map.set('baz', 'qux')
    map.swap()
    expect(map.size).toBe(2)
    expect(map.get('foo')).toBe('baz')
    expect(map.get('baz')).toBe('qux')
  })

  it('should commit the changes to the main map', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar'], ['baz', 'qux']]))
    map.set('foo', 'baz')
    map.set('baz', 'quux')
    map.commit()
    expect(map.size).toBe(2)
    expect(map.get('foo')).toBe('baz')
    expect(map.get('baz')).toBe('quux')
  })

  it('should discard the changes to the shadow map', () => {
    const map = new DoubleBufferedObservableMap(new Map([['foo', 'bar'], ['baz', 'qux']]))
    map.set('foo', 'baz')
    map.set('baz', 'quux')
    map.discard()
    map.swap()
    expect(map.size).toBe(2)
    expect(map.get('foo')).toBe('bar')
    expect(map.get('baz')).toBe('qux')
  })
})
