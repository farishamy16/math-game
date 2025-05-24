import { Metadata } from 'next'
import { Game } from '@/components/Game'

export const metadata: Metadata = {
  title: 'Math Game - Rounding to Nearest 10',
  description: 'Interactive math game for practicing rounding numbers to the nearest 10',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Rounding Off to Nearest 10</h1>
        <Game />
      </div>
    </main>
  )
}
