# Sytrix — company website

Static marketing site for **Sytrix**, an AI workshops, training and consulting practice serving the GCC (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain). Content is derived from the *AI Workshops, Training & Consulting for GCC Companies* feasibility study.

No build step. Plain HTML, CSS and JavaScript — deployable to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static host.

## Structure

```
index.html            Single-page site (hero → readiness gap → services → outcomes → approach → industries → why → briefings → FAQ → contact)
assets/css/style.css  Styles. Brand tokens live in :root at the top.
assets/js/main.js     Mobile nav, scroll reveals, animated bars, contact form.
assets/img/logo.svg   Placeholder logo mark — replace with the final logo.
assets/img/favicon.svg
```

## Run locally

Open `index.html` directly, or serve it:

```
python3 -m http.server 8080
```

## Customising

- **Logo:** replace `assets/img/logo.svg` (and `favicon.svg`). The header and footer reference it at 38×38px.
- **Colours / fonts:** edit the tokens in `:root` at the top of `assets/css/style.css` (`--brand-teal`, `--brand-blue`, `--brand-gold`, fonts, surfaces).
- **Contact email:** set `CONTACT_EMAIL` in `assets/js/main.js` (currently a placeholder).
- **Form handling:** set `FORM_ENDPOINT` in `assets/js/main.js` to a Formspree/Basin/own endpoint. If empty, the form falls back to opening the visitor's email client with a pre-filled message.
- **Arabic:** the CSS includes `[dir="rtl"]` rules. To add an Arabic version, copy `index.html` to `ar/index.html`, set `<html lang="ar" dir="rtl">`, translate the copy and wire the header language toggle.

## Notes on statistics

Figures on the site (e.g. ~1% of firms fully AI-ready, 84% workflows not redesigned) are directional numbers from the feasibility study's secondary research. Verify against original sources before relying on them in investor or regulated materials.
