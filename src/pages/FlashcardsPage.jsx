import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { Layers, Plus, BookOpen, Search, Play, MoreVertical } from 'lucide-react'

export default function FlashcardsPage() {
  const navigate = useNavigate()
  const { studySets, activeSet, selectSet } = useStudy()
  const [searchTopic, setSearchTopic] = useState('')

  const filteredSets = studySets.filter((s) =>
    s.title.toLowerCase().includes(searchTopic.toLowerCase()) ||
    (s.subject && s.subject.toLowerCase().includes(searchTopic.toLowerCase()))
  )

  return (
    <div className="space-y-8 animate-fadein relative pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          My Flashcards
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your spaced repetition decks and master exam terminology
        </p>
      </div>

      {/* 2 Column Layout (ExamCrush Screen 1182) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3 Action Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Create Flashcards */}
          <button
            onClick={() => navigate('/dashboard/flashcards/create')}
            className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-brand-500/40 hover:shadow-lg transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plus className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  Create flashcards
                </h3>
                <p className="text-xs text-slate-500">From PDF notes or custom text</p>
              </div>
            </div>
          </button>

          {/* Card 2: Practice Flashcards */}
          <button
            onClick={() => {
              if (activeSet) {
                navigate(`/dashboard/flashcards/${activeSet.id}/study`)
              }
            }}
            className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/40 hover:shadow-lg transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Practice flashcards
                </h3>
                <p className="text-xs text-slate-500">Active deck: {activeSet?.title || 'None'}</p>
              </div>
            </div>
          </button>

          {/* Card 3: My drafts */}
          <button
            onClick={() => navigate('/dashboard/notes')}
            className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-purple-500/40 hover:shadow-lg transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  My drafts & notes
                </h3>
                <p className="text-xs text-slate-500">View saved executive summaries</p>
              </div>
            </div>
          </button>

        </div>

        {/* Right Column: Recent Flashcards List (ExamCrush Screen 1182) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-5">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent flashcards
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {studySets.length} Decks
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic or subject..."
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
            />
          </div>

          {/* Deck List */}
          <div className="space-y-3 pt-2">
            {filteredSets.map((set) => (
              <div
                key={set.id}
                onClick={() => {
                  selectSet(set.id)
                  navigate(`/dashboard/flashcards/${set.id}/study`)
                }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950/70 border border-slate-200 dark:border-white/[0.06] hover:border-brand-500/40 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 truncate">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                      {set.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {set.flashcards?.length || 0} Flashcards • {set.masteryRate || 0}% Mastered
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      selectSet(set.id)
                      navigate(`/dashboard/flashcards/${set.id}/study`)
                    }}
                    className="px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Study</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Floating Action Button (ExamCrush Screen 1182) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-20">
        <button
          onClick={() => {
            if (activeSet) {
              navigate(`/dashboard/flashcards/${activeSet.id}/study`)
            }
          }}
          className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold flex items-center gap-2 transition-all active:scale-95"
        >
          <Play className="w-4 h-4 fill-dark-950" />
          <span>+ Flashcard Study</span>
        </button>
      </div>

    </div>
  )
}

