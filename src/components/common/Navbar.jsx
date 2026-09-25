import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStudy } from '../../context/StudyContext'
import { Sparkles, Flame, Volume2, VolumeX, Search, Plus, Sun, Moon, LogIn, UserCheck } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme, user, isSoundMuted, toggleSound, searchQuery, setSearchQuery } = useStudy()

  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-dark-950/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-brand-600 dark:from-white dark:via-slate-200 dark:to-brand-200 bg-clip-text text-transparent">
                DRAFT
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                AI Study
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'text-brand-600 dark:text-white bg-slate-100 dark:bg-white/[0.06] font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-white/[0.03]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname.startsWith('/dashboard')
                  ? 'text-brand-600 dark:text-white bg-slate-100 dark:bg-white/[0.06] font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-white/[0.03]'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/pricing"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/pricing'
                  ? 'text-brand-600 dark:text-white bg-slate-100 dark:bg-white/[0.06] font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-white/[0.03]'
              }`}
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Global Search Bar (when in dashboard area) */}
        {!isHome && (
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search flashcards, practice questions, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
              />
            </div>
          </div>
        )}

        {/* Right Actions: Theme Toggle, Sound, Login/Register or Profile */}
        <div className="flex items-center gap-3">
          
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isSoundMuted ? 'Unmute study sounds' : 'Mute study sounds'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Daily Streak Flame */}
          {user?.isLoggedIn && (
            <div 
              title={`${user.streak} Day Study Streak!`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/25 text-gold-600 dark:text-gold-400 font-semibold text-xs"
            >
              <Flame className="w-4 h-4 text-gold-500 fill-gold-500" />
              <span>{user.streak}d</span>
            </div>
          )}

          {/* Auth Flow */}
          {user?.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard/flashcards/create"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Set</span>
              </Link>

              <Link
                to="/dashboard"
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px] focus:outline-none"
                title={`${user.name} • ${user.university}`}
              >
                <div className="w-full h-full rounded-[10px] bg-slate-50 dark:bg-dark-950 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  {user.name.charAt(0)}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-sm transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  )
}
