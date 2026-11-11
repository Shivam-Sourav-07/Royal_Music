import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative z-20">
      <div className="group relative flex items-center gap-3 rounded-2xl border border-royal-gold/35 bg-royal-charcoal/80 px-4 py-3.5 shadow-decree backdrop-blur-md sm:px-6 sm:py-4">
        {/* ornamental corners */}
        <span className="pointer-events-none absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-royal-gold/50" />
        <span className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 rotate-90 border-l-2 border-t-2 border-royal-gold/50" />
        <span className="pointer-events-none absolute left-2 bottom-2 h-3.5 w-3.5 -rotate-90 border-l-2 border-t-2 border-royal-gold/50" />
        <span className="pointer-events-none absolute right-2 bottom-2 h-3.5 w-3.5 rotate-180 border-l-2 border-t-2 border-royal-gold/50" />

        <Search className="h-5 w-5 shrink-0 text-royal-gold" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by event, artist, venue, or location…"
          className="w-full bg-transparent font-serif text-base text-royal-ivory placeholder:font-serif placeholder:italic placeholder:text-royal-beige/60 focus:outline-none"
        />
        {value && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-royal-gold/30 text-royal-beige transition-colors hover:bg-royal-gold/10"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
