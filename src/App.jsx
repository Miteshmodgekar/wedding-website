import React, { useState } from 'react'
import EnvelopeOpening from './components/EnvelopeOpening'
import HeroSection from './components/HeroSection'
import EventsSection from './components/EventsSection'
import GallerySection from './components/GallerySection'
import LoveStorySection from './components/LoveStorySection'
import RsvpSection from './components/RsvpSection'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'
import { weddingConfig } from './data/weddingConfig'

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const { sections } = weddingConfig

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-ivory)' }}>
      {/* Cinematic Envelope Opening */}
      {sections.showEnvelope && !envelopeOpened && (
        <EnvelopeOpening onOpen={() => setEnvelopeOpened(true)} />
      )}

      {/* Main Invitation */}
      {(envelopeOpened || !sections.showEnvelope) && (
        <main>
          {sections.showHero      && <HeroSection />}
          {sections.showEvents    && <EventsSection />}
          {sections.showGallery   && <GallerySection />}
          {sections.showLoveStory && <LoveStorySection />}
          {sections.showRsvp      && <RsvpSection />}
          {sections.showFooter    && <Footer />}
        </main>
      )}

      {/* Floating Music Player */}
      {sections.showMusic && weddingConfig.music.enabled && (
        <MusicPlayer />
      )}
    </div>
  )
}

