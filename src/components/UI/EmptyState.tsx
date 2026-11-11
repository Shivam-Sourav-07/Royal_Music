import { motion } from 'framer-motion';

interface EmptyStateProps {
  message: string;
  hint?: string;
}

export default function EmptyState({ message, hint }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-royal-gold/30 bg-royal-charcoal/40 px-6 py-14 text-center"
    >
      <div className="mb-4 flex items-center gap-2 text-royal-gold/50">
        <span>✦</span>
        <span className="text-2xl">♪</span>
        <span>✦</span>
      </div>
      <p className="font-display text-lg font-semibold text-royal-gold-bright">
        {message}
      </p>
      {hint && (
        <p className="mt-2 font-serif text-sm italic text-royal-beige">{hint}</p>
      )}
    </motion.div>
  );
}
