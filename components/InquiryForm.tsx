'use client';

import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, MessageSquare, Calendar, MapPin, Phone, User, Users } from 'lucide-react';

interface InquiryFormProps {
  initialEventType?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

const CHENNAI_AREAS = [
  'Valasaravakkam',
  'Anna Nagar',
  'T. Nagar',
  'Adyar / Besant Nagar',
  'ECR (East Coast Road)',
  'OMR (Old Mahabalipuram Rd)',
  'Velachery',
  'Porur / Ramapuram',
  'Alwarpet / Nungambakkam',
  'Koyambedu / Vadapalani',
  'Tambaram / Chromepet',
  'Other Chennai Area',
];

const EVENT_TYPES = [
  'Birthday Party & Milestone Celebrations',
  'Romantic Marriage & Love Proposals',
  'Wedding & Milestone Anniversaries',
  'Bride-to-Be & Bachelorette Showers',
  'Romantic Candlelight Dinners & Rooftops',
  'Baby Shower & Welcome Baby',
  'Corporate / Other Custom Surprise',
];

export default function InquiryForm({ initialEventType, compact = false }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: initialEventType || EVENT_TYPES[0],
    eventDate: '',
    location: 'Valasaravakkam',
    guestCount: 'Under 20',
    budget: 'Standard Decor',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number so we can reach you.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          location: formData.location,
          guestCount: formData.guestCount,
          budget: formData.budget,
          notes: formData.notes,
          eventUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const result = await response.json();

      if (result.success && result.whatsappUrl) {
        setSubmitted(true);
        // Open WhatsApp directly in new window/tab
        window.open(result.whatsappUrl, '_blank');
      } else {
        setError(result.error || 'Failed to generate WhatsApp connection.');
      }
    } catch (err: any) {
      setError('Network error. Please try again or tap the direct WhatsApp button.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl bg-obsidian-900 border border-emerald-500/40 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mb-2">WhatsApp Opened!</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
          Your inquiry has been formatted and opened in WhatsApp. Just tap <span className="text-emerald-400 font-semibold">Send</span> to chat with the Grow More team.
        </p>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 text-left max-w-md mx-auto space-y-1">
          <p><span className="text-slate-200">Name:</span> {formData.name}</p>
          <p><span className="text-slate-200">Event:</span> {formData.eventType}</p>
          <p><span className="text-slate-200">Date:</span> {formData.eventDate || 'Flexible'}</p>
          <p><span className="text-slate-200">Location:</span> {formData.location}</p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs text-gold-400 hover:text-gold-300 underline font-medium"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Two columns for Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-gold-400" />
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Malathi / Karthik"
            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            Your WhatsApp / Phone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g., 98401 23456"
            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
          />
        </div>
      </div>

      {/* Event Type Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Event Type
        </label>
        <select
          value={formData.eventType}
          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
        >
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type} className="bg-slate-900 text-white">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Date & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            Preferred Date
          </label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            Area in Chennai
          </label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
          >
            {CHENNAI_AREAS.map((area) => (
              <option key={area} value={area} className="bg-slate-900 text-white">
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <>
          {/* Guest count & budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                Estimated Guests
              </label>
              <select
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              >
                <option value="Intimate (2 Persons / Couple)">Intimate (2 Persons / Couple)</option>
                <option value="Under 20 Guests">Under 20 Guests</option>
                <option value="20 - 50 Guests">20 - 50 Guests</option>
                <option value="50 - 100 Guests">50 - 100 Guests</option>
                <option value="100+ Grand Celebration">100+ Grand Celebration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Budget Preference
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              >
                <option value="Budget Friendly (₹3,000 - ₹5,000)">Budget Friendly (₹3,000 - ₹5,000)</option>
                <option value="Standard Decor (₹5,000 - ₹10,000)">Standard Decor (₹5,000 - ₹10,000)</option>
                <option value="Luxury Grand Setup (₹10,000 - ₹25,000)">Luxury Grand Setup (₹10,000 - ₹25,000)</option>
                <option value="Custom Premium Package">Custom Premium Package</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
              Special Requests & Decor Notes
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Midnight surprise entry, custom neon name sign, pastel pink theme..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
            />
          </div>
        </>
      )}

      {/* Submit Button with WhatsApp Logo / Style */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-emerald-700/30 hover:shadow-emerald-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50"
        >
          {loading ? (
            <span>Formatting Inquiry...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Inquiry to Owner on WhatsApp</span>
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Opens directly in WhatsApp with your details prefilled • 100% Free & Fast</span>
        </p>
      </div>
    </form>
  );
}
