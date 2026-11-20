import React from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className={`flex items-start gap-6 mb-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content card */}
      <div
        className={`flex-1 p-6 shadow-md ${isLeft ? 'text-left' : 'text-right'}`}
        style={{
          background: 'linear-gradient(135deg, #FDFAF5 0%, #F5E6E8 100%)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 2,
        }}
      >
        <span
          className="inline-block text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-3"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
            color: '#FDFAF5',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {item.year}
        </span>
        <h3
          className="text-xl sm:text-2xl mb-2"
          style={{ fontFamily: 'var(--font-script)', color: '#4A1118' }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: '#6B1E2A',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Timeline node */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
            border: '2px solid #FDFAF5',
            boxShadow: '0 0 15px rgba(201,168,76,0.4)',
          }}
        >
          <Heart size={14} fill="#FDFAF5" style={{ color: '#FDFAF5' }} />
        </div>
        <div
          className="w-px flex-1 mt-2"
          style={{
            background: 'linear-gradient(to bottom, #C9A84C, transparent)',
            minHeight: 40,
          }}
        />
      </div>

      {/* Spacer (desktop alternating layout) */}
      <div className="flex-1 hidden sm:block" aria-hidden="true" />
    </motion.div>
  )
}

export default function LoveStorySection() {
  const { loveStory } = weddingConfig

  return (
    <section
      className="py-20 sm:py-28 px-4"
      style={{
        background:
          'linear-gradient(180deg, var(--color-ivory) 0%, var(--color-blush) 50%, var(--color-ivory) 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: '#8B6914', fontFamily: 'var(--font-sans)' }}
          >
            How it began
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: 'var(--font-script)', color: '#4A1118' }}
          >
            Our Love Story
          </h2>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-xl" style={{ color: '#C9A84C' }} aria-hidden="true">✦</span>
          </div>
        </motion.div>

        {/* Vertical spine */}
        <div className="relative">
          <div
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #C9A84C 15%, #C9A84C 85%, transparent)',
            }}
            aria-hidden="true"
          />
          {loveStory.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

