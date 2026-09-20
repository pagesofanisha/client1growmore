import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Images, MessageCircle } from 'lucide-react';
import { EventItem } from '@/lib/storage';

interface EventCardProps {
  event: EventItem;
  whatsappNumber?: string;
}

export default function EventCard({ event, whatsappNumber = '917200212745' }: EventCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Grow More! I am interested in your *${event.title}* decoration package. Could you share available dates and packages?`
  )}`;

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-card gold-border-glow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold-glow">
      {/* Photo Container */}
      <Link href={`/events/${event.id}`} className="relative h-64 sm:h-72 w-full overflow-hidden block bg-slate-900">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

        {/* Badge & Gallery Count */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {event.badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gold-500/90 text-obsidian-950 shadow-md backdrop-blur-md">
              <Sparkles className="w-3 h-3 fill-obsidian-950" />
              {event.badge}
            </span>
          )}
          {event.gallery && event.gallery.length > 1 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-obsidian-950/80 border border-white/10 text-slate-200 backdrop-blur-md ml-auto">
              <Images className="w-3 h-3 text-gold-400" />
              {event.gallery.length} Photos
            </span>
          )}
        </div>

        {/* Starting Price Tag */}
        {event.startingPrice && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded-lg bg-obsidian-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold backdrop-blur-md">
              {event.startingPrice}
            </span>
          </div>
        )}
      </Link>

      {/* Content Container Below Photo */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-xs uppercase tracking-widest text-gold-400/90 font-semibold block mb-1">
            {event.category}
          </span>

          {/* Title */}
          <Link href={`/events/${event.id}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
              {event.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="mt-2.5 text-sm text-slate-300 leading-relaxed line-clamp-2">
            {event.shortDescription}
          </p>

          {/* Key Inclusions Preview */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {event.highlights.slice(0, 2).map((item, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
          <Link
            href={`/events/${event.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-gold-glow transition-all"
          >
            <span>View Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Quick inquiry on WhatsApp"
            className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all"
            aria-label="Inquire about this event on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
}
