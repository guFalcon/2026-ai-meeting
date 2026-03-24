import { ObservableMap } from './observableMap'

export class DoubleBufferedObservableMap<K, V> {
  public map = new ObservableMap<K, V>()
  public backingMap = new ObservableMap<K, V>()

  public constructor (map?) {
    if (map) {
      this.map = new ObservableMap<K, V>(map)
      this.backingMap = new ObservableMap<K, V>(map)
    }
  }

  public backup (): DoubleBufferedObservableMap<K, V> {
    this.backingMap.clear()
    this.map.forEach((value, key) => {
      this.backingMap.set(key, value)
    })
    this.backingMap.setChangeTracker(this.map.getChangeTracker())
    return this
  }

  public swap (): DoubleBufferedObservableMap<K, V> {
    const temp = this.map
    this.map = this.backingMap
    this.backingMap = temp
    return this
  }

  public get size (): number {
    return this.map.size
  }

  public set (key: K, value: V): DoubleBufferedObservableMap<K, V> {
    this.backingMap.set(key, value)
    return this
  }

  public delete (key: K): number | boolean {
    return this.backingMap.delete(key)
  }

  public clear (): void {
    this.backingMap.clear()
  }

  public get (key: K): number | V {
    return this.map.get(key)
  }

  public forEach (callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): number | void {
    return this.map.forEach(callbackfn, thisArg)
  }

  public entries (): number | IterableIterator<[K, V]> {
    return this.map.entries()
  }

  public has (key: K): number | boolean {
    return this.map.has(key)
  }

  public values (): 0 | IterableIterator<V> {
    return this.map.values()
  }

  public valuesAsArray (): 0 | Array<V> {
    return this.map.valuesAsArray()
  }

  public keys (): 0 | IterableIterator<K> {
    return this.map.keys()
  }

  public keysAsArray (): 0 | Array<K> {
    return this.map.keysAsArray()
  }

  public binding () {
    return this.map.binding()
  }

  public changed () {
    this.map.changed()
  }

  public commit (): DoubleBufferedObservableMap<K, V> {
    return this.internalCommit(this.backingMap, this.map)
  }

  public discard (): DoubleBufferedObservableMap<K, V> {
    return this.internalCommit(this.map, this.backingMap)
  }

  private internalCommit (templateMap: ObservableMap<K, V>, targetMap: ObservableMap<K, V>): DoubleBufferedObservableMap<K, V> {
    const changes = this.getChanges(templateMap, targetMap)
    changes.added.forEach((entry) => {
      targetMap.set(entry.key, entry.value)
    })
    changes.removed.forEach((entry) => {
      targetMap.delete(entry.key)
    })
    changes.updated.forEach((entry) => {
      targetMap.set(entry.key, entry.value)
    })
    return this
  }

  private getChanges<K, V> (templateMap: ObservableMap<K, V>, targetMap: ObservableMap<K, V>): { added: Array<{ key: K; value: V }>; same: Array<{ key: K; value: V }>; removed: Array<{ key: K; value: V }>; updated: Array<{ key: K; value: V }> } {
    const added: Array<{ key: K; value: V }> = []
    const same: Array<{ key: K; value: V }> = []
    const removed: Array<{ key: K; value: V }> = []
    const updated: Array<{ key: K; value: V }> = []

    templateMap.forEach((value, key) => {
      if (!targetMap.has(key)) {
        added.push({ key, value })
      } else if (targetMap.get(key) !== value) {
        updated.push({ key, value })
      } else {
        same.push({ key, value })
      }
    })

    targetMap.forEach((value, key) => {
      if (!templateMap.has(key)) {
        removed.push({ key, value })
      }
    })

    return { added, same, removed, updated }
  }
}
