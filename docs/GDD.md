# Očistec the Game — Mobile Game Design Document

| Field | Value |
|---|---|
| **Project codename** | Tibby |
| **Store / title treatment** | **OČISTEC THE GAME** |
| **Genre** | Satirical strategy / swipe card game |
| **Platforms** | iOS 16+, Android 10+, portrait phone |
| **Session length** | 8–15 minutes (one career) |
| **Player language (v1)** | Slovak |
| **Document version** | 1.2 |
| **Status** | Pre-production |
| **Date** | 2026-09-06 |
| **Visual prototype** | Layout: [`docs/design/dizajns.png`](design/dizajns.png). Chrome kit: [`docs/design/ui-elements.png`](design/ui-elements.png). |

This document is the source of truth for **rules**. Chrome and color tokens follow [`ui-elements.png`](design/ui-elements.png). Frame composition (which screens, HUD, lists, gauge, stamp) follows [`dizajns.png`](design/dizajns.png), but **not** that composite’s dark paint — restyle those frames with the light kit. If they disagree on numbers or fail states, follow this GDD.

Player-facing copy stays Slovak. Internal names, code, and this GDD are English.

**v1.1** folds the visual prototype into the spec: title treatment, tabbed hub, dual swipe+buttons, Quick Cover sheet, shop categories, risk overview, career/XP frame, advisor.

**v1.2** light/white art pass: off-white canvas, white cards, green primary CTA, blue headers; GDD §15 charcoal/gold look retired.

---

## 1. High concept

You play a senior police official in a satirical Slovakia. Cases land on your desk. Swipe or tap to take the bribe or refuse it. Money buys silence, allies, and fake alibis. Risk of exposure climbs until a checkpoint or a courtroom finale. Cover is bought from the Investície tab or dumped in a Quick Cover sheet.

Without active risk management the game is random swiping. The core skill is balancing **cash**, **exposure**, and **long-term cover**.

**Title lockup:** `OČISTEC THE GAME`

**Tagline:** `STAŇ SA LEGENDOU. ALEBO SA NECHAJ ODHALIŤ.`

**One-line pitch:** Reigns-style swipe cards, set in a Slovak corruption satire, where you spend dirty money to stay unexposed.

**Fantasy:** Feel the short-term power of the system, then see how it collapses or how it protects itself.

**Promise:** Every case is grounded in a public-record scandal. After the swipe, a short “V skutočnosti…” fact tells the player what happened in the real world.

---

## 2. Design pillars

1. **Swipe is the verb, strategy is the game.** Accept / refuse is instant. Surviving is a resource puzzle.
2. **Risk is a visible meter, not a hidden RNG.** The player always knows how close they are to exposure.
3. **Satire with receipts.** Absurd events, real sources. Never invent a crime and present it as fact.
4. **Portrait hub, one thumb.** Cases live on the Kauzy tab. Shop, assets, and stats are sibling tabs. Events can interrupt or wait as a badge. Crisis cover is a sheet, not a hidden menu.
5. **Short career, high stakes.** One run is ~30 cases. Death (exposure) is a feature, not a punishment to grind away.

---

## 3. Target player

| Segment | Why they play |
|---|---|
| Slovak 18–40, news-literate | Recognize names, enjoy dark political comedy |
| Players of Reigns / Lapse / Super Seducer-style card loops | Want a 10-minute run with a clear fail state |
| Civic / educational share | Send a friend a case that actually happened |

**Not for:** children, players looking for a cop-simulator power fantasy without irony, or anyone expecting a documentary UI.

**Content rating target:** PEGI 16 / IARC 16. Themes: corruption, intimidation, prison. No graphic violence. No sexual content.

---

## 4. Player fantasy and tone

The player is **not** a hero cop. They are a satirical stand-in for a powerful interior-ministry / police figure in the Očistec-era ecosystem.

Tone rules:

- Dark comedy, not celebration.
- Real names and cases appear only with a source URL and a disclaimer.
- Event humor can be absurd (“Novinárski červi”). Case cards stay closer to the record.
- Educational beat is mandatory after every case: one short paragraph, one source link.
- The game never instructs how to commit a crime in the real world. Options are labelled as satire of documented patterns.

**On-boot disclaimer (required):**

> Satirická hra inšpirovaná verejne známymi kauzami. Nie je reportáž. Postavy sú herné archetypy. Zdroje nájdeš po každej kauze.

---

## 5. Platform and technical frame

| Item | Decision |
|---|---|
| Orientation | Portrait only |
| Input | Swipe on the case card **and** explicit PRIJMI / ODMIETNI buttons (prototype). No tilt, no multi-touch puzzles |
| Offline | Full game offline after first install |
| Accounts | None in MVP. Title shows Rebríčky / Achievementy as local (or “soon”) slots |
| Engine recommendation | React Native (Expo) or Flutter. Unity is overkill for cards + JSON |
| Content | Local JSON, hot-reloadable in debug |
| Save | One slot, local, autosave after every decision |
| Accessibility | Dynamic type up to 200%, VoiceOver/TalkBack labels on swipe actions, color-blind risk meter (fill + numeric %) |

