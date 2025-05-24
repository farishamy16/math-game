'use client'

export function ResetButton() {
  const handleReset = () => {
    // Clear localStorage
    localStorage.removeItem('playerName')
    
    // Force a complete page reload
    window.location.reload()
  }

  return (
    <button
      onClick={handleReset}
      className="btn btn-error btn-outline"
      title="Reset game and clear name"
    >
      Reset Game
    </button>
  )
} 