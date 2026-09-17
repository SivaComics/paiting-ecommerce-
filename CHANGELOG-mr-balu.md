# Changelog: Mr. Balu artist showcase

The existing Next.js build was reshaped into a single-artist showcase with a shop. The stack, routing, cart, and the kept routes are unchanged. Every line of artist and artwork copy comes from the two client documents: the Harmonious Science (HS) commentary "Artworks – Mr. Balu", and "Two Approaches of Art – HS" (The Path Through Simplicity).

## Removed

- **Scroll video hero.** Removed `ScrollVideoHero`, `HeroNarrativeOverlay`, `lib/hero-scroll-progress.ts`, `public/scroll-solar-flare-clean.mp4`, `public/hero-posters/`, and `scripts/encode-hero.sh`.
- **Slideshow hero and loading counter.** Removed `HeroWithIntro`, `Hero`, and `IntroLoader`.
- **Header hero logic.** Removed the hide-until-hero-ends behaviour. The header is sticky and visible from the first frame.
- **Marketplace sections.** Removed Discover Art, Editor's Picks, Press bar, White-Glove Promise, and the footer trust strip. The footer's Assurance, Advisory, and Discover columns are gone too.
- **Ask Auré.** The chat is no longer rendered. Its component and `/api/concierge` stay in code.
- **Header extras.** Search, wishlist, and account menu are no longer in the header.
- **Fictional data.** Removed the 10 artists and 27 works, plus the collections, press logos, and mock orders, favourites, and follows that referenced them.
- **Unconfirmed purchase promises.** The detail page no longer mentions framing upgrades, financing, insured shipping, or a certificate of authenticity. None of these are confirmed for these works.

## Added

- **Homepage, in order:**
  1. Opening: the artist's name, one line, and a pull-quote.
  2. The Work (`#work`): the Path Through Simplicity, the HS framing, the "event" quote with இது ஒரு நிகழ்வு, and the bio placeholder.
  3. The Paintings (`#paintings`): one work at a time, in a copper frame, with Acquire, Enquire, and a link to the detail page.
  4. The Elements: circle, triangle, square, space, and colour, plus the Potential → Unity sequence.
  5. The closing HS sentence, then Enquiries & Commissions (`#contact`).
- **Navigation.** Work / Paintings / Contact, in both the header and the footer.
- **Six paintings.** These are the works the commentary names: Nine Colours, Yin-Yang, Pancha-bhutha, and the green, blue, and red paintings. Each reflection is drawn only from the passage about that work.
- **Shop flow.**
  - **Acquire** adds the painting to the bag. Each painting is an original, so it can only be added once.
  - **Enquire** opens an email with the painting named in the subject.
  - The bag shows **Price on request** until every work in it has a price. After that it shows a total automatically.
  - The bag has an "Enquire to acquire" email that lists the works in it.
  - There are no online payments.
- **Placeholder images.** Six minimal SVG compositions in `public/paintings/placeholder/`, one per work, each drawn from the commentary's description of that painting. Every one is marked `TEMP PLACEHOLDER`.
- **Detail pages** (`/artwork/[slug]`). They use the same reflection and placeholders, with the image in a copper frame.

## Where things live

| What | File |
|---|---|
| Site name, artist name, contact email, nav, placeholder text | `src/lib/site.ts` |
| Painting image paths (swap real photos in here) | `src/lib/data/painting-images.ts` |
| Painting data and reflections | `src/lib/data/artworks.ts` |
| Artist data | `src/lib/data/artists.ts` |
| **Copper tokens and finish** | **`src/app/globals.css`**, top of `:root` |

### Copper finish

- **Tokens.** `--copper-highlight`, `--copper-light`, `--copper-mid`, `--copper-deep`, and `--copper-shadow`. The site's older `copper` colours now point at these, so they are the only copper values in the codebase.
- **`--copper-brushed`.** A multi-band vertical-light gradient for frames.
- **`--copper-brushed-line`.** A variant for 1–2px lines, with no highlight stop.
- **`--copper-grain`.** A fine vertical brushing texture.
- **Classes:**
  - `copper-rule`: 1px dividers.
  - `copper-outline` and `copper-outline-2`: 1–2px outlines. These take variants, e.g. `hover:copper-outline`.
  - `copper-frame`: a 3px (mobile) or 4px frame with a lit top edge and a dark inner lip.
