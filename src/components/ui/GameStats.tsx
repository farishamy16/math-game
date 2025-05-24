interface GameStatsProps {
  playerName: string
  progress: number
  isSubmitted: boolean
  score: number
  totalQuestions: number
}

export function GameStats({ 
  playerName, 
  progress, 
  isSubmitted, 
  score, 
  totalQuestions 
}: GameStatsProps) {
  return (
    <div className="sticky top-0 z-10 pb-4 pt-4">
      <div className="stats shadow w-full grid grid-cols-2 sm:grid-cols-2 bg-base-100 border border-base-content/40">
        <div className="stat place-items-center sm:place-items-start bg-base-200/50">
          <div className="stat-title text-base-content/70">Player</div>
          <div className="stat-value text-xl md:text-2xl capitalize">
            {playerName || 'Anonymous'}
          </div>
          {isSubmitted && (
            <div className="stat-desc text-base font-medium">
              Final Score: {score} / {totalQuestions}
            </div>
          )}
        </div>
        <div className="stat place-items-center sm:place-items-start bg-base-200/50">
          <div className="stat-title text-base-content/70">Progress</div>
          <div className="stat-value text-xl md:text-2xl">{progress}%</div>
          <div className="w-full">
            <progress 
              className="progress progress-primary w-full" 
              value={progress} 
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </div>
  )
} 