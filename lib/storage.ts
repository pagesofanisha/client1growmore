import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  BusinessSettings,
  EventItem,
  InquiryItem,
  DEFAULT_SETTINGS,
  DEFAULT_EVENTS,
  DEFAULT_INQUIRIES,
} from './types';

export * from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const TMP_DATA_DIR = path.join(os.tmpdir(), 'growmore_data');

// In-Memory Runtime Cache for serverless persistence
let runtimeSettings: BusinessSettings | null = null;
let runtimeEvents: EventItem[] | null = null;
let runtimeInquiries: InquiryItem[] | null = null;

// Safe file writing with fallback to /tmp if process.cwd() is read-only
function safeWriteFileSync(filename: string, content: string) {
  let primaryWritten = false;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(DATA_DIR, filename), content, 'utf-8');
    primaryWritten = true;
  } catch (err) {
    // Expected on read-only environments (e.g. Vercel serverless)
  }

  try {
    if (!fs.existsSync(TMP_DATA_DIR)) {
      fs.mkdirSync(TMP_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(TMP_DATA_DIR, filename), content, 'utf-8');
  } catch (err) {
    // Ignore tmp write failures
  }
}

// Safe file reading checking /tmp first, then primary data dir
function safeReadFileSync(filename: string): string | null {
  try {
    const tmpPath = path.join(TMP_DATA_DIR, filename);
    if (fs.existsSync(tmpPath)) {
      return fs.readFileSync(tmpPath, 'utf-8');
    }
  } catch (err) {
    // Ignore tmp read errors
  }

  try {
    const primaryPath = path.join(DATA_DIR, filename);
    if (fs.existsSync(primaryPath)) {
      return fs.readFileSync(primaryPath, 'utf-8');
    }
  } catch (err) {
    // Ignore primary read errors
  }

  return null;
}

// Helpers
export function getSettings(): BusinessSettings {
  if (runtimeSettings) return runtimeSettings;

  const raw = safeReadFileSync('settings.json');
  if (raw) {
    try {
      runtimeSettings = JSON.parse(raw);
      return runtimeSettings!;
    } catch (err) {
      // Fallback
    }
  }

  runtimeSettings = DEFAULT_SETTINGS;
  safeWriteFileSync('settings.json', JSON.stringify(DEFAULT_SETTINGS, null, 2));
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Partial<BusinessSettings>): BusinessSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  runtimeSettings = updated;
  safeWriteFileSync('settings.json', JSON.stringify(updated, null, 2));
  return updated;
}

export function getEvents(): EventItem[] {
  if (runtimeEvents && runtimeEvents.length > 0) return runtimeEvents;

  const raw = safeReadFileSync('events.json');
  if (raw) {
    try {
      runtimeEvents = JSON.parse(raw);
      return runtimeEvents!;
    } catch (err) {
      // Fallback
    }
  }

  runtimeEvents = DEFAULT_EVENTS;
  safeWriteFileSync('events.json', JSON.stringify(DEFAULT_EVENTS, null, 2));
  return DEFAULT_EVENTS;
}

export function getEventById(id: string): EventItem | null {
  const events = getEvents();
  return events.find((e) => e.id === id || e.id.toLowerCase() === id.toLowerCase()) || null;
}

export function saveEvent(event: EventItem): EventItem {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === event.id);
  if (index >= 0) {
    events[index] = event;
  } else {
    events.unshift(event);
  }
  runtimeEvents = events;
  safeWriteFileSync('events.json', JSON.stringify(events, null, 2));
  return event;
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length !== events.length) {
    runtimeEvents = filtered;
    safeWriteFileSync('events.json', JSON.stringify(filtered, null, 2));
    return true;
  }
  return false;
}

export function getInquiries(): InquiryItem[] {
  if (runtimeInquiries) return runtimeInquiries;

  const raw = safeReadFileSync('inquiries.json');
  if (raw) {
    try {
      runtimeInquiries = JSON.parse(raw);
      return runtimeInquiries!;
    } catch (err) {
      // Fallback
    }
  }

  runtimeInquiries = DEFAULT_INQUIRIES;
  safeWriteFileSync('inquiries.json', JSON.stringify(DEFAULT_INQUIRIES, null, 2));
  return DEFAULT_INQUIRIES;
}

export function saveInquiry(inquiry: Omit<InquiryItem, 'id' | 'createdAt'> & { id?: string }): InquiryItem {
  const inquiries = getInquiries();
  const newInquiry: InquiryItem = {
    ...inquiry,
    id: inquiry.id || `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: inquiry.status || 'new',
  };
  inquiries.unshift(newInquiry);
  runtimeInquiries = inquiries;
  safeWriteFileSync('inquiries.json', JSON.stringify(inquiries, null, 2));
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: InquiryItem['status']): boolean {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index >= 0) {
    inquiries[index].status = status;
    runtimeInquiries = inquiries;
    safeWriteFileSync('inquiries.json', JSON.stringify(inquiries, null, 2));
    return true;
  }
  return false;
}

export function deleteInquiry(id: string): boolean {
  const inquiries = getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length !== inquiries.length) {
    runtimeInquiries = filtered;
    safeWriteFileSync('inquiries.json', JSON.stringify(filtered, null, 2));
    return true;
  }
  return false;
}
