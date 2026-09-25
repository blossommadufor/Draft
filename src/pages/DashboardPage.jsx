import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import RecentSetsList from '../components/dashboard/RecentSetsList'
import QuickCard from '../components/dashboard/QuickCard'
import {
  Bot,
  HelpCircle,
  Layers,
  Gamepad2,
  Flame,
  CheckCircle,
  Lock,
  Sparkles,
  ArrowRight,
  BrainCircuit
} from 'lucide-react'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, activeSet } = useStudy()

  const streakMilestones = [
    { days: 7, label: '7 Days', unlocked: (user?.streak || 0) >= 7 },
    { days: 30, label: '30 Days', unlocked: (user?.streak || 0) >= 30 },
    { days: 60, label: '60 Days', unlocked: (user?.streak || 0) >= 60 },
    { days: 90, label: '90 Days', unlocked: (user?.streak || 0) >= 90 },
  ]

  return (
    <div className="space-y-8 animate-fadein">
      
      {/* Welcome Greeting Banner (ExamCrush Screen 1179 & 1193) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-dark-900 dark:via-dark-850 dark:to-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Active Semester • {user?.university || 'University of Lagos'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Good Morning, {user?.name || 'Student'} 🌞
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            What would you like to practice today? Your study streak is{' '}
            <span className="font-semibold text-gold-500 font-mono">{user?.streak || 1} Days</span>.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/flashcards/create')}
          className="self-start sm:self-center px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs sm:text-sm shadow-glow-brand active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upload New Notes</span>
        </button>
      </div>

      {/* 4 Core Quick Cards (ExamCrush Screen 1179) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <QuickCard
          title="Flashcards"
          subtitle="Active recall with keyboard shortcuts"
          icon={Layers}
          color={{
            bg: 'bg-brand-500/10',
            border: 'border-brand-500/25',
            text: 'text-brand-500',
          }}
          badge={activeSet ? `${activeSet.flashcards?.length || 0} cards` : null}
          onClick={() => navigate('/dashboard/flashcards')}
        />

        <QuickCard
          title="Multiple Choice"
          subtitle="Timed exam simulator with answers"
          icon={HelpCircle}
          color={{
            bg: 'bg-gold-500/10',
            border: 'border-gold-500/25',
            text: 'text-gold-500',
          }}
          badge={activeSet ? `${activeSet.quiz?.length || 0} questions` : null}
          onClick={() => navigate('/dashboard/multiple-choice-questions')}
        />

        <QuickCard
          title="AI Tutor"
          subtitle="Socratic clarifications & analogies"
          icon={Bot}
          color={{
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500/25',
            text: 'text-cyan-500',
          }}
          badge="24/7 AI"
          onClick={() => navigate('/dashboard/ai-tutor')}
        />

        <QuickCard
          title="Study Game"
          subtitle="Speed matching & memory challenge"
          icon={Gamepad2}
          color={{
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/25',
            text: 'text-purple-500',
          }}
          badge="Play & Learn"
          onClick={() => navigate('/dashboard/study-games')}
        />
      </div>

      {/* Split Row: Streak Tracker & Science Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Streak Tracker & Milestones */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-gold-500 fill-gold-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Daily Study Streak</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-300 border border-gold-500/20 font-mono">
                {user?.streak || 1} Days Active 🔥
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Track your daily progress and build streaks to stay consistent. Challenge yourself to keep the streak going!
            </p>

            <div className="grid grid-cols-4 gap-3">
              {streakMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                    m.unlocked
                      ? 'bg-gold-500/10 border-gold-500/30 text-gold-600 dark:text-gold-300'
                      : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <div className="mb-1.5">
                    {m.unlocked ? (
                      <CheckCircle className="w-4 h-4 text-gold-500" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                    )}
                  </div>
                  <span className="text-xs font-bold font-mono">{m.label}</span>
                  <span className="text-[10px] mt-0.5 text-slate-500 dark:text-slate-400">
                    {m.unlocked ? 'Achieved' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Total XP: <strong className="text-slate-900 dark:text-white font-mono">{user?.xp || 1450} XP</strong>
            </span>
            <button
              onClick={() => navigate('/dashboard/flashcards')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Continue Practice <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Study Science Tip */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-dark-850 dark:to-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Recall Science</h3>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
              &ldquo;Turn Everything Into Questions&rdquo;
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When you struggle to recall an answer before looking, synaptic connections fire <strong>3x stronger</strong> than passive re-reading.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">EXAM PROVEN</span>
            <button
              onClick={() => navigate('/dashboard/multiple-choice-questions')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              Take 5-Min Quiz
            </button>
          </div>
        </div>

      </div>

      {/* Recent Sets List */}
      <RecentSetsList />

    </div>
  )
}

