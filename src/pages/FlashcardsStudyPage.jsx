import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { useSpeech } from '../hooks/useSpeech'
import { soundEffects } from '../lib/sound'
import FlashcardSummary from '../components/flashcards/FlashcardSummary'
import Modal from '../components/common/Modal'
import {
  Volume2,
  X,
  RotateCw,
  Lightbulb,
  Check,
  AlertCircle
} from 'lucide-react'

export default function FlashcardsStudyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studySets, activeSet, toggleCardMastery } = useStudy()
  const { speak, stop, isSpeaking } = useSpeech()

  // Find deck by ID or activeSet or first set
  const deck = studySets.find((s) => s.id === id) || activeSet || studySets[0]

  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const [sessionResults, setSessionResults] = useState({
    mastered: [],
    needsReview: [],
  })

  // Initialize deck queue
  useEffect(() => {
    if (deck && deck.flashcards && deck.flashcards.length > 0) {
      setQueue([...deck.flashcards])
      setCurrentIndex(0)
      setIsFlipped(false)
      setIsFinished(false)
      setSessionResults({ mastered: [], needsReview: [] })
    }
  }, [deck])

  const currentCard = queue[currentIndex]

  // Flip card
  const handleFlip = useCallback(() => {
    soundEffects.playFlip()
    setIsFlipped((prev) => !prev)
  }, [])

  // Mark Still Learning [1]
  const handleStillLearning = useCallback(() => {
    if (!currentCard) return
    soundEffects.playWrong()
    stop()

    setSessionResults((prev) => ({
      ...prev,
      needsReview: [...prev.needsReview.filter((c) => c.id !== currentCard.id), currentCard],
    }))

    // Spaced repetition: put back in queue!
    setQueue((prev) => [...prev, currentCard])

    advanceCard()
  }, [currentCard, stop])

  // Mark Know [2]
  const handleKnow = useCallback(() => {
    if (!currentCard) return
    soundEffects.playCorrect()
    stop()

    if (deck) {
      toggleCardMastery(deck.id, currentCard.id)
    }

    setSessionResults((prev) => ({
      ...prev,
      mastered: [...prev.mastered.filter((c) => c.id !== currentCard.id), currentCard],
      needsReview: prev.needsReview.filter((c) => c.id !== currentCard.id),
    }))

    advanceCard()
  }, [currentCard, deck, toggleCardMastery, stop])

  const advanceCard = () => {
    setIsFlipped(false)
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  // Keyboard Shortcuts Handler: Space (flip), 1 (Still learning), 2 (Know)
  useEffect(() => {
    function handleKeyDown(e) {
      if (showExitModal || isFinished) return

      if (e.code === 'Space') {
        e.preventDefault()
        handleFlip()
      } else if (e.key === '1') {
        e.preventDefault()
        handleStillLearning()
      } else if (e.key === '2') {
        e.preventDefault()
        handleKnow()
      } else if (e.key === 'Escape') {
        setShowExitModal(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleFlip, handleStillLearning, handleKnow, showExitModal, isFinished])

  // Handle Speech Recitation
  const handleSpeakCard = (e) => {
    e.stopPropagation()
    if (!currentCard) return
    if (isSpeaking) {
      stop()
    } else {
      const textToRead = isFlipped ? currentCard.definition : currentCard.term
      speak(textToRead)
    }
  }

  if (!deck || !deck.flashcards || deck.flashcards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">No flashcards found in this study deck.</p>
        <button
          onClick={() => navigate('/dashboard/flashcards/create')}
          className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs"
        >
          Create Flashcards
        </button>
      </div>
    )
  }

  if (isFinished) {
    return (
      <FlashcardSummary
        totalCards={deck.flashcards.length}
        masteredCount={sessionResults.mastered.length}
        needsReviewCount={sessionResults.needsReview.length}
        onRestart={() => {
          setQueue([...deck.flashcards])
          setCurrentIndex(0)
          setIsFinished(false)
          setIsFlipped(false)
          setSessionResults({ mastered: [], needsReview: [] })
        }}
        onReviewMissed={() => {
          if (sessionResults.needsReview.length > 0) {
            setQueue([...sessionResults.needsReview])
            setCurrentIndex(0)
            setIsFinished(false)
            setIsFlipped(false)
            setSessionResults((prev) => ({ ...prev, needsReview: [] }))
          }
        }}
        onTakeQuiz={() => navigate(`/dashboard/multiple-choice-questions/${deck.id}/practice`)}
      />
    )
  }

  const progressPercent = Math.round(((currentIndex + 1) / queue.length) * 100)

  return (
    <div className="max-w-2xl mx-auto py-2 sm:py-4 flex flex-col min-h-[calc(100dvh-12rem)] md:min-h-[calc(100vh-8rem)] justify-between animate-fadein">
      
      {/* Top Header Bar (ExamCrush Screen 1188 & 1190) */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          {/* Audio TTS Button */}
          <button
            onClick={handleSpeakCard}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-colors ${
              isSpeaking
                ? 'bg-brand-500/20 text-brand-600 dark:text-brand-300 border-brand-500/40 animate-pulse'
                : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/[0.08]'
            }`}
            title="Read card aloud"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-[11px] font-medium">{isSpeaking ? 'Speaking...' : 'Listen'}</span>
          </button>

          {/* Progress Indicator (ExamCrush Screen 1190: 1/106) */}
          <div className="text-center font-mono font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            {currentIndex + 1} / {queue.length}
          </div>

          {/* Exit Button with Procrastination Modal */}
          <button
            onClick={() => setShowExitModal(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            title="End study session"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-dark-900 rounded-full h-1.5 overflow-hidden border border-slate-200 dark:border-white/[0.04] mb-4 sm:mb-6">
          <div
            className="bg-gradient-to-r from-brand-600 to-indigo-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3D Flip Flashcard (ExamCrush Screen 1189 & 1190) */}
      <div 
        className="perspective-1000 w-full min-h-[290px] sm:min-h-[350px] md:min-h-[380px] my-auto cursor-pointer" 
        onClick={handleFlip}
      >
        <div className={`flashcard-inner relative w-full h-full min-h-[290px] sm:min-h-[350px] md:min-h-[380px] rounded-3xl ${isFlipped ? 'flipped' : ''}`}>
          
          {/* Front Face: Question */}
          <div className="flashcard-front p-5 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between select-none transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[11px] text-brand-600 dark:text-brand-400 truncate max-w-[180px]">
                {currentCard?.tag || 'Question'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">Tap to Flip</span>
            </div>

            <div className="my-auto text-center py-3 sm:py-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentCard?.term}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs pt-3 sm:pt-4 border-t border-slate-100 dark:border-white/[0.06] text-slate-500 dark:text-slate-400">
              {currentCard?.hint ? (
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Lightbulb className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span className="truncate max-w-xs">{currentCard.hint}</span>
                </span>
              ) : (
                <span />
              )}
              <span className="text-brand-600 dark:text-brand-400 font-semibold hover:underline text-[11px] sm:text-xs">
                Tap to reveal answer →
              </span>
            </div>
          </div>

          {/* Back Face: Answer */}
          <div className="flashcard-back p-5 sm:p-8 md:p-10 rounded-3xl bg-slate-50 dark:bg-gradient-to-b dark:from-dark-850 dark:to-dark-900 border border-brand-500/30 shadow-glow-brand flex flex-col justify-between select-none transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Answer & Definition
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">Tap to Flip Back</span>
            </div>

            <div className="my-auto py-3 sm:py-4 overflow-y-auto max-h-[180px] sm:max-h-none">
              <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                {currentCard?.definition}
              </p>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="italic text-[11px] sm:text-xs">Ready to grade your recall?</span>
              <span className="font-mono text-[10px] sm:text-[11px] text-slate-400">Keys: [1] or [2]</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Controls (ExamCrush Screen 1190) */}
      <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Still Learning [Shortcut key : 1] */}
        <button
          onClick={handleStillLearning}
          className="flex-1 min-h-[44px] py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 shadow-sm"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>Still learning</span>
          <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-500/20 text-[10px] font-mono">
            [1]
          </span>
        </button>

        {/* Flip Button */}
        <button
          onClick={handleFlip}
          className="min-h-[44px] min-w-[44px] p-2.5 sm:p-3.5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center shrink-0"
          title="Flip Card [Spacebar]"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {/* Know [Shortcut key : 2] */}
        <button
          onClick={handleKnow}
          className="flex-1 min-h-[44px] py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 hover:bg-emerald-100 dark:hover:bg-emerald-500/25 border border-emerald-200 dark:border-emerald-500/35 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 shadow-sm"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Know</span>
          <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-500/20 text-[10px] font-mono">
            [2]
          </span>
        </button>

      </div>

      {/* Procrastination Exit Modal (ExamCrush Screen 1191) */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="End Practice?"
        maxWidth="max-w-md"
      >
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Are you sure you want to end practice?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Don't let procrastination win you...
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowExitModal(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-xs font-semibold text-slate-800 dark:text-white transition-colors"
            >
              Continue Practice
            </button>
            <button
              onClick={() => {
                setShowExitModal(false)
                navigate('/dashboard/flashcards')
              }}
              className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors"
            >
              End Practice
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

