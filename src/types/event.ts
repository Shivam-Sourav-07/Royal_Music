export type EventStatus = 'past' | 'live' | 'upcoming';

export type Category =
  | 'Rock'
  | 'Pop'
  | 'Classical'
  | 'Jazz'
  | 'EDM'
  | 'Hip-Hop'
  | 'Metal'
  | 'Indie'
  | 'Bollywood'
  | 'Folk'
  | 'Acoustic'
  | 'Other';

export const CATEGORIES: Category[] = [
  'Rock',
  'Pop',
  'Classical',
  'Jazz',
  'EDM',
  'Hip-Hop',
  'Metal',
  'Indie',
  'Bollywood',
  'Folk',
  'Acoustic',
  'Other',
];

export interface MusicEvent {
  id: string;
  title: string;
  artist: string;
  category: Category;
  description: string;
  image: string;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** 24h time HH:mm */
  startTime: string;
  /** 24h time HH:mm */
  endTime: string;
  venue: string;
  location: string;
  trending: boolean;
  popularity: number;
}

export interface ClassifiedEvent extends MusicEvent {
  status: EventStatus;
}
