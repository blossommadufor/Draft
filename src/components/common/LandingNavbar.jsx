import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  const handleScroll = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-dark-950/90 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
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

        {/* Center Anchor Links to Homepage Components (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="px-3.5 py-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Theme Toggle, Sign In, Get Started */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Explicit Light/Dark Toggle */}
          <ThemeToggle />

          {/* Sign In Button -> /auth?mode=login */}
          <Link
            to="/auth?mode=login"
            className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-xl transition-colors"
          >
            Sign In
          </Link>

          {/* Get Started Button -> /auth?mode=register */}
          <Link
            to="/auth?mode=register"
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md shadow-brand-500/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle showLabel={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 dark:border-white/[0.08] bg-white dark:bg-dark-950 px-4 pt-2 pb-6 space-y-3 animate-fadein">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2.5">
            <Link
              to="/auth?mode=login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.06]"
            >
              Sign In
            </Link>
            <Link
              to="/auth?mode=register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md shadow-brand-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

