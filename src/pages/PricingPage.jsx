import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, Heart, HelpCircle, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react'
import LandingFooter from '../components/landing/LandingFooter'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' | 'yearly'
  const [customPrice, setCustomPrice] = useState(2000)

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors">
      
      {/* Hero Header */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>AFFORDABLE STUDENT PLANS • CANCEL ANYTIME</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Invest in High Grades,{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-brand-accent bg-clip-text text-transparent">
            Not High Stress
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Built specifically for students preparing for exams, midterms, and finals. Pick a plan or pay what you can afford.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 sm:mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-dark-800 border border-slate-300 dark:border-white/10">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[38px] ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-brand-600 text-brand-700 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 min-h-[38px] ${
              billingCycle === 'yearly'
                ? 'bg-white dark:bg-brand-600 text-brand-700 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Plan</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
              Save 50%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Plan 1: Starter */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-850/70 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between hover:border-brand-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trial Starter</h3>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  Exam Sprint
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white">₦250</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/first month</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                Ideal for testing out Draft AI ahead of an upcoming continuous assessment or test.
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>5 Lecture PDF or Slide Uploads</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Up to 60 Flashcards per Set</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Standard MCQ Practice Mode</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Basic Audio Pronunciation</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full py-3.5 min-h-[44px] rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.14] text-slate-800 dark:text-slate-100 font-bold text-center text-sm transition-colors flex items-center justify-center"
            >
              Get Started Free
            </Link>
          </div>

          {/* Plan 2: Pro Scholar (Highlighted) */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-gradient-to-b dark:from-dark-800 dark:to-dark-900 border-2 border-brand-500 shadow-xl shadow-brand-500/10 flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold tracking-wide shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MOST POPULAR CHOICE</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Scholar</h3>
                <span className="px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-semibold">
                  Full Pass
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-3xl sm:text-5xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {billingCycle === 'monthly' ? '₦2,000' : '₦1,000'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/month</span>
                {billingCycle === 'monthly' && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 line-through">₦3,500</span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                All features unlocked. The complete arsenal to crush exams and maintain a 4.5+ CGPA.
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 font-bold" />
                  <span><strong>Unlimited</strong> PDF, Handout & Slide Uploads</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 font-bold" />
                  <span>Unlimited Flashcards with Instant TTS Speech</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 font-bold" />
                  <span>Timed Exam MCQ Simulator & Detailed Explanations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 font-bold" />
                  <span>24/7 AI Socratic Study Tutor Chat</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 font-bold" />
                  <span>Interactive Speed Study Recall Game</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 font-bold" />
                  <span>Cheat Sheet & Markdown Summary Export</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full py-4 min-h-[48px] rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-center text-sm shadow-glow-brand transition-all flex items-center justify-center"
            >
              Start 14-Day Free Access
            </Link>
          </div>

          {/* Plan 3: Community First (Pay What You Can) */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-850/70 border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between hover:border-brand-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Pay-What-You-Can</span>
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs font-semibold">
                  Community
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                  ₦{customPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/month</span>
              </div>

              {/* Slider */}
              <div className="my-5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/[0.06]">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>₦1,500</span>
                  <span>₦4,500+</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="4500"
                  step="250"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 dark:bg-dark-700 rounded-lg min-h-[36px]"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Adjust based on your student allowance. You get every single feature without compromise.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Equal access for every hardworking student</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full access to AI Tutor, MCQs, & Flashcards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct WhatsApp & Discord student community</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full py-3.5 min-h-[44px] rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.14] text-slate-800 dark:text-slate-100 font-bold text-center text-sm transition-colors flex items-center justify-center"
            >
              Choose ₦{customPrice.toLocaleString()} Plan
            </Link>
          </div>

        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-6 sm:mb-8">
          Detailed Feature Comparison
        </h2>

        <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-dark-900 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm min-w-[540px]">
            <thead className="bg-slate-50 dark:bg-dark-850 border-b border-slate-200 dark:border-white/[0.08]">
              <tr>
                <th className="py-3.5 sm:py-4 px-4 sm:px-6 font-semibold text-slate-800 dark:text-slate-200">Capability</th>
                <th className="py-3.5 sm:py-4 px-3 sm:px-4 font-semibold text-slate-800 dark:text-slate-200 text-center">Starter</th>
                <th className="py-3.5 sm:py-4 px-3 sm:px-4 font-semibold text-brand-600 dark:text-brand-400 text-center">Pro Scholar</th>
                <th className="py-3.5 sm:py-4 px-3 sm:px-4 font-semibold text-rose-500 text-center">Community First</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">Document Uploads</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-500">5 / mo</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400">Unlimited</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">Spaced Repetition Flashcards</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-500">Up to 60/deck</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400">Unlimited</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">Timed MCQ Practice Engine</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-500">Standard mode</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400">Unlimited + Explanations</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200">Unlimited + Explanations</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">24/7 AI Socratic Tutor</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-400">—</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">Recall Matching Game</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-400">—</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">Audio Speech TTS</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-500">Basic</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-300">Cheat Sheet & Markdown Export</td>
                <td className="py-3.5 px-3 sm:px-4 text-center text-slate-400">—</td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-brand-600 dark:text-brand-400"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-200"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 text-center">
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-emerald-500/[0.08] border border-emerald-500/25 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-left">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              100% Academic Satisfaction Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If Draft AI doesn't help you feel more confident and exam-ready in your first 14 days, simply cancel with one click from your settings or request a full refund without questions asked.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}

