import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, MessageCircle } from 'lucide-react';
import { getEvents, getSettings } from '@/lib/storage';
import EventCard from '@/components/EventCard';

export const revalidate = 0;

export default function AllEventsPage() {
  const events = getEvents();
  const settings = getSettings();

  const directWhatsAppUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    'Hi Grow More Team! I would like to inquire about event packages in Chennai.'
  )}`;

  return (
    <div className="py-12 pb-24 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-gold-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">All Event Collections</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-400 font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Event Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              All Event Boxes & <span className="gold-gradient-text">Decor Themes</span>
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
              Tap any event box to view its full photo gallery, packages, and custom options.
            </p>
          </div>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-700/30 transition-all self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Custom Decor on WhatsApp</span>
          </a>
        </div>

        {/* Grid of Boxes */}
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
    </div>
  );
}
