import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function QuickCard({ title, subtitle, icon: Icon, color, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-dark-900/90 border border-slate-200 dark:border-white/[0.08] hover:border-brand-500/40 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 text-left flex flex-col justify-between group shadow-sm hover:shadow-md relative overflow-hidden active:scale-[0.99]"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-brand-500/[0.03] dark:bg-white/[0.02] rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none" />

      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${color.bg} ${color.border} border flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}>
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${color.text}`} />
        </div>
        {badge && (
          <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-2 w-full">
        <div className="truncate">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors truncate">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{subtitle}</p>
        </div>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-400 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all shrink-0">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  )
}
