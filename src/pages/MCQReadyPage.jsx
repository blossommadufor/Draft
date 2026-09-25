import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { HelpCircle, Share2, Check, X, Play } from 'lucide-react'

export default function MCQReadyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studySets, activeSet } = useStudy()
  const [copied, setCopied] = useState(false)

  const set = studySets.find((s) => s.id === id) || activeSet || studySets[0]

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-xl mx-auto py-12 text-center min-h-[calc(100vh-8rem)] flex flex-col justify-between animate-fadein">
      
      {/* Top Header bar with deck title and Close X */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-8">
        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{set?.title}</span>
        <button
          onClick={() => navigate('/dashboard/multiple-choice-questions')}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Illustration & Ready Text (ExamCrush Screen 1195) */}
      <div className="my-auto space-y-6">
        
        {/* QA Graphic */}
        <div className="w-28 h-28 mx-auto relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-gold-500/20 text-gold-500 flex items-center justify-center -translate-x-2 -translate-y-2 shadow-lg">
            <span className="text-3xl font-extrabold font-mono">Q</span>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-brand-500/20 text-brand-500 flex items-center justify-center translate-x-2 translate-y-2 shadow-lg absolute">
            <span className="text-3xl font-extrabold font-mono">A</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Your MCQ questions are ready
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
            {set?.quiz?.length || 0} questions generated from your study syllabus.
          </p>
        </div>

      </div>

      {/* Action Buttons (ExamCrush Screen 1195) */}
      <div className="space-y-3 pt-6 max-w-sm mx-auto w-full">
        {/* Yellow Practice Button */}
        <button
          onClick={() => navigate(`/dashboard/multiple-choice-questions/${set.id}/practice`)}
          className="w-full py-4 rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-extrabold text-sm shadow-glow-gold transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-dark-950" />
          <span>Practice</span>
        </button>

        {/* Share with Friends Button */}
        <button
          onClick={handleShare}
          className="w-full py-3.5 rounded-2xl bg-slate-100 dark:bg-dark-900 hover:bg-slate-200 dark:hover:bg-dark-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied to Clipboard!' : 'Share with friends'}</span>
        </button>
      </div>

    </div>
  )
}

