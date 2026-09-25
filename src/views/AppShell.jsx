import React from 'react'
import { useStudy } from '../context/StudyContext'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import LandingView from './LandingView'
import DashboardHome from '../components/dashboard/DashboardHome'
import CreationStudio from '../components/studio/CreationStudio'
import FlashcardStudy from '../components/flashcards/FlashcardStudy'
import QuizPractice from '../components/quiz/QuizPractice'
import AITutorChat from '../components/tutor/AITutorChat'
import StudySummaryView from '../components/summary/StudySummaryView'

export default function AppShell() {
  const { currentView } = useStudy()

  // Full Landing Page mode
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <LandingView />
        </main>
      </div>
    )
  }

  // Application Dashboard & Study Engine mode
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Sidebar */}
        <Sidebar />

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {currentView === 'dashboard' && <DashboardHome />}
          {currentView === 'create' && <CreationStudio />}
          {currentView === 'flashcards' && <FlashcardStudy />}
          {currentView === 'quiz' && <QuizPractice />}
          {currentView === 'tutor' && <AITutorChat />}
          {currentView === 'summary' && <StudySummaryView />}
        </main>
      </div>
    </div>
  )
}

