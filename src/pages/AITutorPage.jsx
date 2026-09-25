import React, { useState } from 'react'
import { useStudy } from '../context/StudyContext'
import AITutorChat from '../components/tutor/AITutorChat'
import { Bot, Sparkles, BookOpen, Search, Plus, MessageSquare } from 'lucide-react'

export default function AITutorPage() {
  const { studySets, activeSet } = useStudy()
  const [viewMode, setViewMode] = useState('chat') // 'chat' | 'lessons'
  const [searchLesson, setSearchLesson] = useState('')

  return (
    <div className="space-y-6 animate-fadein relative pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span>AI Tutor</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personal 24/7 Socratic learning assistant grounded in your curriculum
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08]">
          <button
            onClick={() => setViewMode('chat')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewMode === 'chat'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Interactive Chat
          </button>
          <button
            onClick={() => setViewMode('lessons')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              viewMode === 'lessons'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Lesson Hub
          </button>
        </div>
      </div>

      {viewMode === 'chat' ? (
        <AITutorChat />
      ) : (
        /* Lesson Hub matching ExamCrush Screen 1180 */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Left Column: 2 Action Cards */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => setViewMode('chat')}
              className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 hover:shadow-lg transition-all text-left flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Create AI Lesson
                </h3>
                <p className="text-xs text-slate-500">Structured breakdown of a difficult topic</p>
              </div>
            </button>

            <button
              onClick={() => setViewMode('chat')}
              className="w-full p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] hover:border-brand-500/40 hover:shadow-lg transition-all text-left flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  Practice Lesson
                </h3>
                <p className="text-xs text-slate-500">Interactive Q&A on active deck</p>
              </div>
            </button>
          </div>

          {/* Right Column: Recent Lessons */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Lessons</h3>
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchLesson}
                onChange={(e) => setSearchLesson(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div className="space-y-3 pt-2">
              {studySets.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setViewMode('chat')}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950/70 border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/40 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {s.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{s.topics?.length || 0} Topics covered</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">Open Chat →</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setViewMode('chat')}
              className="w-full py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create Lesson</span>
            </button>
          </div>

        </div>
      )}

    </div>
  )
}

