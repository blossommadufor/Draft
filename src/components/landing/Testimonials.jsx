import React from 'react'
import { Star, Quote, CheckCircle2 } from 'lucide-react'

export default function Testimonials() {
  const reviews = [
    {
      name: 'Donald N.',
      school: 'Afe Babalola University',
      course: 'Civil Engineering',
      rating: 5,
      avatar: 'DN',
      comment:
        'Exam anxiety used to cripple my preparations. With this tool, I upload my lecture slides and boom—custom quizzes that actually stick. Passed my finals with 4.8 GPA!',
    },
    {
      name: 'Faith I.',
      school: 'Baze University',
      course: 'Pathology & Pharmacology',
      rating: 5,
      avatar: 'FI',
      comment:
        'I stumbled on this app in my journey to distinctions in medical sciences. The active recall flashcards and instant quiz explanations are simply everything. Best study tool ever.',
    },
    {
      name: 'Feyikayomi O.',
      school: 'Bowen University',
      course: 'Computer Science',
      rating: 5,
      avatar: 'FO',
      comment:
        'Seriously addictive study app! I use the keyboard shortcuts during bus commutes and library sessions. Quick to flip, clean explanations, and zero clutter.',
    },
  ]

  return (
    <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
          Student Success Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          Loved by Top-Performing Scholars
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          See how students are saving time, acing semester tests, and building permanent knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-dark-850/50 border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-gold-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center text-xs">
                {rev.avatar}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  {rev.name}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-400">
                  {rev.school} • {rev.course}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

