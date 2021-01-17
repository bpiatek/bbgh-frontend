export type Player = {
  id: number;
  urlId: number;
  firstName: string;
  lastName: number;
  currentTeam: string;
  dateOfBirth: string;
}

export type PlayerRatio = {
  positive: number;
  negative: number;
  neutral: number;
  notChecked: number;
  ratio: number;
}
