import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Music, Ticket } from 'lucide-react';
import type { ClassifiedEvent } from '@/types/event';
import LiveIndicator, { TrendingBadge } from './LiveIndicator';

interface RoyalDecreeProps {
  event: ClassifiedEvent;
  onClick: () => void;
  index?: number;
}

const monthShort = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
const dayNum = (d: string) => new Date(`${d}T00:00:00`).getDate();
const yearNum = (d: string) => new Date(`${d}T00:00:00`).getFullYear();

export default function RoyalDecree({ event, onClick, index = 0 }: RoyalDecreeProps) {
  const isPast = event.status === 'past';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-royal-gold/30 bg-parchment-texture shadow-decree transition-shadow hover:shadow-gold-glow"
    >
      {/* Ornamental corners */}
      <CornerOrnament className="left-1.5 top-1.5" />
      <CornerOrnament className="right-1.5 top-1.5 rotate-90" />
      <CornerOrnament className="left-1.5 bottom-1.5 -rotate-90" />
      <CornerOrnament className="right-1.5 bottom-1.5 rotate-180" />

      {/* Inner gold hairline border */}
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-royal-gold/15" />

      <div className="relative flex flex-col gap-0 sm:flex-row">
        {/* ── Date badge / seal (left on desktop, top on mobile) ── */}
        <div className="relative flex shrink-0 items-center justify-center bg-gradient-to-br from-royal-burgundy/30 to-royal-charcoal p-5 sm:w-32 sm:flex-col sm:gap-1 sm:p-6">
          <div className="flex items-center gap-4 sm:flex-col sm:gap-0">
            <div className="text-center">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-royal-gold">
                {monthShort(event.date)}
              </p>
              <p className="font-display text-4xl font-bold leading-none text-royal-gold-bright sm:text-5xl">
                {dayNum(event.date)}
              </p>
              <p className="font-serif text-xs italic text-royal-beige">
                {yearNum(event.date)}
              </p>
            </div>
            {/* Royal seal */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-royal-gold/50 bg-royal-black/50 sm:mt-3">
              <CrownSeal />
            </div>
          </div>
        </div>

        {/* ── Cover artwork ── */}
        <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-56">
          <img
            src={event.image}
            alt={`${event.title} — ${event.artist}`}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              isPast ? 'grayscale-[40%] sepia-[15%] opacity-80' : ''
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-charcoal/50 via-transparent to-royal-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal/80 via-transparent to-transparent sm:bg-gradient-to-r" />
        </div>

        {/* ── Event details ── */}
        <div className="relative flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {/* Top row: badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-royal-gold/40 bg-royal-gold/10 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-royal-gold-bright">
              <Music className="h-3 w-3" />
              {event.category}
            </span>
            {event.status === 'live' && <LiveIndicator />}
            {event.trending && <TrendingBadge />}
            {isPast && (
              <span className="rounded-full border border-royal-beige/30 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-royal-beige/70">
                Archived
              </span>
            )}
          </div>

          {/* Title & artist */}
          <div>
            <h3 className="font-display text-xl font-bold leading-tight text-royal-ivory transition-colors group-hover:text-royal-gold-bright sm:text-2xl">
              {event.title}
            </h3>
            <p className="mt-1 font-serif text-base italic text-royal-gold">
              by {event.artist}
            </p>
          </div>

          {/* Gold divider */}
          <div className="flex items-center gap-2 opacity-50">
            <span className="h-px flex-1 bg-gradient-to-r from-royal-gold/50 to-transparent" />
            <span className="text-royal-gold">❖</span>
            <span className="h-px flex-1 bg-gradient-to-l from-royal-gold/50 to-transparent" />
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
            <MetaItem icon={Clock} label={`${event.startTime} — ${event.endTime}`} />
            <MetaItem icon={CalendarDays} label={formatLongDate(event.date)} />
            <MetaItem icon={MapPin} label={event.venue} />
            <MetaItem icon={MapPin} label={event.location} muted />
          </div>

          {/* Footer: popularity + action hint */}
          <div className="mt-1 flex items-center justify-between border-t border-royal-gold/15 pt-3">
            <PopularityBar score={event.popularity} />
            <span className="flex items-center gap-1.5 font-serif text-xs italic text-royal-gold transition-transform group-hover:translate-x-1">
              <Ticket className="h-4 w-4" />
              View decree
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MetaItem({
  icon: Icon,
  label,
  muted,
}: {
  icon: typeof MapPin;
  label: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 shrink-0 ${muted ? 'text-royal-beige/60' : 'text-royal-gold'}`} />
      <span className={`font-serif text-sm ${muted ? 'text-royal-beige/80' : 'text-royal-ivory/90'}`}>
        {label}
      </span>
    </div>
  );
}

function PopularityBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-serif text-xs italic text-royal-beige">Royal favour</span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-royal-black/60 sm:w-28">
        <div
          className="h-full rounded-full bg-gradient-to-r from-royal-gold-deep via-royal-gold to-royal-gold-bright"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="font-display text-xs font-bold text-royal-gold-bright">{score}</span>
    </div>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 h-5 w-5 border-l-2 border-t-2 border-royal-gold/60 ${className ?? ''}`}
    >
      <span className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-royal-gold/70" />
    </span>
  );
}

function CrownSeal() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path
        d="M4 16 L4 8 L8 12 L12 6 L16 12 L20 8 L20 16 Z"
        fill="none"
        stroke="#E6C878"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="8" r="1.4" fill="#E6C878" />
      <circle cx="12" cy="6" r="1.4" fill="#E6C878" />
      <circle cx="20" cy="8" r="1.4" fill="#E6C878" />
      <rect x="5" y="17" width="14" height="2" fill="#E6C878" />
    </svg>
  );
}

function formatLongDate(d: string): string {
  return new Date(`${d}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });
}
