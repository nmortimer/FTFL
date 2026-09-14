export interface Team {
  slug: string;
  name: string;
  bg: string;      // each team's actual dark/base fill color from the workbook
  accent: string;  // each team's actual pop color from the workbook
  accent2: string; // each team's real secondary color, for a two-tone identity
  logo: string;
}

// These colors are NOT guessed. Every team tab in the master workbook
// already had its own deliberate 2-3 color scheme baked into the cell
// fills — this just surfaces it. Where a color was too dark or muted to
// read as a UI accent, lightness/saturation were nudged (same hue, same
// identity) — see scripts/import-from-excel.py notes in the README.
export const teams: Team[] = [
  { slug: 'boulder-bandits', name: 'Boulder Bandits', bg: '#03182e', accent: '#1dd3e2', accent2: '#c02631', logo: '/logos/boulder-bandits.png' },
  { slug: 'broad-ripple-big-horns', name: 'Broad Ripple Big Horns', bg: '#000000', accent: '#d42f11', accent2: '#cf1748', logo: '/logos/broad-ripple-big-horns.png' },
  { slug: 'denver-diamondbacks', name: 'Denver Diamondbacks', bg: '#1d1d1f', accent: '#b28334', accent2: '#ffffff', logo: '/logos/denver-diamondbacks.png' },
  { slug: 'elkhart-express', name: 'Elkhart Express', bg: '#00274c', accent: '#ecc018', accent2: '#ffffff', logo: '/logos/elkhart-express.png' },
  { slug: 'kansas-city-kaiju', name: 'Kansas City Kaiju', bg: '#000000', accent: '#d4af37', accent2: '#bb322a', logo: '/logos/kansas-city-kaiju.png' },
  { slug: 'olde-town-osos', name: 'Olde Town Osos', bg: '#1b4500', accent: '#db5712', accent2: '#fcf9dc', logo: '/logos/olde-town-osos.png' },
  { slug: 'south-bend-silver-hawks', name: 'South Bend Silver Hawks', bg: '#0b3d28', accent: '#11d482', accent2: '#c3c7c6', logo: '/logos/south-bend-silver-hawks.png' },
  { slug: 'strasbourg-soldiers', name: 'Strasbourg Soldiers', bg: '#10172a', accent: '#119ad4', accent2: '#c42126', logo: '/logos/strasbourg-soldiers.png' },
  { slug: 'summit-county-ski-bums', name: 'Summit County Ski Bums', bg: '#0e5d78', accent: '#59d7e3', accent2: '#ffffff', logo: '/logos/summit-county-ski-bums.png' },
  { slug: 'wakarusa-wizards', name: 'Wakarusa Wizards', bg: '#000000', accent: '#cb901b', accent2: '#ffffff', logo: '/logos/wakarusa-wizards.png' },
];

export function teamBySlug(slug: string): Team {
  const t = teams.find((t) => t.slug === slug);
  if (!t) throw new Error(`Unknown team: ${slug}`);
  return t;
}
