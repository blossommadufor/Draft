import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layers, HelpCircle, Bot, Volume2, Check, ArrowRight } from 'lucide-react'

export default function FeatureShowcase() {
  const navigate = useNavigate()

  return (
    <section className="py-12 sm:py-20 md:py-24 space-y-16 sm:space-y-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Feature 1: Flashcards Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Active Recall System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            #1 AI Flashcards Maker with Keyboard Speed Controls
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Upload notes, lecture slides, or pasted text. Our model identifies key terminology, definitions, and memory triggers. Flip cards fluidly with <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-brand-600 dark:text-brand-300 font-mono text-xs">Spacebar</code> and rate your mastery with <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-brand-600 dark:text-brand-300 font-mono text-xs">1</code> and <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-brand-600 dark:text-brand-300 font-mono text-xs">2</code>.
          </p>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Fluid 3D flip animation with question hints</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Native text-to-speech audio for auditory learners</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Spaced repetition queue automatically re-tests difficult cards</span>
            </li>
          </ul>
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard/flashcards')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 group min-h-[38px]"
            >
              <span>Explore Flashcards Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Visual Flashcard Card Mockup */}
        <div className="lg:col-span-6 relative">
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-gradient-to-br dark:from-dark-850 dark:to-dark-900 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-5 sm:mb-6">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-brand-500" /> Card 1 of 12
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono font-semibold text-[11px]">
                Computer Science
              </span>
            </div>

            <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-950/60 border border-slate-200 dark:border-white/[0.06]">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Question</span>
              <h4 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Which disk scheduling algorithm minimizes average seek time but can lead to cylinder starvation?
              </h4>
              <p className="mt-2.5 sm:mt-3 text-xs text-brand-600 dark:text-brand-400 font-medium">Tap or press Space to reveal answer</p>
            </div>

            <div className="mt-5 sm:mt-6 flex items-center justify-between pt-3.5 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-500">
                <span className="w-5 h-5 rounded-lg bg-rose-500/15 border border-rose-500/25 flex items-center justify-center font-mono">1</span>
                <span>Still learning</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Know it</span>
                <span className="w-5 h-5 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center font-mono">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: MCQ Practice Engine with Instant Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-6 lg:order-2 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-300 border border-gold-500/20 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Exam Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Timed Multiple Choice Questions with Instant Answers
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Test yourself under real exam conditions. Get comprehensive rationale on why the correct answer is right and why distractors fail.
          </p>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Real-time countdown timer & question status grid</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>One-click "Ask AI Tutor: Why is this wrong?" on any option</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Detailed performance breakdown and targeted revision</span>
            </li>
          </ul>
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard/multiple-choice-questions')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 dark:text-gold-400 hover:text-gold-500 group min-h-[38px]"
            >
              <span>Launch Practice Quiz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Visual MCQ Mockup */}
        <div className="lg:col-span-6 lg:order-1">
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="font-bold text-slate-700 dark:text-slate-300">Question 2 of 10</span>
              <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 font-mono font-semibold">00:45 Remaining</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-4">
              What is the primary advantage of C-SCAN over traditional SCAN?
            </p>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400">
                A. Eliminates mechanical arm movement completely
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                ✓ B. Provides a more uniform waiting time across all cylinder requests
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400">
                C. Reduces power consumption of spindle motors
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.06] text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Explanation:</strong> In C-SCAN, cylinders are treated as a circular loop so no boundary tracks experience disproportionate wait times.
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Conversational AI Study Tutor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>24/7 AI Tutor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Stuck on a Concept? Chat Directly with Lumina AI
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Your personal private tutor grounded directly in your syllabus. Ask for simplified explanations, real-world analogies, or mnemonics to memorize hard lists before tests.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard/ai-tutor')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 group min-h-[38px]"
            >
              <span>Chat with Lumina Tutor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Visual AI Tutor Mockup */}
        <div className="lg:col-span-6">
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 shadow-2xl space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold shrink-0">
                You
              </div>
              <div className="p-3 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-dark-800 text-xs text-slate-800 dark:text-slate-200">
                How does Belady's Anomaly work in simple terms?
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-dark-950 border border-cyan-500/20 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                Imagine buying a bigger backpack, but suddenly you take <strong>longer</strong> to find your keys! Under FIFO, adding more memory frames can counter-intuitively increase page faults.
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