**Device floor:** iPhone SE 2 / small Android 360×640. Safe-area aware. One-handed reach: primary actions in the lower 60% of the screen.

---

## 6. Core loop

The prototype is a **tabbed hub**, not a single linear stack. Cases still advance on a clock. The player can leave a case to buy cover, then come back.

```
Title (OČISTEC THE GAME)
  → Hub (bottom nav)
        Kauzy     → current case card (swipe or PRIJMI / ODMIETNI)
        Eventy    → pending event (badge) or last event recap
        Investície→ shop, always available, unique items
        Majetok   → owned cover / flavor assets
        Štatistiky→ career sheet (this run + persistent XP)
  → On case resolve: result → educational beat
  → If event scheduled: badge Eventy; cannot start the next case until resolved
        Player MAY open Investície or Quick Cover first
  → If checkpoint: modal “KONTROLA!”
        risk > 100 → Game Over stamp ODHALENÝ
        else → survive copy, return to hub
  → If finaleIndex: modal “Súdny deň”
        risk < 50 → Win
        risk >= 50 → Game Over (15 years, assets seized)
```

**Quick Cover** is a sheet opened from the risk HUD (crisis button), not a random event. See §9.1.

**Pending event rule:** next case is locked while `pendingEventId` is set. Other tabs stay open so the player can spend before answering the journalist.

**Pacing constants (tunable, not hardcoded magic):**

| Constant | Default | Notes |
|---|---|---|
| `eventEvery` | 3 | Event after every 3rd resolved case |
| `checkpointEvery` | 10 | Checkpoints at 10 and 20 |
| `finaleIndex` | 30 | Courtroom after case 30 |
| `shopPurchasesPerVisit` | unlimited unique ids | Shop is a tab; each investment once per run |
| Starting money | `0` | Forces early bribes or a poor-but-clean run |
| Starting risk | `0` | |

---

## 7. Player resources

### 7.1 Money (`money`, integer euros)

Earned by accepting cases. Spent on event options, tactical cover, and investments. Cannot go below 0. If an option costs more than current money, it is visible but disabled, with the missing amount shown.

Display: prototype uses `€125,450`. Ship that lockup on HUD (euro prefix, comma thousands) to match the PNG. Settings may later offer Slovak grouping `125 450 €`.

Animate count-up on change.

### 7.2 Risk (`risk`, integer percent)

Exposure to being caught. Floor `0`. No hard cap (a player can sit at 140% and die at the next checkpoint). Display as a meter + number **and** a status label.

| Risk | Label (SK) | Meter |
|---|---|---|
| 0–29 | Pokoj | green |
| 30–49 | Pod dohľadom | gold |
| 50–79 | **Na hrane** | orange (prototype callout at 58%) |
| 80–100 | Kritické | red |
| >100 | Odhalenie | red, checkpoint will kill |

The Risk overview uses a **semi-circular gauge**, not only the HUD chip. Prototype copy at 58%: `RIZIKO 58%` / `NA HRANE`.

**Stacking rule: additive, not multiplicative.**

Example from design: 80% risk, buy Political cover (−30) → 50%.

Permanent investment bonuses also subtract from risk **when the relevant trigger fires**, not as a one-time purchase effect (see §9). Exception: some investments apply a flat modifier to *every* future risk gain (see `riskGainMultiplier` / `flatRiskOffset`).

### 7.3 Career progress (`caseIndex`, 1-based)

Shown as `Kauza 7 / 30`. Not a health bar. It is a clock.

---

## 8. Case cards (primary verb)

Each case is the Kauzy tab. Match [`dizajns.png`](design/dizajns.png) frame 2.

**Layout (top → bottom):**

1. HUD: money left (`€125,450`), risk chip right (`RIZIKO 58%`)
2. Case kicker: `KAUZA #23: PODNIKATEĽ BÖDÖR` (number is `caseIndex`, name is the case title)
3. Illustration (bribe envelope, handshake, etc.)
4. Transparent stakes **before** the decision:
   - `ÚPLATOK: 80,000 €`
   - `RIZIKO ODHALENIA: +25%`
5. Hint: `SWIPE PRE ROZHODNUTIE`
6. Two full-width buttons (not swipe-only):
   - **PRIJMI** (green) — “Vezmi peniaze a nerieš to.”
   - **ODMIETNI** (red) — “Rieš to legálne. Menej peňazí, nižšie riziko.”

