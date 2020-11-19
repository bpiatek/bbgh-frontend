export type Mention = {
  id: number;
  articleId: number;
  commentId: number;
  commentContent: string;
  commentDate: string
  playerId: number;
  playerFullName: string;
  startsAt: number;
  endsAt: number;
  mentionSentiment: string;
}
