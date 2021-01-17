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

    toQueryParameters (): { [k: string]: string | undefined } {
      return {
        page: this.page.toString()
      }
    }

    queryDiffers (query: { [k: string]: string | number | undefined }): boolean {
      const thisQuery = this.toQueryParameters()
      for (const key of Object.keys(thisQuery)) {
        if (thisQuery[key] !== query[key]) {
          return true
        }
      }
      return false
    }
}

export class ArticlesList extends List<Article> {
}

export class MentionsList extends List<Mention> {
    filterSentiment = [] as string[]

    toQueryParameters (): { [k: string]: any } {
      const result = super.toQueryParameters()
      if (this.filterSentiment.length > 0) {
        result.sentiments = this.filterSentiment.join(',')
      } else {
        result.sentiments = undefined
      }
      return result
    }
}
