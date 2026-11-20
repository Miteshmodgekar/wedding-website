// src/components/invitation/useEnvelopeStateMachine.js
// State machine: CLOSED → OPENING → REVEALING → COMPLETED
// Handles sessionStorage, timers, reduced-motion, and strict-mode safety.

import { useState, useEffect, useRef, useCallback } from 'react'

const SESSION_KEY = 'wedcraft_envelope_opened'

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function writeSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch { /* ignore */ }
}

/**
 * @param {object} options
 * @param {boolean} options.enabled         - If false, call onComplete immediately.
 * @param {boolean} options.rememberOpened  - Use sessionStorage to skip replay.
 * @param {object}  options.durations       - { sealFade, flapOpen, cardRise, cardSettle, overlayFade }
 * @param {boolean} options.reducedMotion   - If true, collapse all durations to near-zero.
 * @param {function} options.onComplete     - Called when overlay should unmount.
 */
export function useEnvelopeStateMachine({
  enabled,
  rememberOpened,
  durations,
  reducedMotion,
  onComplete,
}) {
  // If not enabled or already seen this session → complete immediately
  const shouldSkip = !enabled || (rememberOpened && readSession())

  const [phase, setPhase] = useState(() => shouldSkip ? 'COMPLETED' : 'CLOSED')
  const timersRef = useRef([])
  const hasRunRef = useRef(false) // guard against Strict Mode double-fire

  // Clear all scheduled timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  // If phase is immediately COMPLETED on mount, fire onComplete
  useEffect(() => {
    if (phase === 'COMPLETED' && shouldSkip) {
      onComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const schedule = useCallback((fn, delay) => {
    const d = reducedMotion ? Math.min(delay, 50) : delay
    const id = setTimeout(fn, d)
    timersRef.current.push(id)
    return id
  }, [reducedMotion])

  const triggerOpen = useCallback(() => {
    if (phase !== 'CLOSED') return
    if (hasRunRef.current) return
    hasRunRef.current = true

    setPhase('OPENING')

    const { sealFade, flapOpen, cardRise, cardSettle, overlayFade } = durations

    // After seal fades + flap opens → REVEALING
    schedule(() => setPhase('REVEALING'), sealFade + flapOpen)

    // After card rises → COMPLETED (internal)
    schedule(() => {
      setPhase('COMPLETED')
      if (rememberOpened) writeSession()
    }, sealFade + flapOpen + cardRise + cardSettle)

    // After overlay fade → unmount
    schedule(() => onComplete(), sealFade + flapOpen + cardRise + cardSettle + overlayFade)
  }, [phase, durations, rememberOpened, onComplete, schedule])

  const triggerSkip = useCallback(() => {
    if (phase === 'COMPLETED') return
    // Cancel all pending timers
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    hasRunRef.current = true
    setPhase('COMPLETED')
    if (rememberOpened) writeSession()
    // Short pause then unmount
    const id = setTimeout(() => onComplete(), reducedMotion ? 50 : 400)
    timersRef.current.push(id)
  }, [phase, rememberOpened, reducedMotion, onComplete])

  return { phase, triggerOpen, triggerSkip }
}
