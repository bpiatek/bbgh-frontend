import apiService from '../ApiService'
import { ItemResponse, ListResponse } from '../model/common'
import { Player, PlayerRatio } from '../model/Player'

export class PlayersApi {
  getById (id: number): ItemResponse<Player> {
    return apiService.get(`/players/${id}`)
  }

  search (query: string): ListResponse<Player> {
    return apiService.get('/players/search', { params: { s: query } })
  }

  playerRatio (playerId: number): ItemResponse<PlayerRatio> {
    return apiService.get(`/players/${playerId}/ratio`)
  }
}

export default new PlayersApi()
