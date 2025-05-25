import { LeaderboardProps } from '@/types/game'

export function Leaderboard({ scores }: LeaderboardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry) => (
                <tr key={entry.id} className="hover">
                  <td>
                    <div className="flex items-center gap-2">
                      {entry.rank === 1 && (
                        <div className="tooltip" data-tip="1st Place">
                          🥇
                        </div>
                      )}
                      {entry.rank === 2 && (
                        <div className="tooltip" data-tip="2nd Place">
                          🥈
                        </div>
                      )}
                      {entry.rank === 3 && (
                        <div className="tooltip" data-tip="3rd Place">
                          🥉
                        </div>
                      )}
                      <span className="font-mono">{entry.rank}</span>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium">{entry.player_name}</div>
                  </td>
                  <td>
                    <div className="badge badge-primary">{entry.score}/12</div>
                  </td>
                  <td className="text-sm">
                    {new Date(entry.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {scores.length === 0 && (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">No scores yet!</h3>
            <p className="text-base-content/70">
              Be the first to submit your score.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 