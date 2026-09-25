import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../../context/StudyContext'
import { Search, Layers, HelpCircle, BookOpen, Trash2, GraduationCap } from 'lucide-react'

export default function RecentSetsList() {
  const navigate = useNavigate()
  const { studySets, selectSet, deleteStudySet, searchQuery, setSearchQuery } = useStudy()
  const [filterTopic, setFilterTopic] = useState('all')

  const filteredSets = studySets.filter((set) => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (set.subject && set.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (set.university && set.university.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-dark-900/90 border border-slate-200 dark:border-white/[0.08] shadow-sm">
      
      {/* List Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>My Study Decks & Question Banks</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {studySets.length} study collections saved in your browser
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sets by name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
          />
        </div>
      </div>

      {/* Decks Grid */}
      {filteredSets.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
          <p className="text-sm text-slate-500 dark:text-slate-400">No study decks match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSets.map((deck) => (
            <div
              key={deck.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-dark-850/80 border border-slate-200 dark:border-white/[0.06] hover:border-brand-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-1" title={deck.title}>
                    {deck.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm(`Delete "${deck.title}"?`)) {
                        deleteStudySet(deck.id)
                      }
                    }}
                    className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0"
                    title="Delete deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-slate-500 dark:text-slate-400">
                  {deck.subject && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300">
                      {deck.subject}
                    </span>
                  )}
                  {deck.university && (
                    <span className="px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-300">
                      {deck.university}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span>Deck Mastery</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{deck.masteryRate || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-dark-950 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-500 to-mint-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${deck.masteryRate || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                <button
                  onClick={() => {
                    selectSet(deck.id)
                    navigate(`/dashboard/flashcards/${deck.id}/study`)
                  }}
                  className="py-2 px-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Cards ({deck.flashcards?.length || 0})</span>
                </button>

                <button
                  onClick={() => {
                    selectSet(deck.id)
                    navigate(`/dashboard/multiple-choice-questions/${deck.id}/practice`)
                  }}
                  className="py-2 px-2 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Quiz ({deck.quiz?.length || 0})</span>
                </button>

                <button
                  onClick={() => {
                    selectSet(deck.id)
                    navigate('/dashboard/notes')
                  }}
                  className="py-2 px-2 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Summary</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
