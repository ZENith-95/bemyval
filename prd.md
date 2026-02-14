# FINAL ALL-IN-ONE CODEX PRD PROMPT

## Project: **Kitty Valentine – Premium Interactive Web Experience**

**Output Goal:** Codex must generate a fully functional, production-ready site where the developer only plugs in **7 videos**.

---

## 🚨 CORE INSTRUCTIONS FOR CODEX

* Build a **single-page website**.
* Use **Vanilla HTML, CSS, and JavaScript only**.
* No React, no build tools, no frameworks.
* Must be deployable instantly on **Vercel static hosting**.
* Clean, modular, readable code.
* All animations must be smooth and GPU-friendly (transform + opacity).
* Design quality = premium modern product landing page.

---

# 1. PRODUCT VISION

Create an elegant, romantic, slightly chaotic interactive Valentine website.

Tone:

* Soft romantic
* Chaotic playful sarcasm
* Anime-inspired emotional pacing
* Premium glassmorphism aesthetic

Experience arc:

1. Curiosity
2. Funny resistance
3. Chaotic escalation
4. Inside joke connection
5. Romantic sincerity
6. Celebration + picnic reveal

---

# 2. FILE STRUCTURE (MANDATORY)

Codex must output:

```
index.html
styles.css
app.js
vercel.json
```

Expected assets:

```
/videos/
  video1.mp4
  video2.mp4
  video3.mp4
  video4.mp4
  video5.mp4
  video6.mp4
  video7.mp4
```

Optional:

```
/assets/noise.png
```

---

# 3. GLOBAL DESIGN SYSTEM

## Theme

**Midnight Romantic — Luxury Glass**

---

## CSS Variables (REQUIRED)

```css
:root {
  --bg-deep:#0e0b1a;
  --bg-mid:#17122b;
  --bg-soft:#23183a;

  --accent-pink:#ff4f8b;
  --accent-rose:#ff6fa7;
  --accent-lavender:#a78bfa;

  --glass-bg:rgba(255,255,255,0.10);
  --glass-border:rgba(255,255,255,0.18);

  --text-primary:#ffffff;
  --text-secondary:rgba(255,255,255,0.75);

  --radius-card:24px;
  --radius-inner:18px;

  --ease:cubic-bezier(0.22,1,0.36,1);
}
```

---

# 4. BACKGROUND SYSTEM (3 LAYERS)

## Layer 1 — Animated Gradient

* Slow movement (20–30s loop).
* Multi radial + linear gradients.
* Must feel cinematic and soft.

## Layer 2 — Floating Glow Blobs

* 6–8 blurred radial blobs.
* Pink/lavender.
* Very slow drifting animations.

## Layer 3 — Grain Overlay (optional)

* Low opacity noise texture.

---

# 5. MAIN LAYOUT

## Fullscreen center layout

```
body
 ├── background layers
 ├── ambient blobs
 └── centered container
      └── glass card
           ├── video section (top)
           └── content section (bottom)
```

---

## Glass Split Card

Requirements:

* width: max 560px
* responsive mobile
* backdrop blur glass
* soft glow halo
* rounded edges

⚠️ Performance rule:

* Blur must be limited (approx 10–16px range recommended for performance) ([Developer Playground][1])
* Include `-webkit-backdrop-filter` for Safari ([Developer Playground][1])
* Provide fallback background if unsupported.

Example:

```css
@supports (backdrop-filter: blur(10px)) or
(-webkit-backdrop-filter: blur(10px)) {
}
```

---

# 6. VIDEO CONTAINER

* Single `<video>` element only.
* Rounded frame.
* Glass border.
* Soft glow.

Video attributes:

```
autoplay
muted
playsinline
```

Transition on state change:

* fade
* slight scale (0.985 → 1)
* 300–400ms

---

# 7. TYPOGRAPHY

Font: **Inter**

Hierarchy:

* Question: weight 700
* Caption: weight 500
* Buttons: weight 600

Spacing must feel premium and breathable.

---

# 8. DIRECTOR-LEVEL UI ADDITIONS (MANDATORY)

Implement these subtle premium touches:

1. Hero glass name chip:

   ```
   KITTY (formerly known as TYGRESS)
   ```

2. Cinematic gradient divider between video and content.

3. Sound toggle glass icon near video (muted default).

4. Caption slide-fade reveal (not typing).

5. Active button spotlight glow.

6. Progress dots wave animation.

7. Finale glass morph transition.

---

# 9. BUTTON SYSTEM (GLASS BUTTONS)

## Base

* Neutral glass
* subtle border highlight
* blur backdrop

## Hover

* scale 1.03
* glow increase

## Click

* scale 0.97
* ripple effect

Micro interaction timing:

* 180–220ms.

---

# 10. PROGRESS DOTS

* Glass circles.
* Current dot pulses.
* Completed dots glow pink.
* Wave animation on state change.

---

# 11. ANIMATION MODEL (3 LAYERS)

## Ambient

Always running:

* gradient movement
* blob drifting
* glow breathing

## Interactive

Hover / click reactions.

## Narrative

Triggered transitions:

* video swaps
* caption change
* card shake
* finale bloom

---

# 12. STATE MACHINE (CRITICAL)

Use a JS array.

Each state:

```js
{
  video,
  caption,
  yesText,
  noText,
  yesScale,
  noMode,
  step
}
```

