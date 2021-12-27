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

  setIsHateSpeech (id: number, { hateSpeech }: setIsMateSpeech): Promise<AxiosResponse<undefined>> {
    return apiService.post(`/comments/${id}/isHateSpeech`, {
      hateSpeech: hateSpeech
    })
  }
}

export default new CommentsApi()

export type setIsMateSpeech = {
  hateSpeech: boolean;
}