Swipe left = ODMIETNI, swipe right = PRIJMI. Buttons are first-class, not an accessibility fallback.

**Accept** applies `moneyDelta` (positive) and `riskDelta` (positive).
**Refuse** applies `refuseMoneyDelta` (usually 0) and `refuseRiskDelta` (usually 0, sometimes a small political cost). The refuse button copy still sells “lower risk”; if refuse risk is 0, that copy remains true.

After the swipe:

1. Result toast: `+50 000 €` / `+20 % riziko`
2. Educational sheet: title “V skutočnosti…”, 2–4 sentences, source URL (opens in-app browser)
3. Continue

**Difficulty curve:** later cases pay more and add more risk. Banding:

| Cases | Typical bribe | Typical accept risk |
|---|---|---|
| 1–10 | 20k–50k € | +10 to +20 |
| 11–20 | 50k–120k € | +15 to +30 |
| 21–30 | 100k–250k € | +25 to +40 |

Exact values live in content JSON, not in code.

### 8.1 Sample cases (content seed)

These are seeds for the content bible, not the full set. Every shipped case needs a source and legal review.

| ID | Prompt (SK) | Accept | Source theme |
|---|---|---|---|
| `case_bodor` | Podnikateľ Bödör ponúka 50 000 € za nevyšetrovanie. | +50 000 €, +20 risk | Očistec / Denník N |
| `case_lustracia` | Lustrovanie opozície. Máme sledovať politického oponenta? | +30 000 €, +15 risk | Political policing |
| `case_momky` | Kauza MOM-iek. 21 milióna je len vrchol ľadovca. Zobrať podiel? | High money, high risk | MOM-ky |
| `case_ocistec_file` | Spis Očistec leží na stole. Zmizne za 80 000 €. | +80 000 €, +25 risk | Court proceedings |

Refuse on all of the above: `0 €`, `0` risk, unless a later case adds “political punishment for honesty.”

---

## 9. Risk-reduction actions

The prototype splits risk work into three verbs, shown on the overview gauge screen:

| Verb | Where | When |
|---|---|---|
| **Rozhodnutia** | Kauzy tab | Every case |
| **Eventy** | Eventy tab / interrupt | Every 3rd case |
| **Investície** | Investície tab | Anytime the player can pay |

### 9.1 Quick Cover (crisis sheet)

Tactical one-shots are a **bottom sheet**, not a random event. Opened from the risk HUD (tap the risk chip or a “Krytie” affordance). Prototype title: crisis / quick cover.

Player picks **one** row per open. Sheet closes. Can reopen later. Unaffordable rows stay visible and disabled.

| ID | Name (SK) | Cost | Risk | Satirical analogue |
|---|---|---|---|---|
| `cover_political` | Politické krytie | 50 000 € | −30 | Call the interior minister, kill the audit |
| `intimidate_press` | Zastrašenie novinárov | 30 000 € | −20 | Call a media boss, pull the story |
| `bribe_prosecutor` | Úplatok prokurátorovi | 100 000 € | −50 | “Gift” for a special prosecutor |
| `fake_alibi` | Falošné alibi | 20 000 € | −15 | Fake a meeting recording |
| `destroy_evidence` | Zničenie dôkazov | 40 000 € | −25 | Burn the MOM-ky file |

**Rules:**

- Effect applies immediately, then the sheet closes.
- Cannot select a disabled (unaffordable) option.
- `intimidate_press` may carry `delayedRiskDelta: +10` applied after the next case (short-term silence, long-term blowback).
- **Balance watch:** an always-on sheet can make checkpoints trivial. If playtests show “dump risk at 99” as the only strategy, cap Quick Cover to **one use per act** (cases 1–10 / 11–20 / 21–30). Default until then: unlimited, money is the cap.

### 9.2 Threat events (random)

Events of type `threat` raise risk first, then offer responses.

| ID | Name (SK) | Incoming risk | Copy seed |
|---|---|---|---|
| `evt_audit` | Kontrola z ministerstva | +30 | Ministerstvo posiela audit. Čo urobíš? |
| `evt_journalist` | Novinár na stope | +20 | Novinár Denníka N / Aktuality.sk píše článok o tebe. |
| `evt_protests` | Protesty verejnosti | +15 | Ľudia protestujú pred policajným zborom. |
| `evt_trial` | Súdne pojednávanie | +40 | Kauza Očistec ide pred súd. |
| `evt_gov_support` | Politická podpora | −20 | Vláda ťa verejne podporuje. (no spend required) |

Incoming risk is applied **before** the player chooses, except `evt_gov_support`, which is a pure gift.

**Worked event — Novinár na stope** (prototype frame 3)

