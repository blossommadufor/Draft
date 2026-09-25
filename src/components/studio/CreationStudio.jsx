import React, { useState } from 'react'
import { useStudy } from '../../context/StudyContext'
import { extractTextFromPDF } from '../../lib/pdf'
import { extractTopicsFromText, generateStudyPackFromAI } from '../../lib/claude'
import TopicSelectorModal from './TopicSelectorModal'
import {
  UploadCloud,
  FileText,
  Sparkles,
  Sliders,
  CheckCircle,
  AlertCircle,
  File,
  X,
  Layers,
  HelpCircle,
  BookOpen
} from 'lucide-react'

export default function CreationStudio() {
  const { saveStudySet, setCurrentView, userProfile } = useStudy()

  // Creation mode: 'upload' | 'paste' | 'manual'
  const [inputMode, setInputMode] = useState('upload')
  const [file, setFile] = useState(null)
  const [rawText, setRawText] = useState('')
  const [setName, setSetName] = useState('')
  const [cardCount, setCardCount] = useState(12)
  const [questionCount, setQuestionCount] = useState(8)
  const [difficulty, setDifficulty] = useState('Undergrad')
  const [visibility, setVisibility] = useState('private')

  // Topic extraction & generation state
  const [extractedTopics, setExtractedTopics] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrorMessage('Please upload a valid PDF document.')
        return
      }
      setFile(selectedFile)
      if (!setName) {
        setSetName(selectedFile.name.replace(/\.[^/.]+$/, ''))
      }
      setErrorMessage('')
    }
  }

  const handleStartAnalysis = async () => {
    setErrorMessage('')
    let contentToProcess = rawText

    if (inputMode === 'upload') {
      if (!file) {
        setErrorMessage('Please upload a PDF file first.')
        return
      }
      try {
        setLoadingStep('Extracting readable text from PDF...')
        contentToProcess = await extractTextFromPDF(file)
        if (!contentToProcess || contentToProcess.length < 50) {
          throw new Error('Could not extract readable text. The PDF may be scanned or image-only.')
        }
      } catch (err) {
        setLoadingStep('')
        setErrorMessage(err.message || 'Error parsing PDF.')
        return
      }
    } else {
      if (!rawText.trim() || rawText.length < 50) {
        setErrorMessage('Please enter at least 50 characters of lecture notes or summary.')
        return
      }
    }

    try {
      setLoadingStep('Analyzing curriculum & extracting key topics...')
      const topics = await extractTopicsFromText(contentToProcess)
      setExtractedTopics(topics)
      setSelectedTopics(topics) // Default all selected
      setIsModalOpen(true)
      setLoadingStep('')
    } catch (err) {
      setLoadingStep('')
      setErrorMessage('Failed to extract topics: ' + err.message)
    }
  }

  const handleConfirmGeneration = async () => {
    setIsModalOpen(false)
    setLoadingStep('Synthesizing active recall flashcards & exam questions...')

    let contentToProcess = rawText
    if (inputMode === 'upload' && file) {
      contentToProcess = await extractTextFromPDF(file)
    }

    try {
      const generated = await generateStudyPackFromAI({
        text: contentToProcess,
        selectedTopics,
        cardCount,
        questionCount,
        difficulty,
      })

      const newStudySet = {
        id: `deck-${Date.now()}`,
        title: setName.trim() || generated.title || 'Untitled Study Deck',
        subject: selectedTopics[0] || 'Academic Revision',
        university: userProfile.university || 'General Studies',
        createdAt: new Date().toISOString(),
        cardCount: generated.flashcards.length,
        quizCount: generated.quiz.length,
        masteryRate: 0,
        topics: selectedTopics,
        summary: generated.summary,
        flashcards: generated.flashcards,
        quiz: generated.quiz,
      }

      saveStudySet(newStudySet)
      setLoadingStep('')
      setCurrentView('flashcards')
    } catch (err) {
      setLoadingStep('')
      setErrorMessage('Generation failed: ' + err.message)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-6 animate-fadein">
      
      {/* Studio Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-brand-400">
          Creation Studio
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Create a New Study Set
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Turn any lecture slide, syllabus, or notes into high-yield flashcards and practice quizzes.
        </p>
      </div>

      {/* Loading Overlay inspired by ExamCrush screen 1187 */}
      {loadingStep ? (
        <div className="p-12 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 animate-bounce shadow-glow-brand">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 font-mono">
              ACTIVE RECALL &gt; PASSIVE READING
            </span>
            <h3 className="text-xl font-bold text-white mt-2">{loadingStep}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Organizing cognitive memory triggers and distractors...
            </p>
          </div>

          <div className="max-w-md mx-auto w-full bg-dark-950 rounded-full h-2 overflow-hidden border border-white/[0.08]">
            <div className="bg-gradient-to-r from-brand-600 via-brand-400 to-indigo-500 h-full rounded-full animate-progress" />
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-dark-900 border border-white/[0.08] shadow-card space-y-7">
          
          {/* Top Pill Tabs */}
          <div className="flex p-1 rounded-2xl bg-dark-950 border border-white/[0.08] max-w-sm mx-auto">
            <button
              onClick={() => setInputMode('upload')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                inputMode === 'upload'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upload PDF
            </button>
            <button
              onClick={() => setInputMode('paste')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                inputMode === 'paste'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Paste Text / Notes
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Field 1: Name of Study Set */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Name of Study Set
            </label>
            <input
              type="text"
              placeholder="e.g. CSC308 - Distributed Systems Midterm Prep"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-dark-950 border border-white/[0.08] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50"
            />
          </div>

          {/* Form Field 2: Upload Area or Text Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Study Material
            </label>

            {inputMode === 'upload' ? (
              file ? (
                <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate max-w-xs">{file.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {(file.size / 1024).toFixed(1)} KB • Ready for extraction
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/[0.04] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-white/10 hover:border-brand-500/40 rounded-2xl p-8 text-center cursor-pointer block transition-colors bg-white/[0.01]">
                  <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    Click to select PDF or drag and drop here
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Up to 30 pages of slides, textbook chapters, or lecture notes
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )
            ) : (
              <textarea
                rows={6}
                placeholder="Paste your lecture notes, article excerpts, or syllabus content here..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-dark-950 border border-white/[0.08] text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
              />
            )}
          </div>

          {/* Form Field 3: Quantity Controls Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">Number of Flashcards</span>
                <span className="font-mono font-bold text-brand-300 px-2 py-0.5 rounded bg-brand-500/10">
                  {cardCount} cards
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="2"
                value={cardCount}
                onChange={(e) => setCardCount(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer h-1.5 bg-dark-950 rounded-lg"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">Number of MCQs</span>
                <span className="font-mono font-bold text-gold-400 px-2 py-0.5 rounded bg-gold-500/10">
                  {questionCount} questions
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                step="2"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer h-1.5 bg-dark-950 rounded-lg"
              />
            </div>
          </div>

          {/* Form Field 4: Difficulty Target */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Target Academic Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['High School', 'Undergrad', 'Exam Prep'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    difficulty === lvl
                      ? 'bg-brand-500/20 border-brand-500 text-white shadow-sm'
                      : 'bg-dark-950 border-white/[0.08] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Form Field 5: Visibility Toggle (ExamCrush Screen 1194) */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Set Visibility
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  visibility === 'private'
                    ? 'bg-dark-800 border-white/20 text-white'
                    : 'bg-dark-950 border-white/[0.06] text-slate-400'
                }`}
              >
                🔒 Private
              </button>
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  visibility === 'public'
                    ? 'bg-dark-800 border-white/20 text-white'
                    : 'bg-dark-950 border-white/[0.06] text-slate-400'
                }`}
              >
                🌍 Public Deck
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={handleStartAnalysis}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-brand active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Extract Topics & Synthesize Decks</span>
            </button>
          </div>

        </div>
      )}

      {/* Topic Selection Modal */}
      <TopicSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topics={extractedTopics}
        selectedTopics={selectedTopics}
        onToggleTopic={(topic) => {
          setSelectedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
          )
        }}
        onConfirm={handleConfirmGeneration}
        isGenerating={!!loadingStep}
      />

    </div>
  )
}

