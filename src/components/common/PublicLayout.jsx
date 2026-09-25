import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LandingNavbar from './LandingNavbar'
import Navbar from './Navbar'

export default function PublicLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white transition-colors duration-200">
      {/* Homepage gets the dedicated marketing LandingNavbar, other views get standard Navbar */}
      {isHome ? <LandingNavbar /> : <Navbar />}

      {/* Main Public Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
