import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ChevronDown, CalendarCheck, History } from 'lucide-react';
import { useClassifiedEvents } from '@/hooks/useEvents';
import { useSavedEvents } from '@/hooks/useSavedEvents';
import { useAuth } from '@/context/AuthContext';
import type { ClassifiedEvent } from '@/types/event';

interface MyEventsBoxProps {
  onSignIn: () => void;
  onSelectEvent: (event: ClassifiedEvent) => void;
}

export default function MyEventsBox({ onSignIn, onSelectEvent }: MyEventsBoxProps) {
  const { user } = useAuth();
  const allEvents = useClassifiedEvents();
  const { savedIds, loading } = useSavedEvents();
  const [open, setOpen] = useState(false);

  const savedEvents = useMemo(() => {
    if (!user) return { attending: [], attended: [] };
    const saved = allEvents.filter((e) => savedIds.has(e.id));
    return {
      attending: saved.filter((e) => e.status === 'upcoming' || e.status === 'live'),
      attended: saved.filter((e) => e.status === 'past'),
    };
  }, [allEvents, savedIds, user]);

  const total = savedEvents.attending.length + savedEvents.attended.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6"
    >
      {/* Collapsed pill */}
      <motion.button
        type="button"
        onClick={() => (user ? setOpen((o) => !o) : onSignIn())}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 rounded-full border border-royal-gold/40 bg-royal-charcoal/80 px-4 py-3 backdrop-blur-md transition-colors hover:border-royal-gold/70"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-royal-burgundy/40 to-royal-gold/20 text-royal-gold-bright">
          <Bookmark className="h-4 w-4" />
        </span>
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <span className="font-display text-xs font-bold uppercase tracking-[0.15em] text-royal-gold-bright">
            {user ? 'My Events' : 'Sign In'}
          </span>
          {user ? (
            <span className="font-serif text-[11px] italic text-royal-beige">
              {total} saved {total === 1 ? 'decree' : 'decrees'}
            </span>
          ) : (
            <span className="font-serif text-[11px] italic text-royal-beige">
              Save your events
            </span>
          )}
        </span>
        {user && (
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4 text-royal-gold" />
          </motion.span>
        )}
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && user && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 top-full mt-2 w-[88vw] max-w-sm overflow-hidden rounded-2xl border border-royal-gold/40 bg-royal-night/95 shadow-2xl backdrop-blur-md"
          >
            {/* Ornamental corners */}
            <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-royal-gold/50" />
            <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 rotate-90 border-l-2 border-t-2 border-royal-gold/50" />

            {/* Header */}
            <div className="border-b border-royal-gold/20 px-5 py-4">
              <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-royal-gold-bright">
                My Royal Calendar
              </p>
              <p className="font-serif text-xs italic text-royal-beige">
                Events you are attending or have attended
              </p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {loading ? (
                <p className="py-6 text-center font-serif text-sm italic text-royal-beige">
                  Consulting the royal archives…
                </p>
              ) : total === 0 ? (
                <div className="py-8 text-center">
                  <Bookmark className="mx-auto mb-3 h-8 w-8 text-royal-gold/40" />
                  <p className="font-serif text-sm italic text-royal-beige">
                    No saved events yet.
                  </p>
                  <p className="mt-1 font-serif text-xs text-royal-beige/70">
                    Open an event and mark it to add it here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {savedEvents.attending.length > 0 && (
                    <SavedGroup
                      icon={CalendarCheck}
                      label="Attending"
                      events={savedEvents.attending}
                      onSelect={(e) => {
                        onSelectEvent(e);
                        setOpen(false);
                      }}
                    />
                  )}
                  {savedEvents.attended.length > 0 && (
                    <SavedGroup
                      icon={History}
                      label="Attended"
                      events={savedEvents.attended}
                      onSelect={(e) => {
                        onSelectEvent(e);
                        setOpen(false);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SavedGroup({
  icon: Icon,
  label,
  events,
  onSelect,
}: {
  icon: typeof CalendarCheck;
  label: string;
  events: ClassifiedEvent[];
  onSelect: (e: ClassifiedEvent) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-royal-gold" />
        <span className="font-display text-xs font-bold uppercase tracking-[0.15em] text-royal-gold-bright">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-royal-gold/40 to-transparent" />
      </div>
      <div className="flex flex-col gap-2">
        {events.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => onSelect(e)}
            className="group flex items-center gap-3 rounded-xl border border-royal-gold/20 bg-royal-charcoal/60 p-2 text-left transition-colors hover:border-royal-gold/50 hover:bg-royal-gold/5"
          >
            <img
              src={e.image}
              alt={e.title}
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-sm font-semibold text-royal-ivory group-hover:text-royal-gold-bright">
                {e.title}
              </p>
              <p className="truncate font-serif text-xs italic text-royal-beige">
                {e.date} · {e.venue}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
