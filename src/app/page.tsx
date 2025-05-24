import { Metadata } from 'next'
import { Game } from '@/components/Game'

export const metadata: Metadata = {
  title: 'Math Game - Rounding to Nearest 10',
  description: 'Interactive math game for practicing rounding numbers to the nearest 10',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      <div className="hero py-8">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Rounding Off to Nearest 10</h1>
            <p className="py-6">
              Practice rounding numbers to the nearest 10 with this interactive game. 
              Enter your name and answer all questions to test your skills!
            </p>
            <Game />
          </div>
        </div>
      </div>
    </main>
  )
}
