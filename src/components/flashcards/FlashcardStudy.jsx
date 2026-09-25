import React, { useState, useEffect, useCallback } from 'react'
import { useStudy } from '../../context/StudyContext'
import { useSpeech } from '../../hooks/useSpeech'
import { soundEffects } from '../../lib/sound'
import FlashcardSummary from './FlashcardSummary'
import Modal from '../common/Modal'
import {
  Volume2,
  VolumeX,
  X,
  RotateCw,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Check,
  AlertCircle
} from 'lucide-react'

export default function FlashcardStudy() {
  const { activeSet, toggleCardMastery, setCurrentView } = useStudy()
  const { speak, stop, isSpeaking } = useSpeech()

  // Deck queue
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  // Tracking outcomes for current session
  const [sessionResults, setSessionResults] = useState({
    mastered: [],
    needsReview: [],
  })

  // Initialize queue from activeSet
  useEffect(() => {
    if (activeSet && activeSet.flashcards) {
      setQueue([...activeSet.flashcards])
      setCurrentIndex(0)
      setIsFlipped(false)
      setIsFinished(false)
      setSessionResults({ mastered: [], needsReview: [] })
    }
  }, [activeSet])

  const currentCard = queue[currentIndex]

  // Flip card
  const handleFlip = useCallback(() => {
    soundEffects.playFlip()
    setIsFlipped((prev) => !prev)
  }, [])

  // Mark Still Learning (Key: 1)
  const handleStillLearning = useCallback(() => {
    if (!currentCard) return
    soundEffects.playWrong()
    stop()

    setSessionResults((prev) => ({
      ...prev,
      needsReview: [...prev.needsReview.filter((c) => c.id !== currentCard.id), currentCard],
    }))

    // Re-queue card to end of queue for spaced repetition!
    setQueue((prev) => [...prev, currentCard])

    advanceCard()
  }, [currentCard, stop])

  // Mark Know / Mastered (Key: 2)
  const handleKnow = useCallback(() => {
    if (!currentCard) return
    soundEffects.playCorrect()
    stop()

    if (activeSet) {
      toggleCardMastery(activeSet.id, currentCard.id)
    }

    setSessionResults((prev) => ({
      ...prev,
      mastered: [...prev.mastered.filter((c) => c.id !== currentCard.id), currentCard],
      needsReview: prev.needsReview.filter((c) => c.id !== currentCard.id),
    }))

    advanceCard()
  }, [currentCard, activeSet, toggleCardMastery, stop])

  const advanceCard = () => {
    setIsFlipped(false)
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  // Keyboard Shortcuts Handler
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

  if (!activeSet || !activeSet.flashcards || activeSet.flashcards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">No flashcards in this deck yet.</p>
        <button
          onClick={() => setCurrentView('create')}
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
        totalCards={activeSet.flashcards.length}
        masteredCount={sessionResults.mastered.length}
        needsReviewCount={sessionResults.needsReview.length}
        onRestart={() => {
          setQueue([...activeSet.flashcards])
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
        onTakeQuiz={() => setCurrentView('quiz')}
      />
    )
  }

  const progressPercent = Math.round(((currentIndex + 1) / queue.length) * 100)

  return (
    <div className="max-w-2xl mx-auto py-4 flex flex-col min-h-[calc(100vh-8rem)] justify-between animate-fadein">
      
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          {/* Audio TTS Button */}
          <button
            onClick={handleSpeakCard}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
              isSpeaking
                ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 animate-pulse'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/[0.08]'
            }`}
            title="Read card aloud"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-[11px] font-medium">{isSpeaking ? 'Speaking...' : 'Listen'}</span>
          </button>

          {/* Progress Indicator */}
          <div className="text-center font-mono font-bold text-slate-300">
            {currentIndex + 1} / {queue.length}
          </div>

          {/* Exit Button */}
          <button
            onClick={() => setShowExitModal(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="End study session"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden border border-white/[0.04] mb-6">
          <div
            className="bg-gradient-to-r from-brand-600 to-indigo-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full min-h-[340px] sm:min-h-[380px] my-auto cursor-pointer" onClick={handleFlip}>
        <div className={`flashcard-inner relative w-full h-full min-h-[340px] sm:min-h-[380px] rounded-3xl ${isFlipped ? 'flipped' : ''}`}>
          
          {/* Front Face: Question */}
          <div className="flashcard-front p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl flex flex-col justify-between select-none">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[11px] text-brand-400">
                {currentCard.tag || 'Question'}
              </span>
              <span className="text-[11px] font-mono">Press Space to Flip</span>
            </div>

            <div className="my-auto text-center py-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                {currentCard.term}
              </h2>
            </div>

            <div className="flex items-center justify-between text-xs pt-4 border-t border-white/[0.06] text-slate-400">
              {currentCard.hint ? (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Lightbulb className="w-3.5 h-3.5 text-gold-400" />
                  <span className="truncate max-w-xs">{currentCard.hint}</span>
                </span>
              ) : (
                <span />
              )}
              <span className="text-brand-400 font-semibold hover:underline">
                Tap to reveal answer →
              </span>
            </div>
          </div>

          {/* Back Face: Answer & Explanation */}
          <div className="flashcard-back p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-brand-500/30 shadow-glow-brand flex flex-col justify-between select-none">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Answer & Definition
              </span>
              <span className="text-[11px] font-mono text-slate-500">Press Space to Flip Back</span>
            </div>

            <div className="my-auto py-4">
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed">
                {currentCard.definition}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="italic">Ready to grade your recall?</span>
              <span className="font-mono text-[11px] text-slate-500">Keys: [1] or [2]</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Action Controls (Keys: 1 Still Learning vs 2 Know) */}
      <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
        
        {/* Still Learning (Key 1) */}
        <button
          onClick={handleStillLearning}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>Still Learning</span>
          <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-[10px] font-mono">
            [1]
          </span>
        </button>

        {/* Flip Quick Button */}
        <button
          onClick={handleFlip}
          className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition-colors"
          title="Flip Card [Spacebar]"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {/* Know / Mastered (Key 2) */}
        <button
          onClick={handleKnow}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm shadow-emerald-500/10"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Know</span>
          <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono">
            [2]
          </span>
        </button>

      </div>

      {/* Exit Confirmation Modal (ExamCrush Screen 1191) */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="End Practice Session?"
        maxWidth="max-w-md"
      >
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Don't let procrastination win!</h4>
            <p className="text-xs text-slate-400 mt-1">
              You are {progressPercent}% through this deck. Leaving now will pause your active recall progress.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowExitModal(false)}
              className="flex-1 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition-colors"
            >
              Continue Practice
            </button>
            <button
              onClick={() => {
                setShowExitModal(false)
                setCurrentView('dashboard')
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

