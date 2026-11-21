import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, Music2 } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

export default function MusicPlayer() {
  const { music } = weddingConfig
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Attempt autoplay on mount; browser policy may block it silently
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay blocked by browser; user must click to play
      })
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay policy blocked; user must interact first
        })
    }
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      role="region"
      aria-label="Background music player"
    >
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="px-4 py-2 rounded-full text-xs"
            style={{
              background: 'rgba(44,24,16,0.85)',
              border: '1px solid rgba(201,168,76,0.4)',
              backdropFilter: 'blur(8px)',
              color: '#D4B483',
              fontFamily: 'var(--font-sans)',
              maxWidth: 180,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            aria-live="polite"
          >
            🎵 {music.trackName}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
        style={{
          background: playing
            ? 'linear-gradient(135deg, #8B6914, #C9A84C)'
            : 'rgba(44,24,16,0.85)',
          border: '1px solid rgba(201,168,76,0.5)',
          backdropFilter: 'blur(8px)',
          boxShadow: playing ? '0 0 20px rgba(201,168,76,0.4)' : 'none',
        }}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
      >
        {playing ? (
          <Pause size={18} style={{ color: '#FDFAF5' }} />
        ) : (
          <Music2 size={18} style={{ color: '#D4B483' }} />
        )}
      </motion.button>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={music.audioUrl} loop preload="auto" />
    </div>
  )
}

