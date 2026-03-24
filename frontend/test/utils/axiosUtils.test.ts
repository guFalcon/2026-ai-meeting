import { singleton as axiosUtils } from '../../src/utils/axiosUtils'
import { singleton as objectUtils } from '../../src/utils/objectUtils'
import store from '../../src/store'

describe('AxiosUtils', () => {
  describe('get', () => {
    it('should send a GET request to the server', async () => {
      const server = 'myServer'
      const endpointPath = 'myEndpoint'
      const id = 'myId'
      const response = { data: { id, name: 'John Doe' } }
      jest.spyOn(axiosUtils, 'internalGet').mockResolvedValue(response)

      const result = await axiosUtils.getById(server, endpointPath, id)

      expect(result).toEqual(response)
      const path = `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}/${id}`
      expect(axiosUtils.internalGet).toHaveBeenCalledWith(server, path, false)
    })
  })

  describe('del', () => {
    it('should send a DEL request to the server', async () => {
      const server = 'myServer'
      const endpointPath = 'myEndpoint'
      const id = 'myId'
      const response = { data: { message: 'Object deleted successfully' } }
      jest.spyOn(axiosUtils, 'internalDelete').mockResolvedValue(response)

      const result = await axiosUtils.del(server, endpointPath, id)

      expect(result).toEqual(response)
      const path = `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}/${id}`
      expect(axiosUtils.internalDelete).toHaveBeenCalledWith(server, path)
    })
  })

  describe('put', () => {
    it('should send a PUT request to the server', async () => {
      const server = 'myServer'
      const endpointPath = 'myEndpoint'
      const id = 'myId'
      const dataProvider = () => ({ name: 'John Doe' })
      const response = { data: { id, name: 'John Doe' } }
      jest.spyOn(axiosUtils, 'internalPut').mockResolvedValue(response)

      const result = await axiosUtils.put(server, endpointPath, id, dataProvider)

      expect(result).toEqual(response)
      const path = `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}/${id}`
      expect(axiosUtils.internalPut).toHaveBeenCalledWith(server, path, dataProvider)
    })
  })

  describe('post', () => {
    it('should send a POST request to the server', async () => {
      const server = 'myServer'
      const endpointPath = 'myEndpoint'
      const dataProvider = () => ({ name: 'John Doe' })
      const response = { data: { id: 'myId', name: 'John Doe' } }
      jest.spyOn(axiosUtils, 'internalPost').mockResolvedValue(response)

      const result = await axiosUtils.post(server, endpointPath, dataProvider)

      expect(result).toEqual(response)
      const path = `${objectUtils.getDeepProperty(endpointPath, store.getters['rest/config'].endpoint)}`
      expect(axiosUtils.internalPost).toHaveBeenCalledWith(server, path, dataProvider)
    })
  })
})
