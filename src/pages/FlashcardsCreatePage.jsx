import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { extractTextFromPDF } from '../lib/pdf'
import { extractTopicsFromText, generateStudyPackFromAI } from '../lib/claude'
import TopicSelectorModal from '../components/studio/TopicSelectorModal'
import {
  UploadCloud,
  File,
  X,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react'

export default function FlashcardsCreatePage() {
  const navigate = useNavigate()
  const { saveStudySet, user } = useStudy()

  const [tab, setTab] = useState('generate') // 'generate' | 'manual'
  const [file, setFile] = useState(null)
  const [rawText, setRawText] = useState('')
  const [setName, setSetName] = useState('')
  const [cardCount, setCardCount] = useState(12)
  const [visibility, setVisibility] = useState('private')

  // Topic Extraction State
  const [extractedTopics, setExtractedTopics] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrorMessage('Please select a valid PDF file.')
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

    if (tab === 'generate') {
      if (!file && !rawText.trim()) {
        setErrorMessage('Please upload a PDF or enter lecture notes.')
        return
      }

      if (file) {
        try {
          setLoadingStep('Extracting text from PDF...')
          contentToProcess = await extractTextFromPDF(file)
        } catch (err) {
          setLoadingStep('')
          setErrorMessage(err.message || 'Error extracting PDF text.')
          return
        }
      }
    } else {
      if (!rawText.trim()) {
        setErrorMessage('Please enter terms and definitions.')
        return
      }
    }

    try {
      setLoadingStep('Analyzing syllabus & extracting core topics...')
      const topics = await extractTopicsFromText(contentToProcess)
      setExtractedTopics(topics)
      setSelectedTopics(topics)
      setIsModalOpen(true)
      setLoadingStep('')
    } catch (err) {
      setLoadingStep('')
      setErrorMessage('Topic extraction failed: ' + err.message)
    }
  }

  const handleConfirmGeneration = async () => {
    setIsModalOpen(false)
    setLoadingStep('Generating active recall flashcards...')

    let contentToProcess = rawText
    if (file) {
      contentToProcess = await extractTextFromPDF(file)
    }

    try {
      const generated = await generateStudyPackFromAI({
        text: contentToProcess,
        selectedTopics,
        cardCount,
        questionCount: 6,
        difficulty: 'Undergrad',
      })

      const newDeck = {
        id: `deck-${Date.now()}`,
        title: setName.trim() || generated.title || 'Untitled Flashcard Deck',
        subject: selectedTopics[0] || 'Curated Flashcards',
        university: user?.university || 'University of Lagos',
        createdAt: new Date().toISOString(),
        cardCount: generated.flashcards.length,
        quizCount: generated.quiz.length,
        masteryRate: 0,
        topics: selectedTopics,
        summary: generated.summary,
        flashcards: generated.flashcards,
        quiz: generated.quiz,
      }

      saveStudySet(newDeck)
      setLoadingStep('')
      navigate(`/dashboard/flashcards/${newDeck.id}/study`)
    } catch (err) {
      setLoadingStep('')
      setErrorMessage('Generation failed: ' + err.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fadein">
      
      {/* Page Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400">
          Curriculum Studio
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Create Flashcards
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Convert lectures into active recall flip cards with spaced repetition
        </p>
      </div>

      {/* Loading Overlay (ExamCrush Screen 1187) */}
      {loadingStep ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400 animate-bounce shadow-glow-brand">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400 font-mono">
              ACTIVE RECALL &gt; PASSIVE READING
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">{loadingStep}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Synthesizing memory triggers and spaced repetition intervals...
            </p>
          </div>

          <div className="max-w-md mx-auto w-full bg-slate-100 dark:bg-dark-950 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-white/[0.08]">
            <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500 h-full rounded-full animate-progress" />
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-6">
          
          {/* Top Mode Tabs (ExamCrush Screen 1183) */}
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

          {/* Form: Name of flashcard set */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Name of flashcard set
            </label>
            <input
              type="text"
              placeholder="e.g. Distributed Systems Final Review"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
            />
          </div>

          {/* Number of Flashcards Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Number of flashcards
              </span>
              <span className="font-mono font-bold text-brand-600 dark:text-brand-300">
                {cardCount}
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="30"
              step="2"
              value={cardCount}
              onChange={(e) => setCardCount(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-dark-950 rounded-lg"
            />
          </div>

          {/* Visibility Toggle (ExamCrush Screen 1184 & 1194) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Flashcard Visibility
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

          {/* Study Material Upload or Text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Study Material
            </label>

            {tab === 'generate' ? (
              file ? (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs">{file.name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {(file.size / 1024).toFixed(1)} KB • Ready for extraction
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
                  <label className="border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-brand-500/50 rounded-2xl p-6 text-center cursor-pointer block transition-colors bg-slate-50/50 dark:bg-white/[0.01]">
                    <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-1.5" />
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Drag your file here, or click to upload
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      [PDFs, lecture notes, textbook chapters]
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
                    placeholder="Or paste textbook notes / transcript directly here..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
              )
            ) : (
              <textarea
                rows={6}
                placeholder="Format each line as: Term: Definition"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              onClick={handleStartAnalysis}
              className="w-full py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-extrabold text-xs sm:text-sm shadow-glow-gold active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Topic Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Topic Selection Modal (ExamCrush Screen 1184 & 1185) */}
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

