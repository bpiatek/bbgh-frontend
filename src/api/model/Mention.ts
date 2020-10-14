export type Mention = {
  id: number;
  comment: MentionComment;
  player: MentionPlayer;
  sentiment: string;
}


export type MentionPlayer =  {
  id: number;
  firstName: string;
  lastName: string;
}

export type MentionComment =  {
  id: number;
  content: string;
}
