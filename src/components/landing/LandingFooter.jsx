import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Heart } from 'lucide-react'

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-dark-950/80 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
            DRAFT AI
          </span>
          <span className="text-xs text-slate-500">
            • Built for ambitious students
          </span>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
          <Link to="/dashboard" className="hover:text-brand-600 dark:hover:text-white transition-colors">
            Student Dashboard
          </Link>
          <Link to="/dashboard/flashcards/create" className="hover:text-brand-600 dark:hover:text-white transition-colors">
            Create Study Set
          </Link>
          <Link to="/dashboard/flashcards" className="hover:text-brand-600 dark:hover:text-white transition-colors">
            Flashcards
          </Link>
          <Link to="/dashboard/multiple-choice-questions" className="hover:text-brand-600 dark:hover:text-white transition-colors">
            Practice MCQs
          </Link>
          <Link to="/pricing" className="hover:text-brand-600 dark:hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for high exam retention</span>
        </div>

      </div>
    </footer>
  )
}
