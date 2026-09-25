import React from 'react'
import Modal from '../common/Modal'
import { Sparkles, Check } from 'lucide-react'

export default function TopicSelectorModal({ isOpen, onClose, topics = [], selectedTopics = [], onToggleTopic, onConfirm, isGenerating }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Curate High-Yield Topics" maxWidth="max-w-lg">
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-3 shadow-glow-brand">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-white">Select Key Topics to Study</h3>
        <p className="text-xs text-slate-400 mt-1">
          Our AI extracted these core concepts from your notes. Toggle the ones you want on your upcoming exam.
        </p>
      </div>

      {/* Topics list */}
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {topics.map((topic, idx) => {
          const isSelected = selectedTopics.includes(topic)
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onToggleTopic(topic)}
              className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 border ${
                isSelected
                  ? 'bg-brand-500/15 border-brand-500/50 text-white shadow-sm'
                  : 'bg-dark-950/60 border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="truncate">{topic}</span>
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-500 text-white'
                    : 'border border-white/20 bg-dark-900'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          {selectedTopics.length} of {topics.length} selected
        </span>
        <button
          onClick={onConfirm}
          disabled={selectedTopics.length === 0 || isGenerating}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Synthesizing Decks...' : `Proceed with ${selectedTopics.length} topics`}
        </button>
      </div>
    </Modal>
  )
}

