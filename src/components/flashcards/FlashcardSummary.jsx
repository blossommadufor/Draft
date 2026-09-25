import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { soundEffects } from '../../lib/sound'
import { Trophy, RotateCcw, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

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
    <div className="max-w-xl mx-auto py-8 text-center space-y-7 animate-fadein">
      
      {/* Trophy Badge */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gold-500/15 border border-gold-500/30 text-gold-400 flex items-center justify-center shadow-glow-gold animate-bounce">
        <Trophy className="w-10 h-10" />
      </div>

      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Session Complete!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          You've completed your active recall revision deck.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/[0.08]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Cards</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{totalCards}</div>
        </div>
        <div className="p-4 rounded-2xl bg-dark-900 border border-emerald-500/25">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Mastered</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{masteredCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-dark-900 border border-rose-500/25">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Review</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono mt-1">{needsReviewCount}</div>
        </div>
      </div>

      {/* Progress Circle & Motivational Statement */}
      <div className="p-5 rounded-2xl bg-dark-900/60 border border-white/[0.06] flex items-center justify-between text-left">
        <div>
          <h4 className="text-sm font-bold text-white">Retention Mastery: {masteryPercent}%</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {masteryPercent >= 80
              ? 'Outstanding grasp of the foundational concepts!'
              : 'Keep reviewing the missed cards to lock them into long-term memory.'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-300 font-bold font-mono flex items-center justify-center text-sm shrink-0">
          {masteryPercent}%
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        {needsReviewCount > 0 && (
          <button
            onClick={onReviewMissed}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs border border-rose-500/30 flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Review Missed ({needsReviewCount})</span>
          </button>
        )}

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-semibold text-xs border border-white/10 flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart All Cards</span>
        </button>

        <button
          onClick={onTakeQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-brand flex items-center justify-center gap-2 transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Test Knowledge in Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

