import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse, ItemResponse } from '../model/common'
import { Article } from '../model/Article'
import { Comment } from '@/api/model/Comment'

export class ArticlesApi {
  articles (pagination: Pagination, sorts: Sort[] = []): ListResponse<Article> {
    return apiService.get('/articles', {
      params: new ListSearchParams(pagination, sorts)
    })
  }

  article (id: number): ItemResponse<Article> {
    return apiService.get(`/articles/${id}`)
  }

  articleComments (id: number, pagination: Pagination, sorts: Sort[] = []): ListResponse<Comment> {
    return apiService.get(`/articles/${id}/comments`, {
      params: new ListSearchParams(pagination, sorts)
    })
  }
}

export default new ArticlesApi()
