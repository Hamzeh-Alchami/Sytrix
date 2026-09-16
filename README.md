# Sytrix — company website

Static marketing site for **Sytrix**, an AI workshops, training and consulting practice serving the GCC (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain). Content is derived from the *AI Workshops, Training & Consulting for GCC Companies* feasibility study.

No build step. Plain HTML, CSS and JavaScript — deployable to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static host.

## Structure

```
index.html                 English site (hero → readiness gap → services → outcomes → approach → industries → why → briefings → FAQ → contact)
ar/index.html              Arabic site, same structure, right-to-left
assets/css/style.css       Styles. Brand tokens live in :root at the top; RTL rules at the bottom.
assets/js/main.js          Mobile nav, scroll reveals, animated bars, contact form (shared by both languages).
assets/img/logo.svg        SYTRIX wordmark, navy → slate (light backgrounds)
assets/img/logo-light.svg  SYTRIX wordmark, white → slate (dark backgrounds)
assets/img/favicon.svg
```

Live domain: https://sytrix.net (English) and https://sytrix.net/ar/ (Arabic). Both pages carry `hreflang` links to each other.

## Run locally

Open `index.html` directly, or serve it:

```
python3 -m http.server 8080
```

## Customising

- **Logo:** the wordmark SVGs are vector recreations of the supplied logo. To use the original artwork instead, overwrite `assets/img/logo.svg` and `assets/img/logo-light.svg` keeping the 2000×250 aspect ratio (the header sizes it by height).
- **Colours / fonts:** edit the tokens in `:root` at the top of `assets/css/style.css` (`--navy`, `--slate-*`, `--accent`, fonts, surfaces).
- **Contact details:** `CONTACT_EMAIL` and `CONTACT_PHONE` in `assets/js/main.js` populate every email/phone link on both pages.
- **Form handling:** set `FORM_ENDPOINT` in `assets/js/main.js` to a Formspree/Basin/own endpoint. If empty, the form falls back to opening the visitor's email client with a pre-filled message. Status messages are read from `data-msg-*` attributes on each form, so each language has its own wording.
- **Arabic copy:** edit `ar/index.html` directly. It shares the stylesheet and script with the English page.

## Notes on statistics

Figures on the site (e.g. ~1% of firms fully AI-ready, 84% workflows not redesigned) are directional numbers from the feasibility study's secondary research. Verify against original sources before relying on them in investor or regulated materials.
