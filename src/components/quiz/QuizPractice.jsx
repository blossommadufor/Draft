import React, { useState, useEffect, useCallback } from 'react'
import { useStudy } from '../../context/StudyContext'
import { useSpeech } from '../../hooks/useSpeech'
import { soundEffects } from '../../lib/sound'
import QuizResults from './QuizResults'
import Modal from '../common/Modal'
import {
  Clock,
  Volume2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Bot,
  RotateCcw
} from 'lucide-react'

export default function QuizPractice() {
  const { activeSet, recordQuizAttempt, setCurrentView } = useStudy()
  const { speak, stop, isSpeaking } = useSpeech()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // { [questionId]: selectedOption }
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [tutorClarification, setTutorClarification] = useState(null) // { question, selectedOption, answer, explanation }

  const questions = activeSet?.quiz || []
  const currentQ = questions[currentIndex]

  // Timer interval
  useEffect(() => {
    if (isQuizCompleted || questions.length === 0) return
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isQuizCompleted, questions.length])

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60)
    const remaining = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`
  }

  // Handle Option Select
  const handleSelectOption = (option) => {
    if (!currentQ) return
    if (userAnswers[currentQ.id]) return // Already answered

    const isCorrect = option === currentQ.answer
    if (isCorrect) {
      soundEffects.playCorrect()
    } else {
      soundEffects.playWrong()
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }))
  }

  // Navigation handlers
  const handleNext = useCallback(() => {
    stop()
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Calculate score and complete
      let score = 0
      questions.forEach((q) => {
        if (userAnswers[q.id] === q.answer) {
          score++
        }
      })
      if (activeSet) {
        recordQuizAttempt(activeSet.id, {
          score,
          total: questions.length,
          timeSpent: secondsElapsed,
        })
      }
      setIsQuizCompleted(true)
    }
  }, [currentIndex, questions, userAnswers, activeSet, recordQuizAttempt, secondsElapsed, stop])

  const handlePrev = useCallback(() => {
    stop()
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex, stop])

  // Keyboard shortcut: Spacebar to advance if answered
  useEffect(() => {
    function handleKeyDown(e) {
      if (isQuizCompleted) return
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, isQuizCompleted])

  const handleTTS = () => {
    if (!currentQ) return
    if (isSpeaking) {
      stop()
    } else {
      const fullText = `${currentQ.question}. Option A: ${currentQ.options[0]}. Option B: ${currentQ.options[1]}. Option C: ${currentQ.options[2]}. Option D: ${currentQ.options[3]}.`
      speak(fullText)
    }
  }

  if (!activeSet || !questions || questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">No practice questions in this deck yet.</p>
        <button
          onClick={() => setCurrentView('create')}
          className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs"
        >
          Generate Questions
        </button>
      </div>
    )
  }

  // Calculate current score
  const answeredQuestionsCount = Object.keys(userAnswers).length
  let currentScore = 0
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.answer) currentScore++
  })

  // Quiz Results View
  if (isQuizCompleted && !isReviewMode) {
    return (
      <QuizResults
        score={currentScore}
        total={questions.length}
        timeSpentSeconds={secondsElapsed}
        onRetake={() => {
          setUserAnswers({})
          setCurrentIndex(0)
          setSecondsElapsed(0)
          setIsQuizCompleted(false)
          setIsReviewMode(false)
        }}
        onViewCorrections={() => setIsReviewMode(true)}
        onGoToDashboard={() => setCurrentView('dashboard')}
      />
    )
  }

  const selectedAnswer = userAnswers[currentQ.id]
  const isAnswered = !!selectedAnswer
  const isCorrectAnswer = selectedAnswer === currentQ.answer

  return (
    <div className="max-w-2xl mx-auto py-4 min-h-[calc(100vh-8rem)] flex flex-col justify-between animate-fadein">
      
      {/* Quiz Top Status Bar (ExamCrush Screen 1198) */}
      <div>
        <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
          
          <div className="flex items-center gap-3">
            {/* Audio Recitation */}
            <button
              onClick={handleTTS}
              className={`p-2 rounded-xl border transition-colors ${
                isSpeaking
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 animate-pulse'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/[0.08]'
              }`}
              title="Read Question Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Timer */}
            <div className="flex items-center gap-1.5 font-mono px-3 py-1.5 rounded-xl bg-dark-900 border border-white/[0.08] text-slate-200">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>Time: {formatTimer(secondsElapsed)}</span>
            </div>
          </div>

          {/* Progress / Attempted */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-300 font-bold">
              Attempted: {answeredQuestionsCount} / {questions.length}
            </span>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Progress bar */}
        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden border border-white/[0.04] mb-6">
          <div
            className="bg-gradient-to-r from-gold-500 to-amber-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card (ExamCrush Screen 1198) */}
      <div className="my-auto p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-card">
        
        {/* Question Prompt */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-bold text-brand-400 uppercase tracking-wider text-[11px]">
              Question {currentIndex + 1} of {questions.length}
            </span>
            {currentQ.difficulty && (
              <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 font-mono text-[10px]">
                {currentQ.difficulty}
              </span>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* MCQ 4 Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx) // A, B, C, D
            const isThisSelected = selectedAnswer === option
            const isThisCorrect = option === currentQ.answer

            let optionStyle = 'bg-dark-950/60 border-white/[0.08] text-slate-200 hover:border-brand-500/40 hover:bg-white/[0.02]'

            if (isAnswered) {
              if (isThisCorrect) {
                // Correct answer is highlighted in emerald/mint
                optionStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/10'
              } else if (isThisSelected && !isThisCorrect) {
                // Selected wrong answer highlighted in coral/rose
                optionStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-300 shadow-sm shadow-rose-500/10'
              } else {
                optionStyle = 'bg-dark-950/30 border-white/[0.04] text-slate-500 opacity-60'
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center font-mono text-xs shrink-0">
                    {letter}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Instant Explanation Box (ExamCrush Screen 1198) */}
        {isAnswered && (
          <div className="mt-6 p-4 rounded-2xl bg-dark-950 border border-white/[0.08] text-xs text-slate-200 leading-relaxed animate-fadein space-y-2">
            <div>
              <strong className="text-white font-semibold">Explanation: </strong>
              <span>{currentQ.explanation}</span>
            </div>

            {/* Added Superpower: Ask AI Tutor Why Button */}
            {!isCorrectAnswer && (
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Still confused about this distinction?</span>
                <button
                  onClick={() =>
                    setTutorClarification({
                      question: currentQ.question,
                      selectedOption: selectedAnswer,
                      answer: currentQ.answer,
                      explanation: currentQ.explanation,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 font-bold text-[11px] transition-colors"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI Tutor: Why is this wrong?</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Pagination & Next Button Footer (ExamCrush Screen 1198) */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Numbered Pills Grid */}
        <div className="hidden sm:flex items-center gap-1.5 max-w-xs overflow-x-auto py-1">
          {questions.map((q, idx) => {
            const answered = !!userAnswers[q.id]
            const isCurrent = idx === currentIndex
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                  isCurrent
                    ? 'bg-gold-500 text-dark-950 shadow-glow-gold'
                    : answered
                    ? 'bg-white/10 text-white'
                    : 'bg-dark-900 border border-white/[0.06] text-slate-500'
                }`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>

        {/* Next / Submit Button */}
        <button
          onClick={handleNext}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-gold transition-all active:scale-95"
        >
          <span>{currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next'}</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden md:inline text-[10px] opacity-75 font-mono ml-1">[Space]</span>
        </button>

      </div>

      {/* Socratic Tutor Clarification Modal */}
      <Modal
        isOpen={!!tutorClarification}
        onClose={() => setTutorClarification(null)}
        title="Lumina AI Tutor Clarification"
        maxWidth="max-w-lg"
      >
        {tutorClarification && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/[0.06]">
              <span className="text-[10px] font-bold uppercase text-slate-500">Question</span>
              <p className="font-semibold text-slate-200 mt-1">{tutorClarification.question}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                <span className="font-bold block text-[10px]">Your Answer (Incorrect)</span>
                <p className="mt-1">{tutorClarification.selectedOption}</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <span className="font-bold block text-[10px]">Correct Answer</span>
                <p className="mt-1">{tutorClarification.answer}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-slate-200 leading-relaxed">
              <div className="flex items-center gap-2 text-cyan-300 font-bold mb-2">
                <Bot className="w-4 h-4" />
                <span>Why this mistake happens:</span>
              </div>
              <p>
                {tutorClarification.explanation}
              </p>
              <p className="mt-2 text-slate-300">
                💡 <strong>Exam Memory Rule:</strong> Whenever you see questions about minimizing average seek time with risk of starvation, look immediately for <strong>SSTF</strong>. If the question asks for uniform distribution without boundary starvation, look for <strong>C-SCAN</strong>.
              </p>
            </div>

            <button
              onClick={() => setTutorClarification(null)}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-colors"
            >
              Got it, continue practice!
            </button>
          </div>
        )}
      </Modal>

    </div>
  )
}

