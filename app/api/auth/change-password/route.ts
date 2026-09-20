import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 4 characters long' },
        { status: 400 }
      );
    }

    const settings = getSettings();

    if (currentPassword !== settings.adminPin) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    const now = new Date().toISOString();
    const updated = saveSettings({
      adminPin: newPassword,
      passwordUpdatedAt: now,
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully!',
      passwordUpdatedAt: now,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
