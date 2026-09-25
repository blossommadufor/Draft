import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StudyProvider } from './context/StudyContext'

// Layouts
import PublicLayout from './components/common/PublicLayout'
import DashboardLayout from './components/common/DashboardLayout'

// Public Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import OnboardingPage from './pages/OnboardingPage'
import PricingPage from './pages/PricingPage'

// Dashboard & Study Pages
import DashboardPage from './pages/DashboardPage'
import FlashcardsPage from './pages/FlashcardsPage'
import FlashcardsCreatePage from './pages/FlashcardsCreatePage'
import FlashcardsStudyPage from './pages/FlashcardsStudyPage'
import MCQPage from './pages/MCQPage'
import MCQCreatePage from './pages/MCQCreatePage'
import MCQReadyPage from './pages/MCQReadyPage'
import MCQPracticePage from './pages/MCQPracticePage'
import AITutorPage from './pages/AITutorPage'
import StudyGamesPage from './pages/StudyGamesPage'
import NotesSummaryPage from './pages/NotesSummaryPage'

export default function App() {
  return (
    <StudyProvider>
      <BrowserRouter>
        <Routes>
          {/* Public & Auth Route Group */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Route>

          {/* Protected Dashboard & Study Workspace Group */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            
            {/* Flashcards System */}
            <Route path="flashcards" element={<FlashcardsPage />} />
            <Route path="flashcards/create" element={<FlashcardsCreatePage />} />
            <Route path="flashcards/:id/study" element={<FlashcardsStudyPage />} />
            
            {/* Practice Questions / MCQs System */}
            <Route path="multiple-choice-questions" element={<MCQPage />} />
            <Route path="multiple-choice-questions/create" element={<MCQCreatePage />} />
            <Route path="multiple-choice-questions/:id/ready" element={<MCQReadyPage />} />
            <Route path="multiple-choice-questions/:id/practice" element={<MCQPracticePage />} />

            {/* AI Socratic Tutor */}
            <Route path="ai-tutor" element={<AITutorPage />} />

            {/* Study Game Mode */}
            <Route path="study-games" element={<StudyGamesPage />} />

            {/* Summary & Revision Cheat Sheets */}
            <Route path="notes" element={<NotesSummaryPage />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StudyProvider>
  )
}