noMode values:

* normal
* hoverDodge
* teleport
* shy

---

# 13. EXACT NARRATIVE CONTENT

## Scene 0

Caption:
“Kitty (formerly known as Tygress), I have a question.”

Buttons:

* Yes, Zen
* No, I’m a Tygress

Video:
video1.mp4

---

## Scene 1

Caption:
“Ei Kitty. Are you sure.”
Video2.

---

## Scene 2

Caption:
“Me ne wayɛ aka”
Video3.
Yes button grows slightly.

---

## Scene 3

Caption:
“You just activated my anime opening.”
Video4.
Small card shake.

---

## Scene 4

Caption:
“The cat is angry on your behalf. Please choose peace.”
Video5.
No button hover dodge.

---

## Scene 5

Caption:
“No no. This can’t be. The universe is bugged.”
Video6.
No button teleport mode.

---

## Scene 6

Caption:
“Okay jokes aside, I really like you.”
Video7.
No button shy mode.

---

# 14. YES BUTTON FINALE

When Yes clicked:

Sequence:

1. Card glow bloom.
2. Confetti explosion.
3. Glass morph transition.
4. Reveal picnic mission card.

Use **canvas-confetti** via CDN.

Implementation requirements:

* single canvas
* lightweight usage
* respect reduced motion if possible ([GitHub][2])

---

## Picnic Card Content

Title:
**Picnic Date Quest**

Options:

* Sunset picnic
* Golden hour picnic
* Main character picnic

Text:

> Me ne wayɛ aka, but you make everything calm.

---

# 15. PERFORMANCE REQUIREMENTS

* 60fps target.
* Animate only transform + opacity.
* Never animate blur values.
* Limit number of glass elements. ([Boring Reliability][3])
* Blur radius moderate for mobile performance.

---

# 16. ACCESSIBILITY

* Large tap targets.
* Readable text contrast.
* Works muted by default.
* Respect reduced motion for confetti.

---

# 17. VERCEL CONFIG

Generate:

```json
{
  "headers":[
    {
      "source":"/videos/(.*)",
      "headers":[
        {
          "key":"Cache-Control",
          "value":"public,max-age=31536000,immutable"
        }
      ]
    }
  ]
}
```

---

# 18. SENIOR FRONTEND POLISH RULES (MUST FOLLOW)

* Layer depth separation.
* Glow hierarchy:

  * ambient soft
  * hover medium
  * narrative strong but short.
* Motion consistency with same easing.
* Slight stagger between transitions.
* Breathing idle animation on card.
* Finale is only major wow moment.

---

Apple-level polish pass

Five tiny refinements. Each is light. Together they make the page feel “expensive” before anything even happens.

1. Subpixel typography tuning

This is the silent killer feature.

Do this:

headings: slightly tighter tracking

body: normal tracking

buttons: slightly wider tracking

Specs:

Question: letter-spacing: -0.02em;

Caption: letter-spacing: -0.005em;

Buttons: letter-spacing: 0.01em;

Also:

-webkit-font-smoothing: antialiased;

text-rendering: optimizeLegibility;

2. “Specular edge” highlight on glass

Real glass has a bright edge and a softer body.

Add to card:

top highlight line

inner shadow

subtle vertical gradient

Spec:

a pseudo element that draws a 1px highlight on the top edge

opacity 0.18 to 0.28

This instantly upgrades glass realism.

3. Cursor-aware glow drift (desktop only)

Not parallax for the whole card. Just the glow.

When mouse moves over the card:

glow halo shifts 6px to 10px max

easing is slow

Result:
Feels like the UI is physically reacting to light.

Rule:
Disable on touch devices.

4. Transition staging with micro delays

Premium UIs rarely change everything at once.

When state updates:

0ms: button press feedback

80ms: caption fades out

140ms: video fades out

200ms: swap sources and text

260ms: fade in new video

320ms: fade in caption

420ms: progress dots wave

This gives rhythm and intention.

5. Reduce intensity on mobile automatically

Mobile should feel calmer and faster.

On small screens:

reduce blur by about 20 percent

reduce glow opacity by about 25 percent

reduce blob size slightly

Why:
Your page will feel designed for mobile, not merely responsive.

Optional luxury touch that costs almost nothing
Haptic-like tap feedback

On tap:

add a tiny “tap flash” circle behind the button for 120ms

very low opacity

pairs beautifully with ripple

# 19. OUTPUT QUALITY TARGET

The generated site must feel like:

* modern luxury landing page
* cinematic UI
* designer-built product
* emotionally paced interaction

---

# 20. FINAL CODING CONSTRAINTS

* No frameworks.
* No unnecessary libraries.
* Clean semantic HTML.
* Organized CSS sections.
* Clear JS logic.

---

## END OF FINAL ALL-IN-ONE CODEX PRD PROMPT

[1]: https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide?utm_source=chatgpt.com "Glassmorphism Design Trend: Complete Implementation Guide (2025) | Developer Playground Blog | Developer Playground"
[2]: https://github.com/catdad/canvas-confetti?utm_source=chatgpt.com "GitHub - catdad/canvas-confetti: 🎉 performant confetti animation in the browser"
[3]: https://www.boringreliability.dev/css-magic/glassmorphism?utm_source=chatgpt.com "Calm UX & Dark Magic – Boring Reliability"
