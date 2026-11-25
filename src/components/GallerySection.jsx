import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

export default function GallerySection() {
  const { gallery } = weddingConfig
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length],
  )
  const next = useCallback(
    () => setLightboxIndex((i) => (i + 1) % gallery.length),
    [gallery.length],
  )

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, prev, next, closeLightbox])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Layout: 6 photos in a balanced 3-col CSS grid with row-spans
  // Col1: photo[0] tall + photo[3] short
  // Col2: photo[1] short + photo[4] tall
  // Col3: photo[2] tall + photo[5] short
  const photos = gallery.slice(0, 6)

  const tileStyle = (i) => {
    // alternating tall/short pattern per column
    const heights = [320, 220, 300, 220, 320, 220]
    return { height: heights[i] ?? 260 }
  }

  return (
    <section
      className="py-20 sm:py-28 px-4"
      style={{
        background:
          'linear-gradient(180deg, var(--color-blush) 0%, var(--color-ivory) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
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

        {/* Balanced 3-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '12px',
          }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="cursor-pointer group overflow-hidden relative"
              style={{
                ...tileStyle(i),
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 3,
                boxShadow: '0 2px 16px rgba(44,24,16,0.1)',
              }}
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
              aria-label={`View photo: ${photo.caption}`}
            >
              <img
                src={photo.thumb}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Caption on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                style={{
                  background:
                    'linear-gradient(to top, rgba(44,24,16,0.72) 0%, transparent 60%)',
                }}
              >
                <p
                  className="text-xs"
                  style={{
                    color: '#F5EDD8',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                  }}
                >
                  {photo.caption}
                </p>
              </div>
              {/* Gold border glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 1.5px rgba(201,168,76,0.55)',
                  borderRadius: 3,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'rgba(26,10,5,0.96)',
              backdropFilter: 'blur(14px)',
            }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
              aria-label="Close lightbox"
            >
              <X size={18} style={{ color: '#D4B483' }} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 sm:left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} style={{ color: '#D4B483' }} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={gallery[lightboxIndex].url}
                  alt={gallery[lightboxIndex].caption}
                  className="w-full h-auto shadow-2xl"
                  style={{ maxHeight: '80vh', objectFit: 'contain', borderRadius: 3 }}
                />
                <p
                  className="text-center mt-4 text-sm italic"
                  style={{ color: '#D4B483', fontFamily: 'var(--font-serif)' }}
                >
                  {gallery[lightboxIndex].caption}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
              aria-label="Next photo"
            >
              <ChevronRight size={20} style={{ color: '#D4B483' }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
