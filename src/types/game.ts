// Question related types
export interface Question {
  id: number;
  number: number;
  options: number[];
  correctAnswer: number;
}

// Game state and props types
export interface GameState {
  playerName: string;
  selectedAnswers: { [key: number]: number | undefined };
  isSubmitted: boolean;
  score: number;
}

export interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number;
  onSelectAnswer: (answer: number | undefined) => void;
  isSubmitted: boolean;
  isCorrect: boolean;
}

export interface NameInputModalProps {
  isOpen: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

// Layout component props
export interface SidebarProps {
  children: React.ReactNode;
}

// Leaderboard related types
export interface LeaderboardEntry {
  id: string;
  rank: number;
  player_name: string;
  score: number;
  created_at: string;
}

export interface LeaderboardProps {
  scores: LeaderboardEntry[];
}