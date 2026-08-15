# Clearpath — product spec (v0.1)

**Tagline:** Park the noise. See one path.

**Build in public.** MIT licensed. Separate from Jen's private coach repo — do not import or copy private files from there.

---

## The point (do not lose this)

Someone shows up **overwhelmed**. Head full. Not enough capacity for all of it.

They do **not** choose a product mode. They dump what's buzzing, say how much juice they have, and Clearpath gives them **one path for today**.

Pick-one and break-it-down are **how the agent thinks**, not what the user clicks first.

---

## User story

> I'm fried. There's a responsible thing, a fun thing, and a pile of noise. I don't know where to start. I just want one kind next step — sized to today — and permission to leave the rest.

That's the product.

---

## One front door

```
Landing (felt, not features)
  → "What's buzzing?"  (brain dump — tasks, noise, the fuzzy goal, all of it)
  → "How much juice?"  (low / medium / high)
  → one path
```

**No** first screen that says "Pick one" vs "Break it down." That's developer language. A stuck person cannot classify their own stuckness.

---

## What the agent does (internals)

From the dump + capacity, the agent **notices** the shape and responds:

| What's in the dump | Path shape |
|--------------------|------------|
| Two competing things (duty vs fun, A vs B) | Sized pick — e.g. 15 min of the necessary thing, then the fun one guilt-free |
| One big fuzzy blob | Gentle breakdown — a few subtasks, estimates, **start here** |
| A messy pile of both | Park the noise as weather, then one path anyway — pick *or* start-here, not a menu |

Always: one path. Never "here are your two options, pick a feature."

---

## Output (what they see)

- One next action, sized to capacity
- Why this, in one warm line (permission, not lecture)
- If relevant: the rest waits — guilt-free
- If breakdown: 3–5 small steps, one marked **start here**

Voice: jolly, whimsical, permission-giving. Anti-grind. Never "just push through."

---

## v0.1 in / out

**In:** dump → capacity → one path. Pretty UI. Deployed demo. No accounts. Refresh = gone.

**Out:** mode picker as the first step, auth, history, Chappie branding, hustle copy.

---

## Why this exists

- A real tool for overwhelmed / ND brains
- Portfolio for "validation engineering with taste"
- Seed of a future product — not throwaway

---

## For the next agent (Clearpath repo)

One front door: dump → juice → one path. Pick/break are agent routing, not landing cards. Don't add a mode picker. Don't add features unless asked.
