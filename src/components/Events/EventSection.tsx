import type { LucideIcon } from 'lucide-react';
import type { ClassifiedEvent } from '@/types/event';
import RoyalDecree from './RoyalDecree';
import SectionHeading from '@/components/UI/SectionHeading';
import EmptyState from '@/components/UI/EmptyState';

interface EventSectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  accent?: 'gold' | 'burgundy';
  events: ClassifiedEvent[];
  onSelect: (event: ClassifiedEvent) => void;
  emptyMessage?: string;
  emptyHint?: string;
}

export default function EventSection({
  id,
  icon,
  title,
  subtitle,
  accent = 'gold',
  events,
  onSelect,
  emptyMessage = 'No events in this hall',
  emptyHint,
}: EventSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <SectionHeading icon={icon} title={title} subtitle={subtitle} accent={accent} />
      {events.length === 0 ? (
        <EmptyState message={emptyMessage} hint={emptyHint} />
      ) : (
        <div className="flex flex-col gap-4 sm:gap-5">
          {events.map((event, i) => (
            <RoyalDecree
              key={event.id}
              event={event}
              index={i}
              onClick={() => onSelect(event)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
