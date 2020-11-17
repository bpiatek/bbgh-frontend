import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse, ItemResponse } from '../model/common'
import { Article, ArticleDetails } from '../model/Article'
import { Comment } from '@/api/model/Comment'

export class ArticlesApi {
  articles (pagination: Pagination, sorts: Sort[] = []): ListResponse<Article> {
    const params = new ListSearchParams(pagination, sorts)
    return apiService.get('/articles', { params })
  }

  getById (id: number): ItemResponse<ArticleDetails> {
    return apiService.get(`/articles/${id}`)
  }

  articleComments (id: number, pagination: Pagination, sorts: Sort[] = []): ListResponse<Comment> {
    return apiService.get(`/articles/${id}/comments`, {
      params: new ListSearchParams(pagination, sorts)
    })
  }
}

export default new ArticlesApi()
