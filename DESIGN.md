# Veyro — design system, reverse engineered from the mockup

Source: `41c4317f-…png`, 1448 × 1086, the veyro.ai hero mockup.
Colours below were **sampled** from that image (quantised per region, so they are
the real pixel values, not estimates). Geometry is measured off the same image at
1448 px wide and is accurate to roughly ±2 px. Type is **inferred**, not
identified — see the note under Typography.

---

## 1. Colour

### Surface
| Token | Value | Where |
| --- | --- | --- |
| `--base` | `#0A0710` | page background |
| `--nav` | `#0B0B16` | nav bar, very slightly bluer than the page |
| `--band` | `#0C0816` | trending strip |
| `--card-a` | `#160D24` | card gradient, top |
| `--card-b` | `#120A1D` | card gradient, bottom |
| `--rule` | `#2E1F45` | hairlines, card borders |

### Brand ramp
The whole page hangs off one violet→magenta→pink ramp.

| Token | Value | Where |
| --- | --- | --- |
| `--grad-1` | `#952EB8` | headline gradient, left stop |
| `--grad-2` | `#C440E4` | headline gradient, middle |
| `--grad-3` | `#FC8BFB` | headline gradient, right stop |
| `--cta-a` | `#A503E1` | CTA pill, left |
| `--cta-b` | `#C71CF4` | CTA pill, right |
| `--violet` | `#785BC3` | eyebrow text (muted, not the full magenta) |

Headline gradient measured left-to-right: `#952EB8 → #C440E4 → #FC8BFB`, roughly
linear at ~96°. The CTA is a **different, tighter** ramp — `#A503E1 → #C71CF4` —
more saturated and less pink than the headline. Do not reuse one for the other.

### Text
| Token | Value | Where |
| --- | --- | --- |
| `--ink` | `#FAF9FB` | H1 line 1, nav, button labels |
| `--body` | `#C8C6D5` | hero lead paragraph |
| `--muted` | `#8A7AC5` | card body copy (notably violet-tinted, not grey) |

### Feature card accents
Each card carries its own hue. Sampled from the titles:

| Card | Accent | Value |
| --- | --- | --- |
| Scans launches | violet | `#CE4ED9` |
| Watches X | blue | `#77C1DC` |
| Follows wallets | green | `#1AD99D` |
| Sends alerts | pink | `#D872CE` |

Card four is **pink-magenta, not red**. Easy to misread as rose.

### Semantic
| Token | Value | Where |
| --- | --- | --- |
| `--up` | `#17C063` | trending percentages, all positive |

---

## 2. Typography

**The fonts cannot be identified from this image, and I am not going to pretend
otherwise.** The mockup is itself AI-generated, so the letterforms are rendered
pixels rather than a real font file — there is no embedded font to name. What the
type *behaves* like:

- **Display (H1, section heads):** a heavy geometric sans, uppercase, very tight
  tracking (≈ −0.03 em), weight 800–900, line-height ≈ 1.0. Closest free
  candidates: **Inter 900**, Archivo Black, Poppins ExtraBold.
- **UI and body:** a neo-grotesque at 400–600. **Inter** is the safe match and is
  what the build uses.
- **No mono anywhere in the mockup.** The build adds one only for the reject-reason
  chips, which are not in the mockup.

### Scale, measured at 1448 px wide
| Role | Size | Weight | Tracking | Case |
| --- | --- | --- | --- | --- |
| H1 | 58 px | 900 | −0.03 em | upper |
| Nav wordmark | 26 px | 800 | +0.07 em | upper |
| Nav links | 15 px | 500 | normal | title |
| Hero lead | 17 px | 400 | normal | sentence |
| Eyebrow | 12 px | 600 | **+0.30 em** | upper |
| CTA label | 17 px | 800 | +0.06 em | upper |
| Card title | 16.5 px | 700 | normal | sentence |
| Card body | 13.5 px | 400 | normal | sentence |
| Trending label | 14 px | 800 | +0.05 em | upper |
| Join heading | 27 px | 900 | **+0.14 em** | upper |

The two wide-tracked items — eyebrow at 0.30 em and the join heading at 0.14 em —
are the most recognisable typographic gesture in the design. Lose them and it
stops looking like this mockup.

---

## 3. Geometry

- **Container:** content spans ~1352 px inside 1448, so side padding ≈ 48 px.
  Max content width 1400 px.
