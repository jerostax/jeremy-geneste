# Resume sources

`fr.html` and `en.html` (with `cv.css`) are the source of the resumes published in `public/cv/`.

To regenerate a PDF after editing a source:

1. Open the HTML file in Chrome or Edge (through a local server, e.g. `npx serve cv`, so the font loads).
2. Print to PDF: A4, margins "Default", headers and footers off, background graphics on. The page size and margins come from `@page` in `cv.css`.
3. Check it fits on one page, then replace `public/cv/jeremy-geneste-cv-fr.pdf` or `-en.pdf`.

Never add a phone number or a postal address beyond the city: these files are public and indexed.
