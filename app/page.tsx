import React from 'react';
import Link from 'next/link';
import { Sparkles, Star, MapPin, Clock, MessageCircle, Heart, ArrowRight, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { getEvents, getSettings } from '@/lib/storage';
import EventCard from '@/components/EventCard';
import InquiryForm from '@/components/InquiryForm';
import TestimonialsSection from '@/components/TestimonialsSection';

export const revalidate = 0; // Dynamic SSR to always fetch latest events and settings

export default function HomePage() {
  const events = getEvents();
  const settings = getSettings();

  const directWhatsAppUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    'Hi Grow More Team! I want to plan a special celebration in Chennai.'
  )}`;

  return (
    <div className="relative">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH IMAGE BOX BEHIND HEADLINE TEXT */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Background Atmosphere & Mild Gold Ambient Glow */}
        <div className="absolute inset-0 bg-obsidian-950 z-0"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30rem] sm:w-[45rem] h-[30rem] sm:h-[45rem] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center w-full">
          {/* Top Trust Badges (Fluid & Responsive on Phone & Laptop) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-gold-500/40 text-gold-300 text-[11px] sm:text-xs font-semibold shadow-lg backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400 shrink-0" />
              <span>4.9 ★ Rating (93 Google Reviews)</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-slate-700/80 text-slate-200 text-[11px] sm:text-xs font-semibold shadow-lg backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Valasaravakkam, Chennai</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-semibold shadow-lg backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Open 24 Hours</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HEADLINE IMAGE BOX - Photo ONLY directly behind this text! */}
          {/* Editable from backend (/admin) */}
          {/* ========================================================================= */}
          <div className="relative mx-auto max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-14 mild-gold-box-glow my-4 sm:my-6 transition-all duration-300">
            {/* The Image Box Background Photo */}
            <img
              src={settings.heroBannerImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"}
              alt="Crafting Unforgettable Surprises & Celebrations"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.7] contrast-[1.05]"
              loading="eager"
            />

            {/* Dark luxury overlay with mild gold glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-950/80 to-obsidian-950/90 z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18)_0%,_transparent_75%)] z-10 pointer-events-none"></div>

            {/* Text Content Inside The Image Box */}
            <div className="relative z-20">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto text-luxury-shadow">
                Crafting Unforgettable <br className="hidden sm:inline" />
                <span
                  className="font-bold inline-block"
                  style={{
                    color: settings.headlineHighlightColor || '#D4AF37',
                    textShadow: `0 0 18px ${settings.headlineHighlightColor || '#D4AF37'}88, 0 0 35px ${settings.headlineHighlightColor || '#D4AF37'}44`,
                  }}
                >
                  Surprises & Celebrations
                </span> <br />
                in Chennai
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal text-luxury-shadow">
                From milestone 60th birthdays and fairytale marriage proposals to parents' 30th anniversary celebrations. We create breathtaking balloon decor, custom neon backdrops, and intimate moments with complete peace of mind.
              </p>
            </div>
          </div>

          {/* Call to Actions - Stack on Mobile, Row on Laptop */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Message on WhatsApp</span>
            </a>

            <a
              href="#events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-obsidian-900/90 hover:bg-slate-800 text-gold-300 font-bold text-xs sm:text-sm tracking-wider uppercase border border-gold-500/40 hover:border-gold-300 shadow-lg backdrop-blur-md active:scale-95 transition-all"
            >
              <span>Explore Event Boxes</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Real Customer Quote Teaser */}
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto p-4 sm:p-4.5 rounded-2xl bg-obsidian-900/80 border border-gold-500/30 backdrop-blur-md flex items-center gap-3.5 sm:gap-4 text-left shadow-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 fill-gold-400" />
            </div>
            <div>
              <p className="text-xs sm:text-xs text-slate-200 italic leading-snug">
                "It was my parents 30th Wedding Anniversary surprise ♥️ Seriously everyone was amazed by seeing the decorations and the work done by growmore event planners..."
              </p>
              <span className="text-[10px] sm:text-[11px] text-gold-400 font-semibold mt-1 block">
                — Verified Chennai Client on Google (5.0 ★)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EVENT BOXES SHOWCASE (The requested feature!) */}
      {/* ========================================================================= */}
      <section id="events" className="py-20 bg-obsidian-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-400 font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Signature Event Collections</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Select An Event Box To <span className="gold-gradient-text">Explore Gallery</span>
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Click on any event box below to view high-resolution photo galleries of past real setups, package inclusions, and direct WhatsApp inquiry options.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Looking for custom themes?
              </span>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-600 text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with Planner</span>
              </a>
            </div>
          </div>

          {/* Grid of Event Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY CHOOSE GROW MORE */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 bg-obsidian-900/80 border-t border-b border-gold-500/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block mb-2">
              Why Chennai Chooses Grow More
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Stress-Free Celebrations, <span className="gold-gradient-text">Crafted With Love</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              Whether you are planning a secret midnight surprise or a grand jubilee hall event, here is why our clients rate us 4.9 on Google.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-8 gold-border-glow transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">100% Punctual & Reliable</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                As praised by Malathi M: "They were very punctual and professional." Our team arrives ahead of schedule, ensuring decor is flawless before the celebrant arrives.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-8 gold-border-glow transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Worth For Money & Patient</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                As real reviewers noted: "Price was very reasonable, loved your work and patience 100/100, convenient guy worth for money." Premium quality without inflated agency markups.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-8 gold-border-glow transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">All-Chennai Coverage</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Based in Valasaravakkam, we seamlessly execute surprise events across Anna Nagar, T. Nagar, ECR beach houses, OMR villas, Porur, Adyar, and hotel banquets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. REVIEWS SECTION */}
      {/* ========================================================================= */}
      <TestimonialsSection />

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE INQUIRY FORM & WHATSAPP CONNECTION */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 bg-obsidian-950 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Direct Connect</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Tell Us Your Idea, We Bring It <span className="gold-gradient-text">To Life</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Fill this quick form and click the button. Your requirements will immediately open inside WhatsApp directly to our planner, and a copy is saved to our system so we never miss your request.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Direct Chat With Planner</h4>
                    <p className="text-xs text-slate-400">Speak directly to the person who will decorate your venue.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Custom Estimates in 15 Minutes</h4>
                    <p className="text-xs text-slate-400">Receive photos of similar setups and instant transparent pricing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">24/7 Availability in Chennai</h4>
                    <p className="text-xs text-slate-400">Setup slots available any hour, day or night.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-200">📍 Grow More Office / Base:</p>
                <p>{settings.address}</p>
                <p className="text-gold-400 font-semibold">📞 WhatsApp: {settings.displayPhone}</p>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold-500/20 shadow-2xl">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-white">Plan Your Surprise</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your event details below to open a direct WhatsApp conversation.
                  </p>
                </div>

                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
