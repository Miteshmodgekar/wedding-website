import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, Music2 } from 'lucide-react'
import { weddingConfig } from '../data/weddingConfig'

export default function MusicPlayer() {
  const { music } = weddingConfig
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Start music when "Open Invitation" is clicked (user gesture = autoplay allowed)
  useEffect(() => {
    const handler = () => {
      if (!audioRef.current) return
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
    window.addEventListener('wedding:play', handler)
    return () => window.removeEventListener('wedding:play', handler)
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

