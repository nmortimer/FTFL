# FTFL contract engine (prototype)

This is the first slice of the League Hub app: just the contract math, proven
against a real UI. No Fleaflicker sync, no commissioner login, no database
yet — that's the next step once this logic is confirmed correct.

## Run it

```
npm install
npm run dev
```

## What's real vs. sample

- `src/lib/contracts.ts` — the actual rules, confirmed with Nick:
  - Escalation tier is set by the salary at signing: under $10 → +$2/yr,
    $10–29 → +$3/yr, $30+ → +$5/yr.
  - Cutting a player early costs 50% of each remaining year's scheduled
    salary, rounded up per year, summed into one cap hit.
  - $200 salary cap.
- `src/data/sampleContracts.ts` — invented example players, NOT your real
  9-year history. Your actual historical data doesn't cleanly fit this
  formula retroactively (rules changed over the years, some deals were
  renegotiated by hand outside the formula), so importing it needs a
  one-time cleanup pass, not a blind copy-paste. Real contracts should be
  entered going forward through the commissioner screen once that exists.

## Team identity

Logos and colors are real — pulled straight out of the workbook's embedded
images (`xl/media/*.png`), which turned out to hold every team's actual
mascot logo. Colors were extracted from each logo's dominant hue, then
lightness/saturation clamped so they stay readable on a dark background.
See `src/data/teams.ts` to adjust any team's color, or drop in a sharper
logo file under `public/logos/`.

## Next steps (not built yet)

1. Commissioner screen: forms to add/edit a contract, flag taxi/IR, log a
   trade (reassigns contracts + picks between two teams).
2. Simple auth so only you can reach the commissioner screen.
3. A real database (Vercel Postgres or KV) instead of the in-memory sample
   array, so edits persist.
4. Fleaflicker API sync for live scores/standings/rosters — separate from
   contracts entirely, no manual entry needed.
5. Public pages: power rankings, per-team cap sheets, league-wide contract
   board.

## If a rule needs to change

Everything is in one function per rule in `src/lib/contracts.ts`
(`annualIncrement`, `cutPenalty`). Change the number there, not in the UI.
