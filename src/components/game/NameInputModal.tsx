'use client'

import { NameInputModalProps } from '@/types/game'
import { useRouter } from 'next/navigation'

export function NameInputModal({ isOpen, onSubmit, value, onChange }: NameInputModalProps) {
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  const handleClose = () => {
    router.push('/')
  }

  if (!isOpen) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button 
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-2xl mb-6">Welcome to Math Game!</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
              autoFocus
            />
            {!value.trim() && (
              <label className="label">
                <span className="label-text-alt text-error">Please enter your name to continue</span>
              </label>
            )}
          </div>
          <div className="modal-action">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!value.trim()}
            >
              Start Game
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={handleClose}></div>
    </div>
  )
} 