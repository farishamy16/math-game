import { Metadata } from 'next'
import { Game } from '@/components/Game'
import { ResetButton } from '@/components/ui/ResetButton'

export const metadata: Metadata = {
  title: 'Math Game - Play',
  description: 'Play the math game and practice rounding numbers to the nearest 10',
}

export default function GamePage() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          {/* Header with Reset Button */}
          <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center sm:text-left">
              Rounding Off to<br className="sm:hidden" /> Nearest 10
            </h1>
            <ResetButton />
          </div>
          
          {/* Description */}
          <p className="text-lg text-center text-base-content/80">
            
            Choose the correct answer from the options provided.
          </p>
          <p className="text-sm text-center text-base-content/60">
          Copyright: www.mathinenglish.com
          </p>
          
          {/* Optional: Divider */}
          <div className="w-full h-px bg-base-content/10"></div>
        </div>
      </div>
      <Game />
    </div>
  )
} 