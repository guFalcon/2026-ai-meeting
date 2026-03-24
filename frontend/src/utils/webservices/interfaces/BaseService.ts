import { CrudService } from '@/utils/webservices/interfaces/CrudService'
import { GetListConfigObject } from '@/utils/webservices/interfaces/GetListConfigObject'
import { singleton as axiosUtils } from '@/utils/axiosUtils'

export class BaseService implements CrudService {
  protected server: string
  protected endpointPath: string
  protected axiosUtils = axiosUtils

  constructor (server: string, endpointPath: string) {
    this.server = server
    this.endpointPath = endpointPath
  }

  async getById (id: string | number) {
    return this.axiosUtils.getById(this.server, this.endpointPath, id)
  }

  async getList (config?: GetListConfigObject) {
    config = Object.assign({}, config)
    return this.axiosUtils.getList(this.server, this.endpointPath, config.size, config.offset, config.additionalQueryParams)
  }

  async getResponse (additionalQueryParams: string) {
    return this.axiosUtils.getResponse(this.server, this.endpointPath, additionalQueryParams)
  }

  async getFirst (additionalQueryParams: string) {
    const response = await this.getList({ size: 1, additionalQueryParams })
    return response.entries.length === 0 ? null : response.entries[0]
  }

  async del (id: string | number) {
    return this.axiosUtils.del(this.server, this.endpointPath, id)
  }

  async put (id: string | number, dataProvider: () => object) {
    return this.axiosUtils.put(this.server, this.endpointPath, id, dataProvider)
  }

  async post (dataProvider: () => object) {
    // console.log(dataProvider())
    return this.axiosUtils.post(this.server, this.endpointPath, dataProvider)
  }

  async upsertById (id: string | number, dataProvider: () => object) {
    if (id === null || id === undefined) {
      // console.log('UPSERT - post')
      return this.post(dataProvider)
    }
    try {
      // console.log('UPSERT - put')
      // console.log(dataProvider())
      const response = await this.getById(id)
      const entity = Object.assign(response, dataProvider())
      // console.log(entity)
      return await this.put(entity.id, () => entity)
    } catch (error) {
      return await this.post(dataProvider)
    }
  }
}
