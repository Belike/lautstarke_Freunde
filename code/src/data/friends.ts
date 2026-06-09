/**
 * The MAIN characters of "Lautstarke Freunde" — one animal friend per speech
 * sound, each with its own book. We feature these main characters across the
 * site (not the side characters that only appear inside a single story).
 *
 * Figures are transparent cut-outs in code/src/assets/figures/.
 * Display strings stay German on purpose (German audience / product).
 */

import fanni from '../assets/figures/fanni-fuchs.png';
import karlo from '../assets/figures/karlo-kater.png';
import rudi  from '../assets/figures/rudi-raupe.png';

export type Friend = {
  name: string;
  animal: string;
  sound: string;
  image: ImageMetadata;
  alt: string;
  description: string;
  /** Book detail route once the book is out; undefined while upcoming. */
  href?: string;
  status: 'available' | 'upcoming';
};

export const friends: Friend[] = [
  {
    name: 'Fanni Fuchs',
    animal: 'Fuchs',
    sound: '/f/',
    image: fanni,
    alt: 'Fanni Fuchs: ein fröhlicher Fuchs im lila Trikot mit dem Buchstaben F und einem Fußball',
    description: 'Findet Fußball „fantastisch!" und übt mit dir den Laut /f/.',
    href: '/books/fanni-fuchs',
    status: 'available',
  },
  {
    name: 'Karlo Kater',
    animal: 'Kater',
    sound: '/k/',
    image: karlo,
    alt: 'Karlo Kater: ein grau getigerter Kater mit blauem Halsband und kleinem Sternanhänger',
    description: 'Der neugierige Kater für den Laut /k/.',
    status: 'upcoming',
  },
  {
    name: 'Rudi Raupe',
    animal: 'Raupe',
    sound: '/r/',
    image: rudi,
    alt: 'Rudi Raupe: eine grüne Raupe mit lila Mütze und gepunktetem Halstuch',
    description: 'Die fröhliche Raupe für den Laut /r/.',
    status: 'upcoming',
  },
];

/** The not-yet-released friends — used for the outlook copy on the home page. */
export const upcomingFriends = friends.filter((f) => f.status === 'upcoming');
