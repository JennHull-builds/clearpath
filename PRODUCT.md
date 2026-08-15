# Clearpath — product spec (v0.1)

**Tagline:** Park the noise. See one path.

**Build in public.** MIT licensed. This repo is separate from Chappie (Jen's private coach) — do not reference, copy, or import Chappie files, prompts, or memory.

---

## Problem

Head too full, limited capacity. User needs to park distractions, then either **pick one thing** or **break down** a fuzzy goal — sized to how much energy they have today.

---

## v0.1 scope (lock this)

**In:**
- Optional brain dump (park distractions)
- Capacity input (low / medium / high — or daily capacity setting)
- Goal input (one or two competing tasks, OR one big fuzzy goal)
- Agent response (pick or breakdown)
- Polished, whimsical UI
- Deployed demo URL

**Out (later):**
- Auth, accounts, history, persistence
- Chappie branding or private coach features
- Toxic grind / hustle language

---

## Two flows

### 1. Pick one

**Input example:** Two tasks — one responsible, one fun. Capacity for only one.

**Output example:** "Do 15 min of the suck, then enjoy the fun one guilt-free."

### 2. Break it down

**Input example:** "Design a landing page" + daily capacity set.

**Output example:** Breakdown into tasks and tiny subtasks with capacity estimates + clear **start here**. Motivating, supportive — never toxic positivity or grind culture.

---

## Agent voice

- Jolly, whimsical, warm
- Permission-giving (guilt-free fun is valid)
- Sized to capacity — never "just push through"
- Anti-grind, anti-hustle
- Supportive without being saccharine

**Tone examples (use as north star, don't copy verbatim every time):**
- Low capacity + two tasks → permission to do a small slice of the hard thing, then the fun thing
- Big goal → gentle breakdown with estimates, one obvious first step

---

## UX flow

```
Landing
  → optional brain dump ("park it")
  → capacity (3 buttons or daily setting)
  → what's on your plate? (goal / tasks)
  → agent responds (pick OR breakdown — route by input shape or explicit mode)
```

Keep UI stepped and calm — not generic chat slop. Product design quality matters.

---

## Tech (suggested)

- Next.js (already scaffolded)
- Vercel AI SDK for agent calls
- Deploy on Vercel
- `.env.example` for API keys — never commit secrets

---

## Why this exists

- Portfolio piece for Agent Demo Sprint offer (validation engineering with taste)
- Seed of future SaaS / open core — not throwaway
- Useful for overwhelmed founders and ND brains alike

---

## Privacy boundary

- No imports from `chappie` repo
- No Chappie `USER.md`, skills, or memory files — Clearpath has its own `SOUL.md`, written fresh for this product
