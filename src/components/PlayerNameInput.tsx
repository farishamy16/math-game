'use client'

interface PlayerNameInputProps {
  value: string;
  onChange: (name: string) => void;
  isSubmitted: boolean;
}

export function PlayerNameInput({ value, onChange, isSubmitted }: PlayerNameInputProps) {
  return (
    <div className="form-control w-full max-w-xs mx-auto mb-8">
      <label className="label">
        <span className="label-text">What is your name?</span>
      </label>
      <input
        type="text"
        id="playerName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isSubmitted}
        placeholder="Enter your name"
        className="input input-bordered w-full"
        required
      />
      {!value.trim() && (
        <label className="label">
          <span className="label-text-alt text-error">Name is required to submit answers</span>
        </label>
      )}
    </div>
  )
} 