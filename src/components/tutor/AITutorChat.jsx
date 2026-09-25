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
  const { activeSet, userProfile } = useStudy()
  const { speak, stop, isSpeaking } = useSpeech()

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello ${userProfile.name}! 👋 I'm **Lumina**, your personalized AI Study Tutor. 

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
    <div className="max-w-3xl mx-auto py-4 min-h-[calc(100vh-8rem)] flex flex-col justify-between animate-fadein">
      
      {/* Top Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-dark-900 border border-white/[0.08] shadow-card flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Lumina Study Tutor</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Online</span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md">
              Grounded in: <strong className="text-slate-200">{activeSet ? activeSet.title : 'Study Materials'}</strong>
            </p>
          </div>
        </div>

        {/* Mute/TTS control */}
        <button
          onClick={() => {
            if (isSpeaking) stop()
          }}
          className={`p-2 rounded-xl border transition-colors ${
            isSpeaking
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
              : 'bg-white/[0.04] text-slate-500 border-white/[0.06]'
          }`}
          title={isSpeaking ? 'Stop speaking' : 'Speech synthesis enabled'}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2 max-h-[500px]">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user'
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-brand-500 text-white'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {isUser ? userProfile.name.charAt(0) : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-dark-900 border border-white/[0.08] text-slate-200 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                <div>{msg.content}</div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400/80 pt-1 border-t border-white/[0.06]">
                  <span>{msg.time}</span>
                  {!isUser && (
                    <button
                      onClick={() => speak(msg.content.replace(/[#*_-]/g, ''))}
                      className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
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
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-3xl bg-dark-900 border border-white/[0.08] text-xs text-slate-400 rounded-tl-none flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Lumina is thinking through your notes...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="my-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors"
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
          className="w-full pl-5 pr-14 py-4 rounded-2xl bg-dark-900 border border-white/[0.08] text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 shadow-card"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-sm transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

