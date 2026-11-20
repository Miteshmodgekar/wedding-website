import React from 'react'
import { motion } from 'motion/react'
import { MessageCircle, Phone, Share2, Heart } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

const GoldBtn = ({ href, icon: Icon, label, sublabel, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-3 p-6 transition-all duration-300"
    style={{
      border: '1px solid rgba(201,168,76,0.4)',
      background: 'rgba(253,250,245,0.05)',
      backdropFilter: 'blur(8px)',
      borderRadius: 2,
    }}
    aria-label={ariaLabel || label}
  >
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
        boxShadow: '0 0 20px rgba(201,168,76,0.3)',
      }}
    >
      <Icon size={22} style={{ color: '#FDFAF5' }} />
    </div>
    <div className="text-center">
      <p
        className="text-sm font-medium tracking-wider uppercase"
        style={{ color: '#D4B483', fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className="text-xs mt-0.5"
          style={{
            color: 'rgba(212,180,131,0.6)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {sublabel}
        </p>
      )}
    </div>
  </a>
)

export default function RsvpSection() {
  const { contact, couple } = weddingConfig

  const whatsappRsvpUrl = `https://wa.me/${contact.whatsappRsvp}?text=${encodeURIComponent(
    contact.rsvpMessage,
  )}`
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${contact.shareMessage}\n${contact.shareUrl}`,
  )}`

  return (
    <section
      className="py-20 sm:py-28 px-4"
      style={{
        background:
          'linear-gradient(180deg, #2C1810 0%, #4A1118 50%, #2C1810 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart
            size={32}
            fill="#C9A84C"
            style={{ color: '#C9A84C', margin: '0 auto 1.5rem' }}
            aria-hidden="true"
          />
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-sans)' }}
          >
            Your Presence
          </p>
          <h2
            className="text-4xl sm:text-5xl mb-6"
            style={{ fontFamily: 'var(--font-script)', color: '#FDFAF5' }}
          >
            Join the Celebration
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto"
            style={{
              color: 'rgba(253,250,245,0.75)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
            }}
          >
            Your presence would make our day truly special.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <GoldBtn
            href={whatsappRsvpUrl}
            icon={MessageCircle}
            label="RSVP"
            sublabel="via WhatsApp"
            ariaLabel="RSVP via WhatsApp"
          />
          <GoldBtn
            href={whatsappShareUrl}
            icon={Share2}
            label="Share"
            sublabel="Invite a friend"
            ariaLabel="Share the invitation via WhatsApp"
          />
        </motion.div>
      </div>
    </section>
  )
}

