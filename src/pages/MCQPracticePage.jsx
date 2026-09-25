import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { useSpeech } from '../hooks/useSpeech'
import { soundEffects } from '../lib/sound'
import QuizResults from '../components/quiz/QuizResults'
import Modal from '../components/common/Modal'
import {
  Clock,
  Volume2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Bot
} from 'lucide-react'

export default function MCQPracticePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studySets, activeSet, recordQuizAttempt } = useStudy()
  const { speak, stop, isSpeaking } = useSpeech()

  const set = studySets.find((s) => s.id === id) || activeSet || studySets[0]
  const questions = set?.quiz || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [tutorClarification, setTutorClarification] = useState(null)

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
    if (userAnswers[currentQ.id]) return

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

  const handleNext = useCallback(() => {
    stop()
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      let score = 0
      questions.forEach((q) => {
        if (userAnswers[q.id] === q.answer) score++
      })
      if (set) {
        recordQuizAttempt(set.id, {
          score,
          total: questions.length,
          timeSpent: secondsElapsed,
        })
      }
      setIsQuizCompleted(true)
    }
  }, [currentIndex, questions, userAnswers, set, recordQuizAttempt, secondsElapsed, stop])

  const handlePrev = useCallback(() => {
    stop()
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex, stop])

  // Keyboard shortcut: Spacebar to advance
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

  if (!set || !questions || questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">No practice questions in this bank.</p>
        <button
          onClick={() => navigate('/dashboard/multiple-choice-questions/create')}
          className="px-6 py-2.5 rounded-xl bg-gold-500 text-dark-950 font-bold text-xs"
        >
          Create Questions
        </button>
      </div>
    )
  }

  const answeredQuestionsCount = Object.keys(userAnswers).length
  let currentScore = 0
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.answer) currentScore++
  })

  // Quiz Results View (ExamCrush Screen 1199)
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
        onGoToDashboard={() => navigate('/dashboard')}
      />
    )
  }

  const selectedAnswer = userAnswers[currentQ?.id]
  const isAnswered = !!selectedAnswer
  const isCorrectAnswer = selectedAnswer === currentQ?.answer

  return (
    <div className="max-w-2xl mx-auto py-3 sm:py-4 min-h-[calc(100dvh-10rem)] flex flex-col justify-between animate-fadein">
      
      {/* Quiz Top Status Bar (ExamCrush Screen 1198) */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleTTS}
              className={`p-2 rounded-xl border transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center ${
                isSpeaking
                  ? 'bg-brand-500/20 text-brand-600 dark:text-brand-300 border-brand-500/40 animate-pulse'
                  : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/[0.08]'
              }`}
              title="Read Question Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 font-mono px-2.5 sm:px-3 py-1.5 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 shadow-sm text-xs">
              <Clock className="w-3.5 h-3.5 text-gold-500" />
              <span>Time: {formatTimer(secondsElapsed)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-slate-800 dark:text-slate-200 font-bold text-xs">
              Attempted {answeredQuestionsCount}/{questions.length}
            </span>
            <button
              onClick={() => navigate('/dashboard/multiple-choice-questions')}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-dark-900 rounded-full h-1.5 overflow-hidden border border-slate-200 dark:border-white/[0.04] mb-4 sm:mb-6">
          <div
            className="bg-gradient-to-r from-gold-500 to-amber-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card (ExamCrush Screen 1198) */}
      <div className="my-auto p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 shadow-sm">
        
        {/* Question Prompt */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-bold text-gold-600 dark:text-gold-400 uppercase tracking-wider text-[11px]">
              Q{currentIndex + 1}.
            </span>
            {currentQ?.difficulty && (
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 font-mono text-[10px]">
                {currentQ.difficulty}
              </span>
            )}
          </div>

          <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ?.question}
          </h2>
        </div>

        {/* MCQ 4 Options Grid */}
        <div className="space-y-2.5 sm:space-y-3">
          {currentQ?.options.map((option, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx)
            const isThisSelected = selectedAnswer === option
            const isThisCorrect = option === currentQ.answer

            let optionStyle = 'bg-slate-50 dark:bg-dark-950/60 border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 hover:border-gold-500/50 hover:bg-gold-500/[0.02]'

            if (isAnswered) {
              if (isThisCorrect) {
                optionStyle = 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-400 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 font-medium'
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'bg-rose-50 dark:bg-rose-500/15 border-rose-400 dark:border-rose-500/50 text-rose-800 dark:text-rose-300'
              } else {
                optionStyle = 'bg-slate-50/50 dark:bg-dark-950/30 border-slate-100 dark:border-white/[0.04] text-slate-400 dark:text-slate-500 opacity-60'
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 min-h-[48px] active:scale-[0.99] ${optionStyle}`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/[0.06] flex items-center justify-center font-mono text-xs shrink-0 text-slate-700 dark:text-slate-300">
                    {letter}
                  </span>
                  <span className="break-words leading-snug">{option}</span>
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Instant Explanation Box (ExamCrush Screen 1198) */}
        {isAnswered && (
          <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
            <div>
              <strong className="text-slate-900 dark:text-white font-semibold">Explanation: </strong>
              <span className="break-words">{currentQ?.explanation}</span>
            </div>

            {!isCorrectAnswer && (
              <div className="pt-2.5 border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500">Need clarification?</span>
                <button
                  onClick={() =>
                    setTutorClarification({
                      question: currentQ.question,
                      selectedOption: selectedAnswer,
                      answer: currentQ.answer,
                      explanation: currentQ.explanation,
                    })
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 font-bold text-[11px] transition-colors min-h-[36px]"
                >
                  <Bot className="w-3.5 h-3.5 shrink-0" />
                  <span>Ask AI Tutor: Why is this wrong?</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Pagination & Next Button (ExamCrush Screen 1198) */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

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
                    ? 'bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white'
                    : 'bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/[0.06] text-slate-400 dark:text-slate-500'
                }`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>

        <button
          onClick={handleNext}
          className="px-4 sm:px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-gold transition-all active:scale-95 min-h-[44px]"
        >
          <span>{currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next'}</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden md:inline text-[10px] opacity-75 font-mono ml-1">[Shortcut key: spacebar]</span>
        </button>
      </div>

      {/* Socratic Tutor Clarification Modal */}
      <Modal
        isOpen={!!tutorClarification}
        onClose={() => setTutorClarification(null)}
        title="AI Tutor Explanation"
        maxWidth="max-w-lg"
      >
        {tutorClarification && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.06]">
              <span className="text-[10px] font-bold uppercase text-slate-400">Question</span>
              <p className="font-semibold text-slate-900 dark:text-slate-200 mt-1 break-words">{tutorClarification.question}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300">
                <span className="font-bold block text-[10px]">Your Answer (Incorrect)</span>
                <p className="mt-1 break-words">{tutorClarification.selectedOption}</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <span className="font-bold block text-[10px]">Correct Answer</span>
                <p className="mt-1 break-words">{tutorClarification.answer}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-slate-800 dark:text-slate-200 leading-relaxed">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-300 font-bold mb-2">
                <Bot className="w-4 h-4 shrink-0" />
                <span>Why this mistake happens:</span>
              </div>
              <p className="break-words">{tutorClarification.explanation}</p>
            </div>

            <button
              onClick={() => setTutorClarification(null)}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-colors min-h-[44px]"
            >
              Got it, continue practice!
            </button>
          </div>
        )}
      </Modal>

    </div>
  )
}

