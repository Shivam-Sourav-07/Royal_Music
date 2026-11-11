import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
}: ModalShellProps) {
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
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl border border-royal-gold/40 bg-parchment-texture shadow-2xl`}
            >
              {/* Ornamental corners */}
              <span className="pointer-events-none absolute left-2 top-2 z-20 h-5 w-5 border-l-2 border-t-2 border-royal-gold/60" />
              <span className="pointer-events-none absolute right-2 top-2 z-20 h-5 w-5 rotate-90 border-l-2 border-t-2 border-royal-gold/60" />
              <span className="pointer-events-none absolute left-2 bottom-2 z-20 h-5 w-5 -rotate-90 border-l-2 border-t-2 border-royal-gold/60" />
              <span className="pointer-events-none absolute right-2 bottom-2 z-20 h-5 w-5 rotate-180 border-l-2 border-t-2 border-royal-gold/60" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-royal-gold/40 bg-royal-black/60 text-royal-gold transition-colors hover:bg-royal-gold/15"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="border-b border-royal-gold/20 px-6 pb-4 pt-6 sm:px-8">
                <h2 className="pr-8 font-display text-2xl font-bold uppercase tracking-[0.1em] text-royal-gold-bright">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 font-serif text-sm italic text-royal-beige">{subtitle}</p>
                )}
              </div>

              <div className="p-6 sm:p-8">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
