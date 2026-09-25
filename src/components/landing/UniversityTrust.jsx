import React from 'react'
import { Award, Users, BookOpenCheck, ThumbsUp } from 'lucide-react'

export default function UniversityTrust() {
  const stats = [
    { label: 'Hours Saved on Studying', value: '1,200,000+', icon: Award },
    { label: 'Active University Students', value: '65,000+', icon: Users },
    { label: 'Report Better Memory Recall', value: '92%', icon: BookOpenCheck },
    { label: 'Exam Confidence Rating', value: '96%', icon: ThumbsUp },
  ]

  const universities = [
    'University of Lagos',
    'Covenant University',
    'University of Nigeria, Nsukka',
    'Afe Babalola University',
    'Babcock University',
    'University of Ibadan'
  ]

  return (
    <section className="py-12 sm:py-16 border-y border-slate-200 dark:border-white/[0.06] bg-slate-100/50 dark:bg-gradient-to-b dark:from-dark-900/60 dark:to-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* University Logos / Badges */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 mb-5 sm:mb-6">
            Empowering students across premier universities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6">
            {universities.map((uni, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:border-brand-500/30 transition-colors shadow-sm"
              >
                {uni}
              </div>
            ))}
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-6 border-t border-slate-200 dark:border-white/[0.06]">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div key={idx} className="text-center p-3 sm:p-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-2.5 sm:mb-3">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  {s.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {s.label}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

