
class VennUtils {
  private static instanceField: VennUtils

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new VennUtils())
    }
    return this.instanceField
  }

  public asSet (array: Array<any>): Set<any> {
    return new Set(array)
  }

  public distinctInA (aArray: Array<any>, bArray: Array<any>): Set<any> {
    const bSet = this.asSet(bArray)
    return new Set([...aArray].filter(e => !bSet.has(e)))
  }

  public distinctInB (aArray: Array<any>, bArray: Array<any>): Set<any> {
    const aSet = this.asSet(aArray)
    return new Set([...bArray].filter(e => !aSet.has(e)))
  }

  public distinctSet (aArray: Array<any>, bArray: Array<any>): Set<any> {
    const aSet = new Set(aArray)
    const bSet = new Set(bArray)

    const distinctInA = new Set([...aArray].filter(e => !bSet.has(e)))
    const distinctInB = new Set([...bArray].filter(e => !aSet.has(e)))
    return new Set([...distinctInA, ...distinctInB])
  }

  public intersectionSet (aArray: Array<any>, bArray: Array<any>): Set<any> {
    const bSet = new Set(bArray)
    return new Set([...aArray].filter(e => bSet.has(e)))
  }
}

export const singleton = VennUtils.getInstance()