- **Where it's applied.** Header and footer rules, section dividers, painting frames, the bag, the detail-page panel, Enquire buttons, the primary button on hover, and keyboard focus.
- **Contrast.** On the cream ground, `--copper-highlight` measures about 2:1, which is too faint for thin lines. The line gradient therefore leans mid and deep, and the full highlight banding appears only on frames. Copper small text uses `--copper-deep`, which passes AA.
- **Texture image.** The copper texture was pasted into chat, not supplied as a file, so it is not embedded. The CSS gradient and grain recreate it. To use the photo itself, add it to `/public` and use it as a background layer in `.copper-frame`.

## Placeholders the client needs to fill

### Site
- [ ] `[TBC: site name]`: "Auréline" is a stand-in (`SITE_NAME` in `src/lib/site.ts`).
- [x] Artist name: now shown in full as "K. Balasubramanian" (`ARTIST_NAME` in `src/lib/site.ts`). The client documents call him "Mr. Balu".
- [ ] `[TBC: client email]`: used by every Enquire link and the contact section.
- [ ] `[TBC: bio]`: biography facts for "About the artist".
- [ ] `[TBC: commissions details]`: whether commissions are accepted, and on what terms.

### For each painting (all six)

Covers the Nine Colours, Yin-Yang, Pancha-bhutha, green, blue, and red paintings.

- [ ] `[TBC: title]`
- [ ] `[TBC: medium]`
- [ ] `[TBC: dimensions]`
- [ ] `[TBC: year]`
- [ ] `[TBC: price]`: shown as "Price on request" until set.
- [ ] Currency: the data currently says USD.
- [ ] Availability: all are currently marked available.
- [ ] A photograph to replace the temporary placeholder image.

### Questions
- [ ] **Green painting vs. Pancha-bhutha.** The commentary mentions both "the green painting" and "the green composition with five horizontal bands". Are they the same work? If so, delete `green-painting` from `artworks.ts` and `painting-images.ts`.
- [ ] **Other paintings.** The commentary says "nearly every painting" has a circle, so there are more works. Each extra work needs a photo and details. Any reflection for it should come only from the documents, or stay blank.
- [ ] **Artist portrait** (`[TBC: artist portrait]`). Only the unlinked `/artist/balu` route uses it.
- [ ] **Location** (`[TBC: location]`). Only the unlinked routes use it.

## Kept in code, not linked

`/discover`, `/artists`, `/artist/balu`, `/philosophy`, `/dashboard`, `/sign-in`, `/sign-up`, `/api/concierge`, and `/api/room-preview` all still build and load. No header, footer, or homepage link points to them.

- **Philosophy page.** `/philosophy` has its own, older write-up of the same framework. It has not been re-checked against the PDFs.
- **Ask Auré.** The system prompt still describes the old marketplace's policies: certificates, returns, and escrow. Update it before the chat is turned back on.
- **GalleryIntro.** `src/components/home/gallery-intro/GalleryIntro.tsx` is a scroll-scrubbing intro that was already unused before this change. It was left in place.

---

## Update: real photographs

- **Source.** The placeholder drawings are replaced with photos from the yathraemagazine.com article "Renowned Artist K. Balasubramanian": eight paintings and one portrait of the artist.
- **Cropping.** Each painting photo is cropped to the edge of the painting and resized for the web. The originals and the crop script (`crop_images.py`) are in `assets/source-photos/`. They are kept out of `public/`, so the originals are not published.
- **Paintings section.** It now shows all eight works as "Painting No. 01" to "Painting No. 08". Each has `[TBC: title]`, `[TBC: medium]`, `[TBC: dimensions]`, `[TBC: year]` and "Price on request".
- **Descriptions taken off.** The PDF descriptions no longer appear on the paintings, because none of the photos can be matched with certainty to the six works the commentary names. The descriptions are kept in `src/lib/data/commentary-reflections.ts`, ready to go back on.
- **Top of the homepage.** The artist's portrait now sits in the copper frame there, replacing the Yin-Yang painting.
- **Image paths.** All image paths are still in `src/lib/data/painting-images.ts`.

