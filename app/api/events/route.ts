import { NextResponse } from 'next/server';
import { getEvents, saveEvent, EventItem } from '@/lib/storage';

export async function GET() {
  try {
    const events = getEvents();
    return NextResponse.json({ success: true, data: events });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Event title is required' }, { status: 400 });
    }

    const id = body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const newEvent: EventItem = {
      id,
      title: body.title,
      category: body.category || 'Surprise Celebrations',
      badge: body.badge || 'New Event',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      shortDescription: body.shortDescription || '',
      fullDescription: body.fullDescription || '',
      gallery: Array.isArray(body.gallery) && body.gallery.length > 0 
        ? body.gallery 
        : [body.coverImage || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80'],
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      startingPrice: body.startingPrice || 'Contact for Quote',
      featured: body.featured ?? true,
    };

    saveEvent(newEvent);
    return NextResponse.json({ success: true, data: newEvent, message: 'Event created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
