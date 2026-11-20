import React, { useEffect, useState } from 'react'

function getTimeLeft(targetISO) {
  const diff = new Date(targetISO) - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
      style={{
        background: 'rgba(44,24,16,0.5)',
        border: '1px solid rgba(201,168,76,0.5)',
        backdropFilter: 'blur(8px)',
        borderRadius: 2,
      }}
    >
      <span
        className="text-2xl sm:text-3xl font-light tabular-nums"
        style={{ color: '#D4B483', fontFamily: 'var(--font-serif)' }}
      >
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <p
      className="mt-1.5 text-xs tracking-widest uppercase"
      style={{
        color: 'rgba(212,180,131,0.7)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {label}
    </p>
  </div>
)

export default function CountdownTimer({ targetDateISO }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDateISO))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDateISO)), 1000)
    return () => clearInterval(id)
  }, [targetDateISO])

  const isOver =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0

  if (isOver) {
    return (
      <p
        style={{
          color: '#D4B483',
          fontFamily: 'var(--font-script)',
          fontSize: '2rem',
        }}
      >
        Today is the Day! 💍
      </p>
    )
  }

  return (
    <div>
      <p
        className="text-xs tracking-[0.3em] uppercase mb-4"
        style={{
          color: 'rgba(212,180,131,0.7)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Counting Down
      </p>
      <div className="flex gap-3 sm:gap-4 justify-center" role="timer" aria-live="off">
        <Unit value={time.days}    label="Days" />
        <Unit value={time.hours}   label="Hours" />
        <Unit value={time.minutes} label="Min" />
        <Unit value={time.seconds} label="Sec" />
      </div>
    </div>
  )
}

