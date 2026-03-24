import { singleton as objectUtils } from '../../src/utils/objectUtils'

describe('getProperty', () => {
  it('should return the value of an existing property', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getProperty('foo', obj)
    expect(result).toEqual('bar')
  })

  it('should return null for a non-existing property', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getProperty('baz', obj)
    expect(result).toBeNull()
  })

  it('should return null for a null object', () => {
    const result = objectUtils.getProperty('foo', null)
    expect(result).toBeNull()
  })

  it('should return null for an empty property name', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getProperty('', obj)
    expect(result).toBeNull()
  })

  it('should return null for a non-existing intermediate property', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getProperty('foo.bar', obj)
    expect(result).toBeNull()
  })
})

describe('getDeepProperty', () => {
  it('should return the value of an existing property', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getDeepProperty('foo', obj)
    expect(result).toEqual('bar')
  })

  it('should return null for a non-existing property', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getDeepProperty('baz', obj)
    expect(result).toBeNull()
  })

  it('should return null for a null object', () => {
    const result = objectUtils.getDeepProperty('foo', null)
    expect(result).toBeNull()
  })

  it('should return null for an empty property name', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getDeepProperty('', obj)
    expect(result).toBeNull()
  })

  it('should return the value of a nested property', () => {
    const obj = { foo: { bar: 'baz' } }
    const result = objectUtils.getDeepProperty('foo.bar', obj)
    expect(result).toEqual('baz')
  })

  it('should return null for a non-existing nested property', () => {
    const obj = { foo: { bar: 'baz' } }
    const result = objectUtils.getDeepProperty('foo.baz', obj)
    expect(result).toBeNull()
  })

  it('should return null for a non-existing intermediate property', () => {
    const obj = { foo: 'bar' }
    const result = objectUtils.getDeepProperty('foo.bar', obj)
    expect(result).toBeNull()
  })
})
