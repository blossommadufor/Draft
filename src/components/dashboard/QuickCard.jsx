import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function QuickCard({ title, subtitle, icon: Icon, color, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="p-6 rounded-3xl bg-dark-900/90 border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between group shadow-card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-white/[0.02] rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none" />

      <div className="flex items-start justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl ${color.bg} ${color.border} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
          <Icon className={`w-7 h-7 ${color.text}`} />
        </div>
        {badge && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] text-slate-400 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  )
}

