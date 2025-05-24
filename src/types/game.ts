export interface Question {
  number: number;
  options: number[];
  correctAnswer: number;
}

export interface GameState {
  playerName: string;
  selectedAnswers: Record<number, number>;
  isSubmitted: boolean;
  score: number;
}

export interface HighScore {
  playerName: string;
  score: number;
  timestamp: Date;
} 