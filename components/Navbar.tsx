'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Phone, MessageCircle, Menu, X, ShieldCheck, MapPin } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('917200212745');
  const [displayPhone, setDisplayPhone] = useState('072002 12745');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch live business settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          if (res.data.whatsappNumber) setWhatsappNumber(res.data.whatsappNumber);
          if (res.data.displayPhone) setDisplayPhone(res.data.displayPhone);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappDirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Grow More team! I visited your website and would like to plan a surprise event.')}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian-950/95 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-obsidian-950 fill-obsidian-950" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white block">
                GROW <span className="text-gold-400">MORE</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-sans flex items-center gap-1">
                <span>Surprise Planners</span>
                <span className="w-1 h-1 rounded-full bg-gold-400 inline-block"></span>
                <span>Chennai</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#events"
              className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors tracking-wide"
            >
              Event Boxes & Decor
            </Link>
            <Link
              href="/#reviews"
              className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors tracking-wide flex items-center gap-1.5"
            >
              <span className="text-gold-400">★ 4.9</span> Reviews
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors tracking-wide"
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors tracking-wide"
            >
              Inquire
            </Link>
            <Link
              href="/admin"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded border border-slate-800 hover:border-slate-700"
              title="Admin Portal"
            >
              Admin
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${displayPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{displayPhone}</span>
            </a>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-600 text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 px-4 rounded-2xl bg-obsidian-900 border border-gold-500/20 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-slate-800 pb-3">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>Valasaravakkam, Chennai • Open 24 Hours</span>
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                href="/#events"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-100 hover:text-gold-400 py-1"
              >
                Event Showcase & Boxes
              </Link>
              <Link
                href="/#reviews"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-100 hover:text-gold-400 py-1"
              >
                Reviews (4.9 ★ 93 Google Reviews)
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-100 hover:text-gold-400 py-1"
              >
                About Grow More
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-100 hover:text-gold-400 py-1"
              >
                Send Inquiry to WhatsApp
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-400 hover:text-slate-200 py-1"
              >
                Backend Admin Portal
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/40"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Message Owner on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
