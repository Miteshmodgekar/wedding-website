// src/components/invitation/WaxSeal.jsx
import React from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function WaxSeal({ initials, color, goldAccent, phase, reducedMotion }) {
  const isVisible = phase === 'CLOSED'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="wax-seal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={
            reducedMotion
              ? { duration: 0.05 }
              : { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
          }
          className="absolute flex flex-col items-center justify-center z-20"
          style={{
            width: 'clamp(52px, 14vw, 72px)',
            height: 'clamp(52px, 14vw, 72px)',
            bottom: 'clamp(-28px, -7vw, -36px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: `radial-gradient(circle at 35% 35%, ${lighten(color)}, ${color} 60%, ${darken(color)} 100%)`,
            borderRadius: '50%',
            border: `2px solid ${goldAccent}`,
            boxShadow: `0 4px 16px rgba(0,0,0,0.35), inset 0 1px 3px rgba(255,255,255,0.15)`,
          }}
          aria-hidden="true"
        >
          {/* Outer ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 72 72"
            fill="none"
          >
            <circle cx="36" cy="36" r="32" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            {/* Embossed petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse
                key={deg}
                cx="36"
                cy="12"
                rx="3"
                ry="6"
                fill={goldAccent}
                opacity="0.3"
                transform={`rotate(${deg} 36 36)`}
              />
            ))}
          </svg>
          <span
            style={{
              color: goldAccent,
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(10px, 3vw, 14px)',
              lineHeight: 1,
              position: 'relative',
              zIndex: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {initials}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Utility: simple hex lightener/darkener
function lighten(hex) {
  return adjustHex(hex, 40)
}
function darken(hex) {
  return adjustHex(hex, -30)
}
function adjustHex(hex, amount) {
  const h = hex.replace('#', '')
  const num = parseInt(h, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
