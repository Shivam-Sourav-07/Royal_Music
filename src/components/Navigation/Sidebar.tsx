import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Radio, CalendarClock, Flame, Archive, Plus, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export type NavTarget =
  | 'home'
  | 'live'
  | 'upcoming'
  | 'trending'
  | 'past';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (target: NavTarget) => void;
  active: NavTarget;
  onCreateEvent: () => void;
}

const NAV_ITEMS: { target: NavTarget; label: string; icon: typeof Home; sub: string }[] = [
  { target: 'home', label: 'Home', icon: Home, sub: 'The royal gateway' },
  { target: 'live', label: 'Live Events', icon: Radio, sub: 'Playing now' },
  { target: 'upcoming', label: 'Upcoming Events', icon: CalendarClock, sub: 'On the horizon' },
  { target: 'trending', label: 'Trending Events', icon: Flame, sub: 'The realm is talking' },
  { target: 'past', label: 'Past Events', icon: Archive, sub: 'From the archives' },
];

export default function Sidebar({ open, onClose, onNavigate, active, onCreateEvent }: SidebarProps) {
  const { user, signOut } = useAuth();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="fixed left-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col border-r border-royal-gold/30 bg-royal-charcoal/95 bg-parchment-texture shadow-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-royal-gold/20 px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-royal-gold-deep via-royal-gold to-royal-gold-bright shadow-gold-glow">
                  <span className="font-display text-lg font-bold text-royal-black">R</span>
                </div>
                <div className="leading-tight">
                  <p className="font-display text-lg font-bold uppercase tracking-[0.25em] text-royal-gold-bright">
                    Royal
                  </p>
                  <p className="font-serif text-sm italic text-royal-beige">Music</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-royal-gold/30 text-royal-gold transition-colors hover:bg-royal-gold/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Ornamental divider */}
            <div className="flex items-center gap-2 px-6 py-3 opacity-60">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-royal-gold/50" />
              <span className="text-royal-gold">✦</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-royal-gold/50" />
            </div>

            {/* Nav items */}
            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.target;
                return (
                  <motion.button
                    key={item.target}
                    type="button"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onNavigate(item.target);
                      onClose();
                    }}
                    className={`group flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                      isActive
                        ? 'border-royal-gold/60 bg-royal-gold/10 shadow-inner-gold'
                        : 'border-transparent hover:border-royal-gold/30 hover:bg-royal-night/60'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? 'border-royal-gold bg-gradient-to-br from-royal-gold-deep to-royal-gold text-royal-black'
                          : 'border-royal-gold/30 text-royal-gold group-hover:border-royal-gold/60'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span
                        className={`font-display text-base font-semibold tracking-wide ${
                          isActive ? 'text-royal-gold-bright' : 'text-royal-ivory'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-serif text-xs italic text-royal-beige">
                        {item.sub}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Create Event action */}
            <div className="px-4 pb-3">
              <motion.button
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onCreateEvent();
                  onClose();
                }}
                className="group flex w-full items-center gap-4 rounded-xl border border-royal-gold/50 bg-gradient-to-br from-royal-burgundy/30 to-royal-gold/10 px-4 py-3.5 text-left shadow-inner-gold transition-colors hover:border-royal-gold/80"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal-gold-deep to-royal-gold text-royal-black">
                  <Plus className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-base font-semibold tracking-wide text-royal-gold-bright">
                    Create Event
                  </span>
                  <span className="font-serif text-xs italic text-royal-beige">
                    Request to host your event
                  </span>
                </span>
              </motion.button>
            </div>

            {/* Footer crest */}
            <div className="border-t border-royal-gold/20 px-6 py-5 text-center">
              {user && (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="mx-auto mb-3 flex items-center gap-2 rounded-full border border-royal-gold/30 px-4 py-1.5 font-serif text-xs italic text-royal-beige transition-colors hover:bg-royal-gold/10"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out of the realm
                </button>
              )}
              <p className="font-serif text-xs italic leading-relaxed text-royal-beige">
                "Where Royal Elegance Meets
                <br />
                the Soul of Live Music"
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 opacity-50">
                <span className="text-royal-gold">✦</span>
                <span className="text-royal-gold">❖</span>
                <span className="text-royal-gold">✦</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
