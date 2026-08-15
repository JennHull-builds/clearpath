# Clearpath

**Park the noise. See one path.**

*Built in public · v0.1*

---

Your head is loud. Your capacity isn't infinite. Clearpath helps you **park the buzzing stuff**, check in with how many spoons you've got, and walk away with **one path** — sized for today, not a lecture.

No hustle. No guilt. No "just push through."

> Refresh the page and it's gone — v0.1 is ephemeral on purpose. No accounts, no history, no baggage.

---

## How it works

1. **Park it** — optional brain dump for the noise
2. **Check capacity** — low, medium, or high (honest spoons, not performance)
3. **Get one path** — pick between two things, or break a big goal into bite-sized steps

---

## Two flows

### Pick one
Two tasks, one slot.  
*Example:* 15 minutes of the necessary thing → then the fun one, guilt-free.

### Break it down
One fuzzy goal + today's capacity → subtasks with estimates and a clear **start here**.

---

## Run locally

```bash
cp .env.example .env.local
# add AI_GATEWAY_API_KEY — https://vercel.com/docs/ai-gateway
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Vercel, AI Gateway uses OIDC — no API key needed in production.

---

## Stack

Next.js 16 · React 19 · Tailwind v4 · AI SDK · Zod · Vercel AI Gateway

---

## Contributing / spec

Building in public. Product scope, voice, and v0.1 boundaries live in [`PRODUCT.md`](./PRODUCT.md).

Ideas and issues welcome — keep it kind.

---

## License

[MIT](./LICENSE)
