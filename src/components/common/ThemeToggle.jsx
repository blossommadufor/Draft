import React from 'react'
import { useStudy } from '../../context/StudyContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '', compactOnMobile = false }) {
  const { theme, toggleTheme } = useStudy()
  const isDark = theme === 'dark'

  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-xl bg-slate-200/90 dark:bg-dark-800 border border-slate-300 dark:border-white/10 shadow-sm transition-colors ${className}`}
      role="group"
      aria-label="Theme Mode Selection"
    >
      {/* Light Option */}
      <button
        type="button"
        onClick={() => {
          if (isDark) toggleTheme()
        }}
        aria-pressed={!isDark}
        title="Switch to Light Mode"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
          !isDark
            ? 'bg-white text-brand-700 shadow-sm shadow-black/10'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
        <span className={compactOnMobile ? 'hidden sm:inline' : 'inline'}>Light</span>
      </button>

      {/* Dark Option */}
      <button
        type="button"
        onClick={() => {
          if (!isDark) toggleTheme()
        }}
        aria-pressed={isDark}
        title="Switch to Dark Mode"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
          isDark
            ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-amber-300' : 'text-slate-500'}`} />
        <span className={compactOnMobile ? 'hidden sm:inline' : 'inline'}>Dark</span>
      </button>
    </div>
  )
}
