import apiService from '../ApiService'
import { ItemResponse, ListResponse, ListSearchParams, Pagination, Sort } from '../model/common'
import { Comment } from '@/api/model/Comment'
import { AxiosResponse } from 'axios'

export class CommentsApi {
  getById (id: number): ItemResponse<Comment> {
    return apiService.get(`/comment/${id}`)
  }

  search (pagination: Pagination, sorts: Sort[] = []): ListResponse<Comment> {
    const params = new ListSearchParams(pagination, sorts)
    return apiService.get('/comments', { params })
  }

  withNegativeMentionMarkedByHuman (pagination: Pagination, sorts: Sort[] = []): ListResponse<Comment> {
    const params = new ListSearchParams(pagination, [])
    return apiService.get('/comments/withNegativeMentionMarkedByHuman', { params })
  }

  setIsHateSpeech (id: number, { isHateSpeech }: setIsHateSpeech): Promise<AxiosResponse<undefined>> {
    return apiService.post(`/comments/${id}/isHateSpeech`, {
      isHateSpeech: isHateSpeech
    })
  }
}

export default new CommentsApi()

export type setIsHateSpeech = {
  isHateSpeech: boolean;
}