1. Title: `NOVINÁR NA STOPE`
2. Illustration: journalist + microphone
3. Apply +20 incoming risk (modified by investments), HUD updates
4. Body: journalist from Aktuality.sk / Denník N is writing about your bribes. Čo urobíš?
5. Three stacked choices (cost and risk on the row)
6. Footer: **projected risk** after the highlighted / last-selected option (prototype shows `63%`)
7. Options:

| Option | Cost | Immediate | Delayed |
|---|---|---|---|
| Zaplatiť mu | 30 000 € | −20 risk | — |
| Zastrašiť | 10 000 € | −10 risk | +10 risk after next case |
| Ignorovať | 0 € | 0 | — |

Apply permanent investment modifiers to the incoming risk **before** showing the new total (so “Vlastné médium” makes a journalist event cheaper in risk terms).

### 9.3 Satire events (tone pack)

Same system, louder copy. Mix 1 satire event per 2 grounded events so the game does not become a meme dump.

| ID | Name (SK) | Joke |
|---|---|---|
| `evt_minister_call` | Minister vnútra volá | “Pýta sa, či potrebuješ pomoc. Za 100 000 € ťa podrží.” |
| `evt_press_worms` | Novinárski červi | Aktuality.sk, Denník N, SME — všetci píšu. Zaplať im. |
| `evt_water_cannon` | Protesty pred policajtom | “Gašpar do basy!” — poslať vodné delo? |
| `evt_court_day` | Súdny deň | Kauza Očistec ide pred súd. Zaplať prokurátorovi? |

---

## 10. Investments (meta progression inside a run)

Investments are **run-only**. They reset on Game Over / New Career. Persistent XP / achievements (prototype career screen) do **not** carry investment perks into the next run.

Shop is the **Investície** tab, always available. Each id can be bought **once** per run. No checkpoint gate.

Category chips, matching the PNG:

| Tab (SK) | Contains |
|---|---|
| Všetko | All five |
| Ochrana | Sudca, Médium, Ochranná služba |
| Zisk | Pranie špinavých peňazí |
| Vplyv | Politický spojenec, Vlastné médium |

| ID | Name (SK) | Cost | Permanent effect |
|---|---|---|---|
| `inv_media` | Vlastné médium | 200 000 € | −10 risk from every event’s incoming risk |
| `inv_judge` | Korumpovaný sudca | 150 000 € | −15 risk on events tagged `court` |
| `inv_ally` | Politický spojenec | 300 000 € | −20 risk on events tagged `audit` |
| `inv_laundry` | Firma na pranie špinavých peňazí | 100 000 € | +20% money from accepted bribes |
| `inv_security` | Ochranná služba | 50 000 € | −5 risk on every accept/refuse and every event incoming |

**Stacking:** additive. Media + Ally vs an audit event: incoming 30 − 10 − 20 = 0 (floor).

**Laundry formula:** `moneyGained = floor(baseBribe * (1 + 0.20 * laundryCount))`. `laundryCount` is 0 or 1 in MVP (unique IDs, cannot repurchase).

**Security** applies to case accept/refuse risk deltas and event incoming risk, not to player-chosen reductions (you cannot double-dip a −30 cover into −35).

Owned investments appear on **Majetok**, as owned rows in **Investície**, and as the active-bonus list on the risk overview. Not as HUD icons (the prototype HUD is money + risk only).

---

## 11. Checkpoints and finale

### 11.1 Checkpoint (“Kontrola!”)

At `caseIndex` 10 and 20, a **modal** (not a tab). Prototype: officials investigating, risk large (`72%` in the mock).

1. Title: `KONTROLA!`
2. If `risk > 100` → Game Over: exposed. Copy seed: “Odhalený. Kauza sa už nedá ututlať.”
3. Else → survive copy: “Prežil si, ale tesne!” (prototype)
4. Return to hub. Shop is already a tab; do not force a purchase.

Exactly 100% survives. 101% dies. Show this rule once in How to Play.

### 11.2 Finale / Súdny deň (after case 30)

Modal. Prototype stamp: red **ODHALENÝ!** over a courtroom / judgment frame.

| Condition | Outcome | Copy seed |
|---|---|---|
| `risk < 50` | Win | “Nevinný! Pokračuj v kariére.” |
| `risk >= 50` | Lose | “Odhalený! 15 rokov väzenia.” Assets seized (money → 0 on the recap). |

The finale is stricter than checkpoints on purpose: you can limp through mid-game at 80% if you spend before the court. The last 10 cases are the squeeze.

### 11.3 End screens

Both ends share a recap:

- Money at death/win (lose: show seized)
- Peak risk
- Cases accepted / refused
- Investments owned
- One educational closer + link to a sources list
- Buttons: **Nová kariéra**, **Zdroje**, **Menu**

Local career stats persist (prototype Štatistiky). Online leaderboards are a title slot, not MVP backend.

---

## 12. Example session (acceptance playtest script)

