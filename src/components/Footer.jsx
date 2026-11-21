import React from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

export default function Footer() {
  const { couple, wedding } = weddingConfig

  return (
    <footer
      className="py-16 px-4 text-center"
      style={{
        background: 'linear-gradient(180deg, #2C1810 0%, #1A0A05 100%)',
        borderTop: '1px solid rgba(201,168,76,0.2)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Om */}
        <div
          className="text-3xl mb-4"
          style={{ color: '#C9A84C' }}
          aria-label="Om"
        >
          ॥ ॐ ॥
        </div>

        {/* Couple names */}
        <h2
          className="text-4xl sm:text-5xl mb-3"
          style={{ fontFamily: 'var(--font-script)', color: '#D4B483' }}
        >
          {couple.groom.firstName} &amp; {couple.bride.firstName}
        </h2>

        {/* Date */}
        <p
          className="text-sm tracking-widest uppercase mb-6"
          style={{
            color: 'rgba(212,180,131,0.6)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {wedding.dateDisplay}
        </p>

        {/* Closing verse */}
        <div
          className="max-w-sm mx-auto px-6 py-4 mb-8"
          style={{
            border: '1px solid rgba(201,168,76,0.25)',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 2,
          }}
        >
          <p
            className="text-sm leading-relaxed italic"
            style={{
              color: 'rgba(253,250,245,0.65)',
              fontFamily: 'var(--font-serif)',
            }}
          >
            &ldquo;May this union be blessed with love,
            <br />
            laughter, and everlasting happiness.&rdquo;
          </p>
        </div>

        {/* Gold divider */}
        <div className="flex items-center gap-3 justify-center mb-6 max-w-xs mx-auto" aria-hidden="true">
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(201,168,76,0.4))',
            }}
          />
          <Heart size={14} fill="#C9A84C" style={{ color: '#C9A84C' }} />
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to left, transparent, rgba(201,168,76,0.4))',
            }}
          />
        </div>


      </motion.div>
    </footer>
  )
}

