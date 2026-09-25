import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { LayoutDashboard, Layers, HelpCircle, Bot, BookOpen } from 'lucide-react'

export default function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const mobileNavItems = [
    { to: '/dashboard', label: 'Dash', icon: LayoutDashboard, end: true },
    { to: '/dashboard/flashcards', label: 'Cards', icon: Layers },
    { to: '/dashboard/multiple-choice-questions', label: 'MCQs', icon: HelpCircle },
    { to: '/dashboard/ai-tutor', label: 'Tutor', icon: Bot },
    { to: '/dashboard/notes', label: 'Notes', icon: BookOpen },
  ]

  return (
    <div className="h-[100dvh] bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white transition-colors duration-200 overflow-hidden">
      {/* Top Universal Navbar with Theme Toggle, Search, Streak, Profile & Mobile Hamburger */}
      <Navbar
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Responsive Collapsible Sidebar (Drawer on mobile, collapsible on desktop) */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Page Outlet with bottom padding on mobile for the bottom nav */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full pb-20 md:pb-6 overscroll-y-contain">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (md:hidden) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/[0.08] px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[56px] transition-all ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      isActive ? 'bg-brand-500/15 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
