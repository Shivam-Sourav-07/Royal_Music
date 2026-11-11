import { useMemo } from 'react';
import { events as allEvents } from '@/data/events';
import type { ClassifiedEvent, EventStatus, Category } from '@/types/event';

function toMinutes(date: string, time: string): number {
  // Treat dates as local time. Combine date + time into a single Date.
  const d = new Date(`${date}T${time}:00`);
  return d.getTime();
}

export function classifyEvent(
  date: string,
  startTime: string,
  endTime: string,
  now: Date = new Date(),
): EventStatus {
  const startMs = toMinutes(date, startTime);
  const endMs = toMinutes(date, endTime);
  const nowMs = now.getTime();
  if (nowMs >= startMs && nowMs <= endMs) return 'live';
  if (nowMs > endMs) return 'past';
  return 'upcoming';
}

export function useClassifiedEvents(): ClassifiedEvent[] {
  return useMemo(() => {
    const now = new Date();
    return allEvents.map((e) => ({
      ...e,
      status: classifyEvent(e.date, e.startTime, e.endTime, now),
    }));
  }, []);
}

export interface EventFilters {
  search: string;
  category: Category | null;
}

export function filterEvents(
  events: ClassifiedEvent[],
  filters: EventFilters,
): ClassifiedEvent[] {
  const q = filters.search.trim().toLowerCase();
  return events.filter((e) => {
    if (filters.category && e.category !== filters.category) return false;
    if (!q) return true;
    return (
      e.title.toLowerCase().includes(q) ||
      e.artist.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    );
  });
}

export function groupByStatus(events: ClassifiedEvent[]) {
  const live = events
    .filter((e) => e.status === 'live')
    .sort((a, b) => b.popularity - a.popularity);
  const upcoming = events
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => a.date.localeCompare(b.date));
  const trending = events
    .filter((e) => e.trending)
    .sort((a, b) => b.popularity - a.popularity);
  const past = events
    .filter((e) => e.status === 'past')
    .sort((a, b) => b.date.localeCompare(a.date));
  return { live, upcoming, trending, past };
}
