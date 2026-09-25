import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { extractTextFromPDF } from '../lib/pdf'
import { generateStudyPackFromAI } from '../lib/claude'
import {
  UploadCloud,
  File,
  X,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react'

export default function MCQCreatePage() {
  const navigate = useNavigate()
  const { saveStudySet, user } = useStudy()

  const [tab, setTab] = useState('generate')
  const [file, setFile] = useState(null)
  const [rawText, setRawText] = useState('')
  const [setName, setSetName] = useState('')
  const [questionCount, setQuestionCount] = useState(10)
  const [visibility, setVisibility] = useState('public')

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileUpload = (e) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (selected.type !== 'application/pdf') {
        setErrorMessage('Please select a PDF document.')
        return
      }
      setFile(selected)
      if (!setName) {
        setSetName(selected.name.replace(/\.[^/.]+$/, ''))
      }
      setErrorMessage('')
    }
  }

  const handleProceed = async () => {
    setErrorMessage('')
    let contentToProcess = rawText

    if (tab === 'generate') {
      if (!file && !rawText.trim()) {
        setErrorMessage('Please upload a PDF or enter lecture notes.')
        return
      }

      setLoading(true)
      if (file) {
        try {
          contentToProcess = await extractTextFromPDF(file)
        } catch (err) {
          setLoading(false)
          setErrorMessage('Could not extract PDF text.')
          return
        }
      }
    } else {
      if (!rawText.trim()) {
        setErrorMessage('Please enter notes or questions.')
        return
      }
      setLoading(true)
    }

    try {
      const generated = await generateStudyPackFromAI({
        text: contentToProcess,
        selectedTopics: [],
        cardCount: 8,
        questionCount,
        difficulty: 'Undergrad',
      })

      const newDeck = {
        id: `quiz-${Date.now()}`,
        title: setName.trim() || generated.title || 'Untitled MCQ Bank',
        subject: 'Exam Questions',
        university: user?.university || 'University of Lagos',
        createdAt: new Date().toISOString(),
        cardCount: generated.flashcards.length,
        quizCount: generated.quiz.length,
        masteryRate: 0,
        topics: ['Multiple Choice Questions', 'Exam Simulation'],
        summary: generated.summary,
        flashcards: generated.flashcards,
        quiz: generated.quiz,
      }

      saveStudySet(newDeck)
      setLoading(false)
      navigate(`/dashboard/multiple-choice-questions/${newDeck.id}/ready`)
    } catch (err) {
      setLoading(false)
      setErrorMessage('Failed to generate questions: ' + err.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fadein">
      
      {/* Page Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-gold-500">
          Exam Generator
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Create Practice Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Turn your notes into exam-style multiple-choice questions with answers & explanations
        </p>
      </div>

      {loading ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-500 animate-bounce shadow-glow-gold">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400 font-mono">
              EXAM SIMULATOR ENGINE
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
              Generating High-Yield MCQs...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Synthesizing plausible distractors and rigorous answer rationales...
            </p>
          </div>

          <div className="max-w-md mx-auto w-full bg-slate-100 dark:bg-dark-950 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-white/[0.08]">
            <div className="bg-gradient-to-r from-gold-500 via-amber-400 to-yellow-500 h-full rounded-full animate-progress" />
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-6">
          
          {/* Top Tabs (ExamCrush Screen 1194) */}
          <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] max-w-sm mx-auto">
            <button
              onClick={() => setTab('generate')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                tab === 'generate'
                  ? 'bg-gold-500 text-dark-950 font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Generate from material
            </button>
            <button
              onClick={() => setTab('manual')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                tab === 'manual'
                  ? 'bg-gold-500 text-dark-950 font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Create Manually
            </button>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-500 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name of Question Set */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Name of Question set
            </label>
            <input
              type="text"
              placeholder="e.g. Operating Systems Final MCQ Drill"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
            />
          </div>

          {/* Number of Questions Slider (ExamCrush Screen 1194) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Number of Questions
              </span>
              <span className="font-mono font-bold text-gold-600 dark:text-gold-400">
                {questionCount}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="25"
              step="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-dark-950 rounded-lg"
            />
          </div>

          {/* Question Set Visibility (ExamCrush Screen 1194) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Question Set Visibility
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  visibility === 'public'
                    ? 'bg-gold-500/20 border-gold-500 text-gold-600 dark:text-gold-300 font-bold'
                    : 'bg-slate-50 dark:bg-dark-950 border-slate-200 dark:border-white/[0.06] text-slate-500'
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  visibility === 'private'
                    ? 'bg-gold-500/20 border-gold-500 text-gold-600 dark:text-gold-300 font-bold'
                    : 'bg-slate-50 dark:bg-dark-950 border-slate-200 dark:border-white/[0.06] text-slate-500'
                }`}
              >
                Private
              </button>
            </div>
          </div>

          {/* Study Material */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Study Material
            </label>

            {tab === 'generate' ? (
              file ? (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs">{file.name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-gold-500/50 rounded-2xl p-6 text-center cursor-pointer block transition-colors bg-slate-50/50 dark:bg-white/[0.01]">
                    <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-1.5" />
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Upload PDF notes or past exam questions
                    </p>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Or paste lecture transcript or key points directly here..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              )
            ) : (
              <textarea
                rows={6}
                placeholder="Paste or write multiple choice questions directly..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-gold-500/50"
              />
            )}
          </div>

          {/* Yellow Action Button (ExamCrush Screen 1194) */}
          <div className="pt-2">
            <button
              onClick={handleProceed}
              className="w-full py-4 rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  )
}

