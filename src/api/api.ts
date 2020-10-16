import articlesApi, { ArticlesApi } from '@/api/modules/articles'
import commentsApi, { CommentsApi } from '@/api/modules/comments'
import mentionsApi, { MentionsApi } from '@/api/modules/mentions'

export class Api {
  public articles: ArticlesApi
  public comments: CommentsApi
  public mentions: MentionsApi
  constructor () {
    this.articles = articlesApi
    this.comments = commentsApi
    this.mentions = mentionsApi
  }
}

export default new Api()
