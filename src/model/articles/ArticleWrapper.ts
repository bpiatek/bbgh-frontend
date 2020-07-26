import { Article } from '@/api/modules/articles'
import dayjs from 'dayjs'

export class ArticleWrapper {
  id: number;
  url: string;
  title: string;
  creationDate: dayjs.Dayjs;

  constructor (public article: Article) {
    this.id = article.id
    this.url = article.url
    this.title = article.title
    this.creationDate = dayjs(article.creationDate)
  }
}
