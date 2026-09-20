# Grow More Event Planners - Chennai 🎉

A modern, ultra-premium full-stack website and WhatsApp messaging system built for **Grow More Event Planners** (Valasaravakkam, Chennai).

⭐ **Google Rating: 4.9 ★ (93+ Reviews)**  
📍 **Location:** Vani Nagar, Jai Nagar, Valasaravakkam, Chennai, Tamil Nadu 600087  
📞 **WhatsApp / Direct Phone:** 072002 12745  
🕒 **Availability:** Open 24 Hours  

---

## 🌟 Key Features

- **Luxury Gold & Obsidian Theme**: Rich dark aesthetics with metallic gold accents, ambient glows, and typography.
- **Dynamic Event Boxes**: Showcase collections (Birthday Parties, Romantic Proposals, 30th Anniversaries, Bridal Showers, Candlelight Dinners, Baby Showers).
- **Dedicated Event Showcase Pages**:
  - Full-screen interactive photo gallery lightbox (zoom, next/previous, full resolution).
  - Package inclusions and decor highlights checklist.
  - One-click "Inquire This Decor on WhatsApp" button with pre-selected event details.
- **Direct WhatsApp Messaging System**:
  - Interactive booking form on website formats all inquiry details into a luxury message and opens directly in the business owner's WhatsApp (`+91 72002 12745`).
  - **Dual-Capture Safety**: All inquiries are simultaneously archived in the backend so leads are never lost.
  - Floating 24/7 WhatsApp chat widget.
- **Easy-Access Admin Backend (`/admin`)**:
  - **WhatsApp Settings**: Update the business WhatsApp number anytime with an instant "Test Link" button.
  - **Color Palette Editor**: Change the font color of "Surprises & Celebrations" using curated luxury palettes or a custom color wheel picker with real-time live preview.
  - **Headline Image Updater**: Change the photo inside the headline text box directly from the admin panel.
  - **Event & Gallery Manager**: Add new event boxes, update titles/descriptions, and add photos to any gallery.
  - **Inquiries Tracker**: Review every website inquiry with a 1-click "Reply on WhatsApp" button.
  - **Admin Security**: Change admin password anytime with a real-time timestamp tracking when it was last updated.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom luxury gradients & glows
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **Storage**: Lightweight file-based persistent JSON store in `data/`

---

## 💻 Getting Started Locally

### 1. Install dependencies:
```bash
npm install
```

### 2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
To access from your mobile phone on the same Wi-Fi, open `http://<your-local-ip>:3000`.

### 3. Production Build:
```bash
npm run build
npm start
```

---

## 🔐 Admin Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default PIN:** `growmore2026` (can be changed inside the admin portal under Settings)

---

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended):
1. Push this repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Next.js is automatically detected — click **"Deploy"**.
5. Your website will be live worldwide on a fast HTTPS domain with automatic SSL!

### Deploying to Render / Railway / DigitalOcean / VPS:
1. Set the build command: `npm run build`
2. Set the start command: `npm start`
3. Expose port `3000`.
