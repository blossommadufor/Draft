import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { soundEffects } from '../../lib/sound'
import { Trophy, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react'

export default function FlashcardSummary({ totalCards, masteredCount, needsReviewCount, onRestart, onReviewMissed, onTakeQuiz }) {
  useEffect(() => {
    soundEffects.playCelebration()
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#10B981', '#F59E0B'],
      })
    } catch (e) {}
  }, [])

  const masteryPercent = Math.round((masteredCount / totalCards) * 100) || 0

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-8 px-3 text-center space-y-6 sm:space-y-7 animate-fadein">
      
      {/* Trophy Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gold-500/15 border border-gold-500/30 text-gold-500 dark:text-gold-400 flex items-center justify-center shadow-glow-gold animate-bounce">
        <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Session Complete!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          You've completed your active recall revision deck.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08]">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Cards</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">{totalCards}</div>
        </div>
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-dark-900 border border-emerald-500/25">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Mastered</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">{masteredCount}</div>
        </div>
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-dark-900 border border-rose-500/25">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Review</span>
          <div className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono mt-1">{needsReviewCount}</div>
        </div>
      </div>

      {/* Progress Circle & Motivational Statement */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-dark-900/60 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-left gap-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Retention Mastery: {masteryPercent}%</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {masteryPercent >= 80
              ? 'Outstanding grasp of the foundational concepts!'
              : 'Keep reviewing the missed cards to lock them into long-term memory.'}
          </p>
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold font-mono flex items-center justify-center text-xs sm:text-sm shrink-0">
          {masteryPercent}%
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 sm:pt-4">
        {needsReviewCount > 0 && (
          <button
            onClick={onReviewMissed}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-50 dark:bg-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-300 font-semibold text-xs border border-rose-200 dark:border-rose-500/30 flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Review Missed ({needsReviewCount})</span>
          </button>
        )}

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart All Cards</span>
        </button>

        <button
          onClick={onTakeQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-brand flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Test in Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
