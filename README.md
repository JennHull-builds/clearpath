# Clearpath

**Park the noise. See one path.**

Head too full, limited capacity. Park the buzzing stuff, say how many spoons you've got, then either **pick one** of two tasks or **break down** a fuzzy goal. You get one path — sized to today — not a lecture.

v0.1: no accounts, no history. Refresh and it's gone.

## Two flows

1. **Pick one** — two tasks, one slot. Example: 15 minutes of the necessary thing, then the fun one guilt-free.
2. **Break it down** — a big fuzzy goal + today's capacity → a few subtasks with estimates and a clear *start here*.

## Run locally

```bash
cp .env.example .env.local
# add AI_GATEWAY_API_KEY from https://vercel.com/docs/ai-gateway
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Vercel, AI Gateway auth is OIDC — you don't need the key in production.

## Stack

Next.js 16 · React 19 · Tailwind v4 · AI SDK · Zod · Vercel AI Gateway (`openai/gpt-5.4`)

## License

MIT
