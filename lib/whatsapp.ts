/**
 * Utility functions for creating structured WhatsApp links and messages
 */

export interface WhatsAppInquiryPayload {
  name: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  guestCount?: string;
  budget?: string;
  notes?: string;
  eventUrl?: string;
}

/**
 * Standardize phone number for WhatsApp wa.me links
 * Default country is India (+91) if 10 digits provided
 */
export function sanitizeWhatsAppNumber(phone: string): string {
  if (!phone) return '917200212745';
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    return `91${clean}`;
  }
  if (clean.startsWith('0') && clean.length === 11) {
    return `91${clean.substring(1)}`;
  }
  return clean;
}

/**
 * Builds an eye-catching, structured luxury WhatsApp inquiry message
 */
export function buildWhatsAppMessage(payload: WhatsAppInquiryPayload): string {
  const lines: string[] = [
    '✨ *GROW MORE - SURPRISE & EVENT INQUIRY* ✨',
    '━━━━━━━━━━━━━━━━━━━━',
    `👤 *Client Name:* ${payload.name || 'Not provided'}`,
    `📞 *Client Phone:* ${payload.phone || 'Not provided'}`,
    `🎉 *Event / Service:* ${payload.eventType || 'Custom Surprise'}`,
  ];

  if (payload.eventDate) {
    lines.push(`📅 *Preferred Date:* ${payload.eventDate}`);
  }
  if (payload.location) {
    lines.push(`📍 *Location / Venue:* ${payload.location}`);
  }
  if (payload.guestCount) {
    lines.push(`👥 *Estimated Guests:* ${payload.guestCount}`);
  }
  if (payload.budget) {
    lines.push(`💰 *Budget Preference:* ${payload.budget}`);
  }
  if (payload.notes) {
    lines.push(`💬 *Special Notes / Requests:*\n"${payload.notes}"`);
  }
  if (payload.eventUrl) {
    lines.push(`🔗 *Reference Link:* ${payload.eventUrl}`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('⭐ *4.9 Rating (93+ Reviews) | Valasaravakkam, Chennai*');
  lines.push('_Sent directly from Grow More official website_');

  return lines.join('\n');
}

/**
 * Generate full wa.me link with encoded text message
 */
export function generateWhatsAppLink(businessPhone: string, message: string): string {
  const cleanNumber = sanitizeWhatsAppNumber(businessPhone);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}
