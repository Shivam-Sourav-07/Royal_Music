import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, CalendarClock, Flame, Archive } from 'lucide-react';
import type { ClassifiedEvent } from '@/types/event';
import type { Category } from '@/types/event';
import {
  useClassifiedEvents,
  filterEvents,
  groupByStatus,
} from '@/hooks/useEvents';
import { useSavedEvents } from '@/hooks/useSavedEvents';
import { useAuth } from '@/context/AuthContext';
import GuitarHero from '@/components/Hero/GuitarHero';
import CategoryFilter from '@/components/Filters/CategoryFilter';
import SearchBar from '@/components/Filters/SearchBar';
import EventSection from '@/components/Events/EventSection';
import EventDetails from '@/components/Events/EventDetails';
import type { NavTarget } from '@/components/Navigation/Sidebar';

interface HomeProps {
  activeNav: NavTarget;
  onNavigate: (target: NavTarget) => void;
  onRequireAuth: () => void;
  detailEvent: ClassifiedEvent | null;
  onSelectEvent: (event: ClassifiedEvent | null) => void;
}

export default function Home({ activeNav, onNavigate, onRequireAuth, detailEvent, onSelectEvent }: HomeProps) {
  const { user } = useAuth();
  const allEvents = useClassifiedEvents();
  const { savedIds, toggleSaved } = useSavedEvents();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | null>(null);

  const filtered = useMemo(
    () => filterEvents(allEvents, { search, category }),
    [allEvents, search, category],
  );

  const groups = useMemo(() => groupByStatus(filtered), [filtered]);

  const hasActiveFilters = Boolean(search.trim() || category);
  const totalShown = groups.live.length + groups.upcoming.length + groups.trending.length + groups.past.length;

  return (
    <div className="relative">
      <GuitarHero />

      {/* Filters + content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Intro line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="font-serif text-lg italic leading-relaxed text-royal-beige sm:text-xl">
            Behold the kingdom's musical calendar — every concert presented
            <br className="hidden sm:block" /> as a royal invitation to the soul.
          </p>
        </motion.div>

        {/* Search + Filter controls */}
        <div className="flex flex-col gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        {/* Active filter summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 flex items-center justify-center gap-2 font-serif text-sm italic text-royal-beige"
          >
            <span>Showing {totalShown} decree{totalShown !== 1 ? 's' : ''}</span>
            {category && <span>in <span className="text-royal-gold-bright">{category}</span></span>}
            {search.trim() && <span>matching “<span className="text-royal-gold-bright">{search.trim()}</span>”</span>}
          </motion.div>
        )}

        {/* Sections */}
        <div className="mt-12 flex flex-col gap-16 sm:gap-20">
          <EventSection
            id="live"
            icon={Radio}
            title="Live Events"
            subtitle="Playing in the realm now"
            accent="burgundy"
            events={groups.live}
            onSelect={onSelectEvent}
            emptyMessage="No live performances at this hour"
            emptyHint="Return when the curtain rises — the kingdom's stages await."
          />

          <EventSection
            id="upcoming"
            icon={CalendarClock}
            title="Upcoming Events"
            subtitle="On the royal horizon"
            events={groups.upcoming}
            onSelect={onSelectEvent}
            emptyMessage="No upcoming decrees match your search"
            emptyHint="Try a different genre or clear your filters."
          />

          <EventSection
            id="trending"
            icon={Flame}
            title="Trending Events"
            subtitle="The realm is talking"
            events={groups.trending}
            onSelect={onSelectEvent}
            emptyMessage="Nothing trending with these filters"
            emptyHint="Broaden your search to see what the kingdom favours."
          />

          <EventSection
            id="past"
            icon={Archive}
            title="Past Events"
            subtitle="From the royal archives"
            events={groups.past}
            onSelect={onSelectEvent}
            emptyMessage="No archived decrees match your search"
            emptyHint="Past performances rest in the archives — adjust filters to explore."
          />
        </div>

        {/* Footer crest */}
        <footer className="mt-24 border-t border-royal-gold/20 pt-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-royal-gold/60">
            <span>✦</span>
            <span className="text-xl">❖</span>
            <span>✦</span>
          </div>
          <p className="font-display text-lg font-bold uppercase tracking-[0.3em] text-royal-gold-bright">
            Royal Music
          </p>
          <p className="mt-2 font-serif text-sm italic text-royal-beige">
            Where Royal Elegance Meets the Soul of Live Music
          </p>
        </footer>
      </main>

      <EventDetails
        event={detailEvent}
        onClose={() => onSelectEvent(null)}
        isSaved={detailEvent ? savedIds.has(detailEvent.id) : false}
        onToggleSave={(eventId) => {
          if (!user) {
            onRequireAuth();
            return;
          }
          toggleSaved(eventId);
        }}
        requiresAuth={!user}
      />

      {/* Hidden nav-target anchors handled via scroll in App; keep ref for completeness */}
      <span className="sr-only" aria-hidden>
        {activeNav}
      </span>
    </div>
  );
}
