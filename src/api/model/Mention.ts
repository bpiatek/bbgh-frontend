export interface Mention {
  id: number;
  articleId: number;
  commentId: number;
  commentContent: string;
  commentDate: string;
  playerId: number;
  playerFullName: string;
  startsAt: number;
  endsAt: number;
  mentionSentiment: string;
}

export enum MentionSentimentEnum {
    POSITIVE = 'POSITIVE',
    NEUTRAL = 'NEUTRAL',
    NEGATIVE = 'NEGATIVE',
    NOT_CHECKED = 'NOT_CHECKED',
}
