'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Settings,
  Calendar,
  MessageCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  ExternalLink,
  Phone,
  MapPin,
  Clock,
  Images,
  Eye,
  Lock,
  LogOut,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { BusinessSettings, EventItem, InquiryItem } from '@/lib/storage';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'settings' | 'events' | 'inquiries'>('events');

  // State data
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Form states for Settings
  const [settingsForm, setSettingsForm] = useState<Partial<BusinessSettings>>({});

  // Modal / Form state for Events
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  // Password change form state
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Initial Check on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('growmore_admin_auth');
    if (savedAuth === 'true') {
      setAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setLoginError('Please enter your password.');
      return;
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pinInput }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        sessionStorage.setItem('growmore_admin_auth', 'true');
        setLoginError('');
        fetchData();
      } else {
        setLoginError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err) {
      setLoginError('Authentication failed. Please try again.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (!currentPasswordInput || !newPasswordInput) {
      setPasswordChangeError('Please enter both current and new password.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError('New passwords do not match. Please verify.');
      return;
    }

    if (newPasswordInput.length < 4) {
      setPasswordChangeError('New password must be at least 4 characters.');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPasswordChangeSuccess('Password updated successfully!');
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
        fetchData();
        setTimeout(() => setPasswordChangeSuccess(null), 5000);
      } else {
        setPasswordChangeError(data.error || 'Failed to update password.');
      }
    } catch (err) {
      setPasswordChangeError('Server error while updating password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('growmore_admin_auth');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resSettings, resEvents, resInquiries] = await Promise.all([
        fetch('/api/settings').then((r) => r.json()),
        fetch('/api/events').then((r) => r.json()),
        fetch('/api/inquiries').then((r) => r.json()),
      ]);

      if (resSettings.success) {
        setSettings(resSettings.data);
        setSettingsForm(resSettings.data);
      }
      if (resEvents.success) setEvents(resEvents.data);
      if (resInquiries.success) setInquiries(resInquiries.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save Business Settings (WhatsApp number, Address, etc.)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
        setSaveSuccess('WhatsApp number and business settings updated successfully!');
        setTimeout(() => setSaveSuccess(null), 4000);
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  // Start new event
  const handleStartNewEvent = () => {
    setEditingEvent({
      id: '',
      title: '',
      category: 'Birthday Celebrations',
      badge: 'Trending',
      coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      shortDescription: '',
      fullDescription: '',
      gallery: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80'],
      highlights: ['Custom balloon garland', 'Fairy lights setup', 'Theme backdrops'],
      startingPrice: 'Starting from ₹3,499',
      featured: true,
    });
    setIsCreatingEvent(true);
  };

  // Save Event
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title.trim()) {
      alert('Event title is required');
      return;
    }

    setLoading(true);
    try {
      const url = isCreatingEvent ? '/api/events' : `/api/events/${editingEvent.id}`;
      const method = isCreatingEvent ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent),
      });
      const data = await res.json();
      if (data.success) {
        setEditingEvent(null);
        setIsCreatingEvent(false);
        fetchData();
        setSaveSuccess('Event box & gallery updated successfully!');
        setTimeout(() => setSaveSuccess(null), 4000);
      } else {
        alert(data.error || 'Failed to save event');
      }
    } catch (err) {
      alert('Error saving event');
    } finally {
      setLoading(false);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  // Add photo to current event's gallery
  const handleAddPhotoToGallery = () => {
    if (!newPhotoUrl.trim() || !editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      gallery: [...editingEvent.gallery, newPhotoUrl.trim()],
    });
    setNewPhotoUrl('');
  };

  // Remove photo from current event's gallery
  const handleRemovePhotoFromGallery = (indexToRemove: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      gallery: editingEvent.gallery.filter((_, idx) => idx !== indexToRemove),
    });
  };

  // Add highlight to current event
  const handleAddHighlight = () => {
    if (!newHighlight.trim() || !editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      highlights: [...editingEvent.highlights, newHighlight.trim()],
    });
    setNewHighlight('');
  };

  // Remove highlight
  const handleRemoveHighlight = (idx: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      highlights: editingEvent.highlights.filter((_, i) => i !== idx),
    });
  };

  // Update inquiry status
  const handleInquiryStatusChange = async (id: string, newStatus: InquiryItem['status']) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry record?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-obsidian-950">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-gold-500/30 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mx-auto mb-5 text-gold-400">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-2">Grow More Admin Portal</h2>
          <p className="text-xs text-slate-400 mb-6">
            Enter your password to access the business dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-center text-sm focus:outline-none focus:border-gold-400"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-gold-glow transition"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            <Link href="/" className="text-gold-400 hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen py-8 pb-24 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Grow More Admin Dashboard
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Business & Event Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>

            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 hover:bg-rose-500 hover:text-white transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-px mb-8 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('events');
              setEditingEvent(null);
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === 'events'
                ? 'bg-slate-900 border-t-2 border-gold-400 text-gold-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Event Boxes & Gallery ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === 'settings'
                ? 'bg-slate-900 border-t-2 border-gold-400 text-gold-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>WhatsApp & Business Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === 'inquiries'
                ? 'bg-slate-900 border-t-2 border-gold-400 text-gold-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquiries Received ({inquiries.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: EVENT BOXES & GALLERY MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'events' && (
          <div>
            {!editingEvent ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      All Event Boxes
                    </h2>
                    <p className="text-xs text-slate-400">
                      Add photos, change descriptions, or create a new event box anytime.
                    </p>
                  </div>

                  <button
                    onClick={handleStartNewEvent}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-gold-glow transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Event Box</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((evt) => (
                    <div
                      key={evt.id}
                      className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-gold-500/40 transition flex flex-col justify-between"
                    >
                      <div className="relative h-48 w-full bg-slate-900">
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-500 text-obsidian-950">
                            {evt.category}
                          </span>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span className="px-2 py-0.5 rounded bg-black/80 text-[11px] text-slate-300 flex items-center gap-1">
                            <Images className="w-3 h-3 text-gold-400" />
                            {evt.gallery?.length || 1} photos
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                            {evt.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                            {evt.shortDescription}
                          </p>
                          <p className="text-xs text-gold-400 font-semibold mt-2">
                            {evt.startingPrice}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                          <Link
                            href={`/events/${evt.id}`}
                            target="_blank"
                            className="text-xs text-slate-400 hover:text-gold-400 flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </Link>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingEvent(evt);
                                setIsCreatingEvent(false);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-gold-500 hover:text-obsidian-950 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit & Photos</span>
                            </button>

                            <button
                              onClick={() => handleDeleteEvent(evt.id, evt.title)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 transition"
                              title="Delete Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* EVENT EDIT / CREATE FORM */
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold-500/30">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {isCreatingEvent ? 'Create New Event Box' : `Edit: ${editingEvent.title}`}
                  </h2>
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveEvent} className="space-y-6">
                  {/* Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingEvent.title}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        placeholder="e.g., Romantic Beach Proposal"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editingEvent.category}
                        onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                        placeholder="e.g., Romantic Surprises"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Badge & Starting Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Badge / Tag (Optional)
                      </label>
                      <input
                        type="text"
                        value={editingEvent.badge || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, badge: e.target.value })}
                        placeholder="e.g., Most Popular, New, Valasaravakkam Special"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Starting Price / Tag
                      </label>
                      <input
                        type="text"
                        value={editingEvent.startingPrice || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, startingPrice: e.target.value })}
                        placeholder="e.g., Starting from ₹3,999"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Cover Photo URL */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Main Box Cover Photo URL *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={editingEvent.coverImage}
                        onChange={(e) => setEditingEvent({ ...editingEvent, coverImage: e.target.value })}
                        placeholder="Paste image link (https://...)"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    {editingEvent.coverImage && (
                      <div className="mt-2 h-28 w-44 rounded-lg overflow-hidden border border-slate-800">
                        <img
                          src={editingEvent.coverImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Short description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Short Description (Shown on the Event Box)
                    </label>
                    <textarea
                      rows={2}
                      value={editingEvent.shortDescription}
                      onChange={(e) => setEditingEvent({ ...editingEvent, shortDescription: e.target.value })}
                      placeholder="1-2 sentences describing the event on the homepage box..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  {/* Full description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Story & Description (Shown on the Event Detail Page)
                    </label>
                    <textarea
                      rows={4}
                      value={editingEvent.fullDescription}
                      onChange={(e) => setEditingEvent({ ...editingEvent, fullDescription: e.target.value })}
                      placeholder="Detailed explanation of the decor, themes, customized names, cake tables, lights, etc."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  {/* PHOTO GALLERY SECTION - As requested: "the photo should be able to add" */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <Images className="w-4 h-4 text-gold-400" />
                          <span>Event Photo Gallery ({editingEvent.gallery?.length || 0} Photos)</span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          Add real photos of this decor. Visitors can click and zoom these pictures on the event page.
                        </p>
                      </div>
                    </div>

                    {/* Add Photo Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newPhotoUrl}
                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                        placeholder="Paste photo URL here to add to this gallery..."
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-gold-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddPhotoToGallery}
                        className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase"
                      >
                        + Add Photo
                      </button>
                    </div>

                    {/* Gallery Thumbnails List */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {editingEvent.gallery?.map((photo, pIdx) => (
                        <div key={pIdx} className="relative group rounded-xl overflow-hidden border border-slate-700 h-28">
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhotoFromGallery(pIdx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded bg-rose-600/90 text-white hover:bg-rose-500 opacity-90 transition"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-1 left-1.5 text-[9px] bg-black/80 px-1.5 py-0.5 rounded text-slate-300">
                            #{pIdx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights / Inclusions */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      <span>Key Features / Inclusions Checklist</span>
                    </h4>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        placeholder="e.g. Helium balloons & neon name marquee..."
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-gold-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-400 font-bold text-xs"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {editingEvent.highlights?.map((hl, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs border border-slate-700"
                        >
                          <span>✓ {hl}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(hIdx)}
                            className="text-slate-400 hover:text-rose-400 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-gold-glow transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Event Box</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: WHATSAPP NUMBER & BUSINESS SETTINGS (Requested requirement!) */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl glass-card rounded-3xl p-6 sm:p-8 border border-gold-500/30">
            <div className="mb-6 pb-4 border-b border-slate-800">
              <h2 className="font-serif text-2xl font-bold text-white">
                WhatsApp & Business Settings
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Update the WhatsApp number where website client inquiries are sent. Changes take effect instantly!
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* WhatsApp Number (Editable!) */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Business Owner WhatsApp Phone Number *</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsappNumber || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    placeholder="e.g., 917200212745 (Include country code, no + or spaces)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                  />
                  <a
                    href={`https://wa.me/${settingsForm.whatsappNumber || '917200212745'}?text=Test%20from%20Grow%20More%20Admin`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto shrink-0 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">
                  Format: Country code + 10 digits (e.g. <code className="text-gold-400">917200212745</code> for India). All website inquiry buttons and "Chat on WhatsApp" links will redirect to this number.
                </p>
              </div>

              {/* Display Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    Display Phone (For Calling)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.displayPhone || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, displayPhone: e.target.value })}
                    placeholder="e.g. 072002 12745"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Business Email
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    placeholder="contact@growmoreevents.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  Official Business Address
                </label>
                <input
                  type="text"
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  placeholder="e.g. Vani Nagar, Jai Nagar, Valasaravakkam, Chennai 600087"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Operating Hours & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.operatingHours || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, operatingHours: e.target.value })}
                    placeholder="e.g. Open 24 Hours"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Google Rating Display
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settingsForm.rating || 4.9}
                    onChange={(e) => setSettingsForm({ ...settingsForm, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Headline Image Box Photo - Editable directly from backend! */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                  <Images className="w-4 h-4 text-gold-400" />
                  <span>Headline Text Box Background Image (Behind "Crafting Unforgettable Surprises & Celebrations")</span>
                </label>
                <p className="text-xs text-slate-400">
                  This image appears directly inside the box behind the main headline on your homepage. You can change this image anytime by pasting an image URL below.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settingsForm.heroBannerImage || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroBannerImage: e.target.value })}
                    placeholder="Paste image URL (https://...)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
                {settingsForm.heroBannerImage && (
                  <div className="mt-3 relative h-36 w-full max-w-md rounded-xl overflow-hidden border border-slate-700">
                    <img
                      src={settingsForm.heroBannerImage}
                      alt="Headline background preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-obsidian-950/40 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-bold text-white bg-black/70 px-3 py-1 rounded-full border border-white/20">
                        Live Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Font Color Editing Option with Color Palette - Requested Feature! */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-gold-500/40 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span>Font Color for "Surprises and Celebrations" (With Color Palette)</span>
                  </label>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose the exact font color for the highlighted text on the homepage. Pick from the curated luxury palettes below or use the color picker wheel.
                  </p>
                </div>

                {/* Pre-made Luxury Color Palette Swatches */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                    🎨 Quick Color Palette:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Classic Gold', color: '#D4AF37' },
                      { name: 'Champagne Gold', color: '#F5DE88' },
                      { name: 'Royal Amber', color: '#FFB703' },
                      { name: 'Golden Honey', color: '#FDB813' },
                      { name: 'Warm Ochre', color: '#E5C07B' },
                      { name: 'Vanilla Cream', color: '#F3E5AB' },
                      { name: 'Pure White', color: '#FFFFFF' },
                      { name: 'Platinum Silver', color: '#E2E8F0' },
                      { name: 'Rose Gold', color: '#F4A261' },
                    ].map((item) => (
                      <button
                        key={item.color}
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, headlineHighlightColor: item.color })}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          (settingsForm.headlineHighlightColor || '#D4AF37').toLowerCase() === item.color.toLowerCase()
                            ? 'border-white bg-slate-800 text-white shadow-md scale-105'
                            : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Picker & Hex Code Input */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input
                      type="color"
                      value={settingsForm.headlineHighlightColor || '#D4AF37'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, headlineHighlightColor: e.target.value })}
                      className="w-12 h-10 rounded-xl cursor-pointer bg-slate-950 border border-slate-700 p-1"
                      title="Open Color Wheel"
                    />
                    <span className="text-xs text-slate-400">Custom Picker</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                    <span className="text-xs font-mono text-slate-500">HEX:</span>
                    <input
                      type="text"
                      value={settingsForm.headlineHighlightColor || '#D4AF37'}
                      onChange={(e) => setSettingsForm({ ...settingsForm, headlineHighlightColor: e.target.value })}
                      placeholder="#D4AF37"
                      className="w-full sm:w-40 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Real-Time Preview Box */}
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-2">
                    Live Text Preview on Website:
                  </span>
                  <div className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                    Crafting Unforgettable <br />
                    <span
                      className="font-extrabold inline-block transition-colors duration-200"
                      style={{
                        color: settingsForm.headlineHighlightColor || '#D4AF37',
                        textShadow: `0 0 16px ${settingsForm.headlineHighlightColor || '#D4AF37'}88, 0 0 32px ${settingsForm.headlineHighlightColor || '#D4AF37'}44`,
                      }}
                    >
                      Surprises & Celebrations
                    </span> <br />
                    in Chennai
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-gold-glow transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings, Image & WhatsApp Number</span>
                </button>
              </div>
            </form>

            {/* Dedicated Change Password Section with Timestamp Display */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <div className="mb-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gold-400" />
                  <span>Admin Security & Password</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Change your admin password whenever needed.
                </p>
                {settings?.passwordUpdatedAt && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-gold-400">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>
                      Password last updated: {new Date(settings.passwordUpdatedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </div>
                )}
              </div>

              {passwordChangeSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordChangeSuccess}</span>
                </div>
              )}

              {passwordChangeError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordChangeError}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-gold-500 hover:text-obsidian-950 text-gold-400 font-bold text-xs uppercase tracking-wider border border-gold-500/40 transition flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{passwordLoading ? 'Updating Password...' : 'Update Password'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: INQUIRIES LOG (Dual capture backup) */}
        {/* ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Client Inquiries Received
                </h2>
                <p className="text-xs text-slate-400">
                  Every inquiry submitted on the website is archived here. You can click to chat with any client on WhatsApp directly.
                </p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
                <MessageCircle className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => {
                  const clientChatUrl = `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${inq.name}! Thank you for reaching out to Grow More regarding your ${inq.eventType}.`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-gold-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-serif text-base font-bold text-white">
                            {inq.name}
                          </h4>
                          <span className="text-xs font-mono text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                            {inq.phone}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              inq.status === 'new'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : inq.status === 'booked'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-medium">
                          🎉 <span className="text-white">{inq.eventType}</span>
                          {inq.eventDate && <span> • 📅 Date: {inq.eventDate}</span>}
                          {inq.location && <span> • 📍 Area: {inq.location}</span>}
                        </p>

                        {inq.notes && (
                          <p className="text-xs text-slate-400 italic bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                            "{inq.notes}"
                          </p>
                        )}

                        <span className="text-[10px] text-slate-500 block">
                          Submitted: {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Direct WhatsApp Client */}
                        <a
                          href={clientChatUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-700/30"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Reply on WhatsApp</span>
                        </a>

                        {/* Status dropdown */}
                        <select
                          value={inq.status}
                          onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                          className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none"
                        >
                          <option value="new">Status: New</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="booked">Status: Booked</option>
                          <option value="archived">Status: Archived</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 transition"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
