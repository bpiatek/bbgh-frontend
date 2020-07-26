import { Article } from '@/api/modules/articles'
import * as moment from 'moment'

export class ArticleWrapper {
  constructor (public article: Article) {
    this.article = article
  }

  creationDate (): moment.Moment {
    return moment.default(this.article.creationDate)
  }
}
