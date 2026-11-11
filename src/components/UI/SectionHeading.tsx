import type { LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  accent?: string;
}

export default function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  accent = 'gold',
}: SectionHeadingProps) {
  const accentColor =
    accent === 'burgundy' ? 'text-royal-burgundy' : 'text-royal-gold-bright';
  const ring =
    accent === 'burgundy'
      ? 'border-royal-burgundy/60 from-royal-burgundy/30 to-royal-burgundy/10'
      : 'border-royal-gold/60 from-royal-gold/30 to-royal-gold/10';

  return (
    <div className="mb-6 flex items-center gap-4 sm:mb-8 sm:gap-6">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-gradient-to-br ${ring} ${accentColor} sm:h-14 sm:w-14`}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-royal-gold/40 sm:w-10" />
          <span className="font-serif text-xs italic tracking-wider text-royal-beige sm:text-sm">
            {subtitle}
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-royal-ivory sm:text-3xl lg:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
