import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStudy } from '../context/StudyContext'
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useStudy()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email || 'alex@student.unilag.edu.ng', 'Alex')
    navigate('/onboarding')
  }

  const handleDemoLogin = () => {
    login('alex@student.unilag.edu.ng', 'Alex')
    navigate('/onboarding')
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-dark-950 transition-colors">
      <div className="w-full max-w-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-accent flex items-center justify-center text-white mb-3 shadow-lg shadow-brand-500/25">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to access your study decks, flashcards, and exam streaks
          </p>
        </div>

        {/* Quick Demo Login Pill */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full mb-5 sm:mb-6 py-3 px-4 min-h-[44px] rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/25 text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
        >
          <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
          <span>Quick 1-Click Demo Login (Instant Access)</span>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/[0.08]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-dark-900 px-2 text-slate-400 text-[10px] font-bold">
              Or with your student email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-base sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Password
              </label>
              <a href="#" className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline min-h-[30px] flex items-center">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-base sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 min-h-[36px]">
            <input type="checkbox" id="remember" className="rounded text-brand-600 w-4 h-4" defaultChecked />
            <label htmlFor="remember" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              Remember me on this browser
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  )
}
