// src/components/invitation/EnvelopeFlap.jsx
import React from 'react'
import { motion } from 'motion/react'

export default function EnvelopeFlap({ phase, goldAccent, reducedMotion }) {
  const isOpen = phase === 'OPENING' || phase === 'REVEALING' || phase === 'COMPLETED'

  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{
        top: 0,
        height: '55%',
        transformOrigin: 'top center',
        zIndex: isOpen ? 10 : 2,
        pointerEvents: 'none',
      }}
      animate={
        isOpen
          ? { rotateX: reducedMotion ? -170 : -165, opacity: reducedMotion ? 0 : 1 }
          : { rotateX: 0, opacity: 1 }
      }
      transition={
        reducedMotion
          ? { duration: 0.05 }
          : {
              rotateX: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.6, delay: 0.5 },
            }
      }
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 220"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="inv-flapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDD9A3" />
            <stop offset="60%" stopColor="#D4B896" />
            <stop offset="100%" stopColor="#C9A87C" />
          </linearGradient>
          {/* Paper texture lines */}
          <pattern id="inv-flapTexture" patternUnits="userSpaceOnUse" width="6" height="6">
            <line x1="0" y1="0" x2="6" y2="6" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        {/* Main flap triangle */}
        <polygon
          points="0,0 400,0 200,210"
          fill="url(#inv-flapGrad)"
        />
        <polygon
          points="0,0 400,0 200,210"
          fill="url(#inv-flapTexture)"
          opacity="0.5"
        />
        {/* Gold border on flap */}
        <polyline
          points="0,0 200,210 400,0"
          stroke={goldAccent}
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        {/* Inner shadow on flap */}
        <polygon
          points="20,0 380,0 200,190"
          fill="none"
          stroke="rgba(44,24,16,0.08)"
          strokeWidth="8"
        />
      </svg>
    </motion.div>
  )
}