- **Nav height:** 78 px, 1 px bottom hairline in `--rule`.
- **Hero band:** ~690 px tall, image bleeds full width.
- **Radii:** pills `999px` (CTA, ghosts, token chips) · cards `12px` ·
  before/after frame `9px`.
- **Card row:** four equal columns, `14px` gap, card padding `17px 19px`,
  icon 30 px with a coloured drop-shadow glow.
- **Trending strip:** 58 px tall, hairline top and bottom, token avatars 27 px
  circles.
- **Join band:** background plate `cosmic.jpg`, 1916 × 821. The centre of the
  art is deliberately empty so the heading and buttons sit between the two
  graffiti corners. Scrim is a centred radial, `rgba(10,7,16,.72)` at the
  middle fading to transparent at the edges — enough for text contrast without
  flattening the planets. Vertical padding `clamp(48px, 7vw, 86px)` so the
  plate has room to read.

---

## 4. Effects

- **Hero scrim.** A horizontal gradient so the left copy sits on near-solid ink
  while the art stays visible on the right:
  `linear-gradient(90deg, rgba(11,7,20,.97) 0%, rgba(11,7,20,.93) 34%, rgba(11,7,20,.58) 58%, rgba(11,7,20,.12) 100%)`
  Below 900 px this becomes a flat `rgba(11,7,20,.90)` — the art is decorative and
  legibility wins.
- **CTA glow.** `box-shadow: 0 0 38px rgba(199,36,240,.55)`, rising to `52px` at
  `.8` alpha on hover. This is the single strongest light source on the page.
- **Card glow.** Border is `color-mix(accent 34%, rule)`; on hover it goes to the
  full accent with `0 0 26px` of it. Icons carry `drop-shadow(0 0 10px accent)`.
- **Gradient text.** `background-clip: text` with transparent fill on H1 line two
  and the join heading, using `--grad-lit`, not `--grad`.

  Two traps here, both of which bit this build:

  **A `text-shadow` paints above the element's background.** With
  `background-clip: text` the gradient *is* the background, so the hero's
  `text-shadow: 0 1px 14px rgba(5,3,10,.85)` was painting a dark blurred glyph
  straight over the fill — the second line read as a grey smudge for as long as
  that rule applied to it. `h1 em { text-shadow: none }`.

  **A `filter` on the same element makes Chromium drop the clipped fill**, so
  reaching for `drop-shadow` to glow it leaves nothing but a silhouette. The
  glow is a blurred `::before` copy (`content: attr(data-glow)`) behind the
  text instead.

  `--grad-lit` (`#C551E8 → #E163F0 44% → #FFB2FA`) is the sampled `--grad`
  lifted for type that sits on photography. The measured ramp starts at
  `#952EB8`, which is near-black against a night plate. `--grad` stays as the
  record of what the mockup actually contains.

- **The desktop hero no longer has a full-width scrim.** Buying text contrast
  by dimming the whole photograph also takes the shine off the coin, which is
  the one thing in the frame that has to stay lit. The contrast now comes from
  a panel behind the copy — black frosted glass, `rgba(7,4,13,.58)` with
  `backdrop-filter: blur(22px) saturate(.85)`, a 20 px radius and a 7%-white
  hairline. What is left of the gradient (`.58 → .30 → .06 → 0`) only seats
  the panel; it does not carry the type. There is an `@supports not
  (backdrop-filter:…)` fallback at `.86` flat.

- **The plate is a `<picture>`, not a background.** A background can only be
  re-framed where `cover` happens to leave overflow, and on a wide desktop it
  leaves none — the image fills the width exactly, so `background-position` has
  nothing to move. That is why the subject could not be pushed clear of the
  copy. An `<img>` takes a transform:

  ```css
  .hero-art img { object-fit: cover; object-position: 62% center;
                  transform: scale(1.28) translateX(8%) }
  ```

  The translate stays inside the slack the scale leaves, so it still covers.
  The phone gets `object-position: center top` and no transform. Which file is
  used is a `<source media>` on the `<picture>`, not a CSS swap.

  One trap: `.hero > *` sets `position: relative`, which beat `.hero-art`'s own
  `position: absolute` on equal specificity and pulled the plate into the flow,
  pushing the copy underneath it. The selector is `.hero > .hero-art`.

---

## 5. Mobile

Source: `design/concepts/mobile-screen-one-mockup.png` (941 × 1672). The phone
design is **not** a reflow of the desktop page and the build does not treat it
as one. It is two screens: the hero, then everything from "How Veyro works"
down.

