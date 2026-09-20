'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageCircle, Sparkles, Star, ExternalLink, Shield } from 'lucide-react';

export default function Footer() {
  const [settings, setSettings] = useState({
    businessName: 'Grow More Event Planners',
    whatsappNumber: '917200212745',
    displayPhone: '072002 12745',
    address: 'Vani Nagar, Jai Nagar, Valasaravakkam, Chennai, Tamil Nadu 600087',
    plusCode: '25RC+4V Chennai, Tamil Nadu',
    operatingHours: 'Open 24 hours',
    rating: 4.9,
    totalReviews: 93,
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {});
  }, []);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    'Hi Grow More Team! I would like to inquire about event decor in Chennai.'
  )}`;

  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/20 text-slate-400 text-sm">
      {/* Top Banner */}
      <div className="border-b border-slate-900 py-10 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ready to Craft an Unforgettable <span className="gold-gradient-text">Surprise?</span>
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Talk directly with our planner on WhatsApp. Fast quotes, no waiting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-emerald-700/40 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <a
              href={`tel:${settings.displayPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call {settings.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center shadow-gold-glow">
                <Sparkles className="w-4 h-4 text-obsidian-950 fill-obsidian-950" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                GROW <span className="text-gold-400">MORE</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chennai's premier surprise planners & event designers. Specialized in birthday surprises, romantic proposals, milestone wedding anniversaries, bridal showers, and candlelight decor.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-gold-500/30 text-xs font-semibold text-gold-400">
              <Star className="w-4 h-4 fill-gold-400" />
              <span>4.9 / 5.0 Rated (93 Google Reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wider uppercase">
              Surprise Events
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/events/birthday-party" className="hover:text-gold-400 transition-colors">
                  Birthday Parties & Milestones
                </Link>
              </li>
              <li>
                <Link href="/events/romantic-proposal" className="hover:text-gold-400 transition-colors">
                  Romantic "Marry Me" Proposals
                </Link>
              </li>
              <li>
                <Link href="/events/wedding-anniversary" className="hover:text-gold-400 transition-colors">
                  Parents & Couple Anniversaries
                </Link>
              </li>
              <li>
                <Link href="/events/bride-to-be-shower" className="hover:text-gold-400 transition-colors">
                  Bride-to-Be & Bachelorette
                </Link>
              </li>
              <li>
                <Link href="/events/candlelight-dinner" className="hover:text-gold-400 transition-colors">
                  Rooftop Candlelight Dinners
                </Link>
              </li>
              <li>
                <Link href="/events/baby-shower" className="hover:text-gold-400 transition-colors">
                  Baby Showers & Welcome Baby
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Coverage */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wider uppercase">
              Service Areas
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Available 24 hours across Chennai, Tamil Nadu:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Valasaravakkam', 'Anna Nagar', 'T. Nagar', 'Porur', 'Adyar', 'ECR', 'OMR', 'Velachery', 'Besant Nagar', 'Vadapalani', 'Tambaram'].map((area) => (
                <span key={area} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wider uppercase">
              Store & Office
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{settings.operatingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${settings.displayPhone.replace(/\s+/g, '')}`} className="hover:text-gold-400">
                  {settings.displayPhone}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 underline"
                >
                  <span>Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Grow More Event Planners, Chennai. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-gold-400 flex items-center gap-1 transition-colors">
              <Shield className="w-3.5 h-3.5" />
              <span>Owner Admin Access</span>
            </Link>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
