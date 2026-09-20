import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string; // e.g. 917200212745 (digits only for wa.me)
  displayPhone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  plusCode: string;
  operatingHours: string;
  rating: number;
  totalReviews: number;
  adminPin: string;
  welcomeMessage: string;
  heroBannerImage?: string;
  headlineHighlightColor?: string;
  passwordUpdatedAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  coverImage: string;
  shortDescription: string;
  fullDescription: string;
  gallery: string[];
  highlights: string[];
  startingPrice?: string;
  featured?: boolean;
}

export interface InquiryItem {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  guestCount?: string;
  budget?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'booked' | 'archived';
  whatsappLinkUsed: string;
}

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const DEFAULT_SETTINGS: BusinessSettings = {
  businessName: "Grow More Event Planners",
  tagline: "Chennai's Most Loved Surprise & Luxury Event Planners",
  whatsappNumber: "917200212745",
  displayPhone: "072002 12745",
  email: "growmoreeventschennai@gmail.com",
  address: "Vani Nagar, Jai Nagar, Valasaravakkam, Chennai, Tamil Nadu 600087",
  googleMapsUrl: "https://maps.google.com/?q=Grow+More+Valasaravakkam+Chennai",
  plusCode: "25RC+4V Chennai, Tamil Nadu",
  operatingHours: "Open 24 Hours",
  rating: 4.9,
  totalReviews: 93,
  adminPin: "growmore2026",
  welcomeMessage: "Hi Grow More Team! I visited your website and would like to plan a surprise event.",
  heroBannerImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
  headlineHighlightColor: "#D4AF37",
  passwordUpdatedAt: new Date().toISOString()
};

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: "birthday-party",
    title: "Birthday Party & Milestone Celebrations",
    category: "Birthday Celebrations",
    badge: "Most Booked",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Magical milestone 1st, 18th, 30th & 60th birthday surprises with custom theme arches, neon signs, and helium balloons.",
    fullDescription: "Celebrate unforgettable birthdays with Grow More's signature decor setups. Whether it's a cozy midnight room surprise, a grand hall celebration, or a 60th birthday golden jubilee, our team crafts bespoke pastel balloon garlands, organic arches, illuminated marquee numbers, cake table backdrops, and customized photo memories that bring tears of joy to your loved ones.",
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Organic balloon arches & organic clouds",
      "Custom LED neon 'Happy Birthday' signs & age marquees",
      "Theme cake table styling & cylinder plinths",
      "Fairy light backdrops & personalized photo hanging lines",
      "Punctual setup anywhere across Chennai (Valasaravakkam, Anna Nagar, OMR, ECR)"
    ],
    startingPrice: "Starting from ₹3,499",
    featured: true
  },
  {
    id: "romantic-proposal",
    title: "Romantic Marriage & Love Proposals",
    category: "Romantic Surprises",
    badge: "Trending in Chennai",
    coverImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Breathtaking 'Marry Me' light setups, floral cabanas, rose petal paths, and fairy-lit candle ambiance.",
    fullDescription: "Make the most momentous question of your life unforgettable. Grow More designs dream proposal setups across Chennai—from private rooftop cabanas and beachfront canopies along ECR to luxury hotel suites. Featuring illuminated giant 'MARRY ME' letters, thousands of rose petals, acoustic music coordination, cold pyro fireworks, and intimate candlelight dining setups.",
    gallery: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Illuminated 4ft 'MARRY ME' marquee letters",
      "Bohemian & floral decorated canopy cabanas",
      "Fragrant red & white rose petal red carpet pathway",
      "Warm fairy lights and safe LED pillar candles",
      "Cold pyro sparkles & romantic background music assistance"
    ],
    startingPrice: "Starting from ₹5,999",
    featured: true
  },
  {
    id: "wedding-anniversary",
    title: "Wedding & Milestone Anniversaries",
    category: "Anniversary Surprises",
    badge: "Parent's Favorite",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Heartwarming 1st, 25th Silver, or 30th Pearl anniversary surprises honoring enduring love.",
    fullDescription: "As praised by our real clients on Google: 'It was my parents 30th Wedding Anniversary surprise... Seriously everyone was amazed by seeing the decorations!' We specialize in nostalgic milestone anniversary surprises. We recreate memories with chronological photo memory galleries, opulent gold & champagne balloon circles, floral backdrops, and cake cutting setups that leave parents and partners in awe.",
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Memory lane photo strings from wedding day to present",
      "Metallic gold & ivory balloon ring arch",
      "Personalized 'Happy Anniversary Mom & Dad' or couple banner",
      "Luxury bouquet arrangements and ambient uplighting",
      "Midnight surprise entry coordination"
    ],
    startingPrice: "Starting from ₹4,499",
    featured: true
  },
  {
    id: "bride-to-be-shower",
    title: "Bride-to-Be & Bachelorette Showers",
    category: "Bridal Showers",
    badge: "Top Rated",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Chic aesthetic backdrops, sash & tiara setups, champagne glass styling, and photo-ready corners.",
    fullDescription: "From local guide reviews: 'We called them for a bride to be shower... No words to tell how happy we were!' Grow More brings Pinterest-worthy aesthetic bridal shower setups to life. We arrange customized pastel balloon cascades, shimmer sequin shimmer-walls, 'Bride to Be' neon lights, photo booth props, mocktail/champagne counters, and cozy seating arrangements for the bride and her squad.",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513279926030-2e278636709c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Shimmer sequin wall with neon 'Bride to Be' glow sign",
      "Bridal sash, crown tiara & photo booth props bundle",
      "Pastel pink, rose gold & chrome champagne balloons",
      "Insta-ready polaroid display corner",
      "Hassle-free setup in apartments, villas, cafes, or hotel banquet rooms"
    ],
    startingPrice: "Starting from ₹3,999",
    featured: true
  },
  {
    id: "candlelight-dinner",
    title: "Romantic Candlelight Dinners & Rooftops",
    category: "Intimate Dinners",
    badge: "Exclusive",
    coverImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Private rooftop dining under the stars with scented candles, floral centerpiece, and ambient lighting.",
    fullDescription: "Ignite romance with a dedicated private candlelight dinner decorated by Grow More. Perfect for birthdays, relationship milestones, Valentine's, or surprise dates. We transform rooftops, balconies, or garden nooks into an enchanting oasis with romantic table runners, crystal glassware, aromatic candles, fairy light canopies, and soft acoustic melodies.",
    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Curated 2-seater romantic table decor with floral centerpiece",
      "Hundreds of tea lights & safe flickering candles",
      "Fairy light canopy ceiling and curtain drop",
      "Personalized menu card & customized message frames",
      "Surprise gift & cake arrangement service"
    ],
    startingPrice: "Starting from ₹4,999",
    featured: true
  },
  {
    id: "baby-shower",
    title: "Baby Shower & Welcome Baby Celebrations",
    category: "Baby Celebrations",
    badge: "Joyful Beginnings",
    coverImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Adorable pastel cloud balloon styling, teddy bear themes, gender reveal elements, and welcome baby setups.",
    fullDescription: "Welcome the arrival of your little miracle with tender, joyful decors by Grow More. From traditional Seemantham modern balloon backdrops to trendy baby shower pastel setups with oversized teddy bears, baby block letter boxes, and cloud balloons. We ensure clean, safe, non-toxic and on-time setup at your home or celebration venue.",
    gallery: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Custom 'BABY' jumbo marquee or box props",
      "Pastel blue, pink, lavender, and gold balloon garlands",
      "Cute plush teddy bear and cloud stage decorations",
      "Gender reveal balloon pop or smoke bomb coordination",
      "Mom-to-be floral sash & crown"
    ],
    startingPrice: "Starting from ₹4,299",
    featured: true
  }
];

