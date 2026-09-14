import type { Contract } from '../lib/contracts';

// EXAMPLE DATA ONLY. Your real 9 years of history won't cleanly fit this
// formula retroactively (rules changed over time, some deals were
// renegotiated by hand) — this is here to prove the engine and the team
// theming work, not to stand in for a real import. Real contracts get
// entered once, going forward, through the commissioner screen.
export const sampleContracts: Contract[] = [
  { id: '1', playerName: 'Sample Player A', position: 'WR', team: 'boulder-bandits', baseSalary: 8, startYear: 2025, lengthYears: 3 },
  { id: '2', playerName: 'Sample Player B', position: 'RB', team: 'boulder-bandits', baseSalary: 18, startYear: 2024, lengthYears: 3 },
  { id: '3', playerName: 'Sample Player C', position: 'QB', team: 'boulder-bandits', baseSalary: 35, startYear: 2026, lengthYears: 3 },
  { id: '4', playerName: 'Sample Player D', position: 'TE', team: 'boulder-bandits', baseSalary: 4, startYear: 2026, lengthYears: 3, taxi: true },
  { id: '5', playerName: 'Sample Player E', position: 'WR', team: 'boulder-bandits', baseSalary: 22, startYear: 2025, lengthYears: 3, ir: true },

  { id: '6', playerName: 'Sample Player F', position: 'QB', team: 'summit-county-ski-bums', baseSalary: 40, startYear: 2025, lengthYears: 3 },
  { id: '7', playerName: 'Sample Player G', position: 'RB', team: 'summit-county-ski-bums', baseSalary: 12, startYear: 2026, lengthYears: 3 },
  { id: '8', playerName: 'Sample Player H', position: 'WR', team: 'summit-county-ski-bums', baseSalary: 6, startYear: 2024, lengthYears: 3, taxi: true },

  { id: '9', playerName: 'Sample Player I', position: 'RB', team: 'elkhart-express', baseSalary: 28, startYear: 2025, lengthYears: 3 },
  { id: '10', playerName: 'Sample Player J', position: 'TE', team: 'elkhart-express', baseSalary: 9, startYear: 2026, lengthYears: 3 },
];
