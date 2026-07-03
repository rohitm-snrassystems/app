# Commercion Exim Pvt Ltd — Corporate Website (PRD)

## Original problem statement
B2B website for COMMERCION EXIM PVT LTD, a Global Export & Import Trading Company. Must inspire trust, reliability, and global reach. Sections: Hero, About, Product Categories (10), Why Choose Us, Contact form. Target domain: commercionexim.com.

## User choices
- Contact form: MongoDB + Resend email to info@commercionexim.com
- Extras: WhatsApp floating button, brochure download placeholder, EN/HI multi-language, testimonials, certifications section
- Design vibe: Ocean blue + warm copper (blended with charcoal/emerald accents)

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + shadcn/ui
- **Backend**: FastAPI + Motor (MongoDB async) + httpx
- **Email**: Emergent-managed Resend proxy (POST /api/v1/email/send)

## Implemented (2026-07-03)
- Sticky glass header with EN/HI language toggle, mobile menu, brochure CTA
- Hero: full-viewport cargo-port image, headline, dual CTA, 4 stat cards
- About: image + 4 commitment points + 8 client-logo bar
- Products: 10 HD category cards (grid) with request-quote CTA
- Why Choose Us: 6-item dark navy section with icons (copper + emerald)
- Testimonials: 3 quote cards with star rating
- Certifications: 4 badges (IEC / MSME / GST / ISO)
- Contact: split layout, shadcn form (Input/Textarea/Select), lead submission → MongoDB `leads` + email to info@commercionexim.com
- Footer: brand, social, categories, contact, IEC/GST chips
- Floating WhatsApp button (bottom-right, pulsing)
- Full Hindi (हिन्दी) translation via LanguageContext

## Backend API
- `POST /api/leads` – create lead, notify email
- `GET /api/leads` – list leads
- `GET /api/health`

## Backlog (P1 / P2)
- P1: Live brochure PDF (currently placeholder toast)
- P1: Admin dashboard for viewing leads
- P2: Product detail pages with specs / MOQ
- P2: Multi-image gallery per category
- P2: reCAPTCHA on contact form
- P2: Blog / Trade Insights section for SEO
