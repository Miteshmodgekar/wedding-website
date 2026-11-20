import React from 'react'
import { motion } from 'motion/react'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

const SectionHeader = ({ title, subtitle }) => (
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
      {subtitle}
    </p>
    <h2
      className="text-4xl sm:text-5xl"
      style={{ fontFamily: 'var(--font-script)', color: '#4A1118' }}
    >
      {title}
    </h2>
    <div className="ornament-line mt-4 max-w-xs mx-auto">
      <span className="text-xl" style={{ color: '#C9A84C' }} aria-hidden="true">✦</span>
    </div>
  </motion.div>
)

const EventCard = ({ event, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay: index * 0.1 }}
    className="group relative overflow-hidden shadow-xl"
    style={{
      border: '1px solid rgba(201,168,76,0.3)',
      borderRadius: 2,
    }}
  >
    {/* Image */}
    <div className="relative h-56 overflow-hidden">
      <img
        src={event.imageUrl}
        alt={`${event.name} ceremony`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(44,24,16,0.1) 0%, rgba(44,24,16,0.7) 100%)',
        }}
      />
      <div
        className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-xl"
        style={{
          background: 'rgba(44,24,16,0.7)',
          border: '1px solid rgba(201,168,76,0.5)',
          backdropFilter: 'blur(8px)',
        }}
        aria-hidden="true"
      >
        {event.icon}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="text-2xl sm:text-3xl"
          style={{ fontFamily: 'var(--font-script)', color: '#FDFAF5' }}
        >
          {event.name}
        </h3>
        <p
          className="text-xs tracking-widest uppercase mt-0.5"
          style={{ color: '#D4B483' }}
        >
          {event.date}
        </p>
      </div>
    </div>

    {/* Details */}
    <div
      className="p-5"
      style={{
        background: 'linear-gradient(to bottom, #FDFAF5, #F5E6E8)',
      }}
    >
      <p
        className="text-sm italic mb-4 leading-relaxed"
        style={{
          color: '#6B1E2A',
          fontFamily: 'var(--font-serif)',
        }}
      >
        {event.description}
      </p>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Clock size={14} className="mt-0.5 shrink-0" style={{ color: '#8B6914' }} />
          <span className="text-sm" style={{ color: '#2C1810' }}>
            {event.time}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#8B6914' }} />
          <div>
            <p className="text-sm font-medium" style={{ color: '#2C1810' }}>
              {event.venue}
            </p>
            <p className="text-xs" style={{ color: '#6B1E2A' }}>
              {event.address}
            </p>
          </div>
        </div>
      </div>
      {event.mapsUrl && (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 px-5 py-2 text-xs tracking-widest uppercase transition-opacity duration-300 hover:opacity-80"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #8B6914)',
            color: '#FDFAF5',
            borderRadius: 1,
            fontFamily: 'var(--font-sans)',
          }}
          aria-label={`Get directions to ${event.venue}`}
        >
          <ExternalLink size={12} />
          Get Directions
        </a>
      )}
    </div>
  </motion.article>
)

export default function EventsSection() {
  const { events } = weddingConfig
  const activeEvents = events.filter((e) => e.enabled)

  return (
    <section
      className="py-20 sm:py-28 px-4"
      style={{
        background:
          'linear-gradient(180deg, var(--color-ivory) 0%, var(--color-blush) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Wedding Celebrations" subtitle="Join us for" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

