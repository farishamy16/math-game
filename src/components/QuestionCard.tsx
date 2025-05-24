'use client'

import { Question } from '@/types/game'
import { motion } from 'framer-motion'

interface QuestionCardProps {
  question: Question
  selectedAnswer?: number
  onSelectAnswer: (answer: number) => void
  isSubmitted: boolean
  isCorrect?: boolean
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isSubmitted,
  isCorrect
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card bg-base-100 shadow-xl mb-6 ${
        isSubmitted
          ? isCorrect
            ? 'border-2 border-success'
            : 'border-2 border-error'
          : ''
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">
          {question.number} rounded off to the nearest 10 is..
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => !isSubmitted && onSelectAnswer(option)}
              disabled={isSubmitted}
              className={`btn ${
                selectedAnswer === option
                  ? isSubmitted
                    ? option === question.correctAnswer
                      ? 'btn-success'
                      : 'btn-error'
                    : 'btn-primary'
                  : isSubmitted && option === question.correctAnswer
                  ? 'btn-success'
                  : 'btn-outline'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 