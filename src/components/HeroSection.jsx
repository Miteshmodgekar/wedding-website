import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'
import CountdownTimer from './CountdownTimer'

const FloatingPetal = ({ delay, x, size }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{ left: x, top: '-5%', fontSize: size, opacity: 0.3 }}
    animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0.3, 0.6, 0] }}
    transition={{ duration: 8 + delay, repeat: Infinity, delay, ease: 'linear' }}
    aria-hidden="true"
  >
    🌸
  </motion.div>
)

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imgY   = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const { couple, wedding } = weddingConfig

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src={couple.heroPhotoUrl}
          alt={`${couple.bride.firstName} and ${couple.groom.firstName} wedding`}
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(44,24,16,0.5) 0%, rgba(44,24,16,0.2) 40%, rgba(44,24,16,0.65) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(44,24,16,0.6) 100%)',
          }}
        />
      </motion.div>

      {/* Floating petals */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <FloatingPetal
          key={i}
          delay={i * 1.2}
          x={`${10 + i * 11}%`}
          size={16 + (i % 3) * 6}
        />
      ))}

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* Om symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl mb-4"
          style={{ color: '#D4B483' }}
          aria-label="Om"
        >
          ॥ ॐ ॥
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: '#D4B483', fontFamily: 'var(--font-sans)' }}
        >
          {wedding.tagline}
        </motion.p>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl sm:text-7xl md:text-8xl leading-none mb-4"
          style={{
            fontFamily: 'var(--font-script)',
            color: '#FDFAF5',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          {couple.bride.firstName}
        </motion.h1>

        {/* Ampersand divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4 justify-center mb-4"
        >
          <div
            className="h-px w-16 sm:w-24"
            style={{
              background: 'linear-gradient(to right, transparent, #C9A84C)',
            }}
          />
          <span
            className="text-3xl"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-script)' }}
            aria-hidden="true"
          >
            &amp;
          </span>
          <div
            className="h-px w-16 sm:w-24"
            style={{
              background: 'linear-gradient(to left, transparent, #C9A84C)',
            }}
          />
        </motion.div>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-6xl sm:text-7xl md:text-8xl leading-none mb-8"
          style={{
            fontFamily: 'var(--font-script)',
            color: '#FDFAF5',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          {couple.groom.firstName}
        </motion.h1>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="inline-block px-6 py-2 mb-6"
          style={{
            background: 'rgba(44,24,16,0.5)',
            border: '1px solid rgba(201,168,76,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
          }}
        >
          <p
            className="text-sm tracking-widest uppercase"
            style={{ color: '#D4B483', fontFamily: 'var(--font-sans)' }}
          >
            {wedding.dayDisplay} &middot; {wedding.dateDisplay}
          </p>
        </motion.div>

        {/* Invitation text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-10"
          style={{
            color: 'rgba(253,250,245,0.85)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
          }}
        >
          {wedding.invitationText}
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <CountdownTimer targetDateISO={wedding.dateISO} />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <ChevronDown size={28} style={{ color: '#D4B483', opacity: 0.7 }} />
      </motion.div>
    </section>
  )
}

