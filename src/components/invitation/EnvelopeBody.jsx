// src/components/invitation/EnvelopeBody.jsx
import React from 'react'

const FloralCornerSVG = ({ style }) => (
  <svg
    viewBox="0 0 100 100"
    className="absolute pointer-events-none"
    style={{ width: 'clamp(44px, 11vw, 68px)', height: 'clamp(44px, 11vw, 68px)', ...style }}
    fill="none"
    aria-hidden="true"
  >
    {/* Stem */}
    <path d="M8 92 Q35 60 60 35 Q78 18 92 8" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7"/>
    {/* Leaves */}
    <ellipse cx="60" cy="35" rx="11" ry="5" transform="rotate(-45 60 35)" fill="#C9A84C" opacity="0.45"/>
    <ellipse cx="60" cy="35" rx="11" ry="5" transform="rotate(45 60 35)" fill="#C9A84C" opacity="0.3"/>
    <ellipse cx="35" cy="60" rx="9" ry="4" transform="rotate(-30 35 60)" fill="#C9A84C" opacity="0.4"/>
    {/* Flower centres */}
    <circle cx="60" cy="35" r="3.5" fill="#D4B483" opacity="0.9"/>
    <circle cx="35" cy="60" r="2.5" fill="#D4B483" opacity="0.8"/>
    <circle cx="78" cy="20" r="2.5" fill="#D4B483" opacity="0.8"/>
    {/* Petals at apex */}
    {[0,60,120,180,240,300].map(deg => (
      <ellipse
        key={deg}
        cx="60" cy="35"
        rx="5" ry="2"
        fill="#C9A84C"
        opacity="0.35"
        transform={`rotate(${deg} 60 35)`}
      />
    ))}
    {/* Dot accents */}
    <circle cx="22" cy="78" r="1.5" fill="#C9A84C" opacity="0.5"/>
    <circle cx="12" cy="88" r="1" fill="#C9A84C" opacity="0.4"/>
    <circle cx="88" cy="12" r="1.5" fill="#C9A84C" opacity="0.5"/>
  </svg>
)

const GoldDivider = ({ goldAccent = '#C9A84C' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${goldAccent})` }} />
    <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill={goldAccent} />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${goldAccent})` }} />
  </div>
)

export { GoldDivider }

export default function EnvelopeBody({ envelopeColor, goldAccent, children }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(145deg, ${envelopeColor} 0%, #F5E6E8 55%, #EDD9A3 100%)`,
        border: `1.5px solid ${goldAccent}`,
        borderRadius: 3,
        boxShadow: '0 20px 60px rgba(44,24,16,0.4), 0 4px 16px rgba(44,24,16,0.2)',
        overflow: 'hidden',
      }}
    >
      {/* Inner lining border */}
      <div
        className="absolute"
        style={{
          inset: 6,
          background: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(201,168,76,0.06) 8px, rgba(201,168,76,0.06) 16px)',
          border: `1px solid rgba(201,168,76,0.25)`,
          borderRadius: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Floral corners */}
      <FloralCornerSVG style={{ top: 4, left: 4 }} />
      <FloralCornerSVG style={{ top: 4, right: 4, transform: 'scaleX(-1)' }} />
      <FloralCornerSVG style={{ bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
      <FloralCornerSVG style={{ bottom: 4, right: 4, transform: 'scale(-1,-1)' }} />

      {/* Thin gold inner frame */}
      <div
        className="absolute"
        style={{
          inset: 10,
          border: `1px solid rgba(201,168,76,0.18)`,
          borderRadius: 2,
          pointerEvents: 'none',
        }}
      />

      {children}
    </div>
  )
}