Use this as the first playtest script. Numbers assume no investments until shop 1 and the choices below.

| Step | Action | Money | Risk |
|---|---|---|---|
| Start | — | 0 | 0 |
| Case 1 | Accept Bödör 50k / +20 | 50 000 | 20 |
| Case 2 | Accept lustration 30k / +15 | 80 000 | 35 |
| Case 3 | Event: journalist. Pay 30k / −20 (after +20 incoming) | 50 000 | 35 |
| Cases 4–10 | Mix of accepts | ~200 000 | ~65 |
| Checkpoint 1 | 65 ≤ 100 → survive, stay in hub | 200 000 | 65 |
| Shop (tab) | Buy Korumpovaný sudca 150k anytime | 50 000 | 65 |
| Cases 11–20 | Higher bribes; court events are cheaper | climbs | climbs |
| Checkpoint 2 | Must be ≤ 100 | — | — |
| Cases 21–30 | Squeeze | — | — |
| Finale | Win if risk < 50 | — | — |

**Intended feel:** early game is greedy, mid game is shopping for cover, late game is staying under the courtroom line.

**Alternate strategy (clean-ish):** refuse most bribes, stay poor, cannot afford Media (200k), survive on low risk but miss the laundry snowball. Both strategies must be viable, not equally profitable.

---

## 13. Strategy space (what the player is actually deciding)

Three axes, always in tension:

1. **Income** — accept bribes
2. **Heat** — every accept and most events
3. **Infrastructure** — spend now to cut future heat

Good play is not “always accept” or “always refuse.” It is hitting investment prices without crossing 100 at a checkpoint, then dumping risk before case 30 — via Quick Cover, events, or both.

Blowback options (intimidate now, +10 later) exist so the greedy tap is not always correct.

---

## 14. Screens and UX

Visual reference: [`docs/design/dizajns.png`](design/dizajns.png) (frame layout) + [`docs/design/ui-elements.png`](design/ui-elements.png) (chrome). Portrait phone, light chrome, green primary CTA, red danger, blue headers.

### 14.1 Prototype frame map

| # | Frame | Ship as |
|---|---|---|
| 1 | Main menu | Title. Lockup `OČISTEC THE GAME`. Hero: uniformed official, cigar, drink, cash on desk. Primary: green **ZAČAŤ HRU**. Secondary icon row: **Nastavenia**, **Rebríčky**, **Achievementy**. Tagline under title. |
| 2 | Case | Kauzy tab. HUD money + risk. Card with illustration, `ÚPLATOK` / `RIZIKO ODHALENIA` before commit. Swipe hint + **PRIJMI** (green) / **ODMIETNI** (red). |
| 3 | Event | Eventy tab or modal. `NOVINÁR NA STOPE`. Three choices. Footer = projected risk after the pick. |
| 4 | Risk overview | Semi-circular gauge, status word (`NA HRANE`), three how-to chips (Eventy / Investície / Rozhodnutia), list of **active bonuses**. Open from tapping the HUD risk chip (long-press or second tap vs Quick Cover — see §14.3). |
| 5 | Shop | Investície tab. Chips: Všetko / Ochrana / Zisk / Vplyv. Rows: name, price, effect. |
| 6 | Quick Cover | Bottom sheet over the hub. Five crisis rows with price and −risk. |
| 7 | Kontrola / Súdny deň | Modals. Survive copy vs red stamp `ODHALENÝ!`, 15 years, assets gone. |
| 8 | Career | Štatistiky tab. Header `KARIÉRA — ŠÉF`, level + XP bar. Table: total earned, bribes accepted, cases refused, audits survived, longest streak, average risk. |
| 9 | Chrome | Bottom nav + advisor. |

### 14.2 Bottom navigation

Always visible on hub screens. Hidden on Title, How to Play, Kontrola, Súdny deň, Game Over.

| Tab | Icon role | Badge |
|---|---|---|
| **Kauzy** | Current case | — |
| **Eventy** | Pending or last event | Numeric badge while `pendingEventId` is set |
| **Investície** | Shop | — |
| **Majetok** | Owned investments / flavor property | — |
| **Štatistiky** | Career sheet | — |

Default tab after **ZAČAŤ HRU**: Kauzy.

### 14.3 HUD and sheets

- Top safe area: money left, risk chip right. Prototype does **not** put case index in the HUD; case index lives in the card kicker `KAUZA #n`.
- Tap risk chip → **Quick Cover** sheet (high frequency).
- Long-press risk chip, or a “i” on the gauge → **Risk overview** (frame 4).
- Color-blind: number is always on the chip, not color alone.
- Advisor: illustrated woman, bottom-right above the tab bar, speech bubble. Contextual, dismissable, max ~12 words. Seed: “Nie každý úplatok sa oplatí.” Mute in Settings.

