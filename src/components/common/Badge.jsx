import React from 'react'

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-white/[0.06] text-slate-300 border-white/[0.08]',
    brand: 'bg-brand-500/10 text-brand-300 border-brand-500/25',
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/25',
    mint: 'bg-mint-500/10 text-emerald-400 border-mint-500/25',
    coral: 'bg-coral-500/10 text-rose-400 border-coral-500/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
  }

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant] || variants.default} ${
        sizes[size] || sizes.sm
      } ${className}`}
    >
      {children}
    </span>
  )
}

