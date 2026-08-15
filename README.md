# Clearpath

**Park the noise. See one path.**

*Built in public · v0.1*

---

Your head is loud. Your capacity isn't infinite. Clearpath helps you **park the buzzing stuff**, check in with how much juice you've got, and walk away with **one path** — sized for today, not a lecture.

No hustle. No guilt. No "just push through."

> Refresh the page and it's gone — v0.1 is ephemeral on purpose. No accounts, no history, no baggage.

---

## How it works

1. **What's buzzing?** — dump the tasks, the noise, the fuzzy goal. All of it. No sorting.
2. **How much juice?** — low, medium, or high
3. **One path** — sized for today. The rest waits, guilt-free.

You don't pick a mode. Clearpath notices the shape and routes: a sized pick when two things compete, a gentle breakdown when it's one fuzzy blob.

---

## Run locally

```bash
cp .env.example .env.local
# add GOOGLE_GENERATIVE_AI_API_KEY — https://aistudio.google.com/apikey
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Uses Gemini via Google AI Studio. Gemini app / Google AI Pro does not include API access — you still need a Studio key. Flash models are on the free API tier.

---

## Stack

Next.js 16 · React 19 · Tailwind v4 · AI SDK · Zod · Gemini (Google AI Studio)

---

## Contributing / spec

Building in public. Product scope, voice, and v0.1 boundaries live in [`PRODUCT.md`](./PRODUCT.md). Visual contract: [`DESIGN.md`](./DESIGN.md).

Ideas and issues welcome — keep it kind.

---

## License

[MIT](./LICENSE)