### 14.4 Screen index

| Screen | Purpose | Primary input |
|---|---|---|
| Splash | Logo + disclaimer | Tap |
| Title | Frame 1 | Tap |
| How to Play | 4 cards: swipe, risk, events, court | Swipe or tap |
| Kauzy | Case loop | Swipe + PRIJMI / ODMIETNI |
| Result | Deltas | Auto 0.8s then tap |
| Fact sheet | “V skutočnosti…” | Tap Continue; tap source |
| Eventy | Multi-choice + projected risk footer | Tap option |
| Quick Cover | Crisis rows | Tap row |
| Risk overview | Gauge + bonuses | Tap |
| Investície | Shop with category chips | Tap buy |
| Majetok | Owned cover list; empty state: “Zatiaľ žiadny majetok.” | — |
| Štatistiky | Career + XP | — |
| Kontrola | Survive / fail | Auto |
| Súdny deň / End | Stamp + recap | Tap |
| Sources | URLs from this run | Tap link |
| Settings | SFX, haptics, reduce motion, text size, advisor | Toggles |
| Achievementy | Local badges | — |
| Rebríčky | Local best-run list in MVP; online later | — |

### 14.5 Swipe spec

- Threshold: 28% of card width or velocity > 800 px/s
- Haptic: light on threshold, medium on commit
- Undo: none after commit (autosave)
- Card rotates ±12°; green/red wash on the accept/refuse edge
- Buttons commit the same reducer as swipe

### 14.6 Copy length caps

- Case kicker: 42 characters
- Case body (if used under the art): 280 characters
- Event option: 36 characters + cost on a second line
- Advisor bubble: 80 characters
- Fact sheet: 500 characters

### 14.7 Majetok

MVP: a list of owned investment cards (same art as shop, state = owned). No separate villa/car economy yet. Flavor line per item (e.g. médium: “Tvoja televízia mlčí, keď treba.”). Empty state as above.

### 14.8 Career / XP

Prototype shows `Level 12` and an XP bar. Rules for MVP:

- XP is **persistent across runs**, cosmetic only
- `xpGain`: +10 refuse, +15 accept, +25 survive checkpoint, +50 win, +5 lose (pity)
- Level curve: `xpToNext = 100 * level` (tune later)
- Level does **not** change bribe payouts or risk. No pay-to-win.
- Štatistiky table fields from the PNG: total earned, bribes accepted, cases refused, audits survived, longest streak, average risk.

---

## 15. Art direction

Taken from [`ui-elements.png`](design/ui-elements.png) (look) and [`dizajns.png`](design/dizajns.png) (frame layout). Do not drift back to charcoal/gold chrome from v1.1 or a generic court-PDF look unless a later art pass says so.

**Look:** light satirical comic. Off-white canvas, white cards with soft shadow, charcoal body type. Illustrated characters (player official, journalist, advisor), not photoreal living people.

**Title type:** stencil / distressed display for `OČISTEC THE GAME`. Body: a Slovak-capable grotesque (IBM Plex Sans or equivalent). Buttons: bold all-caps SK labels.

**Surfaces:**

- Hero title: character illustration on light canvas + desk cash
- Cards: white rounded panels (~12px radius), soft drop shadow, illustration on top, stats under
- Case kicker: blue header bar (`KAUZA #n`); event kicker: red `EVENT!` header
- Shop/event rows: list cells, price in green pills, risk delta in red or green
- Quick Cover: blue **POUŽIŤ** trailing control
- Stamp: oversized red `ODHALENÝ!` rotated ~−12° on Game Over
- Tab bar: 5 icons, green on selected, muted gray on idle, red dot/badge on Eventy

**Not:** photoreal portraits of living people, official ministry marks, blood, glossy AAA, charcoal/gold chrome from v1.1.

**Motion:** paper/card slide on Kauzy, stamp slam on ODHALENÝ, shutter on journalist events, gauge needle on risk overview. Reduce Motion → fades.

**Color roles (approximate, sample from `ui-elements.png` in implementation):**

| Role | Use |
|---|---|
| Green | ZAČAŤ HRU, PRIJMI, money, shop prices, selected tab, positive risk reduction |
| Red | ODMIETNI, ODHALENÝ stamp, high risk |
| Blue | Case/event headers, POUŽIŤ, HUD info accents |
| Off-white | App canvas |
| Charcoal | Body copy |

---

## 16. Audio

| Cue | When |
|---|---|
| Paper slide | New case |
| Cash tick | Money up |
| Low drone swell | Risk up |
| Camera shutter | Journalist event |
| Crowd bed | Protest event |
| Gavel | Checkpoint / finale |
| Distant siren (short) | Game Over |

Master bus: duck SFX under any future voice. Music is optional drone, not a pop song. Mute toggle on Title and Settings. Haptics can be disabled independently.

