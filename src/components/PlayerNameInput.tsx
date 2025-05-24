'use client'

interface PlayerNameInputProps {
  value: string;
  onChange: (name: string) => void;
  isSubmitted: boolean;
}

export function PlayerNameInput({ value, onChange, isSubmitted }: PlayerNameInputProps) {
  return (
    <div className="mb-8">
      <label 
        htmlFor="playerName" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Your Name:
      </label>
      <input
        type="text"
        id="playerName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isSubmitted}
        placeholder="Enter your name"
        className="input input-bordered w-full max-w-xs"
        required
      />
    </div>
  )
} 