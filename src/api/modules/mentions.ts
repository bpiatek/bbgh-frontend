import apiService from '../ApiService'
import { Pagination, Sort, ListSearchParams, ListResponse } from '../model/common'
import { Mention, MentionSentimentEnum } from '@/api/model/Mention'

import { AxiosResponse } from 'axios'

export class MentionsApi {
  search (pagination: Pagination, sorts: Sort[] = []): ListResponse<Mention> {
    const params = new ListSearchParams(pagination, sorts)

    return apiService.get('/mentions', { params })
  }

  setMentionSentiment (id: number, data: setMentionSentimentRequest): Promise<AxiosResponse<undefined>> {
    return apiService.post(`/mentions/${id}/sentiment`, data)
  }
}

export default new MentionsApi()

export type setMentionSentimentRequest = {
  mentionSentiment: MentionSentimentEnum;
}
