
export interface Comment {
  id: number;
  author: string;
  dateAdded: string;
  content: string;
  commentOpinionStatus: CommentOpinionStatusEnum;
}

export enum CommentOpinionStatusEnum {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
  NOT_OPINION = 'NOT_OPINION',
  NOT_CHECKED = 'NOT_CHECKED',
}
