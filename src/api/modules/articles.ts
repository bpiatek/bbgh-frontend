import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse, ItemResponse } from '../common'

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

export interface Article {
  id: number;
  url: string;
  title: string;
  content: string;
  creationDate: string;
}

export interface Comment {
  id: number;
  author: string;
  dateAdded: string;
  content: string;
}
