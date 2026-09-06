# Game art drop-ins

Replace these files with sliced exports from design. Keep filenames identical —
`src/theme/assets.ts` already `require()`s them.

## Illustrations (`assets/game/illustrations/`)

| File | Role | Suggested size |
|---|---|---|
| `title-hero.png` | Title character (official + desk) | 750×900 @2x |
| `case-bribe.png` | Kauzy card art | 686×400 @2x |
| `event-journalist.png` | Event portrait | 200×200 @2x |
| `kontrola.png` | Checkpoint scene | 686×360 @2x |
| `finale-court.png` | Súdny deň court | 686×400 @2x |
| `career-boss.png` | Kariéra avatar | 160×160 @2x |
| `advisor.png` | Advisor portrait | 96×96 @2x |

## Icons (`assets/game/icons/`)

16 icons from `docs/design/ui-elements.png` kit (128×128 @2x minimum):

`money`, `shield`, `phone`, `envelope`, `fist`, `eye`, `document`, `fire`,
`safe`, `car`, `monitor`, `building`, `briefcase`, `scales`, `trophy`, `star`

## Other

| Path | Role |
|---|---|
| `stamps/odhaleny.png` | Red `ODHALENÝ!` stamp overlay |
| `logo/lockup.png` | Optional title lockup image |

Current files are 1x crops from `docs/design/ui-elements.png` (1536×1024 source) — low-res; replace with hi-res exports when available.
