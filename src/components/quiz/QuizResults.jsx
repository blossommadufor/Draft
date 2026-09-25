import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { soundEffects } from '../../lib/sound'
import { Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, Clock, Award } from 'lucide-react'

export default function QuizResults({ score, total, timeSpentSeconds, onRetake, onViewCorrections, onGoToDashboard }) {
  const percentage = Math.round((score / total) * 100) || 0

  useEffect(() => {
    if (percentage >= 50) {
      soundEffects.playCelebration()
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#6366F1', '#10B981', '#F59E0B'],
        })
      } catch (e) {}
    } else {
      soundEffects.playWrong()
    }
  }, [percentage])

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const remaining = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-0 py-6 sm:py-10 text-center space-y-6 sm:space-y-7 animate-fadein">
      
      {/* Circular Gauge / Score Display (ExamCrush Screen 1199) */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            className="stroke-slate-200 dark:stroke-dark-850"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            className={`${
              percentage >= 70
                ? 'stroke-emerald-500'
                : percentage >= 50
                ? 'stroke-gold-400'
                : 'stroke-rose-500'
            } transition-all duration-1000 ease-out`}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 * (1 - percentage / 100)}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{percentage}%</span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Score</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {percentage >= 80
            ? 'Outstanding Performance!'
            : percentage >= 50
            ? 'Good Effort! Ready to Polish'
            : 'Keep Pushing! Revision Needed'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto">
          {percentage >= 80
            ? 'You have strongly retained the core mechanics of this topic.'
            : 'Review the detailed corrections below to cement the missed concepts.'}
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/[0.06] pb-2 text-left">
          Performance Breakdown
        </h4>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Correct Answers
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{score} / {total}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <XCircle className="w-4 h-4 text-rose-500" /> Missed Questions
          </span>
          <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{total - score}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Clock className="w-4 h-4 text-brand-500" /> Total Time Elapsed
          </span>
          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{formatTime(timeSpentSeconds)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onViewCorrections}
          className="w-full py-3.5 px-4 min-h-[48px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold transition-all active:scale-[0.99] flex items-center justify-center"
        >
          View Detailed Corrections & Explanations
        </button>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetake}
            className="flex-1 py-3 px-4 min-h-[44px] rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>

          <button
            onClick={onGoToDashboard}
            className="flex-1 py-3 px-4 min-h-[44px] rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  )
}