No licensed news-theme stings (legal).

---

## 17. Data model

Content is data. Code only knows types.

### 17.1 Case

```json
{
  "id": "case_bodor",
  "act": 1,
  "title": "Nevyšetrovanie",
  "prompt": "Podnikateľ Bödör ponúka 50 000 € za nevyšetrovanie.",
  "accept": { "money": 50000, "risk": 20 },
  "refuse": { "money": 0, "risk": 0 },
  "fact": {
    "text": "V skutočnosti…",
    "sourceName": "Denník N",
    "sourceUrl": "https://dennikn.sk/5134387/korupcny-newsfilter-gasparov-ocistec-sa-pomaly-meni-na-peklo/"
  }
}
```

### 17.2 Event

```json
{
  "id": "novinar",
  "type": "threat",
  "tags": ["press"],
  "name": "Novinár na stope",
  "description": "Novinár z Aktuality.sk píše článok o tvojich úplatkoch. Čo urobíš?",
  "incomingRisk": 20,
  "options": [
    { "id": "pay", "text": "Zaplatiť mu", "cost": 30000, "riskDelta": -20, "delayedRiskDelta": 0 },
    { "id": "threaten", "text": "Zastrašiť", "cost": 10000, "riskDelta": -10, "delayedRiskDelta": 10 },
    { "id": "ignore", "text": "Ignorovať", "cost": 0, "riskDelta": 0, "delayedRiskDelta": 0 }
  ]
}
```

`type`: `threat` | `mitigation` | `gift` | `satire`.
`tags`: `press` | `audit` | `court` | `protest` | `political` — used by investments.

### 17.3 Investment

```json
{
  "id": "inv_media",
  "name": "Vlastné médium",
  "cost": 200000,
  "modifiers": [
    { "when": "eventIncoming", "tags": ["*"], "riskDelta": -10 }
  ]
}
```

Modifier `when` values: `eventIncoming`, `caseRiskGain`, `bribeMoney`.

### 17.4 Run state (save blob)

```json
{
  "schema": 1,
  "caseIndex": 7,
  "money": 50000,
  "risk": 35,
  "ownedInvestmentIds": ["inv_judge"],
  "pendingDelayedRisk": 10,
  "pendingEventId": "novinar",
  "seenEventIds": ["novinar"],
  "acceptedCount": 5,
  "refusedCount": 2,
  "quickCoverUsesThisAct": 0,
  "career": { "xp": 840, "level": 12 },
  "rngSeed": 184726
}
```

`pendingDelayedRisk` is applied at the start of the next case, then cleared. `pendingEventId` locks the next case. Autosave after every committed decision.

---

## 18. Resolution order (authoritative)

When several modifiers could apply, run them in this order. Tests should lock this.

**On case Accept / Refuse:**

1. Apply `pendingDelayedRisk`, then clear it
2. Start from the card’s raw money/risk deltas
3. Apply `inv_laundry` to money if accepting a bribe
4. Apply `inv_security` (and any other `caseRiskGain` modifiers) to risk delta if the delta is > 0
5. Commit money and risk (floor money and risk at 0)
6. Show result + fact
7. If event scheduled, set `pendingEventId` (badge Eventy). Next case stays locked
8. Else if checkpoint/finale, show that modal
9. Else increment `caseIndex`

**On event:**

1. Compute `incomingRisk` + investment modifiers (tag filters). Floor at 0
2. Apply incoming risk, animate HUD
3. Present affordable/disabled options; footer shows projected risk for the focused option
4. On pick: subtract cost (abort if a race made it unaffordable), apply `riskDelta`, queue `delayedRiskDelta`, clear `pendingEventId`
5. If checkpoint/finale pending, go there; else increment `caseIndex`

**On Quick Cover pick:** subtract cost, apply `riskDelta`, queue delayed if any, close sheet.

**On shop buy:** subtract cost, append id, apply no immediate risk change unless a modifier says `onPurchase`. Tab stays open.

---

## 19. Content pipeline

| Act | Cases | Events | Shop |
|---|---|---|---|
| 1 (cases 1–10) | 10 | 3 | open tab |
| 2 (11–20) | 10 | 3 | open tab |
| 3 (21–30) | 10 | 3 + finale | open tab |

MVP content floor: **30 cases, 12 events, 5 investments**, all sourced.

Editorial rules:

- Every case has `sourceUrl` or it does not ship
- No private-life allegations
- No instructions that work as a real-world how-to (keep options abstract: “Zaplatiť”, not account numbers, malware, or doxxing methods)
- Legal review before store submission (living people, trademarks of newsrooms)

---

## 20. Systems that are out of MVP

