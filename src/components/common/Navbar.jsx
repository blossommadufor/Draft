import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStudy } from '../../context/StudyContext'
import {
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Search,
  Plus,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  HelpCircle,
  Layers
} from 'lucide-react'

export default function Navbar({ onToggleMobileSidebar, isMobileSidebarOpen = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme, user, isSoundMuted, toggleSound, searchQuery, setSearchQuery } = useStudy()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const isHome = location.pathname === '/'
  const isDashboard = location.pathname.startsWith('/dashboard')

  // Close mobile public menu on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMobileSearchOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-dark-950/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Mobile Hamburger & Logo */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => {
              if (isDashboard && onToggleMobileSidebar) {
                onToggleMobileSidebar()
              } else {
                setIsMobileMenuOpen((prev) => !prev)
              }
            }}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none"
            aria-label={isDashboard ? 'Toggle sidebar' : 'Toggle navigation menu'}
          >
            {isDashboard ? (
              isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />
            ) : (
              isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Brand / Logo */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 to-brand-600 dark:from-white dark:via-slate-200 dark:to-brand-200 bg-clip-text text-transparent">
                DRAFT
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                AI Study
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
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

        {/* Global Desktop Search Bar (when in dashboard area) */}
        {!isHome && (
          <div className="hidden sm:flex flex-1 max-w-md mx-3">
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

        {/* Right Actions: Theme Toggle, Sound, Search Toggle, Auth/Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Mobile Search Button (when on dashboard and on small screens) */}
          {!isHome && (
            <button
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              title="Search Decks"
              className="sm:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

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
              className="hidden min-[400px]:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/25 text-gold-600 dark:text-gold-400 font-semibold text-xs shrink-0"
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 fill-gold-500" />
              <span>{user.streak}d</span>
            </div>
          )}

          {/* Auth Flow */}
          {user?.isLoggedIn ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/dashboard/flashcards/create"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Set</span>
              </Link>

              <Link
                to="/dashboard"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px] focus:outline-none shrink-0"
                title={`${user.name} • ${user.university}`}
              >
                <div className="w-full h-full rounded-[10px] bg-slate-50 dark:bg-dark-950 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  {user.name.charAt(0)}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/login"
                className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-4 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-sm transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Expandable Mobile Search Bar (sm:hidden) */}
      {!isHome && isMobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 pt-1 border-t border-slate-100 dark:border-white/[0.06] bg-white/95 dark:bg-dark-950/95 animate-fadein">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search decks & questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Public Dropdown Menu (when not in dashboard and hamburger clicked) */}
      {!isDashboard && isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-dark-950 px-4 py-4 space-y-3 shadow-2xl animate-fadein">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname.startsWith('/dashboard')
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/pricing'
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
              }`}
            >
              Pricing
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex flex-col gap-2">
            {!user?.isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200"
                >
                  Login to Account
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-500/20"
                >
                  Get Started Free
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard/flashcards/create"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-500/20 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Study Set</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
