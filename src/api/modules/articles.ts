import apiService from '../ApiService'
import { AxiosResponse } from 'axios'
import { Pagination, PaginatedData, Sort, ListSearchParams, ListResponse } from '../common'

export const articles = {
  articles (pagination: Pagination, sorts: Sort[] = []): ListResponse<Article> {
    return apiService.get('/articles', {
      params: new ListSearchParams(pagination, sorts)
    })
  },
  articleComments (id: number, pagination: Pagination, sorts: Sort[] = []): ListResponse<Comment> {
    return apiService.get(`/articles/${id}/comments`, {
      params: new ListSearchParams(pagination, sorts)
    })
  }
}

export default articles

export interface Article {
  id: number;
  url: string;
  title: string;
  creationDate: string;
}

export interface Comment {
  id: number;
  author: string;
  dateAdded: string;
  content: string;
}
