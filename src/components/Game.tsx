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

  const progress = Math.round(
    (Object.keys(gameState.selectedAnswers).length / questions.length) * 100
  )

  return (
    <div className="flex flex-col items-center">
      <div className="stats shadow mb-8">
        <div className="stat">
          <div className="stat-title">Player</div>
          <div className="stat-value text-lg">
            {gameState.playerName || 'Anonymous'}
          </div>
          {gameState.isSubmitted && (
            <div className="stat-desc">
              Final Score: {gameState.score} / {questions.length}
            </div>
          )}
        </div>
        <div className="stat">
          <div className="stat-title">Progress</div>
          <div className="stat-value text-lg">{progress}%</div>
          <progress 
            className="progress progress-primary w-full" 
            value={progress} 
            max="100"
          ></progress>
        </div>
      </div>

      {!gameState.playerName.trim() && (
        <PlayerNameInput
          value={gameState.playerName}
          onChange={(name) => setGameState((prev) => ({ ...prev, playerName: name }))}
          isSubmitted={gameState.isSubmitted}
        />
      )}

      <div className="space-y-8 w-full">
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

      <div className="sticky bottom-4 w-full max-w-md mx-auto mt-8 flex justify-center">
        {gameState.isSubmitted ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl mb-4">
                Score: {gameState.score} / {questions.length}
              </h2>
              <div className="radial-progress text-primary" style={{"--value": (gameState.score / questions.length) * 100} as any}>
                {Math.round((gameState.score / questions.length) * 100)}%
              </div>
              <div className="card-actions mt-4">
                <button onClick={handleReset} className="btn btn-primary btn-wide">
                  Try Again
                </button>
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