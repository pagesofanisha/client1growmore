import { NextResponse } from 'next/server';
import { updateInquiryStatus, deleteInquiry } from '@/lib/storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    if (!body.status) {
      return NextResponse.json({ success: false, error: 'Status is required' }, { status: 400 });
    }
    const updated = updateInquiryStatus(params.id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Inquiry status updated' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = deleteInquiry(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
