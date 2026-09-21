'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getStoredSettings, subscribeToStorageUpdates } from '@/lib/clientStorage';

export default function FloatingWhatsApp() {
  const [whatsappNumber, setWhatsappNumber] = useState('917200212745');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // 1. Initial hydration from client storage
    const stored = getStoredSettings({ whatsappNumber: '917200212745' } as any);
    if (stored.whatsappNumber) setWhatsappNumber(stored.whatsappNumber);

    // 2. Fetch live WhatsApp number
    fetch('/api/settings')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data?.whatsappNumber) {
          const fresh = getStoredSettings(res.data);
          if (fresh.whatsappNumber) setWhatsappNumber(fresh.whatsappNumber);
        }
      })
      .catch(() => {});

    // 3. Listen for live updates from admin
    const unsubscribe = subscribeToStorageUpdates(() => {
      const updated = getStoredSettings({ whatsappNumber: '917200212745' } as any);
      if (updated.whatsappNumber) setWhatsappNumber(updated.whatsappNumber);
    });

    // Show tooltip bubble after 3 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Grow More Team! I visited your website and would like to inquire about planning an event decoration.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="relative mb-3 mr-1 bg-obsidian-900 text-white px-4 py-2.5 rounded-2xl rounded-br-none border border-gold-500/40 shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
            aria-label="Close message"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-xs font-medium text-slate-200">
            👋 Planning a surprise or party in Chennai?
          </p>
          <p className="text-[11px] text-gold-400 font-semibold mt-0.5">
            Chat with us on WhatsApp! (Open 24/7)
          </p>
        </div>
      )}

      {/* Pulsing Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Grow More"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 text-white shadow-xl shadow-green-600/40 hover:shadow-green-500/70 hover:scale-110 transition-all duration-300 pulse-whatsapp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        
        <span className="sr-only">Chat on WhatsApp</span>

        {/* Online Status Indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-obsidian-950 rounded-full"></span>
      </a>
    </div>
  );
}
