import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, Star, CheckCircle2, MessageCircle, Calendar, MapPin, Share2, Phone } from 'lucide-react';
import { getEventById, getEvents, getSettings } from '@/lib/storage';
import EventGalleryLightbox from '@/components/EventGalleryLightbox';
import InquiryForm from '@/components/InquiryForm';
import EventCard from '@/components/EventCard';

export const revalidate = 0; // Dynamic SSR

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = getEventById(params.id);
  const settings = getSettings();
  const allEvents = getEvents();

  if (!event) {
    notFound();
  }

  const relatedEvents = allEvents.filter((e) => e.id !== event.id).slice(0, 3);

  const directWhatsAppUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi Grow More! I am interested in booking decor for: *${event.title}*. Please share available packages and dates!`
  )}`;

  return (
    <div className="py-10 pb-24 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-gold-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <Link href="/#events" className="hover:text-gold-400 transition-colors">
            Event Boxes
          </Link>
          <span>/</span>
          <span className="text-gold-400 font-medium truncate">{event.title}</span>
        </div>

        {/* ========================================================================= */}
        {/* HERO SHOWCASE OF THE EVENT */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden glass-card border border-gold-500/20 p-6 sm:p-10 mb-14">
          {/* Atmospheric ambient photo backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
            <img src={event.coverImage} alt="" className="w-full h-full object-cover blur-2xl scale-110" />
            <div className="absolute inset-0 bg-obsidian-950/80"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Details Left */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  {event.category}
                </span>
                {event.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {event.badge}
                  </span>
                )}
                {event.startingPrice && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                    {event.startingPrice}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {event.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {event.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-emerald-700/30 hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Inquire This Decor on WhatsApp</span>
                </a>

                <a
                  href={`tel:${settings.displayPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call Planner</span>
                </a>
              </div>

              <div className="flex items-center gap-6 pt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span>4.9 Google Rated</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span>Valasaravakkam & Chennai-wide</span>
                </div>
              </div>
            </div>

            {/* Featured Photo Right */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-obsidian-950/80 backdrop-blur-md border border-white/10 text-xs text-slate-300">
                ✨ Handcrafted decor by Grow More Event Planners
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHOTO GALLERY SECTION ("picture, picture in that event gallery") */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gold-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real Setups & Pictures</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {event.title} <span className="gold-gradient-text">Photo Gallery</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              {event.gallery?.length || 0} Photos Available
            </span>
          </div>

          <EventGalleryLightbox images={event.gallery || [event.coverImage]} title={event.title} />
        </div>

        {/* ========================================================================= */}
        {/* DESCRIPTION & WHAT'S INCLUDED + WHATSAPP INQUIRY CARD */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Left: Detailed Story & Inclusions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Description */}
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
                About This Celebration
              </h3>
              <div className="text-slate-300 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
                {event.fullDescription}
              </div>
            </div>

            {/* Inclusions Checklist */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span>What Can Be Included In This Setup</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Quick WhatsApp Booking Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 glass-card rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl">
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  • Instant Response On WhatsApp
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Inquire For This Setup
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Send your preferred date and venue in Chennai to the business owner on WhatsApp.
                </p>
              </div>

              <InquiryForm initialEventType={event.title} compact={true} />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RELATED EVENT BOXES */}
        {/* ========================================================================= */}
        {relatedEvents.length > 0 && (
          <div className="pt-12 border-t border-slate-900">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Explore More <span className="gold-gradient-text">Event Boxes</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Discover our other signature surprise themes across Chennai.
                </p>
              </div>
              <Link
                href="/#events"
                className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
              >
                View All Events →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((relEvent) => (
                <EventCard
                  key={relEvent.id}
                  event={relEvent}
                  whatsappNumber={settings.whatsappNumber}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
