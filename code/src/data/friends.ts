/**
 * The MAIN characters of "Lautstarke Freunde" — one animal friend per speech
 * sound, each with its own book. We feature these main characters across the
 * site (not the side characters that only appear inside a single story).
 *
 * Figures are transparent cut-outs in code/src/assets/figures/.
 * Book covers live in code/src/assets/<Name>/cover.png.
 * Display strings stay German on purpose (German audience / product).
 */

import fanni from '../assets/figures/fanni-fuchs.png';
import karlo from '../assets/figures/karlo-kater.png';
import rudi  from '../assets/figures/rudi-raupe.png';

import fanniCover from '../assets/fanni-fuchs/cover.png';
import karloCover from '../assets/Karlo Kater/cover.png';
import rudiCover  from '../assets/Rudi Raupe/0cover.png';

export type Friend = {
  /** Stable identifier used as a CSS modifier key (e.g. book-card--fanni). */
  key: 'fanni' | 'karlo' | 'rudi';
  name: string;
  animal: string;
  sound: string;
  image: ImageMetadata;
  alt: string;
  description: string;
  /** Full book title shown on the book card. */
  bookTitle: string;
  /** Age recommendation shown on the book card, e.g. "ab 3 Jahren". */
  age: string;
  /** Cover image for the book card. */
  cover: ImageMetadata;
  /** Book detail route once the book is out; undefined while upcoming. */
  href?: string;
  /**
   * When set, renders a "Bei Amazon kaufen" buy button linking to this URL.
   * Leave unset until Norma supplies the final Amazon product links.
   */
  amazonUrl?: string;
  /**
   * available — released and purchasable.
   * review    — submitted to Amazon, pending approval; not yet purchasable.
   * upcoming  — announced but not yet submitted.
   */
  status: 'available' | 'review' | 'upcoming';
};

export const friends: Friend[] = [
  {
    key: 'fanni',
    name: 'Fanni Fuchs',
    animal: 'Fuchs',
    sound: '/f/',
    image: fanni,
    alt: 'Fanni Fuchs: ein fröhlicher Fuchs im lila Trikot mit dem Buchstaben F und einem Fußball',
    description: 'Findet Fußball „fantastisch!" und übt mit dir den Laut /f/.',
    bookTitle: 'Fanni Fuchs und das Fußballfest',
    age: 'ab 3 Jahren',
    cover: fanniCover,
    href: '/books/fanni-fuchs',
    amazonUrl: 'https://www.amazon.de/dp/B0H6G9T14Y',
    status: 'available',
  },
  {
    key: 'rudi',
    name: 'Rudi Raupe',
    animal: 'Raupe',
    sound: '/r/',
    image: rudi,
    alt: 'Rudi Raupe: eine grüne Raupe mit lila Mütze und gepunktetem Halstuch',
    description: 'Die fröhliche Raupe für den Laut /r/.',
    bookTitle: 'Rudi Raupe und die verlorene Rose',
    age: 'ab 3 Jahren',
    cover: rudiCover,
    href: '/books/rudi-raupe',
    amazonUrl: 'https://www.amazon.de/dp/B0H68JCLLZ',
    status: 'available',
  },
  {
    key: 'karlo',
    name: 'Karlo Kater',
    animal: 'Kater',
    sound: '/k/',
    image: karlo,
    alt: 'Karlo Kater: ein grau getigerter Kater mit blauem Halsband und kleinem Sternanhänger',
    description: 'Der neugierige Kater für den Laut /k/.',
    bookTitle: 'Karlo Kater und das kunterbunte Kuchen-Picknick',
    age: 'ab 3 Jahren',
    cover: karloCover,
    href: '/books/karlo-kater',
    amazonUrl: 'https://www.amazon.de/dp/B0H685QBRK',
    status: 'available',
  },
];

/** The not-yet-released friends — used elsewhere if needed. */
export const upcomingFriends = friends.filter((f) => f.status === 'upcoming');
