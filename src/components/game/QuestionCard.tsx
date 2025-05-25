'use client'

import { QuestionCardProps } from '@/types/game'
import { motion } from 'framer-motion'

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isSubmitted,
  isCorrect
}: QuestionCardProps) {
  // Map numbers to letters for options
  const letters = ['A', 'B', 'C']

  const handleOptionClick = (option: number) => {
    if (isSubmitted) return
    // If clicking the same option, deselect it
    if (selectedAnswer === option) {
      onSelectAnswer(undefined)
    } else {
      onSelectAnswer(option)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div 
        className={`card bg-base-100 shadow-xl ${
          isSubmitted
            ? isCorrect
              ? 'border-2 border-success/50'
              : 'border-2 border-error/50'
            : 'hover:shadow-2xl transition-all duration-300'
        }`}
      >
        <div className="card-body p-6 md:p-8">
          {/* Question Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="badge badge-lg badge-primary text-lg px-4 py-3">Q{question.id}</span>
            <h2 className="card-title text-xl md:text-2xl font-medium">
              {question.number} rounded off to the nearest 10 is..
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={isSubmitted}
                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-200
                  flex items-center gap-4 group relative
                  ${
                    selectedAnswer === option
                      ? isSubmitted
                        ? option === question.correctAnswer
                          ? 'bg-success/20 text-success border-success'
                          : 'bg-error/20 text-error border-error'
                        : 'bg-primary/20 text-primary border-primary'
                      : isSubmitted && option === question.correctAnswer
                      ? 'bg-success/20 text-success border-success'
                      : 'bg-base-200 hover:bg-base-300 border-transparent'
                  }
                  border-2 font-medium
                `}
              >
                {/* Letter Circle */}
                <span className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg
                  ${
                    selectedAnswer === option
                      ? isSubmitted
                        ? option === question.correctAnswer
                          ? 'bg-success text-white'
                          : 'bg-error text-white'
                        : 'bg-primary text-white'
                      : isSubmitted && option === question.correctAnswer
                      ? 'bg-success text-white'
                      : 'bg-base-300 group-hover:bg-base-content/10'
                  }
                `}>
                  {letters[index]}
                </span>

                {/* Option Text */}
                <span className="text-lg">{option}</span>

                {/* Feedback Icon */}
                {isSubmitted ? (
                  <span className="absolute right-4">
                    {option === question.correctAnswer ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : selectedAnswer === option ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : null}
                  </span>
                ) : selectedAnswer === option && (
                  <span className="absolute right-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <div className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full
                ${isCorrect ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}
              `}>
                {isCorrect ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="font-medium">
                  {isCorrect ? 'Correct! Well done!' : 'Incorrect. Try again!'}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 