### New items to confirm with the client
- [ ] **Permission.** Is the client cleared to use the magazine's photographs on this site?
- [ ] **Photo credit.** What credit line, if any, should appear for the photos?
- [ ] **Which photo is which.** Which photographs are the Nine Colours, Yin-Yang, Pancha-bhutha, green, blue and red paintings?
- [x] **Artist's name.** Changed to the full name, "K. Balasubramanian", as given in the article.
- [ ] **Titles and details.** Titles, medium, dimensions, year and price are needed for all eight paintings.
- [ ] **Better photos.** Photos 7 and 8 (the blue works) may be cropped at the top in the original photographs.

---

## Update: the artist's words

- **Name on one line.** "K. Balasubramanian" now sits on a single line, sized to fit on phones, tablets and desktops.
- **Introduction at the top.**
  - A factual line about him: Chennai; College of Arts and Crafts, Chennai; exhibitions in India and abroad.
  - His own statement: "My art reflects a life philosophy of taking things as they come, communicating the emotions through symbols and geometric forms."
  - Both are taken from the article.
- **Moved quote.** The HS line "The artwork reveals depth through reduction." now sits under "The Path Through Simplicity" in The Work.
- **About the artist.** The `[TBC: bio]` placeholder is replaced by his biography from the article (training, exhibitions, awards), with a link to the article.
- **Each painting** now has:
  - **In the painting:** a plain description of what is visible.
  - **In his words:** one of his exact published quotes, with a caption saying honestly what he was talking about.
- **No reasons invented.** The article and the PDFs never explain why a single painting was made, so no painting is given one.
- **Where it lives.** The artist's quotes and biography are in `src/lib/data/artist-words.ts`. Each painting's description and quote choice are in `src/lib/data/artworks.ts`.
- **Checked against the article.** All eight quotes and nine biography facts were verified word for word against the live page.

### New items to confirm with the client
- [ ] **Painting stories.** Ask the artist for a sentence on each painting, and on why he made it, in his own words. These would replace or sit beside the current "In his words" quotes.
- [ ] **Two readings of the triangle.** His reading (Shakti; Atman and Paramatman) and the HS commentary's reading (the geometry of transformation) both appear on the site, each attributed. Confirm that's acceptable.

---

## Update: "A life in painting" timeline

- **What it is.** The empty space in the left column of The Work is filled with a copper timeline of the artist's milestones, from 1981 to 2012: exhibitions, training and awards. It sits beside "About the artist".
- **How it moves.** The line draws down as you scroll to it, and each year fades in after it.
- **Where the facts come from.** Every entry is from the yathraemagazine.com article and was checked word for word against it.
- **Where it lives.** The data is `ARTIST_TIMELINE` in `src/lib/data/artist-words.ts`.
- **Layout.** The timeline is sized so both columns end at the same point on desktop.

---

## Update: art-first opening and "About" panel

These changes follow the manager's review: less about the artist on the page, more about the paintings.

- **Opening redesigned.**
  - The portrait, biography line and artist quote are gone.
  - The commentary's diagram (square, circle, small triangle, centre point) draws itself in copper.
  - As you scroll, the square turns away, the triangle rises, and painting No. 06 appears inside the drawn circle, which lines up with the painting's own ring. It then opens out into the full painting in its copper frame, with "The circle retains."
  - The section is `src/components/home/ArtistOpening.tsx`.
- **About the artist, on request.**
  - The biography and the "A life in painting" timeline are no longer on the page.
  - They open in a slide-in panel from "About" in the header, "About the artist" in the footer, or "Paintings by K. Balasubramanian" in the opening.
  - The panel closes with Escape, the close button, or a click outside it.
  - The component is `src/components/artist-panel/ArtistPanel.tsx`.
- **The Work shortened.** It keeps the diagram panel, the lead paragraph, one supporting paragraph and the "event" quote. The HS definition quote and two paragraphs were removed.

