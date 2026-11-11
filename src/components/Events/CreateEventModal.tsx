import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Music2,
  Mic2,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Mail,
  ScrollText,
  CheckCircle2,
} from 'lucide-react';
import ModalShell from '@/components/UI/ModalShell';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/types/event';
import type { Category } from '@/types/event';

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  artist: string;
  category: Category;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  location: string;
  expected_attendance: string;
  contact_email: string;
}

const initialForm: FormData = {
  title: '',
  artist: '',
  category: 'Rock',
  description: '',
  event_date: '',
  start_time: '20:00',
  end_time: '23:00',
  venue: '',
  location: '',
  expected_attendance: '100',
  contact_email: '',
};

export default function CreateEventModal({ open, onClose }: CreateEventModalProps) {
  const { user } = useAuth();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleClose = () => {
    if (success) {
      setSuccess(false);
      setForm(initialForm);
    }
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('Please sign in to submit a hosting request.');
      return;
    }

    if (form.start_time >= form.end_time) {
      setError('End time must be after the start time.');
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from('event_host_requests').insert({
      title: form.title.trim(),
      artist: form.artist.trim(),
      category: form.category,
      description: form.description.trim(),
      event_date: form.event_date,
      start_time: form.start_time,
      end_time: form.end_time,
      venue: form.venue.trim(),
      location: form.location.trim(),
      expected_attendance: Number(form.expected_attendance) || 0,
      contact_email: form.contact_email.trim(),
    });

    if (insertError) {
      setError('Could not submit your request. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <ModalShell open={open} onClose={handleClose} title="Request Received" maxWidth="max-w-md">
        <div className="flex flex-col items-center py-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-royal-gold/60 bg-gradient-to-br from-royal-gold/20 to-royal-burgundy/20"
          >
            <CheckCircle2 className="h-8 w-8 text-royal-gold-bright" />
          </motion.div>
          <h3 className="font-display text-xl font-bold text-royal-gold-bright">
            Your Royal Petition Is Heard
          </h3>
          <p className="mt-3 font-serif text-base italic leading-relaxed text-royal-ivory/90">
            The court has received your request to host “{form.title}”.
            Our royal stewards will review your petition and respond
            to {form.contact_email} in due course.
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClose}
            className="mt-6 rounded-full bg-gradient-to-r from-royal-gold-deep via-royal-gold to-royal-gold-bright px-6 py-2.5 font-display text-sm font-bold uppercase tracking-[0.15em] text-royal-black shadow-gold-glow"
          >
            Return to the Realm
          </motion.button>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell
      open={open}
      onClose={handleClose}
      title="Request to Host"
      subtitle="Petition the royal court to feature your event"
      maxWidth="max-w-2xl"
    >
      {!user ? (
        <div className="flex flex-col items-center py-8 text-center">
          <ScrollText className="mb-4 h-10 w-10 text-royal-gold/50" />
          <p className="font-serif text-base italic text-royal-ivory/90">
            You must be signed in to submit a hosting request.
          </p>
          <p className="mt-1 font-serif text-sm text-royal-beige">
            Join the realm to petition the court.
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClose}
            className="mt-5 rounded-full border border-royal-gold/40 px-6 py-2.5 font-display text-sm font-bold uppercase tracking-[0.15em] text-royal-gold-bright transition-colors hover:bg-royal-gold/10"
          >
            Close
          </motion.button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Section: About the event */}
          <FormSection label="About the Event">
            <Field
              icon={Music2}
              label="Event title"
              value={form.title}
              onChange={(v) => update('title', v)}
              placeholder="e.g. Crimson Thunder Live"
              required
            />
            <Field
              icon={Mic2}
              label="Artist / performer"
              value={form.artist}
              onChange={(v) => update('artist', v)}
              placeholder="e.g. The Golden Axes"
              required
            />
            <SelectField
              icon={Music2}
              label="Genre"
              value={form.category}
              onChange={(v) => update('category', v)}
              options={CATEGORIES}
            />
            <TextArea
              label="Description"
              value={form.description}
              onChange={(v) => update('description', v)}
              placeholder="Describe your event — the atmosphere, the music, the experience…"
              required
            />
          </FormSection>

          {/* Section: When */}
          <FormSection label="When">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field
                icon={CalendarDays}
                label="Date"
                type="date"
                value={form.event_date}
                onChange={(v) => update('event_date', v)}
                required
              />
              <Field
                icon={Clock}
                label="Start time"
                type="time"
                value={form.start_time}
                onChange={(v) => update('start_time', v)}
                required
              />
              <Field
                icon={Clock}
                label="End time"
                type="time"
                value={form.end_time}
                onChange={(v) => update('end_time', v)}
                required
              />
            </div>
          </FormSection>

          {/* Section: Where */}
          <FormSection label="Where">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                icon={MapPin}
                label="Venue"
                value={form.venue}
                onChange={(v) => update('venue', v)}
                placeholder="e.g. Royal Albert Hall"
                required
              />
              <Field
                icon={MapPin}
                label="Location"
                value={form.location}
                onChange={(v) => update('location', v)}
                placeholder="e.g. London, United Kingdom"
                required
              />
            </div>
          </FormSection>

          {/* Section: Details */}
          <FormSection label="Additional Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                icon={Users}
                label="Expected attendance"
                type="number"
                value={form.expected_attendance}
                onChange={(v) => update('expected_attendance', v)}
                placeholder="e.g. 500"
                required
              />
              <Field
                icon={Mail}
                label="Contact email"
                type="email"
                value={form.contact_email}
                onChange={(v) => update('contact_email', v)}
                placeholder="you@realm.com"
                required
              />
            </div>
          </FormSection>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-2.5 font-serif text-sm text-red-300"
            >
              {error}
            </motion.p>
          )}

          <div className="flex items-center justify-between gap-4 border-t border-royal-gold/20 pt-5">
            <p className="hidden font-serif text-xs italic text-royal-beige sm:block">
              The court reviews each petition before approval.
            </p>
            <div className="flex w-full gap-3 sm:w-auto">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-full border border-royal-gold/40 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-royal-beige transition-colors hover:bg-royal-gold/10 sm:flex-none"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.03 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold-deep via-royal-gold to-royal-gold-bright px-6 py-2.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-royal-black shadow-gold-glow disabled:opacity-60 sm:flex-none"
              >
                <ScrollText className="h-4 w-4" />
                {submitting ? 'Submitting…' : 'Submit Petition'}
              </motion.button>
            </div>
          </div>
        </form>
      )}
    </ModalShell>
  );
}

function FormSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="h-px w-4 bg-royal-gold/50" />
        <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-royal-gold">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-royal-gold/40 to-transparent" />
      </div>
      {children}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}: {
  icon: typeof Music2;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-serif text-sm italic text-royal-beige">{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-royal-gold/30 bg-royal-black/40 px-4 py-2.5 focus-within:border-royal-gold/60">
        <Icon className="h-4 w-4 shrink-0 text-royal-gold" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent font-serif text-base text-royal-ivory placeholder:font-serif placeholder:italic placeholder:text-royal-beige/50 focus:outline-none [color-scheme:dark]"
        />
      </div>
    </label>
  );
}

function SelectField({
  icon: Icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: typeof Music2;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-serif text-sm italic text-royal-beige">{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-royal-gold/30 bg-royal-black/40 px-4 py-2.5 focus-within:border-royal-gold/60">
        <Icon className="h-4 w-4 shrink-0 text-royal-gold" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-serif text-base text-royal-ivory focus:outline-none [color-scheme:dark]"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-royal-charcoal text-royal-ivory">
              {o}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-serif text-sm italic text-royal-beige">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={3}
        className="w-full resize-none rounded-xl border border-royal-gold/30 bg-royal-black/40 px-4 py-3 font-serif text-base text-royal-ivory placeholder:font-serif placeholder:italic placeholder:text-royal-beige/50 focus:border-royal-gold/60 focus:outline-none"
      />
    </label>
  );
}
