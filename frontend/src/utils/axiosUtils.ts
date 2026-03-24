import Vue from 'vue'
import store from '@/store'
import { AxiosRequestHeaders, AxiosHeaders } from 'axios'
import { singleton as objectUtils } from '@/utils/objectUtils'

export class AxiosUtils {
  private static instanceField: AxiosUtils

  public static getInstance () {
    if (!this.instanceField) {
      this.instanceField || (this.instanceField = new AxiosUtils())
    }
    return this.instanceField
  }

  private buildBaseUrl (server: string): string {
    const config = objectUtils.getDeepProperty(server, store.getters['rest/config'].servers)
    return `${config.protocol}://${config.address}:${config.port}`
  }

  private provideData (dataProvider: () => object | string): null | string | object {
    if (dataProvider !== null) {
      if (typeof dataProvider === 'string') {
        return store.getters[dataProvider]
      } else {
        return dataProvider()
      }
    }
    return null
  }

  private getAuthorizationHeader (): AxiosRequestHeaders {
    const token = store.getters['keycloak/accessToken']
    if (token == null || token === undefined || token === '') {
      return new AxiosHeaders()
    }
    const headers = new AxiosHeaders()
    headers.set('Authorization', 'Bearer ' + token)
    return headers
  }

  async internalGet (server: string, endpointPath: string, isList: boolean): Promise<object | null> {
    // console.log(this.buildBaseUrl(server) + endpointPath)
    const response = await Vue.axios
      .get(this.buildBaseUrl(server) + endpointPath, {
        headers: Object.assign({}, this.getAuthorizationHeader())
      })

    if (response === undefined || response == null) {
      throw new Error('Response was null or undefined.')
    }
    const entries = response.data.entries
    if (isList && entries !== undefined && entries == null) {
      throw new Error(`Entries of response was null on call to ${server}${endpointPath}.`)
    }
    return response.data
  }

  async internalGetBuffered (
    server: string,
    endpointPath: string,
    isList: boolean
  ): Promise<object | null> {
    // console.log(this.buildBaseUrl(server) + endpointPath)
    const response = await Vue.axios.get(
      this.buildBaseUrl(server) + endpointPath,
      {
        headers: Object.assign({}, this.getAuthorizationHeader()),
        responseType: 'arraybuffer'
      }
    )

    if (response === undefined || response == null) {
      throw new Error('Response was null or undefined.')
    }
    const entries = response.data.entries
    if (isList && entries !== undefined && entries == null) {
      throw new Error(
        `Entries of response was null on call to ${server}${endpointPath}.`
      )
    }
    return response.data
  }

  async internalDelete (server: string, endpointPath: string): Promise<any> {
    // console.log(this.buildBaseUrl(server) + endpointPath)
    const response = await Vue.axios
      .delete(this.buildBaseUrl(server) + endpointPath, {
        data: {
        },
        headers: Object.assign({}, this.getAuthorizationHeader())
      })
    return response.data
  }

  async internalPut (server: string, endpointPath: string, dataProvider): Promise<any> {
    // console.log(this.buildBaseUrl(server) + endpointPath, this.provideData(dataProvider))
    const response = await Vue.axios
      .put(this.buildBaseUrl(server) + endpointPath, this.provideData(dataProvider), {
        headers: Object.assign({}, this.getAuthorizationHeader())
      })
    if (response === undefined || response == null) {
      throw new Error('Response was null or undefined.')
    }
    return response.data
  }

  async internalPost (server: string, endpointPath: string, dataProvider): Promise<any> {
    // console.log(this.buildBaseUrl(server) + endpointPath)
    const response = await Vue.axios
      .post(this.buildBaseUrl(server) + endpointPath, this.provideData(dataProvider), {
        headers: Object.assign({}, this.getAuthorizationHeader())
      })
    if (response === undefined || response == null) {
      throw new Error('Response was null or undefined.')
    }
    return response.data
  }

  /**
     * Send a GET retrieving the response as an array-buffer from the server.
     * @param server name of the rest/config/servers property to use
     * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
     */
  public async getBuffered (server: string, endpointPath: string, additionalQueryParams?: string): Promise<any> {
    return await this.internalGetBuffered(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}?${additionalQueryParams != null ? additionalQueryParams : ''}`, false)
  }

  /**
   * Send a GET retrieving the response from the server.
   * @param server name of the rest/config/servers property to use
   * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
   */
  public async getResponse (server: string, endpointPath: string, additionalQueryParams?: string): Promise<any> {
    return await this.internalGet(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}?${additionalQueryParams != null ? additionalQueryParams : ''}`, false)
  }

  /**
   * Send a GET retrieving a data-object represented by an ID from the server.
   * @param server name of the rest/config/servers property to use
   * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
   * @param id the ID of the object to retrieve
   */
  public async getById (server: string, endpointPath: string, id: string | number): Promise<any> {
    return await this.internalGet(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}/${id}`, false)
  }

  /**
   * Send a GET retrieving a list of data-objects from the server.
   * @param server name of the rest/config/servers property to use
   * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
   * @param size the size of a single page of the list
   * @param offset the number of pages to omit before returning the list
   * @param additionalQueryParams a string containing additional query parameters (like 'scanId=5&searchName=hallo' for example)
   */
  public async getList (server: string, endpointPath: string, size?: number, offset?: number, additionalQueryParams?: string): Promise<any> {
    return await this.internalGet(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}?size=${size || Number.MAX_SAFE_INTEGER}&offset=${offset || 0}${additionalQueryParams != null ? '&' + additionalQueryParams : ''}`, true)
  }

  /**
   * Sends a DEL request to the server for the object with the given ID.
   * @param server name of the rest/config/servers property to use
   * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
   * @param id the ID of the object to retrieve
   */
  public async del (server: string, endpointPath: string, id: string | number): Promise<any> {
    return await this.internalDelete(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}/${id}`)
  }

  /**
   * Sends a PUT request to the server for the object with the given ID.
   * @param server name of the rest/config/servers property to use
   * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
   * @param id the ID of the object to retrieve
   * @param dataProvider path to a vuex-getter or function that will be called in order to get the body for the call
   */
  public async put (server: string, endpointPath: string, id: string | number, dataProvider: () => object): Promise<any> {
    return await this.internalPut(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}/${id}`, dataProvider)
  }

  /**
   * Sends a POST request to the server for the object with the given ID.
   * @param server name of the rest/config/servers property to use
   * @param endpointPath path to the correct endpoint-definition starting from rest/config/endpoint/
   * @param dataProvider path to a vuex-getter or function that will be called in order to get the body for the call
   */
  public async post (server: string, endpointPath: string, dataProvider: () => object): Promise<any> {
    return await this.internalPost(server, `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}`, dataProvider)
  }
}

export const singleton = AxiosUtils.getInstance()
