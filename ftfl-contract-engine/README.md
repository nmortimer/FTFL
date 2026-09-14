FTFL contract engine (prototype)
The second slice of the League Hub app: real contract data for all 10
teams, imported straight from the master spreadsheet, with each team's
page fully themed in that team's actual colors. Still no Fleaflicker sync,
no commissioner login, no database — that's next.
Run it
```
npm install
npm run dev
```
What's real vs. generated
`src/lib/contracts.ts` — the confirmed rules:
NEW contracts (signed going forward): escalation tier is set by salary
at signing — under $10 → +$2/yr, $10–29 → +$3/yr, $30+ → +$5/yr.
EXISTING contracts (imported from the master sheet): salary in each
year is whatever's actually in the sheet, not recomputed — 9 years of
manual edits and renegotiations don't cleanly fit one formula.
Cutting a player early costs 50% of each remaining year's scheduled
salary, rounded up per year, summed into one cap hit.
$200 salary cap.
`src/data/realContracts.ts` — generated, not hand-typed. Every player,
every year, every dollar was copied out of `FTFL_Dynasty_League.xlsx`
by `scripts/import-from-excel.py`. 233 contracts across all 10 teams.
Players whose `position` is `''` only existed in the taxi squad / IR side
tables in the original sheet (which don't record position) — fill those
in via the commissioner screen once it exists.
`src/data/teams.ts` — colors are not guessed. Every team tab in the
master workbook already had its own 2-3 color scheme baked into the
actual cell fills (found by inspecting `openpyxl` fill colors, not
pixels). A few were nudged for contrast on a dark UI — same hue, same
identity, just readable. Logos came out of `xl/media/*.png` in the
workbook itself.
Confirmed rule: taxi squad and IR do not count against the cap
Fixed. `teamCapUsed` now excludes any contract flagged taxi or IR for the
year being viewed — see `countsAgainstCap` in `src/lib/contracts.ts`. The
old `Rules Summary` tab language in the source workbook was outdated and
isn't referenced anywhere in this app.
Re-running the import
If the master spreadsheet changes before this app takes over as source of
truth, re-run:
```
python3 scripts/import-from-excel.py
```
(expects `FTFL_Dynasty_League.xlsx` next to it — adjust the path at the
top of the script). It regenerates `src/data/realContracts.ts` from
scratch; nothing is merged by hand.
Next steps (not built yet)
Commissioner screen: forms to add/edit a contract, flag taxi/IR, log a
trade (reassigns contracts + picks between two teams), and fill in the
missing positions for taxi/IR-only players.
Simple auth so only you can reach the commissioner screen.
A real database (Vercel Postgres or KV) instead of a static generated
file, so edits persist without a redeploy.
Fleaflicker API sync for live scores/standings/rosters.
If a rule needs to change
Escalation and cut-penalty math live in `src/lib/contracts.ts`
(`annualIncrement`, `cutPenalty`). Change the number there, not in the UI.
