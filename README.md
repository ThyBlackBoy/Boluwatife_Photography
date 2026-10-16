# Boluwatife Photography

A standalone GitHub-ready copy of the Boluwatife Photography website. It includes the complete React + TypeScript source, the BP logo, and all 31 unique portfolio photographs used on the site. The 20 newly added images are optimized WebP files.

## Run it locally

You need Node.js 20.19 or newer.

1. Extract this ZIP.
2. Open a terminal in the `boluwatife-photography` folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local address printed in the terminal.

To check the production build, run:

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Push it to GitHub

Create a new empty repository on GitHub, extract this ZIP, and run these commands from the extracted project folder:

```bash
git init
git add .
git commit -m "Add Boluwatife Photography website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example repository address with your own.

## Project contents

- `src/App.tsx` — page, portfolio filters and lightbox, session menu, booking form, and policies
- `src/booking-config.ts` — package prices, included image counts, business WhatsApp number, policies, and photo captions
- `src/index.css` — site styling and responsive layouts
- `src/main.tsx` — React entry point and error boundary
- `public/brand-logo.png` — supplied BP logo, also used as the favicon
- `public/images/website-images/` — the 31 portfolio images (original JPGs plus optimized WebP additions)

## Update business details

Edit `src/booking-config.ts` to update package prices, included edited images, the WhatsApp recipient, or policy wording. The WhatsApp number is intended to be public on the booking link; keep it in international digits-only format without a leading `+`.

To add or replace portfolio photographs, place the files in `public/images/website-images/` and update the `portfolio` list in `src/booking-config.ts`. The gallery supports both JPG and WebP files. The Instagram, TikTok, and X links are in `src/App.tsx`.

## Notes

- This is a static frontend; it does not store booking details in a database.
- A booking form submission opens WhatsApp with a prefilled enquiry. A WhatsApp message is an enquiry, not a confirmed booking.
- Fonts are loaded from Google Fonts; the rest of the site and photographs are included locally.
- Social links use the handles supplied by the owner: Instagram `boluwatifephotographyco`, TikTok `boluwatife_photography`, and X `CreativeBolu`.
