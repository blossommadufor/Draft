import React, { createContext, useContext, useState, useEffect } from 'react'
import { SAMPLE_STUDY_SETS } from '../lib/sampleData'
import { soundEffects } from '../lib/sound'

const StudyContext = createContext(null)

const STORAGE_KEY_SETS = 'draft_study_sets_v3'
const STORAGE_KEY_USER = 'draft_user_v3'
const STORAGE_KEY_THEME = 'draft_theme_v3'

export function StudyProvider({ children }) {
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME)
      if (savedTheme) return savedTheme
    } catch (e) {}
    return 'dark'
  })

  // Synchronize document theme class
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme)
    } catch (e) {}
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // User Authentication & Profile
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER)
      if (savedUser) return JSON.parse(savedUser)
    } catch (e) {}
    return {
      id: 'usr_1',
      name: 'Alex',
      email: 'alex@student.unilag.edu.ng',
      university: 'University of Lagos',
      streak: 7,
      xp: 1450,
      cardsMastered: 38,
      quizzesCompleted: 12,
      isLoggedIn: true,
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
    } catch (e) {}
  }, [user])

  // Study Sets
  const [studySets, setStudySets] = useState(() => {
    try {
      const savedSets = localStorage.getItem(STORAGE_KEY_SETS)
      if (savedSets) return JSON.parse(savedSets)
    } catch (e) {}
    return SAMPLE_STUDY_SETS
  })

  const [activeSetId, setActiveSetId] = useState(() => {
    return studySets[0]?.id || 'os-csc308'
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [isSoundMuted, setIsSoundMuted] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETS, JSON.stringify(studySets))
    } catch (e) {}
  }, [studySets])

  const activeSet = studySets.find((s) => s.id === activeSetId) || studySets[0] || SAMPLE_STUDY_SETS[0]

  const selectSet = (setId) => {
    setActiveSetId(setId)
  }

  const saveStudySet = (newSet) => {
    setStudySets((prev) => [newSet, ...prev.filter((s) => s.id !== newSet.id)])
    setActiveSetId(newSet.id)
    addXP(100)
    return newSet
  }

  const deleteStudySet = (setId) => {
    setStudySets((prev) => prev.filter((s) => s.id !== setId))
    if (activeSetId === setId) {
      const remaining = studySets.filter((s) => s.id !== setId)
      if (remaining.length > 0) {
        setActiveSetId(remaining[0].id)
      }
    }
  }

  const toggleCardMastery = (setId, cardId) => {
    setStudySets((prev) =>
      prev.map((set) => {
        if (set.id !== setId) return set
        const updatedCards = set.flashcards.map((c) => {
          if (c.id !== cardId) return c
          const newStatus = !c.mastered
          if (newStatus) {
            addXP(15)
            soundEffects.playCorrect()
          }
          return { ...c, mastered: newStatus }
        })
        const masteredCount = updatedCards.filter((c) => c.mastered).length
        const masteryRate = Math.round((masteredCount / updatedCards.length) * 100)
        return { ...set, flashcards: updatedCards, masteryRate }
      })
    )
  }

  const recordQuizAttempt = (setId, { score, total, timeSpent }) => {
    const xpEarned = Math.round((score / total) * 150) + 20
    addXP(xpEarned)
    setUser((prev) => ({
      ...prev,
      quizzesCompleted: (prev.quizzesCompleted || 0) + 1,
    }))
  }

  const addXP = (amount) => {
    setUser((prev) => ({
      ...prev,
      xp: (prev.xp || 0) + amount,
    }))
  }

  const login = (email, name = 'Student') => {
    setUser((prev) => ({
      ...prev,
      email,
      name: name || 'Student',
      isLoggedIn: true,
    }))
  }

  const register = ({ name, email, university }) => {
    setUser({
      id: `usr_${Date.now()}`,
      name: name || 'Student',
      email,
      university: university || 'University of Lagos',
      streak: 1,
      xp: 200,
      cardsMastered: 0,
      quizzesCompleted: 0,
      isLoggedIn: true,
    })
  }

  const logout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }))
  }

  const toggleSound = () => {
    const muted = soundEffects.toggleMute()
    setIsSoundMuted(muted)
  }

  return (
    <StudyContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        login,
        register,
        logout,
        studySets,
        activeSet,
        activeSetId,
        selectSet,
        saveStudySet,
        deleteStudySet,
        toggleCardMastery,
        recordQuizAttempt,
        addXP,
        searchQuery,
        setSearchQuery,
        isSoundMuted,
        toggleSound,
      }}
    >
      {children}
    </StudyContext.Provider>
  )
}

export function useStudy() {
  const context = useContext(StudyContext)
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider')
  }
  return context
}
