export interface Guess {
  type: GuessType,
  song?: string
}

export enum GuessType{
  SKIP,
  GUESS
}