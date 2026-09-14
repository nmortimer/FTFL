export interface Team {
  slug: string;
  name: string;
  color: string; // extracted from the team's actual logo
  logo: string;
}

// Hues were extracted from each team's real logo, then lightness/saturation
// clamped to a range that stays readable as a UI accent on a dark
// background — same identity as the mascot, just usable on-screen. Nudge
// any of these if a manager wants a truer match.
export const teams: Team[] = [
  { slug: 'boulder-bandits', name: 'Boulder Bandits', color: '#3636a1', logo: '/logos/boulder-bandits.png' },
  { slug: 'broad-ripple-big-horns', name: 'Broad Ripple Big Horns', color: '#c12715', logo: '/logos/broad-ripple-big-horns.png' },
  { slug: 'denver-diamondbacks', name: 'Denver Diamondbacks', color: '#a16b36', logo: '/logos/denver-diamondbacks.png' },
  { slug: 'elkhart-express', name: 'Elkhart Express', color: '#154fc1', logo: '/logos/elkhart-express.png' },
  { slug: 'kansas-city-kaiju', name: 'Kansas City Kaiju', color: '#b48c3c', logo: '/logos/kansas-city-kaiju.png' },
  { slug: 'olde-town-osos', name: 'Olde Town Osos', color: '#4fc115', logo: '/logos/olde-town-osos.png' },
  { slug: 'south-bend-silver-hawks', name: 'South Bend Silver Hawks', color: '#15c190', logo: '/logos/south-bend-silver-hawks.png' },
  { slug: 'strasbourg-soldiers', name: 'Strasbourg Soldiers', color: '#156bc1', logo: '/logos/strasbourg-soldiers.png' },
  { slug: 'summit-county-ski-bums', name: 'Summit County Ski Bums', color: '#4dc7db', logo: '/logos/summit-county-ski-bums.png' },
  { slug: 'wakarusa-wizards', name: 'Wakarusa Wizards', color: '#bb861b', logo: '/logos/wakarusa-wizards.png' },
];

export function teamBySlug(slug: string): Team {
  const t = teams.find((t) => t.slug === slug);
  if (!t) throw new Error(`Unknown team: ${slug}`);
  return t;
}
