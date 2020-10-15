import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse, ItemResponse } from '../model/common'
import { Comment, CommentOpinionStatusEnum } from '@/api/model/Comment'
import { AxiosResponse } from 'axios'

export class CommentsApi {
  getById (id: number): ItemResponse<Comment> {
    return apiService.get(`/comment/${id}`)
  }

  setCommentStatus (id: number, data: setCommentStatusRequest): Promise<AxiosResponse<undefined>> {
    return apiService.post(`/comment/${id}/status`, data)
  }
}

export default new CommentsApi()

export type setCommentStatusRequest = {
  status: CommentOpinionStatusEnum;
}
