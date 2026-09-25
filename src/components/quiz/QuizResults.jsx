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
    <div className="max-w-lg mx-auto py-10 text-center space-y-7 animate-fadein">
      
      {/* Circular Gauge / Score Display (ExamCrush Screen 1199) */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            className="stroke-dark-850"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            className={`${
              percentage >= 70
                ? 'stroke-emerald-400'
                : percentage >= 50
                ? 'stroke-gold-400'
                : 'stroke-rose-400'
            } transition-all duration-1000 ease-out`}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 * (1 - percentage / 100)}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-white font-mono">{percentage}%</span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Score</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {percentage >= 80
            ? 'Outstanding Performance!'
            : percentage >= 50
            ? 'Good Effort! Ready to Polish'
            : 'Keep Pushing! Revision Needed'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          {percentage >= 80
            ? 'You have strongly retained the core mechanics of this topic.'
            : 'Review the detailed corrections below to cement the missed concepts.'}
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-white/[0.08] shadow-card space-y-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/[0.06] pb-2">
          Performance Breakdown
        </h4>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct Answers
          </span>
          <span className="font-mono font-bold text-emerald-400">{score} / {total}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-2 text-slate-300">
            <XCircle className="w-4 h-4 text-rose-400" /> Missed Questions
          </span>
          <span className="font-mono font-bold text-rose-400">{total - score}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-brand-400" /> Total Time Elapsed
          </span>
          <span className="font-mono font-bold text-slate-200">{formatTime(timeSpentSeconds)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onViewCorrections}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold transition-all active:scale-[0.99]"
        >
          View Detailed Corrections & Explanations
        </button>

        <div className="flex gap-3">
          <button
            onClick={onRetake}
            className="flex-1 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-semibold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>

          <button
            onClick={onGoToDashboard}
            className="flex-1 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-semibold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  )
}

