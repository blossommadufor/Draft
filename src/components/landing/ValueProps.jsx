import React from 'react'
import { Clock, Brain, Target, HeartHandshake } from 'lucide-react'

export default function ValueProps() {
  const props = [
    {
      icon: Clock,
      title: 'Save Hours of Time',
      description: 'No more spending whole weekends manually writing flashcards. Generate hundreds of relevant study questions in 10 seconds.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: Brain,
      title: 'Remember 3x More',
      description: 'Active recall and spaced repetition algorithms scientifically proven to prevent the Ebbinghaus forgetting curve decay.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Target,
      title: 'Study Actively',
      description: 'Transform passive reading of boring lecture slides into engaging, interactive practice sessions that test your actual understanding.',
      color: 'text-brand-400',
      bg: 'bg-brand-500/10 border-brand-500/20',
    },
    {
      icon: HeartHandshake,
      title: 'Walk in Exam-Ready',
      description: 'Ditch the last-minute exam anxiety. Walk into exam halls with unshakeable confidence, knowing exactly what questions to expect.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ]

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-dark-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {props.map((p, idx) => {
            const Icon = p.icon
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-850/60 border border-slate-200 dark:border-white/[0.06] hover:border-brand-500/30 dark:hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group shadow-sm"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${p.bg} border flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${p.color}`} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

