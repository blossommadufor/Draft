import React, { useState, useRef, useEffect } from 'react'
import { useStudy } from '../../context/StudyContext'
import { askAITutor } from '../../lib/claude'
import { useSpeech } from '../../hooks/useSpeech'
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  GraduationCap,
  Lightbulb,
  HelpCircle,
  Brain
} from 'lucide-react'

export default function AITutorChat() {
  const { activeSet, user } = useStudy()
  const { speak, stop, isSpeaking } = useSpeech()

  const userName = user?.name || 'Student'
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello ${userName}! 👋 I'm **Lumina**, your personalized AI Study Tutor. 

I'm ready to help you master **"${activeSet ? activeSet.title : 'your study notes'}"**. You can ask me to explain confusing terms, create memory mnemonics, or test your readiness with tricky questions. What are we diving into first?`,
      time: 'Just now',
    },
  ])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const quickPrompts = [
    "Explain the core concept like I'm 5",
    'Give me a mnemonic to memorize this',
    'What is the most common exam mistake on this topic?',
    'Quiz me on the hardest concept',
  ]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (textToSend = input) => {
    const query = textToSend.trim()
    if (!query || loading) return

    setInput('')
    const newMsg = { role: 'user', content: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages((prev) => [...prev, newMsg])
    setLoading(true)

    try {
      const contextText = activeSet
        ? `${activeSet.title}\n\nTopics: ${activeSet.topics?.join(', ')}\n\nSummary Overview: ${activeSet.summary?.overview || ''}`
        : ''

      const responseText = await askAITutor({
        question: query,
        contextText,
        history: messages,
      })

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't reach the AI service right now. Please check your connection or API key.",
          time: 'Just now',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-2 sm:py-4 min-h-[calc(100dvh-12rem)] flex flex-col justify-between animate-fadein">
      
      {/* Top Header Card */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm shrink-0">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Lumina Study Tutor</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider hidden sm:inline">Online</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-md">
              Grounded in: <strong className="text-slate-700 dark:text-slate-200">{activeSet ? activeSet.title : 'Study Materials'}</strong>
            </p>
          </div>
        </div>

        {/* Mute/TTS control */}
        <button
          onClick={() => {
            if (isSpeaking) stop()
          }}
          className={`p-2 rounded-xl border transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center shrink-0 ${
            isSpeaking
              ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/40 animate-pulse'
              : 'bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/[0.06]'
          }`}
          title={isSpeaking ? 'Stop speaking' : 'Speech synthesis enabled'}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 px-1 py-2 max-h-[calc(100dvh-20rem)] min-h-[280px]">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user'
          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-brand-500 text-white'
                    : 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {isUser ? userName.charAt(0) : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[88%] sm:max-w-[78%] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                <div className="break-words">{msg.content}</div>

                <div className={`mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t ${
                  isUser ? 'border-white/20 text-white/80' : 'border-slate-100 dark:border-white/[0.06] text-slate-400'
                }`}>
                  <span>{msg.time}</span>
                  {!isUser && (
                    <button
                      onClick={() => speak(msg.content.replace(/[#*_-]/g, ''))}
                      className="hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Read aloud</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-500 dark:text-slate-400 rounded-tl-none flex items-center gap-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>Lumina is thinking through your notes...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="my-2.5 flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar touch-pan-x">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors min-h-[32px] shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Ask anything about this syllabus, request an analogy, or paste a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
          className="w-full pl-4 sm:pl-5 pr-12 sm:pr-14 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/[0.08] text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 shadow-sm"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-sm transition-all min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

