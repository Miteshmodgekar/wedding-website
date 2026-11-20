// src/components/invitation/SkipButton.jsx
import React from 'react'
import { motion } from 'motion/react'

export default function SkipButton({ onSkip, phase }) {
  if (phase === 'COMPLETED') return null
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.5 }}
      onClick={onSkip}
      className="absolute"
      style={{
        top: 'max(16px, 16px)',
        right: 'max(16px, 16px)',
        background: 'rgba(44,24,16,0.5)',
        border: '1px solid rgba(201,168,76,0.4)',
        color: 'rgba(212,180,131,0.9)',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '7px 14px',
        borderRadius: 2,
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 100,
        outline: 'none',
      }}
      onFocus={(e) => { e.currentTarget.style.outline = '2px solid #C9A84C' }}
      onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
      aria-label="Skip the invitation opening animation"
    >
      Skip
    </motion.button>
  )
}
