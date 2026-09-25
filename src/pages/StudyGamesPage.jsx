import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { Gamepad2, Timer, Trophy, RotateCcw, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function StudyGamesPage() {
  const { studySets, activeSet, selectSet, playSound } = useStudy()
  const [selectedSetId, setSelectedSetId] = useState(activeSet?.id || studySets[0]?.id || '')
  
  const currentSet = studySets.find((s) => s.id === selectedSetId) || activeSet || studySets[0]

  // Game state
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [matchedIds, setMatchedIds] = useState(new Set())
  const [wrongId, setWrongId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [bestTime, setBestTime] = useState(() => {
    return parseFloat(localStorage.getItem('draft_study_match_best') || '0')
  })

  const timerRef = useRef(null)

  // Initialize or restart the game
  const initGame = () => {
    if (!currentSet || !currentSet.flashcards || currentSet.flashcards.length === 0) return

    // Pick up to 6 random flashcards
    const shuffledCards = [...currentSet.flashcards].sort(() => 0.5 - Math.random()).slice(0, 6)
    
    // Create term cards and def cards
    const deckCards = []
    shuffledCards.forEach((fc, idx) => {
      deckCards.push({
        id: `term-${idx}`,
        pairId: idx,
        type: 'term',
        text: fc.term,
      })
      deckCards.push({
        id: `def-${idx}`,
        pairId: idx,
        type: 'def',
        text: fc.definition,
      })
    })

    // Shuffle all 12 cards
    const randomized = deckCards.sort(() => 0.5 - Math.random())

    setCards(randomized)
    setSelectedCard(null)
    setMatchedIds(new Set())
    setWrongId(null)
    setGameWon(false)
    setElapsedTime(0)
    setIsPlaying(true)
  }

  // Timer loop
  useEffect(() => {
    if (isPlaying && !gameWon) {
      const startTime = Date.now() - elapsedTime * 1000
      timerRef.current = setInterval(() => {
        setElapsedTime(parseFloat(((Date.now() - startTime) / 1000).toFixed(1)))
      }, 100)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isPlaying, gameWon])

  // Initialize on mount or set change
  useEffect(() => {
    initGame()
  }, [selectedSetId])

  // Card click handler
  const handleCardClick = (card) => {
    if (!isPlaying || gameWon || matchedIds.has(card.id) || wrongId) return

    if (!selectedCard) {
      // First card selected
      setSelectedCard(card)
      playSound?.('flip')
      return
    }

    // Clicked same card
    if (selectedCard.id === card.id) {
      setSelectedCard(null)
      return
    }

    // Check match (same pairId and different types)
    if (selectedCard.pairId === card.pairId && selectedCard.type !== card.type) {
      // Match!
      playSound?.('correct')
      const newMatched = new Set(matchedIds)
      newMatched.add(selectedCard.id)
      newMatched.add(card.id)
      setMatchedIds(newMatched)
      setSelectedCard(null)

      // Check win condition
      if (newMatched.size === cards.length && cards.length > 0) {
        setGameWon(true)
        setIsPlaying(false)
        playSound?.('complete')
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        })

        // Check best time
        const currentElapsed = elapsedTime
        if (bestTime === 0 || currentElapsed < bestTime) {
          setBestTime(currentElapsed)
          localStorage.setItem('draft_study_match_best', currentElapsed.toString())
        }
      }
    } else {
      // Wrong match
      playSound?.('wrong')
      setWrongId(card.id)
      setTimeout(() => {
        setWrongId(null)
        setSelectedCard(null)
      }, 700)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-6 animate-fadein">
      
      {/* Top Header & Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Speed Recall Match</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear the grid by matching concepts to their definitions as fast as you can!
            </p>
          </div>
        </div>

        {/* Deck Select & Restart */}
        <div className="flex items-center gap-3">
          <select
            value={selectedSetId}
            onChange={(e) => {
              setSelectedSetId(e.target.value)
              selectSet(e.target.value)
            }}
            className="px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
          >
            {studySets.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={initGame}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 transition-colors"
            title="Restart Match Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {/* Timer */}
        <div className="p-4 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Time</span>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">{elapsedTime.toFixed(1)}s</span>
          </div>
        </div>

        {/* Matched Progress */}
        <div className="p-4 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Matched</span>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
              {matchedIds.size / 2} / {cards.length / 2}
            </span>
          </div>
        </div>

        {/* Best Record */}
        <div className="p-4 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Best Record</span>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
              {bestTime > 0 ? `${bestTime.toFixed(1)}s` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Game Board */}
      {!gameWon ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => {
            const isMatched = matchedIds.has(card.id)
            const isSelected = selectedCard?.id === card.id
            const isWrong = wrongId === card.id || (wrongId && selectedCard?.id === card.id)

            if (isMatched) {
              return (
                <div
                  key={card.id}
                  className="h-32 rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-500/[0.04] flex items-center justify-center opacity-40 transition-all pointer-events-none"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
              )
            }

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`h-32 p-4 rounded-2xl border text-left flex flex-col justify-center transition-all duration-200 select-none shadow-sm cursor-pointer ${
                  isWrong
                    ? 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 scale-95 animate-shake'
                    : isSelected
                    ? 'bg-brand-500/15 border-brand-500 shadow-glow-brand ring-2 ring-brand-500/40 scale-[1.02]'
                    : 'bg-white dark:bg-dark-850 hover:bg-slate-50 dark:hover:bg-dark-800 border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-100'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                  {card.type === 'term' ? 'Concept' : 'Definition'}
                </span>
                <p className={`text-xs sm:text-sm font-semibold line-clamp-3 leading-snug ${card.type === 'term' ? 'text-brand-600 dark:text-brand-300' : ''}`}>
                  {card.text}
                </p>
              </button>
            )
          })}
        </div>
      ) : (
        /* Victory Modal Box */
        <div className="p-12 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-xl text-center space-y-5 animate-fadein">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-gold-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-gold-500/30">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Brilliant Match!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            You matched all concepts in <strong className="font-mono text-brand-600 dark:text-brand-400">{elapsedTime.toFixed(1)} seconds</strong>. Active memory pathways reinforced!
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={initGame}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-brand flex items-center gap-2 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>

            <Link
              to={`/dashboard/flashcards/${currentSet.id}/study`}
              className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-100 font-bold text-sm transition-colors flex items-center gap-2"
            >
              <span>Practice Flashcards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  )
}

