import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'How does the AI Study Pack generator work?',
      a: 'Our platform parses your uploaded document (PDF, lecture slides, or pasted notes) locally in your browser, runs cognitive curriculum extraction to identify high-yield topics, and automatically synthesizes interactive flashcards, exam-style MCQs with detailed explanations, and an executive study summary.',
    },
    {
      q: 'Can I convert my handwritten or scanned lecture notes?',
      a: 'Yes! As long as the PDF or text contains readable digital characters, you can upload it. For handwritten physical pages, copy and paste the transcript or use any phone OCR app before generating your study set.',
    },
    {
      q: 'What makes this better than standard flashcard apps like Quizlet or Anki?',
      a: 'Traditional flashcard apps require you to spend hours typing questions and definitions by hand. Draft AI analyzes entire syllabi in seconds, lets you curate specific sub-topics, generates instant rationale for every answer, and includes a built-in AI Socratic Tutor to explain tough concepts on demand.',
    },
    {
      q: 'Can I export my flashcards or notes?',
      a: 'Absolutely. You can export your flashcards directly to standard markdown, printable study sheets, or import them into Anki with a single click from the Summary tab.',
    },
    {
      q: 'Does it work offline?',
      a: 'Once your study deck is generated, it is automatically cached in your browser’s local storage. You can practice flashcards, run timed practice quizzes, and review notes completely offline without using extra mobile data.',
    },
  ]

  return (
    <section className="py-20 border-t border-white/[0.08] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest font-bold text-brand-400">
          Frequently Asked Questions
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-2">
          Everything You Need to Know
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-dark-900/60 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-slate-100 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-brand-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

