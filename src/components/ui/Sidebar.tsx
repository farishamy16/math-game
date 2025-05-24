'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { SidebarProps } from '@/types/game'

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname()
  const [playerName, setPlayerName] = useState<string>('')
  const drawerCheckboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load player name from localStorage on mount
    const storedName = localStorage.getItem('playerName')
    if (storedName) {
      setPlayerName(storedName)
    }

    // Listen for changes to player name
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'playerName') {
        setPlayerName(e.newValue || '')
      }
    }

    // Check for localStorage changes every second as a fallback
    const interval = setInterval(() => {
      const currentName = localStorage.getItem('playerName')
      if (currentName !== playerName) {
        setPlayerName(currentName || '')
      }
    }, 1000)

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [playerName])

  const getMenuItemClass = (path: string) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
    return pathname === path 
      ? `${baseClass} bg-primary text-primary-content font-medium shadow-lg` 
      : `${baseClass} hover:bg-base-200`
  }

  const handleMenuClick = () => {
    // Close drawer on mobile after menu item click
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false
    }
  }
  
  return (
    <div className="drawer lg:drawer-open">
      <input 
        id="main-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        ref={drawerCheckboxRef}
      />
      
      <div className="drawer-content">
        {/* Navbar for mobile */}
        <div className="navbar lg:hidden bg-base-100 z-20">
          <div className="flex-none">
            <label htmlFor="main-drawer" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href="/" className="text-xl font-bold" onClick={handleMenuClick}>Math Game</Link>
          </div>
        </div>

        {/* Main content */}
        <main className="min-h-screen bg-base-200 p-4">
          {children}
        </main>
      </div>
      
      <div className="drawer-side z-30">
        <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
          {/* Sidebar content */}
          <div className="mb-8">
            <div className="text-2xl font-bold mb-4">Math Game</div>
            {playerName && (
              <div className="card bg-base-200">
                <div className="card-body py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👋</span>
                    <div>
                      <h3 className="font-medium text-lg">Welcome!</h3>
                      <p className="text-xl opacity-70 capitalize">{playerName.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <ul className="flex flex-col gap-2">
            <li>
              <Link 
                href="/" 
                className={getMenuItemClass('/')}
                onClick={handleMenuClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/game" 
                className={getMenuItemClass('/game')}
                onClick={handleMenuClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                Quiz
              </Link>
            </li>
            <li>
              <Link 
                href="/leaderboard" 
                className={getMenuItemClass('/leaderboard')}
                onClick={handleMenuClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 