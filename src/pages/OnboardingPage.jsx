import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { Sparkles, Layers, HelpCircle, BookOpen, Bot, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useStudy()

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-dark-950 transition-colors">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* Left Welcome Branding (ExamCrush Screen 1177) */}
        <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/25 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Draft AI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Welcome {user?.name || 'Scholar'},<br />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-brand-accent bg-clip-text text-transparent">
              Let's crush your exams...
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Your university study workspace is initialized. Pick an action below to generate your first study pack or explore the pre-loaded academic library.
          </p>

          <div className="pt-2">
            <Link
              to="/dashboard"
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white flex items-center gap-1.5 transition-colors min-h-[36px]"
            >
              <span>Skip straight to main dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Action Menu Card (ExamCrush Screen 1177) */}
        <div className="lg:col-span-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-2xl space-y-4">
          <div className="border-b border-slate-100 dark:border-white/[0.06] pb-3 sm:pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 1 of 1</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              Create your first study set!
            </h3>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {/* Action 1: Flashcards */}
            <button
              onClick={() => navigate('/dashboard/flashcards/create')}
              className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.06] hover:border-brand-500/50 hover:bg-brand-500/[0.03] transition-all flex items-center justify-between group text-left min-h-[52px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                    Generate flashcards
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">Active recall cards from PDF or notes</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>

            {/* Action 2: Multiple Choice Questions */}
            <button
              onClick={() => navigate('/dashboard/multiple-choice-questions/create')}
              className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.06] hover:border-gold-500/50 hover:bg-gold-500/[0.03] transition-all flex items-center justify-between group text-left min-h-[52px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors truncate">
                    Generate multiple choice ques.
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">Timed exam simulator with answers</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>

            {/* Action 3: Study Notes */}
            <button
              onClick={() => navigate('/dashboard/notes')}
              className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.06] hover:border-emerald-500/50 hover:bg-emerald-500/[0.03] transition-all flex items-center justify-between group text-left min-h-[52px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    Study executive notes
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">High-yield cheat sheets and key formulas</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>

            {/* Action 4: AI Tutor */}
            <button
              onClick={() => navigate('/dashboard/ai-tutor')}
              className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/50 hover:bg-cyan-500/[0.03] transition-all flex items-center justify-between group text-left min-h-[52px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                    AI Tutor
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">Ask questions and clarify difficult concepts</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

