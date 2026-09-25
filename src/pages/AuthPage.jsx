import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useStudy } from '../context/StudyContext'
import {
  Sparkles,
  Lock,
  Mail,
  User,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import ThemeToggle from '../components/common/ThemeToggle'

// 1. Yup Validation Schema for Sign In
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Student email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

// 2. Yup Validation Schema for Create Account
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Student email is required'),
  university: Yup.string().required('University selection is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  agreeTerms: Yup.boolean().oneOf([true], 'You must accept terms to continue'),
})

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login'
  const [authMode, setAuthMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()
  const { login, register } = useStudy()

  useEffect(() => {
    const modeParam = searchParams.get('mode')
    if (modeParam === 'register' || modeParam === 'login') {
      setAuthMode(modeParam)
    }
  }, [searchParams])

  const handleTabSwitch = (mode) => {
    setAuthMode(mode)
    setSearchParams({ mode })
  }

  // 1-Click Instant Demo Login
  const handleDemoLogin = () => {
    login('alex@student.unilag.edu.ng', 'Alex')
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50 dark:bg-dark-950 transition-colors duration-200 relative">
      
      {/* Top Bar with Brand & Theme Toggle */}
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            DRAFT AI
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-xl shadow-black/5 dark:shadow-black/40">
        
        {/* Header Tabs: Sign In / Create Account */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-dark-800 p-1 mb-6 border border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              authMode === 'login'
                ? 'bg-white dark:bg-brand-600 text-brand-700 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('register')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              authMode === 'register'
                ? 'bg-white dark:bg-brand-600 text-brand-700 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Heading & Context */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {authMode === 'login' ? 'Welcome Back!' : 'Start Crushing Exams'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {authMode === 'login'
              ? 'Access your decks, flashcards, and exam streaks'
              : 'Join thousands of university scholars studying smarter'}
          </p>
        </div>

        {/* Quick Demo Login Pill (only shown on Sign In) */}
        {authMode === 'login' && (
          <div className="mb-6">
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/25 text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>1-Click Instant Demo Login (Alex • UNILAG)</span>
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/[0.08]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white dark:bg-dark-900 px-2 text-slate-400 font-bold">
                  Or with email & password
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 1: SIGN IN FORM (Formik + Yup)
           ========================================= */}
        {authMode === 'login' && (
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={(values, { setSubmitting }) => {
              login(values.email, values.email.split('@')[0])
              setSubmitting(false)
              navigate('/onboarding')
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="student@university.edu"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border ${
                        errors.email && touched.email
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/10 focus:border-brand-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <span className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border ${
                        errors.password && touched.password
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/10 focus:border-brand-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* =========================================
            TAB 2: CREATE ACCOUNT FORM (Formik + Yup)
           ========================================= */}
        {authMode === 'register' && (
          <Formik
            initialValues={{
              name: '',
              email: '',
              university: 'University of Lagos',
              password: '',
              confirmPassword: '',
              agreeTerms: true,
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              register({
                name: values.name,
                email: values.email,
                university: values.university,
              })
              setSubmitting(false)
              navigate('/onboarding')
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Okafor"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border ${
                        errors.name && touched.name
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/10 focus:border-brand-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="student@university.edu"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border ${
                        errors.email && touched.email
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/10 focus:border-brand-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1"
                  />
                </div>

                {/* University Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Institution / University
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      as="select"
                      name="university"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="University of Lagos">University of Lagos (UNILAG)</option>
                      <option value="Covenant University">Covenant University</option>
                      <option value="University of Ibadan">University of Ibadan (UI)</option>
                      <option value="Obafemi Awolowo University">Obafemi Awolowo University (OAU)</option>
                      <option value="Afe Babalola University">Afe Babalola University (ABUAD)</option>
                      <option value="University of Nigeria Nsukka">University of Nigeria (UNN)</option>
                      <option value="Babcock University">Babcock University</option>
                      <option value="Other">Other Higher Institution</option>
                    </Field>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="At least 6 characters"
                      className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border ${
                        errors.password && touched.password
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/10 focus:border-brand-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Repeat password"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-dark-950 border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/10 focus:border-brand-500'
                      } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1"
                  />
                </div>

                {/* Terms agreement checkbox */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer pt-1">
                    <Field
                      type="checkbox"
                      name="agreeTerms"
                      className="mt-0.5 rounded text-brand-600 accent-brand-600"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                      I agree to the Terms of Service & Privacy Policy for student revision.
                    </span>
                  </label>
                  <ErrorMessage
                    name="agreeTerms"
                    component="div"
                    className="text-[11px] text-rose-500 font-medium mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Footer switch prompt */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] text-center">
          {authMode === 'login' ? (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => handleTabSwitch('register')}
                className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleTabSwitch('login')}
                className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

      </div>

    </div>
  )
}

