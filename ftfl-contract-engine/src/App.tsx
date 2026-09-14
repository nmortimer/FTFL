import { useMemo, useState } from 'react';
import { sampleContracts } from './data/sampleContracts';
import { teams, teamBySlug } from './data/teams';
import {
  Contract,
  SALARY_CAP,
  contractsForTeam,
  cutPenalty,
  endYear,
  salaryInYear,
  teamCapSpace,
  teamCapUsed,
  yearsRemaining,
} from './lib/contracts';

const YEARS = [2025, 2026, 2027, 2028, 2029];

function money(n: number | null): string {
  if (n == null) return '—';
  return `$${n}`;
}

export default function App() {
  const [year, setYear] = useState(2026);
  const [teamSlug, setTeamSlug] = useState(teams[0].slug);
  const team = teamBySlug(teamSlug);

  const teamContracts = useMemo(() => contractsForTeam(sampleContracts, teamSlug), [teamSlug]);

  const rows = useMemo(
    () =>
      teamContracts.map((c: Contract) => ({
        contract: c,
        salary: salaryInYear(c, year),
        yearsLeft: yearsRemaining(c, year),
        penalty: cutPenalty(c, year),
      })),
    [teamContracts, year]
  );

  const capUsed = teamCapUsed(teamContracts, year);
  const capSpace = teamCapSpace(teamContracts, year);

  return (
    <div className="page" style={{ ['--accent' as any]: team.color }}>
      <nav className="team-rail">
        {teams.map((t) => (
          <button
            key={t.slug}
            className={`team-chip ${t.slug === teamSlug ? 'active' : ''}`}
            style={{ ['--chip' as any]: t.color }}
            onClick={() => setTeamSlug(t.slug)}
            title={t.name}
          >
            <img src={t.logo} alt="" />
          </button>
        ))}
      </nav>

      <header className="page-header">
        <div className="team-identity">
          <img className="team-logo" src={team.logo} alt={`${team.name} logo`} />
          <div>
            <h1>{team.name}</h1>
            <p className="sub">Escalation and cap space computed automatically. Nothing below is typed in by hand.</p>
          </div>
        </div>
        <div className="year-picker">
          <label htmlFor="year">Viewing</label>
          <select id="year" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="cap-summary">
        <div className="cap-block">
          <span className="cap-label">Cap used</span>
          <span className="cap-value">{money(capUsed)}</span>
        </div>
        <div className="cap-bar">
          <div
            className={`cap-fill ${capSpace < 0 ? 'over' : ''}`}
            style={{ width: `${Math.min(100, (capUsed / SALARY_CAP) * 100)}%` }}
          />
        </div>
        <div className="cap-block">
          <span className="cap-label">Cap space</span>
          <span className={`cap-value ${capSpace < 0 ? 'over' : ''}`}>{money(capSpace)}</span>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="muted">No sample contracts for this team yet — add some in src/data/sampleContracts.ts.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Pos</th>
              <th>Signed</th>
              <th>Length</th>
              <th>Salary in {year}</th>
              <th>Years left</th>
              <th>Cut penalty if cut now</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ contract, salary, yearsLeft, penalty }) => (
              <tr key={contract.id}>
                <td>{contract.playerName}</td>
                <td>{contract.position}</td>
                <td>
                  {contract.baseSalary} in {contract.startYear}
                </td>
                <td>
                  {contract.lengthYears}yr (thru {endYear(contract)})
                </td>
                <td className="num">{money(salary)}</td>
                <td className="num">{salary == null ? '—' : yearsLeft}</td>
                <td className="num">{salary == null ? '—' : money(penalty)}</td>
                <td>
                  {contract.taxi && <span className="badge taxi">Taxi</span>}
                  {contract.ir && <span className="badge ir">IR</span>}
                  {!contract.taxi && !contract.ir && <span className="muted">Active</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="footnote">
        Escalation: base &lt; $10 → +$2/yr · $10–29 → +$3/yr · $30+ → +$5/yr. Cut penalty: 50% of each
        remaining year's salary, rounded up. Sample data only — see README before wiring in real contracts.
      </p>
    </div>
  );
}
