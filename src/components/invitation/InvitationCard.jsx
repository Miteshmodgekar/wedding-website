// src/components/invitation/InvitationCard.jsx
import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GoldDivider } from './EnvelopeBody'

export default function InvitationCard({
  phase,
  brideName,
  groomName,
  dateDisplay,
  tagline,
  openingMessage,
  goldAccent,
  reducedMotion,
}) {
  const isRevealing = phase === 'REVEALING' || phase === 'COMPLETED'

  return (
    <AnimatePresence>
      {isRevealing && (
        <motion.div
          key="inv-card"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '45%', scale: 0.92 }}
          animate={{ opacity: 1, y: '-8%', scale: 1 }}
          transition={
            reducedMotion
              ? { duration: 0.05 }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
          className="absolute left-0 right-0"
          style={{
            bottom: '-2%',
            zIndex: 5,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
          aria-live="polite"
        >
          <div
            style={{
              width: '84%',
              background: 'linear-gradient(160deg, #FDFAF5 0%, #F9F3E8 60%, #F5EDD8 100%)',
              border: `1px solid ${goldAccent}`,
              borderRadius: 3,
              padding: 'clamp(14px, 4vw, 24px)',
              boxShadow: '0 -8px 32px rgba(44,24,16,0.25), 0 4px 16px rgba(44,24,16,0.12)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Inner lining */}
            <div
              style={{
                position: 'absolute',
                inset: 5,
                border: `1px solid rgba(201,168,76,0.2)`,
                borderRadius: 2,
                pointerEvents: 'none',
              }}
            />

            {/* Om symbol */}
            <div
              style={{
                fontSize: 'clamp(14px, 4vw, 20px)',
                color: '#8B6914',
                marginBottom: 4,
                fontFamily: 'var(--font-serif)',
              }}
              aria-label="Om"
            >
              &#x0964;&#x0964; &#x0950; &#x0964;&#x0964;
            </div>

            <GoldDivider goldAccent={goldAccent} />

            {/* Opening sub-message */}
            {tagline && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(8px, 2vw, 10px)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#8B6914',
                  margin: '4px 0',
                }}
              >
                {tagline}
              </p>
            )}

            {/* Names */}
            <h2
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(24px, 8vw, 42px)',
                color: '#4A1118',
                lineHeight: 1.1,
                margin: '4px 0',
              }}
            >
              {brideName}
              <span style={{ color: goldAccent, fontSize: '0.7em', margin: '0 6px' }}>&amp;</span>
              {groomName}
            </h2>

            <GoldDivider goldAccent={goldAccent} />

            {/* Opening message */}
            {openingMessage && (
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(9px, 2.5vw, 12px)',
                  color: '#6B1E2A',
                  lineHeight: 1.6,
                  margin: '4px 0',
                  whiteSpace: 'pre-line',
                }}
              >
                {openingMessage}
              </p>
            )}

            {/* Date */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(9px, 2.5vw, 12px)',
                letterSpacing: '0.2em',
                color: '#8B6914',
                marginTop: 6,
              }}
            >
              {dateDisplay}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
