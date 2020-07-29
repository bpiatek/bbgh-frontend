import articlesApi, { ArticlesApi } from '@/api/modules/articles'
import commentsApi, { CommentsApi } from '@/api/modules/comments'

export class Api {
  public articles: ArticlesApi
  public comments: CommentsApi
  constructor () {
    this.articles = articlesApi
    this.comments = commentsApi
  }
}

export default new Api()
