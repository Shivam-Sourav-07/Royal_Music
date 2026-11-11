import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X, Check } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '@/types/event';
import type { Category } from '@/types/event';

interface CategoryFilterProps {
  selected: Category | null;
  onSelect: (cat: Category | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);

  return (
    <div className="relative z-20">
      {/* Main filter control — styled as a musical royal control */}
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-royal-gold/40 bg-royal-charcoal/80 px-5 py-4 shadow-decree backdrop-blur-md sm:px-7 sm:py-5"
        aria-expanded={open}
      >
        {/* Ornamental corners */}
        <Corner className="left-2 top-2" />
        <Corner className="right-2 top-2 rotate-90" />
        <Corner className="left-2 bottom-2 -rotate-90" />
        <Corner className="right-2 bottom-2 rotate-180" />

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-gold/50 bg-gradient-to-br from-royal-gold-deep/40 to-royal-gold/20 text-royal-gold-bright">
            <SlidersHorizontal className="h-5 w-5" />
          </span>
          <div className="flex flex-col items-start text-left">
            <span className="font-serif text-xs italic tracking-wide text-royal-beige">
              Royal Decree
            </span>
            <span className="font-display text-base font-semibold uppercase tracking-[0.15em] text-royal-gold-bright sm:text-lg">
              {selected ? selected : 'Filter by Choice'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selected && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onSelect(null);
                }
              }}
              className="flex items-center gap-1 rounded-full border border-royal-gold/40 px-3 py-1 font-serif text-xs italic text-royal-beige transition-colors hover:bg-royal-gold/10"
            >
              Clear <X className="h-3 w-3" />
            </span>
          )}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-royal-gold/40 text-royal-gold"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </motion.button>

      {/* Category panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="relative mt-4 rounded-2xl border border-royal-gold/30 bg-royal-night/95 p-4 shadow-decree backdrop-blur-md sm:p-6">
              {/* ornamental divider */}
              <div className="mb-4 flex items-center gap-2 opacity-60">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-royal-gold/50" />
                <span className="text-royal-gold">✦</span>
                <span className="font-serif text-xs italic text-royal-beige">
                  Choose Your Genre
                </span>
                <span className="text-royal-gold">✦</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-royal-gold/50" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {CATEGORIES.map((cat) => {
                  const isActive = selected === cat;
                  return (
                    <motion.button
                      key={cat}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        onSelect(isActive ? null : cat);
                      }}
                      className={`relative flex items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                        isActive
                          ? 'border-royal-gold bg-gradient-to-br from-royal-gold/20 to-royal-burgundy/20 shadow-inner-gold'
                          : 'border-royal-gold/20 bg-royal-charcoal/60 hover:border-royal-gold/50 hover:bg-royal-gold/5'
                      }`}
                    >
                      <span
                        className={`font-display text-sm font-semibold tracking-wide ${
                          isActive ? 'text-royal-gold-bright' : 'text-royal-ivory'
                        }`}
                      >
                        {cat}
                      </span>
                      {isActive && (
                        <Check className="h-4 w-4 shrink-0 text-royal-gold-bright" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {selected && (
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => onSelect(null)}
                    className="flex items-center gap-2 rounded-full border border-royal-gold/40 px-5 py-2 font-serif text-sm italic text-royal-beige transition-colors hover:bg-royal-gold/10"
                  >
                    <X className="h-4 w-4" /> Reset to all genres
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-4 w-4 border-l-2 border-t-2 border-royal-gold/50 ${className ?? ''}`}
    />
  );
}
