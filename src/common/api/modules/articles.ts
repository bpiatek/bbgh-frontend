import apiService from '../ApiService'
import { AxiosResponse } from 'axios'
import { Pagination, PaginatedData, Sort, ListSearchParams } from '../common'

export const articles = {
  articles (pagination: Pagination, sorts: Sort[]): Promise<AxiosResponse<PaginatedData<Article>>> {
    const params = new ListSearchParams(pagination, sorts)
    return apiService.get('/articles', {
      params: params
    })
  }
}

export default articles

interface Article {
  id: number;
  url: string;
  title: string;
  creationDate: string;
}
