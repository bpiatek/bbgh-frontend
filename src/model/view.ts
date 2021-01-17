import { Player, PlayerRatio } from '@/api/model/Player'
import { ArticlesList, MentionsList } from '@/model/list'

export class View {
  constructor (options: unknown = {}) {
    Object.assign(this, options)
  }
}

export class MentionsView extends View {
  mentionsList = new MentionsList()
}

export class ArticlesView extends View {
  articlesList = new ArticlesList()
}

export class PlayersView extends View {
  player = null as null|Player
  playerRatio = null as null|PlayerRatio
  mentionsList = new MentionsList({ size: 10 })
  articlesList = new ArticlesList({ size: 10 })
  searchPlayerHistory = []
}