const DEFAULT_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    name: "Malathi M",
    phone: "+91 98401 23456",
    eventType: "60th Birthday Surprise",
    eventDate: "2026-10-15",
    location: "Valasaravakkam, Chennai",
    guestCount: "40",
    budget: "₹5,000 - ₹8,000",
    notes: "Need golden jubilee backdrop for our father's 60th birthday with warm lighting.",
    status: "booked",
    whatsappLinkUsed: "https://wa.me/917200212745?text=..."
  },
  {
    id: "inq-2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    name: "Karthik Raja",
    phone: "+91 94440 88990",
    eventType: "Romantic Marriage Proposal",
    eventDate: "2026-11-02",
    location: "ECR Beach Villa, Chennai",
    guestCount: "2",
    budget: "₹8,000+",
    notes: "Cabana setup with MARRY ME marquee letters and cold pyros at sunset.",
    status: "new",
    whatsappLinkUsed: "https://wa.me/917200212745?text=..."
  }
];

// File paths
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Helpers
export function getSettings(): BusinessSettings {
  ensureDataDir();
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    return DEFAULT_SETTINGS;
  }
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<BusinessSettings>): BusinessSettings {
  ensureDataDir();
  const current = getSettings();
  const updated = { ...current, ...settings };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
  return updated;
}

export function getEvents(): EventItem[] {
  ensureDataDir();
  if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(DEFAULT_EVENTS, null, 2));
    return DEFAULT_EVENTS;
  }
  try {
    const raw = fs.readFileSync(EVENTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_EVENTS;
  }
}

export function getEventById(id: string): EventItem | null {
  const events = getEvents();
  return events.find((e) => e.id === id || e.id.toLowerCase() === id.toLowerCase()) || null;
}

export function saveEvent(event: EventItem): EventItem {
  ensureDataDir();
  const events = getEvents();
  const index = events.findIndex((e) => e.id === event.id);
  if (index >= 0) {
    events[index] = event;
  } else {
    events.push(event);
  }
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
  return event;
}

export function deleteEvent(id: string): boolean {
  ensureDataDir();
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length !== events.length) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }
  return false;
}

export function getInquiries(): InquiryItem[] {
  ensureDataDir();
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(DEFAULT_INQUIRIES, null, 2));
    return DEFAULT_INQUIRIES;
  }
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_INQUIRIES;
  }
}

export function saveInquiry(inquiry: Omit<InquiryItem, 'id' | 'createdAt'> & { id?: string }): InquiryItem {
  ensureDataDir();
  const inquiries = getInquiries();
  const newInquiry: InquiryItem = {
    ...inquiry,
    id: inquiry.id || `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: inquiry.status || 'new',
  };
  inquiries.unshift(newInquiry);
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: InquiryItem['status']): boolean {
  ensureDataDir();
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index >= 0) {
    inquiries[index].status = status;
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    return true;
  }
  return false;
}

export function deleteInquiry(id: string): boolean {
  ensureDataDir();
  const inquiries = getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length !== inquiries.length) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }
  return false;
}
