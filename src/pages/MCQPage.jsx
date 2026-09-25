import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { HelpCircle, Plus, BookOpen, Search, Play, FileQuestion } from 'lucide-react'

export default function MCQPage() {
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
          My Practice Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Exam simulator with multiple-choice questions, timers, and explanations
        </p>
      </div>

      {/* 2 Column Layout (ExamCrush Screen 1181 & 1200) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3 Action Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Create MCQs */}
          <button
            onClick={() => navigate('/dashboard/multiple-choice-questions/create')}
            className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-gold-500/40 hover:shadow-lg transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plus className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  Create MCQs
                </h3>
                <p className="text-xs text-slate-500">From PDF or lecture notes</p>
              </div>
            </div>
          </button>

          {/* Card 2: My Questions / Practice */}
          <button
            onClick={() => {
              if (activeSet) {
                navigate(`/dashboard/multiple-choice-questions/${activeSet.id}/ready`)
              }
            }}
            className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-brand-500/40 hover:shadow-lg transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HelpCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  My questions
                </h3>
                <p className="text-xs text-slate-500">Active bank: {activeSet?.title || 'None'}</p>
              </div>
            </div>
          </button>

          {/* Card 3: My drafts */}
          <button
            onClick={() => navigate('/dashboard/notes')}
            className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/40 hover:shadow-lg transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  My drafts
                </h3>
                <p className="text-xs text-slate-500">Unfinished question sets</p>
              </div>
            </div>
          </button>

        </div>

        {/* Right Column: Recent Questions List (ExamCrush Screen 1200) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-5">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Questions
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {studySets.length} Question Banks
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions by topic..."
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
            />
          </div>

          {/* Question Banks List */}
          <div className="space-y-3 pt-2">
            {filteredSets.map((set) => (
              <div
                key={set.id}
                onClick={() => {
                  selectSet(set.id)
                  navigate(`/dashboard/multiple-choice-questions/${set.id}/ready`)
                }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950/70 border border-slate-200 dark:border-white/[0.06] hover:border-gold-500/40 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 truncate">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                    <FileQuestion className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors truncate">
                      {set.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {set.quiz?.length || 0} Questions • {set.subject || 'General'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      selectSet(set.id)
                      navigate(`/dashboard/multiple-choice-questions/${set.id}/ready`)
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Floating Action Button (ExamCrush Screen 1200) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => navigate('/dashboard/multiple-choice-questions/create')}
          className="px-6 py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Create Question</span>
        </button>
      </div>

    </div>
  )
}

