# Clearpath — visual contract

The look is Jen’s boards — especially `_ (21).jpeg`: stacked muted colour bands, **white type on colour**, a **dotted** field, flush bands, soft depth. Casual, organised, colour but not loud. THE TASK is the biggest thing on the path sheet.

Voice in `SOUL.md` can stay warm. The UI is tactile bands — not a woods, clearing, or Kinfolk world.

## Type

[DM Sans](https://fonts.google.com/specimen/DM+Sans) 400 / 500 / 600 / 700. Geometric, medium-weight, used large. Not Outfit, not a serif, not ultra-black tracking.

On colour (dump + juice bands): **white**. On the cream path sheet: soft ink `#3D433C`, not `#111`.

## Palette

Locked in `app/globals.css`:

| Token | Hex | Use |
| --- | --- | --- |
| sage | `#B7C4A8` | Page + dump ground |
| on-color | `#FFFFFF` | Type on sage and juice bands |
| juice-low | `#C9A49C` | Dusty rose band |
| juice-medium | `#D4B484` | Peach / mustard band |
| juice-high | `#9FBFAD` | Mint band |
| sheet | `#F3EFE6` | Path cream sheet |
| ink | `#3D433C` | Type on the sheet only |

## Surfaces

- Page is sage, never a white desk. Fine **dot grid** (white dots, ~18px) on sage and on the bands.
- Dump is the sage field. Continue is a white fill when enabled.
- Juice bands are flush (no gutters), one stacked object, dotted + inner light.
- Responsive web: fluid page padding, content ~40rem, bands ~48rem, page may scroll.

## Juice on the path

The three bands stay a **control**. Tap another level to fetch a new path for the same dump. If they cannot be used, they should not be on the path screen.

## Energy unit

Placeholder word: **juice**. Rename `ENERGY_UNIT` in `lib/energy.ts` — and this line — when Jen picks the real word.

User-facing: `How much juice?` · bands `Low` / `Medium` / `High` · hints `Not much` / `A decent amount` / `Plenty`.

API enum stays `low | medium | high` in `lib/schema.ts`.

Banned as the unit, even later: spoons, charge, tank, range.

## Motion

CSS + View Transitions only. No animation library.

- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Juice commit: selected band grows, siblings compress while fetching.
- Path: cream sheet unfolds under the stack. Bands remain tappable.
- `prefers-reduced-motion: reduce` → opacity only, 200ms, no 3D, no compress.

## Flow

v0.1 is still dump → juice → one path. Pick and break are two layouts of the same sheet. No mode picker, no shadcn.

## Not this

Woods/Kinfolk · glassmorphism · dashboards · cream-card wellness · Outfit / Fraunces · black type on pastels · white page · SVG grain instead of dots · fake juice chrome you cannot use · phone-as-object app shell.
