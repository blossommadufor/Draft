import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStudy } from '../../context/StudyContext'
import {
  LayoutDashboard,
  Bot,
  HelpCircle,
  Layers,
  BookOpen,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Gamepad2,
  X,
  Sparkles
} from 'lucide-react'

export default function Sidebar({ isMobileOpen = false, onCloseMobile = () => {} }) {
  const location = useLocation()
  const { activeSet } = useStudy()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dashboard/flashcards', label: 'Flashcards', icon: Layers, badge: activeSet ? `${activeSet.flashcards?.length || 0}` : null },
    { to: '/dashboard/multiple-choice-questions', label: 'Practice MCQs', icon: HelpCircle, badge: activeSet ? `${activeSet.quiz?.length || 0}` : null },
    { to: '/dashboard/ai-tutor', label: 'AI Study Tutor', icon: Bot, highlight: true },
    { to: '/dashboard/study-games', label: 'Study Game', icon: Gamepad2 },
    { to: '/dashboard/notes', label: 'Notes & Summary', icon: BookOpen },
    { to: '/dashboard/flashcards/create', label: 'Create New Set', icon: PlusCircle },
  ]

  const renderNavLinks = (isMobile = false) => (
    <div className={`space-y-1.5 overflow-y-auto ${isMobile ? 'py-4 px-3' : 'flex-1 py-6 px-3'}`}>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to))

        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => {
              if (isMobile) onCloseMobile()
            }}
            title={!isMobile && collapsed ? item.label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              isActive
                ? 'bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-300 border border-brand-500/25 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/[0.04]'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-glow-brand'
                  : item.highlight
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white'
                  : 'bg-slate-200/70 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>

            {(isMobile || !collapsed) && (
              <div className="flex-1 flex items-center justify-between text-left truncate">
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300 font-mono">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 uppercase font-bold tracking-wider">
                    AI
                  </span>
                )}
              </div>
            )}
          </Link>
        )
      })}
    </div>
  )

  const renderActiveSet = (isMobile = false) => {
    if ((!isMobile && collapsed) || !activeSet) return null
    return (
      <div className="p-3 m-3 rounded-2xl bg-white dark:bg-dark-850/80 border border-slate-200 dark:border-white/[0.06] shadow-sm">
        <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
          <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Active Deck</span>
        </div>
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={activeSet.title}>
          {activeSet.title}
        </p>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Mastery</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">{activeSet.masteryRate || 0}%</span>
        </div>
        <div className="mt-1 w-full bg-slate-100 dark:bg-dark-700/60 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-500 to-mint-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${activeSet.masteryRate || 0}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Slide-out) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-50 dark:bg-dark-900 border-r border-slate-200 dark:border-white/10 shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Drawer Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-accent flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">DRAFT AI</span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">Study Workspace</span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06] transition-colors"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          {renderNavLinks(true)}
        </div>

        {/* Mobile Active Deck */}
        {renderActiveSet(true)}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex relative z-20 shrink-0 border-r border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-dark-900/50 backdrop-blur-xl transition-all duration-300 flex-col ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-5 z-30 w-6 h-6 rounded-full bg-white dark:bg-dark-800 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shadow-md shadow-black/10 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Desktop Navigation Links */}
        {renderNavLinks(false)}

        {/* Desktop Active Study Set Indicator */}
        {renderActiveSet(false)}
      </aside>
    </>
  )
}
