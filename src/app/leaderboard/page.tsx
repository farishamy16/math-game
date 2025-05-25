import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/client'
import { Leaderboard } from '@/components/leaderboard/Leaderboard'

export const metadata: Metadata = {
  title: 'Math Game - Leaderboard',
  description: 'View top scores from math game players',
}

export const revalidate = 0 // Disable cache for this route

async function getLeaderboardData() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .limit(20)

  if (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }

  return data
}

export default async function LeaderboardPage() {
  const scores = await getLeaderboardData()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">🏆 Leaderboard</h1>
      <p className="text-center mb-8">
        Top players who have mastered rounding numbers!
      </p>
      
      <Leaderboard scores={scores} />

      <div className="text-center mt-8">
        <a href="/" className="btn btn-primary">
          Play Game
        </a>
      </div>
    </div>
  )
} 