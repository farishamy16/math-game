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
      className="w-full"
    >
      <div className={`card w-full bg-base-100 shadow-xl ${
        isSubmitted
          ? isCorrect
            ? 'border-2 border-success'
            : 'border-2 border-error'
          : 'hover:shadow-2xl transition-shadow duration-200'
      }`}>
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">
            What is {question.number} rounded to the nearest 10?
          </h2>
          <div className="divider"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => !isSubmitted && onSelectAnswer(option)}
                disabled={isSubmitted}
                className={`btn btn-lg ${
                  selectedAnswer === option
                    ? isSubmitted
                      ? option === question.correctAnswer
                        ? 'btn-success'
                        : 'btn-error'
                      : 'btn-primary'
                    : isSubmitted && option === question.correctAnswer
                    ? 'btn-success'
                    : 'btn-outline btn-primary hover:btn-primary'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {isSubmitted && (
            <div className="mt-4 text-center">
              <div className={`badge badge-lg ${isCorrect ? 'badge-success' : 'badge-error'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 