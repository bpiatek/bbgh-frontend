import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse, ItemResponse } from '../model/common'
import { Mention } from '@/api/model/Mention'

export class MentionsApi {
  search (pagination: Pagination, sorts: Sort[] = []): ListResponse<Mention> {
    const params = new ListSearchParams(pagination, sorts)

    return apiService.get('/mentions', { params })
  }
}

export default new MentionsApi()
