import { Comment } from '@/api/modules/articles'
import * as moment from 'moment'

export class CommentWrapper {
  id: number;
  author: string;
  content: string;
  dateAdded: moment.Moment;

  constructor (public comment: Comment) {
    this.id = comment.id
    this.author = comment.author
    this.content = comment.content
    this.dateAdded = moment.default(this.comment.dateAdded)
  }
}
