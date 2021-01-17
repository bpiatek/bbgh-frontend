import articlesApi, { ArticlesApi } from '@/api/modules/articles'
import commentsApi, { CommentsApi } from '@/api/modules/comments'
import mentionsApi, { MentionsApi } from '@/api/modules/mentions'
import playersApi, { PlayersApi } from '@/api/modules/players'

// TODO auto import

export class Api {
  public articles: ArticlesApi
  public comments: CommentsApi
  public mentions: MentionsApi
  public players: PlayersApi
  constructor () {
    this.articles = articlesApi
    this.comments = commentsApi
    this.mentions = mentionsApi
    this.players = playersApi
  }
}

export default new Api()
