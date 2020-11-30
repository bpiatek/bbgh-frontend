import apiService from '../ApiService'
import { ItemResponse } from '../model/common'
import { Comment } from '@/api/model/Comment'

export class CommentsApi {
  getById (id: number): ItemResponse<Comment> {
    return apiService.get(`/comment/${id}`)
  }
}

export default new CommentsApi()
