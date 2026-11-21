// src/components/EnvelopeOpening.jsx
// ============================================================
// WedCraft Premium — Royal Envelope Opening Experience
// ============================================================
// State machine: CLOSED → OPENING → REVEALING → COMPLETED
// All content driven by weddingConfig.js — never hardcoded.
// ============================================================

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { weddingConfig } from '../data/weddingConfig'
import { useEnvelopeStateMachine } from './invitation/useEnvelopeStateMachine'
import WaxSeal from './invitation/WaxSeal'
import EnvelopeBody from './invitation/EnvelopeBody'
import EnvelopeFlap from './invitation/EnvelopeFlap'
import InvitationCard from './invitation/InvitationCard'
import SkipButton from './invitation/SkipButton'

// ── Reduced-motion detection ──────────────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = React.useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// ── Ambient particles (decorative, low-cost) ─────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: ((i % 3) * 0.8 + 1.2),
  left: `${(i * 5.56) % 100}%`,
  top: `${(i * 7.77) % 100}%`,
  dur: 2.8 + (i % 5) * 0.5,
  delay: i * 0.22,
}))

// ── Main component ────────────────────────────────────────────────────────────
export default function EnvelopeOpening({ onOpen }) {
  const { couple, wedding, envelope: envCfg, theme } = weddingConfig

  // Safe-access envelope config with fallbacks
  const cfg = {
    enabled: envCfg?.enabled ?? true,
    rememberOpened: envCfg?.rememberOpened ?? true,
    allowSkip: envCfg?.allowSkip ?? true,
    buttonLabel: envCfg?.buttonLabel ?? 'Open Invitation',
    coupleInitials: envCfg?.coupleInitials ?? `${couple.bride.firstName[0]} & ${couple.groom.firstName[0]}`,
    envelopeColor: envCfg?.envelopeColor ?? theme?.ivory ?? '#FDFAF5',
    goldAccentColor: envCfg?.goldAccentColor ?? theme?.accent ?? '#C9A84C',
    waxSealColor: envCfg?.waxSealColor ?? theme?.secondary ?? '#6B1E2A',
    durations: {
      sealFade: envCfg?.durations?.sealFade ?? 350,
      flapOpen: envCfg?.durations?.flapOpen ?? 900,
      cardRise: envCfg?.durations?.cardRise ?? 800,
      cardSettle: envCfg?.durations?.cardSettle ?? 600,
      overlayFade: envCfg?.durations?.overlayFade ?? 500,
    },
  }

  const reducedMotion = useReducedMotion()
  const prevFocusRef = useRef(null)
  const openBtnRef = useRef(null)

  const { phase, triggerOpen, triggerSkip } = useEnvelopeStateMachine({
    enabled: cfg.enabled,
    rememberOpened: cfg.rememberOpened,
    durations: cfg.durations,
    reducedMotion,
    onComplete: onOpen,
  })

  // Lock body scroll while overlay is active
  useEffect(() => {
    if (phase === 'COMPLETED') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    prevFocusRef.current = document.activeElement
    return () => {
      document.body.style.overflow = prev
      // Restore focus after overlay exits
      if (prevFocusRef.current && typeof prevFocusRef.current.focus === 'function') {
        prevFocusRef.current.focus()
      }
    }
  }, [phase])

  // Keyboard: Space/Enter on the overlay background = open if CLOSED
  const handleOverlayKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && phase === 'CLOSED') {
      e.preventDefault()
      triggerOpen()
    }
  }

  // Don't render if immediately completed (session already seen)
  if (phase === 'COMPLETED') return null

  const gold = cfg.goldAccentColor

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-overlay"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(145deg, #1A0A05 0%, #2C1810 30%, #4A1118 65%, #2C1810 85%, #1A0A05 100%)',
          overflow: 'hidden',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: (cfg.durations.overlayFade / 1000), ease: 'easeInOut' }}
        onKeyDown={handleOverlayKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label="Wedding invitation opening"
      >
        {/* ── Ambient particles ── */}
        {!reducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {PARTICLES.map(p => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: gold,
                  left: p.left,
                  top: p.top,
                  willChange: 'opacity, transform',
                }}
                animate={{ opacity: [0.08, 0.4, 0.08], scale: [1, 1.6, 1] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* ── Skip button ── */}
        {cfg.allowSkip && (
          <SkipButton phase={phase} onSkip={triggerSkip} />
        )}

        {/* ── Eyebrow header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.05 } : { duration: 0.9, delay: 0.3 }}
          className="text-center mb-6"
          aria-hidden="true"
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(9px, 2.5vw, 11px)',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: gold,
          }}>
            WedCraft Premium
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(11px, 3vw, 14px)',
            color: '#D4B483',
            marginTop: 2,
          }}>
            A Luxury Wedding Invitation
          </p>
        </motion.div>

        {/* ── Envelope stage ── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: phase === 'OPENING' ? 1.03 : 1,
          }}
          transition={reducedMotion ? { duration: 0.05 } : { duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{
            width: 'clamp(280px, 85vw, 460px)',
            aspectRatio: '7 / 5',
            perspective: '900px',
            perspectiveOrigin: 'center top',
          }}
        >
          {/* Envelope body (bottom layer) */}
          <EnvelopeBody
            envelopeColor={cfg.envelopeColor}
            goldAccent={gold}
          >
            {/* Inner invitation text visible before card rises */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'CLOSED' ? 1 : 0 }}
                transition={reducedMotion ? { duration: 0.05 } : { duration: 0.4 }}
                style={{ textAlign: 'center', width: '100%' }}
              >
                <div style={{ fontSize: 'clamp(16px, 5vw, 24px)', color: '#8B6914', marginBottom: 4, fontFamily: 'var(--font-serif)' }} aria-label="Om">
                  &#x0964;&#x0964; &#x0950; &#x0964;&#x0964;
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0' }}>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${gold})` }} />
                  <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill={gold} /></svg>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${gold})` }} />
                </div>
                <h1 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(28px, 9vw, 48px)', color: '#4A1118', lineHeight: 1.1, margin: '4px 0' }}>
                  {couple.groom.firstName}
                  <span style={{ color: gold, fontSize: '0.65em', margin: '0 8px' }}>&amp;</span>
                  {couple.bride.firstName}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0' }}>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${gold})` }} />
                  <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill={gold} /></svg>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${gold})` }} />
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(10px, 2.8vw, 13px)', color: '#6B1E2A', margin: '2px 0' }}>
                  invite you to their Wedding Celebration
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(9px, 2.5vw, 12px)', color: '#8B6914', letterSpacing: '0.15em', marginTop: 6 }}>
                  {wedding.dateDisplay}
                </p>
              </motion.div>
            </div>
          </EnvelopeBody>

          {/* Invitation card that rises from envelope */}
          <InvitationCard
            phase={phase}
            brideName={couple.groom.firstName}
            groomName={couple.bride.firstName}
            dateDisplay={wedding.dateDisplay}
            tagline={wedding.tagline}
            openingMessage={wedding.openingMessage}
            goldAccent={gold}
            reducedMotion={reducedMotion}
          />

          {/* Envelope flap (must render above body but below card) */}
          <div style={{ position: 'absolute', inset: 0, perspective: '900px', perspectiveOrigin: 'center top' }}>
            <EnvelopeFlap
              phase={phase}
              goldAccent={gold}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Wax seal (positioned at flap bottom, fades when OPENING begins) */}
          <WaxSeal
            initials={cfg.coupleInitials}
            color={cfg.waxSealColor}
            goldAccent={gold}
            phase={phase}
            reducedMotion={reducedMotion}
          />
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.05 } : { duration: 0.9, delay: 0.9 }}
        >
          <motion.button
            ref={openBtnRef}
            onClick={triggerOpen}
            disabled={phase !== 'CLOSED'}
            className="relative overflow-hidden"
            style={{
              padding: 'clamp(12px, 3vw, 16px) clamp(28px, 8vw, 44px)',
              fontSize: 'clamp(10px, 2.5vw, 13px)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              background: `linear-gradient(135deg, ${gold} 0%, #8B6914 50%, ${gold} 100%)`,
              backgroundSize: '200% auto',
              color: '#FDFAF5',
              border: `1px solid rgba(201,168,76,0.5)`,
              borderRadius: 2,
              cursor: phase === 'CLOSED' ? 'pointer' : 'default',
              boxShadow: '0 0 24px rgba(201,168,76,0.25)',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
            whileHover={phase === 'CLOSED' && !reducedMotion ? { scale: 1.03, boxShadow: '0 0 40px rgba(201,168,76,0.45)' } : {}}
            whileTap={phase === 'CLOSED' && !reducedMotion ? { scale: 0.97 } : {}}
            onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${gold}` }}
            onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
            aria-label={
              phase === 'CLOSED'
                ? cfg.buttonLabel
                : phase === 'OPENING' || phase === 'REVEALING'
                ? 'Opening the invitation\u2026'
                : 'Welcome!'
            }
            aria-disabled={phase !== 'CLOSED'}
          >
            {phase === 'CLOSED' && cfg.buttonLabel}
            {(phase === 'OPENING' || phase === 'REVEALING') && 'Opening\u2026'}
            {phase === 'COMPLETED' && 'Welcome \u2728'}
          </motion.button>
        </motion.div>

        {/* ── Subtle footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={reducedMotion ? { duration: 0.05 } : { delay: 2, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(8px, 2vw, 10px)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            marginTop: 20,
          }}
          aria-hidden="true"
        >
          Scroll to explore after opening
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
