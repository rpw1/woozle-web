import { GuessType } from "./guess-type";

export interface Guess {
  type: GuessType,
  song?: string
}