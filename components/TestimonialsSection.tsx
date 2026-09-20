import React from 'react';
import { Star, ShieldCheck, Heart, ThumbsUp, MapPin } from 'lucide-react';

const REVIEWS = [
  {
    name: 'MALATHI. M',
    meta: '4 reviews · 1 photo',
    time: '4 months ago',
    rating: 5,
    tag: "Father's 60th Birthday Surprise",
    quote: "For our father's 60th birthday, we booked birthday decorations with Grow More. They did an amazing job, and everything looked wonderful. The decorations were very neat and beautifully done. They were also very punctual and professional. Thanks to the Grow more team for their excellent work.",
    verified: true,
  },
  {
    name: 'Shruti R',
    meta: '6 reviews · 4 photos',
    time: 'a year ago',
    rating: 5,
    tag: 'Decor Perfection & Setup',
    quote: "It was a great experience, the best decoration ever! They did their best, we were more satisfied than expected! The decor was perfectly arranged and done beautifully. Everything was perfect, thanks a lot to the team. Extremely happy and satisfied! ❤️",
    verified: true,
  },
  {
    name: 'Akshaya Nagappan',
    meta: 'Local Guide · 23 reviews · 13 photos',
    time: '2 years ago',
    rating: 5,
    tag: 'Bride To Be Shower',
    quote: "No words to tell how happy we were! These are the first people I talked to, and I got them fixed. We called them for a bride to be shower. Everything was seamless, elegant, and exceeded our imagination!",
    verified: true,
  },
  {
    name: 'Parent’s 30th Anniversary',
    meta: 'Google Verified Client',
    time: '2 years ago',
    rating: 5,
    tag: '30th Wedding Anniversary Surprise',
    quote: "It was my parents 30th Wedding Anniversary surprise ♥️ Seriously everyone was amazed by seeing the decorations and the work done by growmore event planners ♥️🔥... I personally suggest everyone to choose for your surprises to them .🎉 So u rocked the event ......💯",
    verified: true,
  },
  {
    name: 'Verified Client',
    meta: 'Google Review',
    time: 'Recent Review',
    rating: 5,
    tag: 'Reasonable Price & Patience',
    quote: "Price was very reasonable Loved your work and patience 100/100 ❤️❤️❤️❤️❤️❤️❤️❤️ Awesome experience we enjoyed well convenient guy worth for money🤝👌🤝👌",
    verified: true,
  },
  {
    name: 'Birthday Celebrant',
    meta: 'Google Review',
    time: 'Recent Review',
    rating: 5,
    tag: 'Overwhelmed Birthday Moment',
    quote: "Good place for birthday surprise...such an overwhelmed moment we spent inside! Prompt communication on WhatsApp and flawless execution on-site.",
    verified: true,
  }
];

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 relative bg-obsidian-900/60 border-t border-b border-gold-500/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Star className="w-3.5 h-3.5 fill-gold-400" />
            <span>4.9 / 5.0 Google Rating (93 Reviews)</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Loved By Families & Couples <span className="gold-gradient-text">Across Chennai</span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Real experiences from people who trusted Grow More for their parents' 30th anniversaries, 60th birthdays, romantic proposals, and bridal showers in Valasaravakkam and beyond.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between gold-border-glow transition-all duration-300"
            >
              <div>
                {/* Rating stars & tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                    {rev.time}
                  </span>
                </div>

                <span className="inline-block text-xs font-semibold text-gold-400 mb-2">
                  {rev.tag}
                </span>

                {/* Quote */}
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <span title="Verified Google Review">
                        <ShieldCheck className="w-4 h-4 text-gold-400" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">{rev.meta}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gold-400">
                  <Heart className="w-4 h-4 fill-gold-500/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-obsidian-950 border border-slate-800/80 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <span className="font-serif text-3xl font-extrabold text-gold-400">4.9 ★</span>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">93 Verified Google Reviews</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800"></div>
          <div>
            <span className="font-serif text-3xl font-extrabold text-white">2,500+</span>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Surprises Delivered</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800"></div>
          <div>
            <span className="font-serif text-3xl font-extrabold text-white">24 Hours</span>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Open Round The Clock</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800"></div>
          <div>
            <span className="font-serif text-3xl font-extrabold text-gold-400">100%</span>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Punctual & Stress-Free</p>
          </div>
        </div>
      </div>
    </section>
  );
}
