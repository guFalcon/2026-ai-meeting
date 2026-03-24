declare global {
  interface Window {
    config: object;
    version: object;
  }
}

class Env {
  private static instanceField: Env

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new Env())
    }
    return this.instanceField
  }

  public get (key: string, defaultValue = ''): string {
    if (window.config && window.config[`${key}`] !== undefined) {
      const value = window.config[`${key}`]
      console.log('CONFIG - Found [' + key + '] in config.js. Value is [' + value + ']')
      return value
    }

    if (window.version && window.version[`${key}`] !== undefined) {
      const value = window.version[`${key}`]
      console.log('CONFIG - Found [' + key + '] in version.js. Value is [' + value + ']')
      return value
    }

    if (process.env && process.env[`VUE_APP_${key}`] !== undefined) {
      // get env var value
      const value = process.env[`VUE_APP_${key}`]
      console.log('CONFIG - Found [' + key + '] in process.env. Value is [' + value + ']')
      return value
    }
    console.log('CONFIG - Key [' + key + '] not found. Default is [' + defaultValue + ']')
    return defaultValue
  }
}

export const singleton = Env.getInstance()
