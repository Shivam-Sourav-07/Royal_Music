import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

interface MenuButtonProps {
  onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open navigation menu"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed left-4 top-4 z-40 flex items-center gap-3 rounded-full border border-royal-gold/40 bg-royal-charcoal/80 px-4 py-3 backdrop-blur-md transition-colors hover:border-royal-gold/70 sm:left-6 sm:top-6"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-royal-gold-deep via-royal-gold to-royal-gold-bright shadow-gold-glow">
        <Music2 className="h-5 w-5 text-royal-black" strokeWidth={2.5} />
      </span>
      <span className="hidden flex-col items-start leading-tight sm:flex">
        <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-royal-gold-bright">
          Royal
        </span>
        <span className="font-serif text-xs italic tracking-wide text-royal-beige">
          Music
        </span>
      </span>
    </motion.button>
  );
}
