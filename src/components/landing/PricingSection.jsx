import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Sparkles, Heart } from 'lucide-react'
import { useStudy } from '../../context/StudyContext'

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' | 'yearly'
  const [customPrice, setCustomPrice] = useState(2000)
  const { user } = useStudy()
  const navigate = useNavigate()

  const handleAction = () => {
    if (user?.isLoggedIn) {
      navigate('/dashboard/flashcards/create')
    } else {
      navigate('/register')
    }
  }

  return (
    <section id="pricing" className="py-20 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-900/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400">
            Transparent Student Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Invest in Your Academic Success
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Cancel anytime. Choose the plan that best matches your study load and semester timetable.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-dark-800 border border-slate-300 dark:border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-brand-600 text-brand-700 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-brand-600 text-brand-700 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-gold-300 font-bold">
                Save 50%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Starter */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-850/60 border border-slate-200 dark:border-white/[0.06] flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/15 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Starter</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                  Trial Special
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">₦250</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/first month</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                Perfect for revising for an upcoming test or trying out AI-powered flashcards.
              </p>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>5 PDF Uploads / Month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Up to 50 Flashcards per Set</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Basic MCQ Practice</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleAction}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-white/10 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2: Premium (Featured / Recommended) */}
          <div className="p-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-dark-800 dark:to-dark-900 border-2 border-brand-500 shadow-xl dark:shadow-glow-brand flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-brand-400 text-white text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>MOST POPULAR</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Scholar</h3>
                <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 text-[11px] font-semibold">
                  Full Access
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {billingCycle === 'monthly' ? '₦2,000' : '₦1,000'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/month</span>
                {billingCycle === 'monthly' && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 line-through">₦3,500</span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                Unlimited learning potential for ambitious students aiming for first-class honors.
              </p>

              <ul className="space-y-3 text-xs text-slate-800 dark:text-slate-200 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span><strong>Unlimited</strong> PDF & Handout Uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Unlimited Flashcards with Audio TTS</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Timed Exam Simulator & Explanations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>24/7 AI Socratic Study Tutor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>One-click Markdown & PDF Cheat Sheet Export</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleAction}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-brand transition-all active:scale-95"
            >
              Start Full Access
            </button>
          </div>

          {/* Tier 3: Community First (Pay What You Can Slider) */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-850/60 border border-slate-200 dark:border-white/[0.06] flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/15 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Community First
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 text-[11px] font-semibold">
                  Flexible
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  ₦{customPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/month</span>
              </div>

              <div className="my-5">
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>₦1,500</span>
                  <span>₦4,000+</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="4500"
                  step="250"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-dark-700 rounded-lg"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Pay what fits your student budget. Same full access.
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Support our mission & peer students</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Full access to all AI study tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Early access to study game modes</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleAction}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-white/10 transition-colors"
            >
              Choose ₦{customPrice.toLocaleString()} Plan
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
