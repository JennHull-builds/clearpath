# Architecture

v0.1 is one workflow. No accounts. No history. Refresh = gone.

```
What's buzzing? → How many spoons? → one path
                         ↓
              agent notices the shape
         pick (two competing)     break (fuzzy blob)
         sized choice             subtasks + start here
```

Pick and break are routing behind the dump — not landing cards.

## Stack

- Next.js App Router + React 19 + Tailwind v4
- AI SDK (`generateText` + `Output.object`) via Google Gemini (AI Studio)
- Zod contracts for request + response

## Files

| Path | Job |
|------|-----|
| `SOUL.md` | Public voice |
| `lib/soul.ts` | System prompt + user prompt builder |
| `lib/schema.ts` | Zod in/out |
| `lib/model.ts` | Model wiring (Gemini via Google AI Studio) |
| `lib/path.ts` | One agent call (notices shape, returns one path) |
| `app/api/path/route.ts` | POST only |
| `components/clearpath-app.tsx` | Stepped UI: dump → spoons → path |

## Out of scope (v0.1)

Auth, persistence, chat UI, accounts, notifications.
