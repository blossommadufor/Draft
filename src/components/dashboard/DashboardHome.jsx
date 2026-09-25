import React from 'react'
import { useStudy } from '../../context/StudyContext'
import QuickCard from './QuickCard'
import RecentSetsList from './RecentSetsList'
import {
  Bot,
  HelpCircle,
  Layers,
  BookOpen,
  Flame,
  Award,
  Sparkles,
  Lock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react'

export default function DashboardHome() {
  const { userProfile, setCurrentView, selectSet, studySets, activeSet } = useStudy()

  const streakMilestones = [
    { days: 7, label: '7 Days', unlocked: userProfile.streak >= 7 },
    { days: 30, label: '30 Days', unlocked: userProfile.streak >= 30 },
    { days: 60, label: '60 Days', unlocked: userProfile.streak >= 60 },
    { days: 90, label: '90 Days', unlocked: userProfile.streak >= 90 },
  ]

  return (
    <div className="space-y-8 animate-fadein">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-white/[0.08] shadow-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-brand-500/10 blur-3xl pointer-events-none" />

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Active Semester Session • {userProfile.university}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {userProfile.name} ⚡
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            What would you like to master today? Your exam readiness score is{' '}
            <span className="font-semibold text-emerald-400 font-mono">88%</span>.
          </p>
        </div>

        {/* Quick Action Button */}
        <button
          onClick={() => setCurrentView('create')}
          className="self-start sm:self-center px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs sm:text-sm shadow-glow-brand active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upload New Notes</span>
        </button>
      </div>

      {/* 4 Core Quick Cards (Flashcards, MCQ, AI Tutor, Notes/Summary) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <QuickCard
          title="Flashcards"
          subtitle="Active recall with keyboard shortcuts"
          icon={Layers}
          color={{
            bg: 'bg-brand-500/10',
            border: 'border-brand-500/25',
            text: 'text-brand-400',
          }}
          badge={activeSet ? `${activeSet.flashcards?.length || 0} cards` : null}
          onClick={() => setCurrentView('flashcards')}
        />

        <QuickCard
          title="Practice MCQs"
          subtitle="Timed exam simulator with answers"
          icon={HelpCircle}
          color={{
            bg: 'bg-gold-500/10',
            border: 'border-gold-500/25',
            text: 'text-gold-400',
          }}
          badge={activeSet ? `${activeSet.quiz?.length || 0} questions` : null}
          onClick={() => setCurrentView('quiz')}
        />

        <QuickCard
          title="AI Study Tutor"
          subtitle="Socratic clarifications & analogies"
          icon={Bot}
          color={{
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500/25',
            text: 'text-cyan-400',
          }}
          badge="24/7 AI"
          onClick={() => setCurrentView('tutor')}
        />

        <QuickCard
          title="Executive Summary"
          subtitle="High-yield cheat sheets & formulas"
          icon={BookOpen}
          color={{
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/25',
            text: 'text-emerald-400',
          }}
          badge="High Yield"
          onClick={() => setCurrentView('summary')}
        />
      </div>

      {/* Split Row: Daily Streak & Achievement Progress + Study Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Streak Tracker & Milestones */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-dark-900/90 border border-white/[0.08] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-gold-400 fill-gold-400" />
                <h3 className="text-base font-bold text-white">Daily Study Streak</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 font-mono">
                {userProfile.streak} Days Running 🔥
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Consistency is the single biggest predictor of GPA performance. Study 10 minutes daily to keep your streak alive!
            </p>

            {/* Milestones grid */}
            <div className="grid grid-cols-4 gap-3">
              {streakMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                    m.unlocked
                      ? 'bg-gold-500/10 border-gold-500/30 text-gold-300'
                      : 'bg-white/[0.02] border-white/[0.06] text-slate-500'
                  }`}
                >
                  <div className="mb-1.5">
                    {m.unlocked ? (
                      <CheckCircle className="w-4 h-4 text-gold-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <span className="text-xs font-bold font-mono">{m.label}</span>
                  <span className="text-[10px] mt-0.5 text-slate-400">
                    {m.unlocked ? 'Achieved' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Study XP: <strong className="text-white font-mono">{userProfile.xp.toLocaleString()} XP</strong></span>
            <button
              onClick={() => setCurrentView('flashcards')}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              Continue Practice <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Cognitive Study Tip / Motivation */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-dark-850 to-dark-900 border border-white/[0.08] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">High-Yield Study Science</h3>
            </div>
            <h4 className="text-base font-extrabold text-white leading-snug">
              &ldquo;Active Recall &gt; Re-reading Slides&rdquo;
            </h4>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              When you struggle for 5 seconds to recall an answer before flipping a card, neural pathways are strengthened by up to <strong>300%</strong> compared to passively highlighting text.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">TIP OF THE DAY</span>
            <button
              onClick={() => setCurrentView('quiz')}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors"
            >
              Take 5-Min Quiz
            </button>
          </div>
        </div>

      </div>

      {/* Recent Study Sets List */}
      <RecentSetsList />

    </div>
  )
}
