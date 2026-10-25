# Optimization & Accessibility Audit — Sabrina Roofing & Exteriors

Audit performed on the production build (`next build` + `next start`), headless Chromium, Lighthouse 12 and axe-core 4.10. The sandbox is a shared 2-vCPU / 2 GB machine with no CDN, so absolute timings are conservative — Core Web Vitals on a production CDN will be better.

---

## 1. Headline results

| | Before optimization | After |
|---|---|---|
| Lighthouse Performance | 69 | **92** |
| Lighthouse Accessibility | 96 | **100** |
| Lighthouse Best Practices | 93 | **100** |
| Lighthouse SEO | 100 | **100** |
| Largest Contentful Paint | 4.6 s | **3.1 s** |
| Total Blocking Time | 570 ms | **160 ms** |
| Cumulative Layout Shift | 0 | **0** |
| Total page weight | 1,036 KB | **584 KB** |
| First Load JS (route) | 116 KB | 116 KB |
| axe-core violations (desktop / mobile) | 1 / 2 | **0 / 0** |

---

## 2. What was found and fixed

### 2.1 Double-downloaded hero image (−246 KB, biggest single win)

**Finding.** The hero image was requested twice: the optimized `/_next/image` variant (33 KB) *and* the raw 246 KB source. Cause: my own `<link rel="preload" as="image" href="/images/hero-house.webp">` competed with the preload that `next/image` (`priority`) already emits, and the raw preload threw away `srcset`/AVIF negotiation.

**Fix.** Removed the manual preload; `next/image`'s generated preload (with `imagesrcset`) is the single source of truth.

**Result.** LCP 4.6 s → 3.1 s; page weight 1,036 KB → 584 KB.

### 2.2 Oversized image tiers in the `srcset`

**Finding.** On a 412 px-wide LCP element the browser picked `w=1080` because the default `deviceSizes` produced a 2400 px tier that skewed selection, and `sizes="150vw"` (a stale value from an earlier layout) overstated the element width. Gallery images also returned 640 px files for 281 px slots.

**Fix.** Capped `images.deviceSizes` at 1920, corrected the `sizes` attributes to the real rendered widths, and set an explicit `quality={74}` (512 px hero at DPR 1 was previously over-served).

**Result.** ~130 KB of image bytes removed; `image-delivery-insight` savings dropped from 172 KB to zero on the LCP image.

### 2.3 Eager 346 KB video competing with the LCP image

**Finding.** The decorative hero video was fetched at `preload="auto"` in parallel with the hero image on the same slow connection, and Lighthouse flagged it as media bytes blocking the LCP (resource load duration 1.5 s).

**Fix.**

- `preload="none"` + `poster` (22 KB) so the card renders instantly.
- Playback starts 350 ms **after** the `load` event (with a 2.5 s fallback so it never stays a still frame). The brief's "must never stop" behaviour is untouched: the 1 s watchdog, `ended`/`stalled`/`suspend` handlers, visibility-change and first-gesture resume all still run.
- Re-encoded the clip at 720 px: **346 KB → 192 KB**, plus a **WebM/VP9** source that plays in browsers without an H.264 decoder (the sandbox's own Chromium has none — the video was silently dead before).

**Result.** LCP media contention removed; video payload −45 %.

### 2.4 Fonts

**Finding.** Google Fonts adds two cross-origin round-trips (blocking CSS, then the font files) and a real CLS risk during the swap.

**Fix.** Downloaded the three families (latin subset only), self-hosted them in `public/fonts/`, wired through `next/font/local` with `display: swap` and metric-adjusted fallbacks. **97 KB total, 3 requests, same-origin, preloaded.**

**Result.** FCP 1.4 s → 0.9 s; CLS 0.

### 2.5 Render-blocking CSS

A single 27 KB Tailwind v4 stylesheet remains (Lighthouse: ~100 ms). Acceptable for an animated, above-the-fold-critical page — inlining it would cost more than it saves and hurt caching.

---

## 3. Accessibility findings

| Finding | Severity | Fix |
|---|---|---|
| Mobile gallery was a scrollable region with no keyboard access (`scrollable-region-focusable`) | Serious | `tabIndex={0}` + visible focus ring → arrow-key scrollable |
| Video progress bars were 14 px tall click targets WCAG 2.2 `target-size` | Serious | 24 px hit area around the 3 px visual bar (negative margin keeps the look) |
| Footer location label: contrast 2.25:1 for axe | Serious | Converted to a solid chip (`#a8c4ff` on `#151a24`) — unambiguous and stronger visually |
| Service card meta text at `#9aa1b1` | Minor | Darkened to `#68707f` |
| Headings with forced line breaks read as "SabrinaRoofingExteriors" | Moderate | `WordReveal` now emits a real space after each block line |
| Hero video caption sat on photography | Moderate (legibility) | Local radial scrim + text shadow behind the card |
| Icon-only hamburger / language buttons | Moderate | Explicit `aria-label` / `aria-pressed` |
| Motion for vestibular-sensitive users | Moderate | Full `prefers-reduced-motion` path + `noscript` fallback that pins all text visible |

**Verified manually:** tab order (skip link → logo → nav → language → CTA → explore → video bars), drawer closes on Escape/outside click/resize, `aria-current` on the active nav item, `<html lang>` follows the language switch.

---

## 4. Responsive verification

Automated captures and geometry checks at **360, 390, 768, 834, 1024, 1280 and 1440 px**:

- `document.scrollWidth === clientWidth` at every width → **0 px horizontal overflow**.
- No console errors or page errors at any viewport.
- Video element reports `paused: false, readyState: 4` at every width (autoplay + fallback source working).

Fixes made during this pass:

- Mobile hero recomposed so the **whole** house sits on the hero floor instead of being cropped to one storey.
- Video card kept clear of the headline block on phones; caption re-authored per language so line breaks are typographic, not accidental.
- Tagline given `word-spacing` so tight tracking no longer collapses word gaps.

---

## 5. Remaining opportunities (documented, not applied)

| Item | Why it was left |
|---|---|
| `legacy-javascript` (−11 KB) | Next.js polyfill bundle for older browsers; removing it via `browserslist` would raise the crash risk on older Android/iOS for a small gain. Safe to revisit once the client's analytics show the real browser mix. |
| `unused-javascript` (−21 KB) | React hydration — required for the language switch, drawer and video logic. |
| Render-blocking CSS (~100 ms) | Single stylesheet, well cached; inlining would duplicate it on repeat visits. |
| Main-thread "Other" 1.9 s | Dominated by hydration in a 2-vCPU sandbox; benchmark on real hardware before optimizing further. |

---

## 6. How to reproduce

```bash
npm run build && npm start
npx playwright install chromium     # once, for the audit scripts
node scripts/audit-a11y.mjs         # axe-core, desktop + mobile
node scripts/screenshots.mjs        # 8 viewports → ./shots
node scripts/interaction-tests.mjs  # menu, language, tab order, seek, reduced motion
```

Lighthouse:

```bash
CHROME_PATH=… npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo
```
