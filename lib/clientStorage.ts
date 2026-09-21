import { BusinessSettings, EventItem, InquiryItem } from './types';

export const STORAGE_KEYS = {
  SETTINGS: 'growmore_business_settings_v1',
  EVENTS: 'growmore_events_list_v1',
  INQUIRIES: 'growmore_inquiries_list_v1',
  AUTH: 'growmore_admin_auth',
};

const BROADCAST_CHANNEL_NAME = 'growmore_broadcast_channel';
const CUSTOM_STORAGE_EVENT = 'growmore_storage_updated';

// Helper to broadcast changes across all open tabs and the current window
export function broadcastStorageUpdate(type: 'settings' | 'events' | 'inquiries') {
  if (typeof window === 'undefined') return;

  // 1. Dispatch DOM event for same-tab listeners
  window.dispatchEvent(new CustomEvent(CUSTOM_STORAGE_EVENT, { detail: { type } }));

  // 2. BroadcastChannel for cross-tab listeners
  try {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.postMessage({ type, timestamp: Date.now() });
      channel.close();
    }
  } catch (e) {
    // Ignore BroadcastChannel errors in restricted contexts
  }
}

// Subscribe to storage changes (handles both same-tab custom event & cross-tab events)
export function subscribeToStorageUpdates(callback: (type?: string) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e: Event) => {
    const detail = (e as CustomEvent)?.detail;
    callback(detail?.type);
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (
      e.key === STORAGE_KEYS.SETTINGS ||
      e.key === STORAGE_KEYS.EVENTS ||
      e.key === STORAGE_KEYS.INQUIRIES
    ) {
      callback();
    }
  };

  window.addEventListener(CUSTOM_STORAGE_EVENT, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  let channel: BroadcastChannel | null = null;
  try {
    if ('BroadcastChannel' in window) {
      channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.onmessage = (msg) => {
        callback(msg.data?.type);
      };
    }
  } catch (e) {
    // BroadcastChannel fallback
  }

  return () => {
    window.removeEventListener(CUSTOM_STORAGE_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
    if (channel) {
      channel.close();
    }
  };
}

// -------------------------------------------------------------
// Settings Storage
// -------------------------------------------------------------
export function getStoredSettings(fallback: BusinessSettings): BusinessSettings {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...fallback, ...parsed };
    }
  } catch (err) {
    console.warn('Could not read settings from localStorage', err);
  }
  return fallback;
}

export function saveStoredSettings(settings: Partial<BusinessSettings>): BusinessSettings {
  if (typeof window === 'undefined') return settings as BusinessSettings;
  try {
    const currentRaw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const current = currentRaw ? JSON.parse(currentRaw) : {};
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    broadcastStorageUpdate('settings');
    return updated as BusinessSettings;
  } catch (err) {
    console.error('Failed to save settings to localStorage', err);
    return settings as BusinessSettings;
  }
}

// -------------------------------------------------------------
// Events Storage
// -------------------------------------------------------------
export function getStoredEvents(fallback: EventItem[]): EventItem[] {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read events from localStorage', err);
  }
  return fallback;
}

export function saveStoredEvents(events: EventItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    broadcastStorageUpdate('events');
  } catch (err) {
    console.error('Failed to save events to localStorage', err);
  }
}

export function saveStoredEvent(event: EventItem, fallbackList: EventItem[]): EventItem[] {
  const current = getStoredEvents(fallbackList);
  const index = current.findIndex((e) => e.id === event.id);
  let updated: EventItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = event;
  } else {
    updated = [event, ...current];
  }
  saveStoredEvents(updated);
  return updated;
}

export function deleteStoredEvent(id: string, fallbackList: EventItem[]): EventItem[] {
  const current = getStoredEvents(fallbackList);
  const updated = current.filter((e) => e.id !== id);
  saveStoredEvents(updated);
  return updated;
}

// -------------------------------------------------------------
// Inquiries Storage
// -------------------------------------------------------------
export function getStoredInquiries(fallback: InquiryItem[]): InquiryItem[] {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Could not read inquiries from localStorage', err);
  }
  return fallback;
}

export function saveStoredInquiry(inquiry: InquiryItem, fallbackList: InquiryItem[]): InquiryItem[] {
  const current = getStoredInquiries(fallbackList);
  const updated = [inquiry, ...current.filter((i) => i.id !== inquiry.id)];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      broadcastStorageUpdate('inquiries');
    } catch (err) {
      console.error('Failed to save inquiry to localStorage', err);
    }
  }
  return updated;
}

export function updateStoredInquiryStatus(
  id: string,
  status: InquiryItem['status'],
  fallbackList: InquiryItem[]
): InquiryItem[] {
  const current = getStoredInquiries(fallbackList);
  const updated = current.map((i) => (i.id === id ? { ...i, status } : i));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      broadcastStorageUpdate('inquiries');
    } catch (err) {
      console.error('Failed to update inquiry in localStorage', err);
    }
  }
  return updated;
}

export function deleteStoredInquiry(id: string, fallbackList: InquiryItem[]): InquiryItem[] {
  const current = getStoredInquiries(fallbackList);
  const updated = current.filter((i) => i.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      broadcastStorageUpdate('inquiries');
    } catch (err) {
      console.error('Failed to delete inquiry from localStorage', err);
    }
  }
  return updated;
}

// -------------------------------------------------------------
// Smart Client-Side Photo Compression & Base64 Converter
// Reduces heavy mobile phone photos (e.g. 5MB - 12MB) to lightweight WebP/JPEG (100KB - 250KB)
// so that hundreds of photos can comfortably fit in browser localStorage without error!
// -------------------------------------------------------------
export async function compressImageToBase64(
  file: File,
  maxDimension = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        // Draw image resized
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for optimal size, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
