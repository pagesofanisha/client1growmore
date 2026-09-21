import { NextResponse } from 'next/server';
import { getInquiries, saveInquiry, getSettings } from '@/lib/storage';
import { buildWhatsAppMessage, generateWhatsAppLink } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone number are required' }, { status: 400 });
    }

    const settings = getSettings();
    const whatsappMessage = buildWhatsAppMessage({
      name: body.name,
      phone: body.phone,
      eventType: body.eventType || 'Event Decoration',
      eventDate: body.eventDate,
      location: body.location,
      guestCount: body.guestCount,
      budget: body.budget,
      notes: body.notes,
      eventUrl: body.eventUrl,
    });

    const whatsappLink = generateWhatsAppLink(settings.whatsappNumber, whatsappMessage);

    const saved = saveInquiry({
      name: body.name,
      phone: body.phone,
      eventType: body.eventType || 'General Inquiry',
      eventDate: body.eventDate || '',
      location: body.location || '',
      guestCount: body.guestCount || '',
      budget: body.budget || '',
      notes: body.notes || '',
      status: 'new',
      whatsappLinkUsed: whatsappLink,
    });

    return NextResponse.json({
      success: true,
      data: saved,
      whatsappUrl: whatsappLink,
      message: 'Inquiry registered and WhatsApp link generated',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
