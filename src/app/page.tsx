import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Math Game - Welcome',
  description: 'Interactive math game for practicing rounding numbers to the nearest 10',
}

export default function Home() {
  return (
    <div className="hero min-h-[calc(100vh-2rem)]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-8">Welcome to Math Game!</h1>
          <p className="text-xl mb-4">
            Test your skills in rounding numbers to the nearest 10.
          </p>
          <p className="mb-8 opacity-80">
            Challenge yourself with our interactive math game designed to help you master 
            the art of rounding numbers. Compete with others and track your progress on 
            the leaderboard!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/game" 
              className="btn btn-primary btn-lg"
            >
              Start Math Game
            </Link>
            <Link 
              href="/leaderboard" 
              className="btn btn-outline btn-lg"
            >
              View Leaderboard
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Practice</h2>
                <p>Improve your rounding skills with interactive questions</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Compete</h2>
                <p>Challenge yourself and compete with other players</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Track</h2>
                <p>Monitor your progress on the leaderboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
