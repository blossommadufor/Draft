import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../../context/StudyContext'
import { Sparkles, ArrowRight, Play, CheckCircle2, ShieldCheck, UploadCloud, Star } from 'lucide-react'

export default function LandingHero() {
  const navigate = useNavigate()
  const { selectSet, studySets, user } = useStudy()

  const handleStart = () => {
    if (user?.isLoggedIn) {
      navigate('/dashboard/flashcards/create')
    } else {
      navigate('/login')
    }
  }

  const handleSampleDeck = () => {
    if (studySets.length > 0) {
      selectSet(studySets[0].id)
      navigate(`/dashboard/flashcards/${studySets[0].id}/study`)
    } else {
      navigate('/dashboard/flashcards')
    }
  }

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Urgency / Offer Pill Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-600 dark:text-gold-300 text-xs font-semibold backdrop-blur-md animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>EXAM REVISION READY — 100% Free Practice Decks Preloaded</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Turn Dense Notes into{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-brand-accent bg-clip-text text-transparent underline decoration-brand-500/40 decoration-wavy decoration-2">
              Straight A's
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Convert lecture PDFs, slides, and textbooks into smart flashcards, timed MCQ quizzes, and interactive AI tutoring in seconds. Study actively and retain 3x more.
          </p>
        </div>

        {/* Hero Interactive Split: Direct Quick Upload & Live Preview Card */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Action Box: Quick Upload Trigger */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-dark-900/80 border border-slate-200 dark:border-white/[0.08] shadow-card backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all pointer-events-none" />
            
            <div className="border-2 border-dashed border-brand-500/30 group-hover:border-brand-500/60 rounded-2xl p-8 text-center transition-colors bg-brand-500/[0.02]">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-brand-500/15">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Drop your lecture notes or syllabus
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Supports PDF files, pasted notes, handouts, or lecture slides
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow-brand flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Study Pack</span>
                </button>
                <button
                  onClick={handleSampleDeck}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 fill-slate-500 dark:fill-slate-300 text-slate-500 dark:text-slate-300" />
                  <span>Try Sample Deck</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant MCQ Generation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Active Recall Flashcards
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free
              </span>
            </div>
          </div>

          {/* Right Preview Box: Interactive Student Testimonial / Social Proof */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-dark-850 dark:to-dark-900 border border-slate-200 dark:border-white/10 shadow-2xl relative">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-[14px] bg-slate-100 dark:bg-dark-950 flex items-center justify-center font-bold text-slate-900 dark:text-white text-base">
                  FI
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Faith I.
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Verified Student
                  </span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Baze University • Pharmacology & Pathology</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3 text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
              ))}
            </div>

            <blockquote className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
              "I stumbled on this tool in my journey to distinctions in Pathology and Pharmacology. The AI quiz generator and spaced repetition flashcards are simply everything!"
            </blockquote>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Study Streak: <span className="font-bold text-gold-500">35 Days</span>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 transition-colors"
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
