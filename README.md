# Hiirad company website

Static, responsive company website for https://hiirad.com, with green and gold branding, the original Hiirad logo, an accessible three-slide homepage, and individual division pages.

## Edit and build

- Edit page content in `scripts/build_site.py`, then run `python scripts/build_site.py`.
- Styles: `assets/style.css`.
- Navigation, slideshow and enquiry review: `assets/site.js`.
- No JavaScript framework, package installation or build service is needed.
- The existing GitHub Pages workflow publishes pushes to `main`.

## Pages

Home, About, Divisions, Enterprise, Logistics, Digital Commerce, Fishing, Resources, Franchises & Partnerships, Projects, Contact, Website Privacy, and a 404 page.

## Clean page URLs

Public pages use directory URLs such as `/about/` and `/contact/`. Internal links, canonical tags and the sitemap use these URLs. The build generates each directory's `index.html` with root-relative assets. Legacy `.html` pages redirect with JavaScript (preserving query strings and anchors) and a meta-refresh fallback. The homepage normalizes `/index.html` to `/` with JavaScript. GitHub Pages does not support custom HTTP 301 rules.

## Quote enquiries

The form validates required fields, builds a preview using textContent, and creates an encoded email draft addressed to info@hiirad.net. Visitors must send the draft themselves. Copying the enquiry and the existing Enterprise online contact form are alternatives. There is no custom server, form database, payment collection, analytics or application storage. No visitor enquiry is sent while reviewing the form.

## Content sources

Reviewed on 20 October 2026:

- Original Hiirad company pages in this repository: company positioning, six business interests, London base, email, phone and logo.
- https://hiirad.net/ currently redirects to https://hiirad.uk/: Enterprise catalogue categories and network positioning.
- https://hiirad.uk/pages/wholesale: business quotations, sourcing and product categories.
- https://hiirad.uk/pages/logistics: air, sea and road shipment enquiries.
- https://hiirad.uk/pages/reseller: independent reseller programme, sourcing and learning.
- https://hiirad.uk/pages/contact: existing online enquiry destination.

Marine enterprise, resources and franchise development retain the original site's exploratory positioning. The site does not introduce unsupported customer counts, testimonials, certifications, company registration numbers or claimed completed projects.

## Photography

Illustrative business and industry photography, not representations of Hiirad-owned offices, facilities or personnel. Downloaded from Unsplash image URLs:

- `city.jpg`: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- `office.jpg`: https://images.unsplash.com/photo-1497366216548-37526070297c

The logo is retained unchanged from the original repository. Reference screenshots guided the layout; no Yenisom branding, claims or product images were reused.

## Accessibility

Semantic navigation and forms, visible focus states, skip link, required field validation, live enquiry status, keyboard-accessible slideshow controls, pause/play, stop on focus/hover, reduced-motion support, and mobile navigation with Escape-to-close. Links and primary content work without JavaScript; quote fallback contact routes remain available.
