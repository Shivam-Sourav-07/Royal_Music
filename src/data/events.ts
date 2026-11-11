import type { MusicEvent } from '@/types/event';

// Reference "now" for the demo. Events are authored relative to this date
// so that live / upcoming / past classification is deterministic.
// Current date context: 2026-11-11

export const events: MusicEvent[] = [
  // ──────────────── LIVE (currently happening on 2026-11-11) ────────────────
  {
    id: 'evt-001',
    title: 'Crimson Thunder Live',
    artist: 'The Golden Axes',
    category: 'Rock',
    description:
      'A thunderous rock spectacle where vintage riffs meet royal stagecraft. The Golden Axes return to the kingdom with their legendary arena-shaking anthems and a light show forged in molten gold.',
    image:
      'https://images.pexels.com/photos/167605/pexels-photo-167605.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-11',
    startTime: '20:00',
    endTime: '23:30',
    venue: 'Royal Albert Hall',
    location: 'London, United Kingdom',
    trending: true,
    popularity: 98,
  },
  {
    id: 'evt-002',
    title: 'Midnight Saxophone Soirée',
    artist: 'Eleanor Vance Quartet',
    category: 'Jazz',
    description:
      'An intimate evening of smoky jazz standards and bold improvisations, performed under candlelight in the velvet-draped Crown Jazz Parlour.',
    image:
      'https://images.pexels.com/photos/9002789/pexels-photo-9002789.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-11',
    startTime: '21:00',
    endTime: '23:59',
    venue: 'Crown Jazz Parlour',
    location: 'New Orleans, USA',
    trending: false,
    popularity: 72,
  },
  {
    id: 'evt-003',
    title: 'Neon Kingdom Rave',
    artist: 'DJ Solstice',
    category: 'EDM',
    description:
      'A pulsating electronic journey through the neon-lit halls of the Grand Palace. Lasers, bass, and a crowd united under the golden arches of sound.',
    image:
      'https://images.pexels.com/photos/9534908/pexels-photo-9534908.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-11',
    startTime: '22:00',
    endTime: '04:00',
    venue: 'Grand Palace Arena',
    location: 'Berlin, Germany',
    trending: true,
    popularity: 91,
  },

  // ──────────────── UPCOMING ────────────────
  {
    id: 'evt-010',
    title: 'Symphony of the Crown',
    artist: 'Vienna Royal Philharmonic',
    category: 'Classical',
    description:
      'A majestic orchestral evening performing the timeless works of Beethoven and Tchaikovsky, conducted under the gilded dome of the Opera House.',
    image:
      'https://images.pexels.com/photos/5182979/pexels-photo-5182979.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-15',
    startTime: '19:30',
    endTime: '22:00',
    venue: 'Sydney Opera House',
    location: 'Sydney, Australia',
    trending: true,
    popularity: 88,
  },
  {
    id: 'evt-011',
    title: 'Golden Mic Empire',
    artist: 'Crown Prince Mellow',
    category: 'Hip-Hop',
    description:
      'The reigning lyricist of the realm delivers a powerhouse set of chart-topping verses, joined by a full live band and a theatrical royal-court stage design.',
    image:
      'https://images.pexels.com/photos/7971862/pexels-photo-7971862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-18',
    startTime: '20:30',
    endTime: '23:00',
    venue: 'King\'s Cross Theatre',
    location: 'Toronto, Canada',
    trending: true,
    popularity: 94,
  },
  {
    id: 'evt-012',
    title: 'Ivory Strings Unplugged',
    artist: 'Amara Sol',
    category: 'Acoustic',
    description:
      'A candlelit acoustic session where raw vocals and fingerpicked guitar weave stories of love, loss, and legacy in an intimate royal chamber.',
    image:
      'https://images.pexels.com/photos/18685043/pexels-photo-18685043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-20',
    startTime: '18:00',
    endTime: '20:00',
    venue: 'The Amber Hall',
    location: 'Dublin, Ireland',
    trending: false,
    popularity: 64,
  },
  {
    id: 'evt-013',
    title: 'Iron Throne Fest',
    artist: 'Black Citadel',
    category: 'Metal',
    description:
      'A relentless metal onslaught from the underground kings of heavy. Expect soaring solos, guttural roars, and a stage built like a fortress of fire.',
    image:
      'https://images.pexels.com/photos/11974570/pexels-photo-11974570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-22',
    startTime: '19:00',
    endTime: '23:00',
    venue: 'The Fortress Grounds',
    location: 'Oslo, Norway',
    trending: false,
    popularity: 79,
  },
  {
    id: 'evt-014',
    title: 'Velvet Echoes Tour',
    artist: 'The Lantern Society',
    category: 'Indie',
    description:
      'Dream-soaked indie anthems and shimmering guitar layers from the band critics are calling the poetic voice of a new generation.',
    image:
      'https://images.pexels.com/photos/2601189/pexels-photo-2601189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-25',
    startTime: '20:00',
    endTime: '22:30',
    venue: 'The Gilded Hall',
    location: 'Manchester, United Kingdom',
    trending: false,
    popularity: 70,
  },
  {
    id: 'evt-015',
    title: 'Pop Coronation Night',
    artist: 'Seraphina',
    category: 'Pop',
    description:
      'The pop empress ascends with a stadium-sized spectacle of choreography, pyrotechnics, and every number-one hit from her record-breaking reign.',
    image:
      'https://images.pexels.com/photos/1494665/pexels-photo-1494665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-11-28',
    startTime: '19:30',
    endTime: '22:30',
    venue: 'O2 Arena',
    location: 'London, United Kingdom',
    trending: true,
    popularity: 96,
  },
  {
    id: 'evt-016',
    title: 'Ragas of the Maharaja',
    artist: 'Pandit Ravi Dynasty',
    category: 'Bollywood',
    description:
      'A celebration of Indian classical and Bollywood fusion, where sitar, tabla, and cinematic vocals bring the colours of the royal court to life.',
    image:
      'https://images.pexels.com/photos/37238553/pexels-photo-37238553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-12-02',
    startTime: '19:00',
    endTime: '21:30',
    venue: 'Nariman Point Pavilion',
    location: 'Mumbai, India',
    trending: false,
    popularity: 81,
  },
  {
    id: 'evt-017',
    title: 'Highland Heritage Concert',
    artist: 'The Celtic Bards',
    category: 'Folk',
    description:
      'Traditional folk ballads and lively jigs from the highland storytellers, performed with fiddle, flute, and the warmth of an ancient hearth.',
    image:
      'https://images.pexels.com/photos/36344053/pexels-photo-36344053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-12-05',
    startTime: '17:30',
    endTime: '19:30',
    venue: 'Edinburgh Castle Esplanade',
    location: 'Edinburgh, Scotland',
    trending: false,
    popularity: 58,
  },
  {
    id: 'evt-018',
    title: 'The Maestro\'s Farewell',
    artist: 'Auguste Moreau Ensemble',
    category: 'Other',
    description:
      'A genre-defying farewell performance blending chamber music, spoken word, and theatrical staging in a once-in-a-lifetime royal send-off.',
    image:
      'https://images.pexels.com/photos/13793510/pexels-photo-13793510.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-12-08',
    startTime: '20:00',
    endTime: '22:00',
    venue: 'Palais Garnier',
    location: 'Paris, France',
    trending: false,
    popularity: 67,
  },

  // ──────────────── PAST ────────────────
  {
    id: 'evt-020',
    title: 'Legends of the Realm',
    artist: 'Iron Vanguard',
    category: 'Metal',
    description:
      'A historic metal marathon that shook the kingdom to its foundations. Relive the night the citadel rang with ten thousand roaring voices.',
    image:
      'https://images.pexels.com/photos/19681309/pexels-photo-19681309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-10-28',
    startTime: '19:00',
    endTime: '23:00',
    venue: 'The Fortress Grounds',
    location: 'Oslo, Norway',
    trending: false,
    popularity: 85,
  },
  {
    id: 'evt-021',
    title: 'Golden Hour Sessions',
    artist: 'Marisol Vega',
    category: 'Pop',
    description:
      'A sunset pop concert that painted the sky in gold. An unforgettable evening of melodies that echoed across the royal bay.',
    image:
      'https://images.pexels.com/photos/2231755/pexels-photo-2231755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-10-20',
    startTime: '18:30',
    endTime: '21:00',
    venue: 'Bayfront Amphitheatre',
    location: 'Barcelona, Spain',
    trending: false,
    popularity: 77,
  },
  {
    id: 'evt-022',
    title: 'Crown Jewels of Jazz',
    artist: 'The Monarch Trio',
    category: 'Jazz',
    description:
      'A late-night jazz revival that paid homage to the golden age of swing, with standing ovations that lasted well past midnight.',
    image:
      'https://images.pexels.com/photos/1358816/pexels-photo-1358816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-10-15',
    startTime: '21:00',
    endTime: '23:30',
    venue: 'Blue Crown Lounge',
    location: 'Chicago, USA',
    trending: false,
    popularity: 69,
  },
  {
    id: 'evt-023',
    title: 'Festival of the Ancients',
    artist: 'Lore Ensemble',
    category: 'Folk',
    description:
      'A gathering of folk traditions from across the realm, where generations shared songs beneath the ancient oaks of the royal forest.',
    image:
      'https://images.pexels.com/photos/15473420/pexels-photo-15473420.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-10-10',
    startTime: '16:00',
    endTime: '19:00',
    venue: 'Royal Forest Grounds',
    location: 'Reykjavik, Iceland',
    trending: false,
    popularity: 54,
  },
  {
    id: 'evt-024',
    title: 'Electric Dynasty',
    artist: 'Voltage Kings',
    category: 'Rock',
    description:
      'A high-voltage rock crusade that lit up the capital. The Voltage Kings delivered a set now regarded as one of the greatest in the kingdom\'s history.',
    image:
      'https://images.pexels.com/photos/1613240/pexels-photo-1613240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-09-30',
    startTime: '20:00',
    endTime: '23:00',
    venue: 'Capital Dome',
    location: 'Tokyo, Japan',
    trending: false,
    popularity: 90,
  },
  {
    id: 'evt-025',
    title: 'Sitar & Strings Gala',
    artist: 'Anaya Raga Collective',
    category: 'Bollywood',
    description:
      'A grand gala merging classical Indian instrumentation with contemporary Bollywood arrangements, attended by nobility and music lovers alike.',
    image:
      'https://images.pexels.com/photos/40414008/pexels-photo-40414008.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2026-09-22',
    startTime: '19:00',
    endTime: '21:30',
    venue: 'Lotus Pavilion',
    location: 'Jaipur, India',
    trending: false,
    popularity: 73,
  },
];