- Accounts, cloud save, **online** leaderboards (title button can open a local best-runs list)
- IAP, ads, battle pass
- Cross-run **gameplay** unlocks (XP/level/achievements are cosmetic only)
- Multiplayer, sharing cards as images (nice-to-have later)
- English localization (architecture should still keep strings in JSON)
- Daily challenges / live ops
- Voice acting
- A real property/villa builder on Majetok (list of owned cover is enough)

---

## 21. Monetization (v1)

**None.** The game is a complete paid-or-free satire. Recommendation: free with no ads for launch, or a single paid download. Do not sell “risk reduction” as IAP — that would collapse the strategy and look like a joke we are not making.

If a sequel/meta layer is added later, cosmetic paper skins only.

---

## 22. Analytics (privacy-light)

No PII. Local-first. If analytics is added:

| Event | Props |
|---|---|
| `run_start` | seed |
| `case_resolve` | id, accept/refuse, money, risk |
| `event_resolve` | id, option id |
| `checkpoint` | index, risk, survived |
| `shop_buy` | id or `skip` |
| `run_end` | win/lose, reason, duration |

Default: analytics **off** until a privacy policy exists.

---

## 23. Legal and ethics (ship blockers)

1. Boot disclaimer + store description: satire, not reporting.
2. Sources screen in-app.
3. Legal pass on named living people and named newsrooms.
4. Do not use official ministry / police marks.
5. PEGI/IARC questionnaire: crime, corruption, mild bad language.
6. Age gate: 16+ at first launch.
7. The educational beat is not optional in production builds.

This is a civic satire about documented power, not a crime simulator.

---

## 24. Production plan

### 24.1 Vertical slice (playable in a week)

- Title (lockup + ZAČAŤ HRU) + 5-tab hub chrome
- 5 cases, 2 events, 1 checkpoint, shop with 2 items, Quick Cover with 2 rows, 1 finale
- Swipe + PRIJMI/ODMIETNI + HUD + save
- One fact sheet with a real URL

### 24.2 MVP

- Full 30-case career
- All 5 investments + category chips
- 12 events with projected-risk footer
- Quick Cover (5 rows)
- Risk overview gauge
- Majetok list, Štatistiky, local achievements
- Advisor (can be a static portrait + 6 tip strings)
- Settings, sources, disclaimer
- iOS + Android internal builds

### 24.3 Suggested modules (deep, testable)

| Module | Interface | Tests |
|---|---|---|
| **Economy** | `applyDecision(state, action) → state` | money floor, laundry %, disabled options |
| **Risk** | same reducer | additive stacking, incoming modifiers, delayed risk, 100/50 thresholds |
| **Content** | load + validate JSON schema | every case has sourceUrl, ids unique |
| **Loop** | state machine | event every 3, pending event locks next case, shop always open, finale at 30 |
| **Save** | serialize / migrate schema | corrupt file → new run |

Do not put risk math in React components. One reducer, many tests.

### 24.4 Tech recommendation

React Native + Expo, TypeScript, Zustand or a tiny reducer, JSON in `assets/content/`. Fastest path from this GDD to a store build. Revisit only if art needs a heavy animation graph.

---

## 25. Success criteria

A playtest of 8 people who know Slovak news:

1. After one run they can explain the three axes (money / risk / investments)
2. At least 2 distinct strategies appear (greedy+cover vs lean+refuse)
3. Nobody thinks the educational sheet is skippable noise (measure tap time)
4. At least one person says a case name unprompted after the session
5. Nobody hits a soft-lock (all options unaffordable **and** incoming risk will kill them at the next checkpoint with no agency). If that state is reachable, add a `mitigation` event with a 0€ high-risk option (e.g. “Ísť do médií” → −risk, −money, story flag)

---

## 26. Open decisions

| ID | Question | Default until decided |
|---|---|---|
| D1 | Paid app vs free | Free, no ads |
| D2 | Title | **Resolved:** `OČISTEC THE GAME` (codename Tibby) |
| D3 | Name the player character after a real person? | No. Archetype + cases carry the satire |
| D4 | Event every 3 vs random 3–5 | Every 3, with shuffled event deck |
| D5 | Engine | Expo / React Native |
| D6 | Quick Cover uses per act | Unlimited; cap to 1/act if dumps dominate |
| D7 | Tap vs long-press on risk chip | Tap = Quick Cover, long-press = gauge overview |
| D8 | Online Rebríčky | Local list in MVP |

---

## 27. Next artifacts

1. Content bible: 30 sourced cases (JSON)
2. Event deck JSON (12)
3. Schema + reducer tests
4. Vertical slice build matching the PNG pair (layout [`dizajns.png`](design/dizajns.png) + light kit [`ui-elements.png`](design/ui-elements.png))
5. Legal memo before any store screenshot with real names

Pixel-level spacing should be sampled from the PNG during implementation, not guessed from this prose.
