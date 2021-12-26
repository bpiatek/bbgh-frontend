import apiService from '../ApiService'
import { ItemResponse, ListResponse, ListSearchParams, Pagination, Sort } from '../model/common'
import { Comment } from '@/api/model/Comment'
import { Article } from '@/api/model/Article'

export class CommentsApi {
  getById (id: number): ItemResponse<Comment> {
    return apiService.get(`/comment/${id}`)
  }

  search (pagination: Pagination, sorts: Sort[] = []): ListResponse<Comment> {
    const params = new ListSearchParams(pagination, sorts)
    return apiService.get('/comments', { params })
  }
}

export default new CommentsApi()
