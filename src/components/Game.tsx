'use client'

import { useState } from 'react'
import { questions } from '@/data/questions'
import { GameState } from '@/types/game'
import { PlayerNameInput } from './PlayerNameInput'
import { QuestionCard } from './QuestionCard'

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    selectedAnswers: {},
    isSubmitted: false,
    score: 0
  })

  const handleAnswerSelect = (questionNumber: number, answer: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionNumber]: answer
      }
    }))
  }

  const handleSubmit = () => {
    if (!gameState.playerName.trim()) {
      alert('Please enter your name before submitting!')
      return
    }

    const score = questions.reduce((acc, question) => {
      return gameState.selectedAnswers[question.number] === question.correctAnswer
        ? acc + 1
        : acc
    }, 0)

    setGameState((prev) => ({
      ...prev,
      isSubmitted: true,
      score
    }))
  }

  const handleReset = () => {
    setGameState({
      playerName: '',
      selectedAnswers: {},
      isSubmitted: false,
      score: 0
    })
  }

  const isAllQuestionsAnswered = questions.every(
    (q) => gameState.selectedAnswers[q.number] !== undefined
  )

  return (
    <div>
      <PlayerNameInput
        value={gameState.playerName}
        onChange={(name) => setGameState((prev) => ({ ...prev, playerName: name }))}
        isSubmitted={gameState.isSubmitted}
      />

      <div className="space-y-6">
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

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        {gameState.isSubmitted ? (
          <>
            <div className="text-2xl font-bold mb-4">
              Score: {gameState.score} / {questions.length}
            </div>
            <button onClick={handleReset} className="btn btn-primary">
              Try Again
            </button>
          </>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAllQuestionsAnswered || !gameState.playerName.trim()}
            className="btn btn-primary"
          >
            Submit Answers
          </button>
        )}
      </div>
    </div>
  )
} 