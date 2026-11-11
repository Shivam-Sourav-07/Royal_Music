import { motion } from 'framer-motion';

export default function LiveIndicator() {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-red-500/40 bg-red-950/40 px-3 py-1.5">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 live-dot" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
      </span>
      <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-red-400">
        Live Now
      </span>
    </div>
  );
}

export function TrendingBadge() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-1.5 rounded-full border border-royal-gold/50 bg-gradient-to-br from-royal-gold/20 to-royal-burgundy/20 px-3 py-1"
    >
      <span className="text-sm">🔥</span>
      <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-royal-gold-bright">
        Trending
      </span>
    </motion.div>
  );
}
