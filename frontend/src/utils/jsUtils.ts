
class JsUtils {
  private static instanceField: JsUtils

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new JsUtils())
    }
    return this.instanceField
  }

  public deleteStandardFieldsFrom (entity: any): any {
    delete entity.id
    delete entity.createdOn
    delete entity.editedOn
    return entity
  }

  public isSet (value) {
    return value !== undefined && value !== null
  }

  public findInArray<T> ({
    array,
    reverse = false,
    testPredicate = this.isSet,
    defaultValue = 0 as unknown as T
  }: {
    array: T[];
    reverse?: boolean;
    testPredicate?: (value: T) => boolean;
    defaultValue?: T;
  }): T {
    const arr = reverse ? [...array].reverse() : array
    const found = arr.find(testPredicate)
    return found !== undefined ? found : defaultValue
  }

  public extractVariables (text): Array<string> {
    return this.extract(text, /\$\{([^{}]*)}/g)
  }

  public extract (text, regexp): Array<string> {
    const r: Array<string> = []
    const matches = text.matchAll(regexp)
    for (const m of matches) {
      r.push(m[1])
    }
    return r
  }

  public isObject (item) {
    return (item && typeof item === 'object' && !Array.isArray(item))
  }

  public deepOverlay (target: Record<string, any>, source: Record<string, any>) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (this.isObject(target[key]) && this.isObject(source[key])) {
          this.deepOverlay(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      }
    }
    return target
  }

  /**
   * Returns three arrays that, if you set their values to the currentMap correctly, it will reflect the originalMap afterwards.
   * @param templateMap a map that is of the desired structure
   * @param targetMap a map that should be changed to reflect the templateMap
   * @returns a map that contains the changes
   */
  public getChanges<K, V> (templateMap: Map<K, V>, targetMap: Map<K, V>): { added: Array<{ key: K; value: V | undefined }>; same: Array<{ key: K; value: V | undefined }>; removed: Array<{ key: K; value: V | undefined }>; updated: Array<{ key: K; value: V | undefined }> } {
    const added: Array<{ key: K; value: V | undefined }> = []
    const same: Array<{ key: K; value: V }> = []
    const removed: Array<{ key: K; value: V | undefined }> = []
    const updated: Array<{ key: K; value: V | undefined }> = []

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

  public async replaceVariables (text, replacerFunction) {
    return this.replace(text, /\$\{([^{}]*)}/g, replacerFunction)
  }

  public async replace (text, regexp, replacerFunction) {
    const replacements = await Promise.all(
      Array.from(text.matchAll(regexp),
        match => replacerFunction(...(match as []))))
    let i = 0
    return text.replace(regexp, () => replacements[i++])
  }

  public async resolve (promises: Array<Promise<any>>) {
    const locs = await Promise.allSettled(promises) as { status: 'fulfilled' | 'rejected'; value: any }[]
    const results = locs.filter(({ status }) => status === 'fulfilled').map((p) => p.value)
    return results
  }

  public formatBytes (bytes: number, offset = 0): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = offset
    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024
      i++
    }
    const formattedBytes = bytes % 1 === 0 ? bytes : bytes.toFixed(2)
    return `${formattedBytes} ${units[i]}`
  }

  public groupBy (inputArray, key) {
    return inputArray.reduce((accumulator, element) => {
      const v = key instanceof Function ? key(element) : element[key]
      const acc = (accumulator[v] = accumulator[v] || [])
      acc.push(element)
      return accumulator
    }, {})
  }

  public callIfFuncOrReturnValue (param) {
    if (param instanceof Function) {
      return param()
    }
    return param
  }

  public prettyPrintTime (seconds: number): string {
    if (seconds === 0) {
      return '0s'
    }

    const units = [
      { name: 'Y', seconds: 31536000 },
      { name: 'M', seconds: 2592000 },
      { name: 'w', seconds: 604800 },
      { name: 'd', seconds: 86400 },
      { name: 'h', seconds: 3600 },
      { name: 'm', seconds: 60 },
      { name: 's', seconds: 1 }
    ]

    let result = ''
    let remainingSeconds = seconds

    for (const unit of units) {
      const value = Math.floor(remainingSeconds / unit.seconds)
      if (value > 0) {
        result += `${value}${unit.name} `
        remainingSeconds -= value * unit.seconds
      }
    }
    return result.trim()
  }

  /**
   * Add item, if not present in array, remove from array otherwise.
   * @param item the item to check for and to add/remove
   * @param array the array the item is to be added to or removed from
   */
  public toggleItem (item, array) {
    const index = array.indexOf(item)
    if (index === -1) {
      array.push(item)
    } else {
      array.splice(index, 1)
    }
  }

  /**
   * Adds an item to an array, if it doesn't already contain it.
   * @param item the item to add
   * @param array the array the item is to be added to
   */
  public addItem (item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item)
    }
  }

  public removeItem (item, array) {
    if (Array.isArray(array)) {
      const index = array.indexOf(item)
      if (index !== -1) {
        array.splice(index, 1)
      }
    }
  }

  public containsItem (item, array) {
    if (Array.isArray(array)) {
      return array.indexOf(item) !== -1
    } else {
      return item === array
    }
  }

  /**
   * Returns the value itself, or an empty string, if the value was null or
   * undefined.
   * @param value the value to sanitize
  */
  public sanitize (value) {
    if (value === null || value === undefined) {
      return ''
    }
    return value
  }

  /**
   * Calculates the greatest common denominator of two numbers.
   * No order is required for the two numbers.
   * @param a a number
   * @param b another number
   */
  public gcd (a, b) {
    a = Math.abs(a)
    b = Math.abs(b)
    if (b > a) {
      const temp = a
      a = b
      b = temp
    }
    while (true) {
      if (b === 0) {
        return a
      }
      a %= b
      if (a === 0) {
        return b
      }
      b %= a
    }
  }
}

export const singleton = JsUtils.getInstance()