### Screen one

| | Desktop | Mobile (< 900 px) |
| --- | --- | --- |
| Nav | bar with a rule, in flow | **no bar** — `.navwrap` is absolute over the art, nav transparent |
| Hero | `hero.jpg`, landscape, centre-right | `hero-mobile.jpg`, portrait, **`top center`** |
| Hero height | content | `100dvh` — screen one is the whole viewport |
| Wordmark | 26–36 px tall | `clamp(150px, 44vw, 250px)` **wide**, set on the art |
| Opening line | `FROM DOOMER / TO ALPHA ZOOMER.` | handwritten `Good Coins / Better Days / ♡` |
| Corner tag | — | `SAME DEGENS BRIGHTER TOMORROW ♡`, top right |
| Body | lead paragraph | `SCAN · TRACK · ANALYZE · TRADE · SEND` stacked |
| Tag | — | `SOLANA / MEMECOINS / MADE SIMPLE`, three lines |
| CTA | inline pill | full width of the copy column, low in the frame |
| Telegram line | left, one line | centred, wraps to two |
| Before/after | inside the hero | **screen two**, after the cards |
| Eyebrow | present | absent |

### The handwriting

Two Caveat 700 elements, both `aria-hidden` — they are paint on a photograph,
not copy a screen reader should read twice.

| | Size | Colour | Transform |
| --- | --- | --- | --- |
| `.m-script` | `clamp(33px, 9.6vw, 60px)` | `--pink` | `rotate(-7deg)` |
| `.m-graf` | `clamp(13.5px, 3.9vw, 21px)`, uppercase | `--pink` | `rotate(4deg)` |

`--script: 'Caveat', ui-rounded, 'Segoe Script', cursive`. The mockup's hand is
a slanted marker script; Caveat is the closest free face, **not an
identification** of the original.

### Composition

The copy reads down from the top, the button and the Telegram line hold the
bottom, and the plate gets everything between them — `.m-only { margin-bottom:
auto }` puts the whole slack in one gap rather than spreading it evenly. The
copy column caps at 560 px so a tablet does not stretch the button across the
screen.

A 38 px `--mag-2` rule sits above the tag, drawn as a `::before`, not a
full-width `border-top`. It is the only rule in the hero.

### Lighting

The plate is the screen, so there is no full wash. Four pieces, all on
`.hero::before` except the column:

| Layer | Job |
| --- | --- |
| radial, top left | the handwriting lands on a magenta lamp in this plate |
| radial, top right | same problem behind the corner tag |
| linear, top | seats the wordmark |
| radial + linear, bottom | seats the button and the Telegram line |
| `.hero::after`, 95° column, **masked out below 56%** | the dark left edge the copy sits on, lifted before it reaches the coin |

The mask is what keeps this from flattening the photo: the column is at full
strength where the ladder and the tag are and gone by the time it reaches the
subject and the coin.

**`top center`, not `top right`.** The right anchor cropped the left edge of the
plate and pushed the subject into the copy column, which is what forced the
heavy scrim in the first place.

**Past 9:16 the plate swaps, it does not stack.** A phone frame is taller
than the portrait plate's aspect, so `cover` scales it by height, the whole
image height is in view, the coin lands at 66–81% and the pinned button
clears it. Once the frame is wider than 9:16, `cover` has to scale the plate
up to fill the width instead: more of the desk comes in, the coin drops
toward the bottom, and the button lands on it. That is the exact trigger:

```css
@media (max-width: 899px) and (min-aspect-ratio: 9/16) {
  .hero { background: url('/hero.jpg') 70% center/cover no-repeat, var(--base) }
}
```

`hero.jpg` is the same scene shot wide, and at `70% center` it holds the
subject and the coin at 52–72% of the frame across the whole band, well clear
of the button. Concept 2 uses the same condition in reverse — the portrait
plate only below 640 px *and* narrower than 9:16.

Two dead ends, both worse, both tried:

- **Unpinning the button** so it followed the copy. It floats mid-frame over
  the subject with the coin behind it and a void underneath.
- **Layering the two crops of the portrait plate** — `auto 100%` pinned right
  over the same file at `cover`. The two scales do not line up, so the picture
  visibly repeats down a seam. One image at a time.

### Measured contrast

Worst background pixel under each glyph box, against a canvas reconstruction of
the same plate and the same gradient stack:

