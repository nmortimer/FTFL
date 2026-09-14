// Core FTFL contract math. Every function here is pure — no I/O, no state.
// This is the "basic settings" logic: escalation and years-remaining are
// computed, never hand-typed. Commissioner only ever edits the raw fields
// below (baseSalary, startYear, lengthYears) when a deal actually changes.

export interface Contract {
  id: string;
  playerName: string;
  position: string;
  team: string;
  baseSalary: number; // salary in the FIRST year of this contract
  startYear: number;
  lengthYears: number;
  taxi?: boolean;
  ir?: boolean;
}

export const SALARY_CAP = 200;

/** Confirmed rule: escalation tier is fixed by the salary at signing. */
export function annualIncrement(baseSalary: number): number {
  if (baseSalary < 10) return 2;
  if (baseSalary < 30) return 3;
  return 5;
}

/** Contract's final year, inclusive. */
export function endYear(contract: Contract): number {
  return contract.startYear + contract.lengthYears - 1;
}

/**
 * Salary in a given year. Returns null if the contract isn't active that
 * year (expired, or hasn't started yet) rather than 0, so callers can
 * distinguish "no cost" from "not on this deal."
 */
export function salaryInYear(contract: Contract, year: number): number | null {
  const yearsIn = year - contract.startYear;
  if (yearsIn < 0 || yearsIn >= contract.lengthYears) return null;
  return contract.baseSalary + annualIncrement(contract.baseSalary) * yearsIn;
}

export function yearsRemaining(contract: Contract, asOfYear: number): number {
  return Math.max(0, endYear(contract) - asOfYear);
}

/**
 * Confirmed rule: cutting a player early costs 50% of each remaining
 * contract year's scheduled salary, each rounded up, summed into one
 * cap hit applied the year of the cut.
 */
export function cutPenalty(contract: Contract, cutYear: number): number {
  let total = 0;
  for (let y = cutYear + 1; y <= endYear(contract); y++) {
    const sal = salaryInYear(contract, y);
    if (sal != null) total += Math.ceil(sal * 0.5);
  }
  return total;
}

export function teamCapUsed(contracts: Contract[], year: number): number {
  return contracts.reduce((sum, c) => sum + (salaryInYear(c, year) ?? 0), 0);
}

export function teamCapSpace(contracts: Contract[], year: number, capLimit = SALARY_CAP): number {
  return capLimit - teamCapUsed(contracts, year);
}

export function contractsForTeam(contracts: Contract[], teamSlug: string): Contract[] {
  return contracts.filter((c) => c.team === teamSlug);
}
