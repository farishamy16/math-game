'use client'

import { useState, useEffect, useRef, CSSProperties } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { questions } from '@/data/questions'
import { GameState } from '@/types/game'
import { QuestionCard } from './QuestionCard'
import { NameInputModal } from './NameInputModal'
import { GameStats } from './GameStats'
import ReactConfetti from 'react-confetti'

const STORAGE_KEY = 'gameState'

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    selectedAnswers: {},
    isSubmitted: false,
    score: 0
  })
  const [tempName, setTempName] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })
  const scoreCardRef = useRef<HTMLDivElement>(null)
  const cheeringSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Load game state from localStorage on mount
    const storedState = localStorage.getItem(STORAGE_KEY)
    const storedName = localStorage.getItem('playerName')
    
    if (storedState) {
      const parsedState = JSON.parse(storedState)
      setGameState({
        ...parsedState,
        playerName: storedName || '' // Ensure playerName is always in sync
      })
    } else if (storedName) {
      setGameState(state => ({ ...state, playerName: storedName }))
    }
  }, [])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    // Always save state, even when submitted
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  // Initialize audio on component mount
  useEffect(() => {
    cheeringSound.current = new Audio('/sounds/mixkit-cheering-crowd-loud-whistle-610.wav')
    // Preload the audio and set volume to 30%
    cheeringSound.current.volume = 0.3
    cheeringSound.current.load()
  }, [])

  const handleAnswerSelect = (questionNumber: number, answer: number | undefined) => {
    // Don't allow changes if game is submitted
    if (gameState.isSubmitted) return

    setGameState((prev) => {
      const newAnswers = { ...prev.selectedAnswers }
      if (answer === undefined) {
        delete newAnswers[questionNumber]
      } else {
        newAnswers[questionNumber] = answer
      }
      return {
        ...prev,
        selectedAnswers: newAnswers
      }
    })
  }

  const handleSubmit = async () => {
    if (!gameState.playerName.trim()) {
      alert('Please enter your name before submitting!')
      return
    }

    const score = questions.reduce((acc, question) => {
      return gameState.selectedAnswers[question.number] === question.correctAnswer
        ? acc + 1
        : acc
    }, 0)

    // Save score to Supabase
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('scores')
        .insert([
          {
            player_name: gameState.playerName,
            score: score
          }
        ])

      if (error) throw error

      setGameState((prev) => ({
        ...prev,
        isSubmitted: true,
        score
      }))
      
      // Play cheering sound
      if (cheeringSound.current) {
        cheeringSound.current.currentTime = 0 // Reset to start
        cheeringSound.current.play()
        // Stop the sound after 6 seconds
        setTimeout(() => {
          if (cheeringSound.current) {
            cheeringSound.current.pause()
            cheeringSound.current.currentTime = 0
          }
        }, 6000)
      }

      // Show confetti for 5 seconds after submission
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)

      // Scroll to score card with smooth animation
      setTimeout(() => {
        scoreCardRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        })
      }, 100)
      
    } catch (error) {
      console.error('Error saving score:', error)
      alert('Failed to save score. Please try again.')
    }
  }

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (cheeringSound.current) {
        cheeringSound.current.pause()
        cheeringSound.current = null
      }
    }
  }, [])

  const handleReset = () => {
    // Clear both state and storage on reset
    setGameState({
      playerName: '',
      selectedAnswers: {},
      isSubmitted: false,
      score: 0
    })
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('playerName')
  }

  const handleNameSubmit = (name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }))
    localStorage.setItem('playerName', name)
  }

  const isAllQuestionsAnswered = questions.every(
    (q) => gameState.selectedAnswers[q.number] !== undefined
  )

  const progress = Math.round(
    (Object.keys(gameState.selectedAnswers).length / questions.length) * 100
  )

  return (
    <div className="max-w-3xl mx-auto">
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 50, pointerEvents: 'none' }}>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
        </div>
      )}
      
      <NameInputModal
        isOpen={!gameState.playerName.trim()}
        value={tempName}
        onChange={setTempName}
        onSubmit={handleNameSubmit}
      />

      <GameStats
        playerName={gameState.playerName}
        progress={progress}
        isSubmitted={gameState.isSubmitted}
        score={gameState.score}
        totalQuestions={questions.length}
      />

      <div className="space-y-8">
        {questions.map((question) => (
          <QuestionCard
            key={question.number}
            question={question}
            selectedAnswer={gameState.selectedAnswers[question.number]}
            onSelectAnswer={(answer) => handleAnswerSelect(question.number, answer)}
            isSubmitted={gameState.isSubmitted}
            isCorrect={
              gameState.isSubmitted &&
              gameState.selectedAnswers[question.number] === question.correctAnswer
            }
          />
        ))}
      </div>

      <div className="mt-8 mb-8 flex justify-center">
        {gameState.isSubmitted ? (
          <div ref={scoreCardRef} className="card bg-base-100 shadow-xl w-full max-w-md">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl mb-4">
                Score: {gameState.score} / {questions.length}
              </h2>
              <div 
                className="radial-progress" 
                style={{ "--value": (gameState.score / questions.length) * 100 } as CSSProperties}
              >
                {Math.round((gameState.score / questions.length) * 100)}%
              </div>
              <div className="card-actions mt-4 flex flex-col sm:flex-row gap-2 items-center justify-center w-full">
                <button onClick={handleReset} className="btn btn-primary w-full sm:w-auto">
                  Try Again
                </button>
                <Link href="/leaderboard" className="btn btn-outline w-full sm:w-auto">
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAllQuestionsAnswered || !gameState.playerName.trim()}
            className="btn btn-primary btn-wide"
          >
            Submit Answers
          </button>
        )}
      </div>
    </div>
  )
} 