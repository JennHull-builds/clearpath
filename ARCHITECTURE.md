# Architecture

v0.1 is one workflow. No accounts. No history. Refresh = gone.

```
brain dump (optional) → capacity → goal(s) → structured path
                              ↓
              ┌───────────────┴───────────────┐
         Pick one                        Break it down
    two tasks, one slot              one fuzzy goal
    → sized choice                   → subtasks + start here
```

## Stack

- Next.js App Router + React 19 + Tailwind v4
- AI SDK (`generateText` + `Output.object`) via Vercel AI Gateway
- Zod contracts for request + response

## Files

| Path | Job |
|------|-----|
| `SOUL.md` | Public voice |
| `lib/soul.ts` | System prompt (loaded from SOUL + rules) |
| `lib/schema.ts` | Zod in/out |
| `lib/path.ts` | One agent call |
| `app/api/path/route.ts` | POST only |
| `components/clearpath-app.tsx` | Stepped UI |

## Out of scope (v0.1)

Auth, persistence, chat UI, accounts, notifications.
