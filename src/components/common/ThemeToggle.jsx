import React from 'react'
import { useStudy } from '../../context/StudyContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ showLabel = true, className = '' }) {
  const { theme, toggleTheme } = useStudy()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
        isDark
          ? 'bg-dark-800/80 hover:bg-dark-700 text-slate-200 border-white/10 hover:border-white/20 shadow-sm'
          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400 shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {showLabel && <span className="font-bold">Light</span>}
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          {showLabel && <span className="font-bold">Dark</span>}
        </>
      )}
    </button>
  )
}