| | 320 px | 375 px | 414 px |
| --- | --- | --- | --- |
| `.m-script` (large) | 3.71 | 6.34 | 6.99 |
| `.m-graf` | 5.68 | 6.66 | 6.59 |
| `.ladder` | 7.24 | 9.85 | 9.81 |
| `.m-tag` | 5.47 | 6.72 | 12.24 |
| `.tg` | 5.16 | 14.96 | 15.68 |

All pass 4.5:1 except `.m-script` at 320 px, which is 33 px display type and so
sits under the 3:1 large-text floor. Hero type also carries a dark text-shadow
for whatever a gradient cannot catch.

### Screen two

- **Cards are 2 × 2**, icon above left-aligned text. They go 4 across from
  640 px, and single column below 360 px.
- **The trending row is a live ticker.** Eight real Solana mints, fetched
  client-side from DexScreener — free, keyless, CORS-open, and the same source
  the bot uses. Real symbols, real logos, real 24h change, which means it goes
  red as often as green. Nothing about fitting a fixed number of tokens
  matters any more: the track holds the list twice and animates
  `translateX(-50%)`, so the loop has no seam, and both ends are masked so
  tokens do not pop in on a hard edge. It pauses on hover and on focus, and
  `prefers-reduced-motion` turns the animation off and makes the row a plain
  scroller.

  **No invented numbers anywhere in the fallback.** The static markup ships
  the symbols with an em dash for the change; the script fills in real
  figures. A failed fetch leaves dashes, never a figure nobody measured.

  Two bugs worth not repeating: a detached `<img>` with `loading="lazy"` never
  starts loading, so every logo silently stayed a letter; and the deepest pool
  for a mint sometimes reports no `h24`, so pool selection prefers a pool that
  has one over a deeper one that does not.
- Below 540 px of height the corner tag is hidden — a phone on its side has no
  room for it over the subject's head.

### Source mockups

`design/concepts/` holds what these pages were built from:

| File | What it is |
| --- | --- |
| `mobile-screen-one-mockup.png` | the phone hero `/landing-concept.html` matches |
| `mobile-mockup-full-page.png` | an earlier full-page phone comp, with a nav bar |
| `alt-desktop-outsourced-my-gambling.png` | the second direction, built as `/landing-concept2.html` |

---

## 5b. Concept 2

`/landing-concept2.html` is the same token set in a different composition. What
changes:

| | Concept 1 | Concept 2 |
| --- | --- | --- |
| Nav | its own band with a hairline | rides on the hero art, no band |
| Headline | `FROM DOOMER / TO ALPHA ZOOMER.` | `I outsourced / my gambling / addiction to a bot.` |
| Headline breaks | wraps | **explicit `<br>`**, hidden below 900 px |
| Emphasis | line two, gradient | one word, gradient — flat `--pink` on a phone |
| Proof | none | four-stat bar, each with its own short rule |
| Cards | icon left of text | icon above centred text |
| Tokens | 4 on mobile, 6 on desktop | 4 on mobile, 5 on desktop |
| Hero art | portrait plate on mobile | landscape `hero.jpg`, swapping to the portrait plate under 640 px |

Two things worth knowing:

- **The headline breaks are the composition.** Three lines with the longest
  last is not something greedy wrapping produces from a narrowed column, so
  the breaks are explicit `<br>`s that disappear below 900 px. A hidden `<br>`
  still needs a space in front of it or the words run together.
- **The gradient on `addiction` goes flat on a phone.** Once the line wraps,
  `background-clip: text` cuts the ramp mid-word and the dark half vanishes
  into the plate.

### The stat bar is a set of claims

`24/7 Scanning` · `1000s Tokens Monitored` · `Real-Time Alerts` ·
`Built for Degens`. The first three describe how the worker is built — it holds
a socket open, it sees every pump.fun launch, it sends Telegram messages — but
none of them is measured, and they are the kind of line that needs a number
behind it before it goes anywhere near a live site.

---

## 6. Honest notes about the source

Three things in the mockup are claims the product cannot currently make:
**Watches X** is not wired, **Follows wallets** does not exist, and **Sends alerts**
is only a feed heartbeat. The trending percentages (`DOGE +12.4%` and the rest) are
invented numbers, not live data.

The concept page reproduces them because it is a concept. They should not survive
contact with the live site — the repo's own `AGENTS.md` requires truthful claims,
and this is a custodial financial product.

Real trending data is available free and keyless from DexScreener
(`/token-boosts/top/v1`, 60 req/min), which is what the bot already uses.
