import { Mention } from '@/api/model/Mention'
import { Article } from '@/api/model/Article'

export class List<T> {
    items: T[] = []
    page = 1
    size = 20
    totalPages = 1
    totalElements = 0
    loading = false
    loaded = false

    constructor (options: unknown = {}) {
      Object.assign(this, options)
    }
}

export class ArticlesList extends List<Article> {
}

export class MentionsList extends List<Mention> {
    filterSentiment = [] as string[]
}
