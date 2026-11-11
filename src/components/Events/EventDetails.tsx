import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Music,
  Ticket,
  Radio,
  Flame,
  Archive,
  CalendarClock,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import type { ClassifiedEvent } from '@/types/event';

interface EventDetailsProps {
  event: ClassifiedEvent | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  requiresAuth: boolean;
}

export default function EventDetails({ event, onClose, isSaved, onToggleSave, requiresAuth }: EventDetailsProps) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-royal-gold/40 bg-parchment-texture shadow-2xl"
            >
              {/* Ornamental corners */}
              <span className="pointer-events-none absolute left-2 top-2 z-20 h-6 w-6 border-l-2 border-t-2 border-royal-gold/60" />
              <span className="pointer-events-none absolute right-2 top-2 z-20 h-6 w-6 rotate-90 border-l-2 border-t-2 border-royal-gold/60" />
              <span className="pointer-events-none absolute left-2 bottom-2 z-20 h-6 w-6 -rotate-90 border-l-2 border-t-2 border-royal-gold/60" />
              <span className="pointer-events-none absolute right-2 bottom-2 z-20 h-6 w-6 rotate-180 border-l-2 border-t-2 border-royal-gold/60" />

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close event details"
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-royal-gold/40 bg-royal-black/60 text-royal-gold transition-colors hover:bg-royal-gold/15"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero image */}
              <div className="relative h-56 w-full overflow-hidden sm:h-72">
                <img
                  src={event.image}
                  alt={`${event.title} — ${event.artist}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal via-royal-charcoal/30 to-transparent" />
                {/* Status badge over image */}
                <div className="absolute left-5 top-5">
                  <StatusBadge status={event.status} trending={event.trending} />
                </div>
              </div>

              {/* Body */}
              <div className="relative flex flex-col gap-5 p-6 sm:p-8">
                {/* Category + popularity */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-2 rounded-full border border-royal-gold/40 bg-royal-gold/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-royal-gold-bright">
                    <Music className="h-3.5 w-3.5" />
                    {event.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs italic text-royal-beige">Royal favour</span>
                    <span className="font-display text-lg font-bold text-royal-gold-bright">
                      {event.popularity}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="font-display text-3xl font-bold leading-tight text-royal-ivory sm:text-4xl">
                    {event.title}
                  </h2>
                  <p className="mt-2 font-serif text-lg italic text-royal-gold">
                    A royal performance by {event.artist}
                  </p>
                </div>

                {/* Gold divider */}
                <div className="flex items-center gap-2 opacity-60">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-royal-gold/50" />
                  <span className="text-royal-gold">❖</span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-royal-gold/50" />
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailRow icon={CalendarDays} label="Date" value={formatLongDate(event.date)} />
                  <DetailRow icon={Clock} label="Time" value={`${event.startTime} — ${event.endTime}`} />
                  <DetailRow icon={MapPin} label="Venue" value={event.venue} />
                  <DetailRow icon={MapPin} label="Location" value={event.location} />
                </div>

                {/* Description */}
                <div className="rounded-xl border border-royal-gold/20 bg-royal-black/30 p-4">
                  <p className="font-serif text-base leading-relaxed text-royal-ivory/90">
                    {event.description}
                  </p>
                </div>

                {/* Action area */}
                <div className="flex flex-col items-stretch gap-3 border-t border-royal-gold/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <p className="font-serif text-sm italic text-royal-beige">
                      {actionLabel(event.status)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleSave(event.id)}
                      className={`flex items-center gap-2 rounded-full border px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                        isSaved
                          ? 'border-royal-gold/60 bg-royal-gold/10 text-royal-gold-bright'
                          : 'border-royal-gold/40 text-royal-gold hover:bg-royal-gold/10'
                      }`}
                      title={requiresAuth ? 'Sign in to save events' : isSaved ? 'Remove from my events' : 'Add to my events'}
                    >
                      {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      {isSaved ? 'Saved' : requiresAuth ? 'Save' : 'Save'}
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold-deep via-royal-gold to-royal-gold-bright px-7 py-3 font-display text-sm font-bold uppercase tracking-[0.15em] text-royal-black shadow-gold-glow"
                      onClick={() => {
                        // Demo action only — no real booking integration.
                        alert(
                          `Royal Music — demonstration request\n\nThis is a demo action for "${event.title}". No real booking is processed.`,
                        );
                      }}
                    >
                      <Ticket className="h-4 w-4" />
                      {actionButtonLabel(event.status)}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-royal-gold/15 bg-royal-black/20 px-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-royal-gold" />
      <div className="flex flex-col">
        <span className="font-serif text-xs italic text-royal-beige">{label}</span>
        <span className="font-serif text-sm text-royal-ivory">{value}</span>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
  trending,
}: {
  status: ClassifiedEvent['status'];
  trending: boolean;
}) {
  if (status === 'live') {
    return (
      <div className="flex items-center gap-2 rounded-full border border-red-500/50 bg-red-950/70 px-3 py-1.5 backdrop-blur-sm">
        <Radio className="h-4 w-4 text-red-400" />
        <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-red-400">
          Live Now
        </span>
      </div>
    );
  }
  if (trending) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-royal-gold/50 bg-royal-charcoal/80 px-3 py-1.5 backdrop-blur-sm">
        <Flame className="h-4 w-4 text-royal-gold-bright" />
        <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-royal-gold-bright">
          Trending
        </span>
      </div>
    );
  }
  if (status === 'past') {
    return (
      <div className="flex items-center gap-2 rounded-full border border-royal-beige/30 bg-royal-charcoal/80 px-3 py-1.5 backdrop-blur-sm">
        <Archive className="h-4 w-4 text-royal-beige" />
        <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-royal-beige">
          Archived
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-full border border-royal-gold/40 bg-royal-charcoal/80 px-3 py-1.5 backdrop-blur-sm">
      <CalendarClock className="h-4 w-4 text-royal-gold" />
      <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-royal-gold">
        Upcoming
      </span>
    </div>
  );
}

function actionLabel(status: ClassifiedEvent['status']): string {
  switch (status) {
    case 'live':
      return 'This decree is being performed right now.';
    case 'past':
      return 'This performance has passed into the royal archives.';
    default:
      return 'Secure your place at the royal court.';
  }
}

function actionButtonLabel(status: ClassifiedEvent['status']): string {
  switch (status) {
    case 'live':
      return 'Join the Realm';
    case 'past':
      return 'View Archive';
    default:
      return 'Request Royal Invite';
  }
}

function formatLongDate(d: string): string {
  return new Date(`${d}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
