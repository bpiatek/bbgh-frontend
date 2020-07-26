import articlesApi, { ArticlesApi } from '@/api/modules/articles'

export class Api {
  public articles: ArticlesApi
  constructor () {
    this.articles = articlesApi
  }
}

export default new Api()
