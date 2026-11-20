// src/data/weddingConfig.js
// ============================================================
// WEDCRAFT PREMIUM – Customer Configuration File
// ============================================================
// All customer-specific data lives here.
// Never hardcode customer info in React components.
// To customise for a new customer, only edit this file.
// ============================================================

export const weddingConfig = {
  // ── Meta & SEO ───────────────────────────────────────────
  meta: {
    title: "Poonam & Prasad Wedding",
    description:
      "Join us to celebrate the wedding of Poonam Kangralkar & Prasad Mankoji on 14 December 2026.",
    keywords: "wedding, Indian wedding, Poonam Kangralkar, Prasad Mankoji, Belagavi",
    ogImage: "/og-image.jpg",
    siteUrl: "https://prasad-poonam-wedding.vercel.app",
  },

  // ── Couple ───────────────────────────────────────────────
  couple: {
    bride: {
      firstName: "Poonam",
      lastName: "Kangralkar",
      fullName: "Poonam Kangralkar",
      phone: "+917411103558",
    },
    groom: {
      firstName: "Prasad",
      lastName: "Mankoji",
      fullName: "Prasad Mankoji",
      phone: "+917411103558",
    },
    couplePhotoUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80",
    heroPhotoUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    loveStoryPhoto:
      "https://images.unsplash.com/photo-1529635696913-7e6a52f5edec?w=800&q=80",
  },

  // ── Wedding Date & Tagline ────────────────────────────────
  wedding: {
    // ISO 8601 date-time — use local time of the ceremony
    dateISO: "2026-12-14T12:33:00",
    dateDisplay: "14 December 2026",
    dayDisplay: "Monday",
    tagline: "Two souls, one destiny",
    invitationText:
      "With the blessings of our families, we joyfully invite you to witness and celebrate our union.",
    openingMessage:
      "Together with their families,\nPoonam Kangralkar & Prasad Mankoji\nrequest the honour of your presence\nat their wedding celebration.",
  },

  // ── Events ───────────────────────────────────────────────
  // Set enabled: false to hide an event from the site
  events: [
    {
      id: "haldi",
      name: "Haldi",
      icon: "🌼",
      enabled: true,
      date: "12 February 2027",
      time: "10:00 AM",
      venue: "Kapoor Family Residence",
      address: "14 Rose Garden Lane, Juhu, Mumbai – 400049",
      mapsUrl: "https://maps.google.com/?q=Juhu+Mumbai",
      imageUrl:
        "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80",
      description:
        "A vibrant and joyous ceremony to bless the couple with turmeric and floral scents.",
    },
    {
      id: "mehendi",
      name: "Mehendi",
      icon: "🌿",
      enabled: true,
      date: "13 February 2027",
      time: "03:00 PM",
      venue: "Sharma Family Residence",
      address: "7 Lotus Boulevard, Bandra West, Mumbai – 400050",
      mapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai",
      imageUrl:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      description:
        "An intimate afternoon of intricate henna artistry, music, and celebration.",
    },
    {
      id: "sangeet",
      name: "Sangeet",
      icon: "🎶",
      enabled: true,
      date: "13 February 2027",
      time: "07:30 PM",
      venue: "The Grand Ballroom, Taj Lands End",
      address: "Bandstand, Bandra West, Mumbai – 400050",
      mapsUrl: "https://maps.google.com/?q=Taj+Lands+End+Mumbai",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      description:
        "An evening of music, dance, and merriment as two families unite in celebration.",
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: "💍",
      enabled: true,
      date: "14 December 2026",
      time: "12:33 PM",
      venue: "Hanamannavar Lawns",
      address: "Sahyadri Colony, Bhagyanagar Extension, Belagavi, Karnataka 590005 (Angol)",
      mapsUrl: "https://maps.google.com/?q=Hanamannavar+Lawns+Angol+Belagavi",
      imageUrl:
        "https://images.unsplash.com/photo-1620057379-77b6e8a8c254?w=800&q=80",
      description:
        "The sacred union of two hearts in a traditional Vedic wedding ceremony.",
    },
    {
      id: "reception",
      name: "Reception",
      icon: "🥂",
      enabled: true,
      date: "15 February 2027",
      time: "07:00 PM",
      venue: "The Leela, Grand Lawn",
      address: "Sahar Airport Road, Andheri East, Mumbai – 400059",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Mumbai",
      imageUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      description:
        "An elegant reception dinner to toast the newlyweds surrounded by family and friends.",
    },
  ],

  // ── Gallery ───────────────────────────────────────────────
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      thumb:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=70",
      caption: "Our engagement evening",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1529635696913-7e6a52f5edec?w=800&q=80",
      thumb:
        "https://images.unsplash.com/photo-1529635696913-7e6a52f5edec?w=400&q=70",
      caption: "Sunset at Marine Drive",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      thumb:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=70",
      caption: "Floral ceremony",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1620057379-77b6e8a8c254?w=800&q=80",
      thumb:
        "https://images.unsplash.com/photo-1620057379-77b6e8a8c254?w=400&q=70",
      caption: "Sacred vows",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      thumb:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=70",
      caption: "Sangeet night",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80",
      thumb:
        "https://images.unsplash.com/photo-1626197031507-c17099753214?w=400&q=70",
      caption: "Haldi blessings",
    },
  ],

  // ── Love Story Timeline ───────────────────────────────────
  loveStory: [
    {
      year: "2021",
      title: "First Meeting",
      description:
        "We crossed paths at a friend's Diwali gathering in Mumbai. One glance, and the world slowed down.",
    },
    {
      year: "2022",
      title: "First Date",
      description:
        "A walk along Marine Drive turned into hours of conversation under a star-dusted sky.",
    },
    {
      year: "2023",
      title: "Adventures Together",
      description:
        "From the ghats of Varanasi to the beaches of Goa — every journey became a cherished memory.",
    },
    {
      year: "2024",
      title: "He Proposed",
      description:
        "Under a canopy of fairy lights at our favourite rooftop restaurant, Arjun got down on one knee.",
    },
    {
      year: "2025",
      title: "Engagement",
      description:
        "Surrounded by our families, we exchanged rings and promised forever to each other.",
    },
    {
      year: "2027",
      title: "Forever Begins",
      description:
        "We invite you to be a part of the most beautiful chapter of our love story.",
    },
  ],

  // ── Contact & Sharing ─────────────────────────────────────
  contact: {
    // WhatsApp number for RSVP — include country code, no spaces or dashes
    whatsappRsvp: "917411103558
    rsvpMessage:
      "Hi! I'd love to confirm my attendance at Poonam & Prasad's wedding. 💕",
    shareMessage:
      "You're invited to celebrate the wedding of Poonam Kangralkar & Prasad Mankoji! 💍✨",
    shareUrl: "https://prasad-poonam-wedding.vercel.app",
    bridePhone: "+917411103558",
    groomPhone: "+917411103558",
  },

  // ── Music ─────────────────────────────────────────────────
  music: {
    enabled: true,
    // Public domain / royalty-free audio. Replace with licensed track.
    // For production, host your audio file and update this URL.
    // Set enabled: false to disable the music player entirely.
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    trackName: "Our Song",
    artistName: "Special Selection",
  },

  // ── Theme ─────────────────────────────────────────────────
  theme: {
    primary: "#8B6914", // Champagne gold
    secondary: "#6B1E2A", // Deep maroon
    accent: "#D4B483", // Warm gold
    blush: "#F5E6E8", // Soft blush
    ivory: "#FDFAF5", // Warm ivory
    text: "#2C1810", // Rich dark brown
  },

  // ── Optional Section Toggles ──────────────────────────────
  sections: {
    showEnvelope: true,
    showHero: true,
    showCountdown: true,
    showEvents: true,
    showGallery: true,
    showLoveStory: true,
    showMusic: true,
    showRsvp: true,
    showFooter: true,
  },

  // ── Envelope Opening ──────────────────────────────────────
  envelope: {
    enabled: true,
    rememberOpened: true,
    allowSkip: true,
    buttonLabel: 'Open Invitation',
    coupleInitials: 'P & P',
    envelopeColor: '#FDFAF5',
    goldAccentColor: '#C9A84C',
    waxSealColor: '#6B1E2A',
    durations: {
      sealFade: 200,
      flapOpen: 500,
      cardRise: 400,
      cardSettle: 300,
      overlayFade: 300,
    },
  },
};

export default weddingConfig;

