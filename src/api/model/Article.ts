export type Article = {
  id: number;
  url: string;
  title: string;
  content: string;
  creationDate: string;
  comments: number;
  positive: number;
  neutral: number;
  negative: number;
  notOpinion: number;
  notChecked: number;
}

export type ArticleDetails = {
  id: number;
  url: string;
  title: string;
  content: string;
  creationDate: string;
}
