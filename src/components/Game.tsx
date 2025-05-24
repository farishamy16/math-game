'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { questions } from '@/data/questions'
import { GameState } from '@/types/game'
import { QuestionCard } from './QuestionCard'
import { NameInputModal } from './ui/NameInputModal'
import { GameStats } from './ui/GameStats'

const STORAGE_KEY = 'gameState'

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    selectedAnswers: {},
    isSubmitted: false,
    score: 0
  })
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    // Load game state from localStorage on mount
    const storedState = localStorage.getItem(STORAGE_KEY)
    const storedName = localStorage.getItem('playerName')
    
    if (storedState) {
      const parsedState = JSON.parse(storedState)
      setGameState(prev => ({
        ...parsedState,
        playerName: storedName || '' // Ensure playerName is always in sync
      }))
    } else if (storedName) {
      setGameState(prev => ({ ...prev, playerName: storedName }))
    }
  }, [])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (!gameState.isSubmitted) { // Only save if game is not submitted
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    }
  }, [gameState])

  const handleAnswerSelect = (questionNumber: number, answer: number | undefined) => {
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

      // Clear saved game state after successful submission
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error saving score:', error)
      alert('Failed to save score. Please try again.')
    }
  }

  const handleReset = () => {
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
          <div className="card bg-base-100 shadow-xl w-full max-w-md">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl mb-4">
                Score: {gameState.score} / {questions.length}
              </h2>
              <div className="radial-progress text-primary" style={{"--value": (gameState.score / questions.length) * 100} as any}>
                {Math.round((gameState.score / questions.length) * 100)}%
              </div>
              <div className="card-actions mt-4 flex flex-col sm:flex-row gap-2">
                <button onClick={handleReset} className="btn btn-primary">
                  Try Again
                </button>
                <a href="/leaderboard" className="btn btn-outline">
                  View Leaderboard
                </a>
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