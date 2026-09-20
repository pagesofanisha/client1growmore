import { NextResponse } from 'next/server';
import { getEventById, saveEvent, deleteEvent, EventItem } from '@/lib/storage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = getEventById(params.id);
    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: event });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existing = getEventById(params.id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    const body = await request.json();
    const updated: EventItem = {
      ...existing,
      ...body,
      id: existing.id, // Preserve ID
    };

    saveEvent(updated);
    return NextResponse.json({ success: true, data: updated, message: 'Event updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = deleteEvent(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Event deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
