import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse, ItemResponse } from '../model/common'
import { Mention } from '@/api/model/Mention'

export class MentionsApi {
  search (pagination: Pagination): ListResponse<Mention> {
    const params = new ListSearchParams(pagination)

    return apiService.get('/mentions', { params })
  }
}

export default new MentionsApi()
