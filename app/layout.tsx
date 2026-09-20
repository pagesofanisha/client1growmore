import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Grow More | Premier Event & Surprise Planners in Chennai (4.9★)',
  description:
    'Grow More Event Planners in Valasaravakkam, Chennai. Bespoke birthday parties, romantic proposals, 30th wedding anniversary surprises, bridal showers, and candlelight decor. Direct WhatsApp booking 24/7.',
  keywords: [
    'Grow More',
    'Event Planner Chennai',
    'Surprise Planners in Chennai',
    'Birthday party decoration Chennai',
    'Valasaravakkam event planner',
    'Romantic proposal setup Chennai',
    '30th wedding anniversary surprise',
    'Bride to be shower decor'
  ],
  authors: [{ name: 'Grow More Event Planners' }],
  openGraph: {
    title: 'Grow More - Luxury Event & Surprise Planners in Chennai',
    description: '4.9★ Rated on Google (93+ Reviews). Magical surprises, birthday setups, romantic proposals, and anniversaries.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-obsidian-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-gold-500 selection:text-obsidian-950">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
