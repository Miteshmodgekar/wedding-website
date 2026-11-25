import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ gallery, index, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,4,2,0.97)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)' }}
        aria-label="Close"
      >
        <X size={18} style={{ color: '#D4B483' }} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 text-xs tracking-widest"
        style={{ color: 'rgba(212,180,131,0.6)', fontFamily: 'var(--font-sans)' }}
      >
        {index + 1} / {gallery.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 sm:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
        aria-label="Previous"
      >
        <ChevronLeft size={22} style={{ color: '#D4B483' }} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="max-w-4xl w-full px-16 sm:px-24 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={gallery[index].url}
            alt={gallery[index].caption}
            className="w-full h-auto shadow-2xl"
            style={{ maxHeight: '78vh', objectFit: 'contain', borderRadius: 3 }}
          />
          <p
            className="mt-5 text-sm italic tracking-wide"
            style={{ color: '#D4B483', fontFamily: 'var(--font-serif)' }}
          >
            {gallery[index].caption}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-3 sm:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
        aria-label="Next"
      >
        <ChevronRight size={22} style={{ color: '#D4B483' }} />
      </button>
    </motion.div>
  )
}

// ── Single photo tile ─────────────────────────────────────────────────────────
function PhotoTile({ photo, index, onClick, style, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      style={{
        borderRadius: 4,
        border: '1px solid rgba(201,168,76,0.25)',
        boxShadow: '0 4px 24px rgba(44,24,16,0.18)',
        ...style,
      }}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(index)}
      aria-label={`View: ${photo.caption}`}
    >
      <img
        src={photo.thumb}
        alt={photo.caption}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        style={{ display: 'block' }}
        loading="lazy"
      />

      {/* Gold shimmer border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 2px rgba(201,168,76,0.6)',
          borderRadius: 4,
        }}
      />

      {/* Caption overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(26,10,5,0.82) 0%, rgba(26,10,5,0.3) 50%, transparent 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <p
            className="text-sm italic"
            style={{ color: '#F5EDD8', fontFamily: 'var(--font-serif)', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
          >
            {photo.caption}
          </p>
          <Maximize2 size={14} style={{ color: '#C9A84C', flexShrink: 0, marginLeft: 8 }} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Gallery ──────────────────────────────────────────────────────────────
export default function GallerySection() {
  const { gallery } = weddingConfig
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const open  = useCallback((i) => setLightboxIndex(i), [])
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev  = useCallback(() => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length])
  const next  = useCallback(() => setLightboxIndex((i) => (i + 1) % gallery.length), [gallery.length])

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, prev, next, close])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // We need at least 6 photos; pad if fewer
  const photos = gallery.slice(0, 6)

  return (
    <section
      className="py-20 sm:py-28 px-4"
      style={{
        background: 'linear-gradient(180deg, var(--color-blush) 0%, var(--color-ivory) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
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
            Memories
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: 'var(--font-script)', color: '#4A1118' }}
          >
            Our Gallery
          </h2>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-xl" style={{ color: '#C9A84C' }} aria-hidden="true">✦</span>
          </div>
        </motion.div>

        {/* ── LAYOUT ──────────────────────────────────────────────────────────
            Row 1: [tall hero left] + [2 stacked right]          3 photos
            Row 2: [3 equal landscape]                            3 photos
        ─────────────────────────────────────────────────────────────────── */}

        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-3 mb-3" style={{ gridTemplateRows: '340px' }}>
          {/* Big hero — spans 2 cols */}
          {photos[0] && (
            <PhotoTile
              photo={photos[0]}
              index={0}
              onClick={open}
              className="col-span-2"
              style={{ height: '340px' }}
            />
          )}
          {/* Two stacked right */}
          <div className="flex flex-col gap-3">
            {photos[1] && (
              <PhotoTile
                photo={photos[1]}
                index={1}
                onClick={open}
                style={{ height: '162px' }}
              />
            )}
            {photos[2] && (
              <PhotoTile
                photo={photos[2]}
                index={2}
                onClick={open}
                style={{ height: '162px' }}
              />
            )}
          </div>
        </div>

        {/* Row 2 — three equal tiles with the middle one taller */}
        <div className="grid grid-cols-3 gap-3" style={{ alignItems: 'stretch' }}>
          {photos[3] && (
            <PhotoTile
              photo={photos[3]}
              index={3}
              onClick={open}
              style={{ height: '260px' }}
            />
          )}
          {/* Centre — slightly taller for visual rhythm */}
          {photos[4] && (
            <PhotoTile
              photo={photos[4]}
              index={4}
              onClick={open}
              style={{ height: '300px', marginTop: '-20px' }}
            />
          )}
          {photos[5] && (
            <PhotoTile
              photo={photos[5]}
              index={5}
              onClick={open}
              style={{ height: '260px' }}
            />
          )}
        </div>

        {/* Gold quote strip below */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p
            className="text-sm italic"
            style={{ color: '#8B6914', fontFamily: 'var(--font-serif)' }}
          >
            "Every picture tells a story of love written in light."
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            gallery={gallery}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
