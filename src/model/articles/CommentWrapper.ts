import { Comment } from '@/api/modules/articles'
import dayjs from 'dayjs'

export class CommentWrapper {
  id: number;
  author: string;
  content: string;
  dateAdded: dayjs.Dayjs;

  constructor (public comment: Comment) {
    this.id = comment.id
    this.author = comment.author
    this.content = comment.content
    this.dateAdded = dayjs(this.comment.dateAdded)
  }
}
