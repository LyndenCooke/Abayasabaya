# Abayasabaya - Premium Abaya E-Commerce

## Project Overview
A modern, elegant e-commerce website for a premium abaya boutique based in Qatar, serving GCC and international customers.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Architecture**: Component-based with reusable UI components

## Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── shop/         # Shop/Collections page
│   ├── product/      # Product detail pages (dynamic [slug])
│   ├── about/        # About Us page
│   ├── contact/      # Contact page
│   └── cart/         # Cart/Checkout page
├── components/
│   ├── layout/       # Navbar, Footer, page wrappers
│   ├── sections/     # Page-specific sections (hero, testimonials, etc.)
│   └── ui/           # Reusable primitives (buttons, modals, cards)
├── data/             # Mock product data JSON
├── lib/              # Utilities, helpers, cart context
└── types/            # TypeScript type definitions
```

## Design System
- **Colors**: Deep black (#0A0A0A), gold (#C5A467), cream (#FAF7F2), ivory (#FFF8F0), rose gold (#B76E79)
- **Typography**: Playfair Display (headings), Inter (body text)
- **Tone**: Luxurious, minimal, spacious whitespace, elegant transitions

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build (run this to verify changes)
- `npm run lint` — Run ESLint

## Session Start Hook
A SessionStart hook is configured in `.claude/settings.json` that runs `npm install && npm run build` when a new Claude Code session begins. This ensures dependencies are installed and the project compiles before any work starts.

## Development Guidelines
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Semantic HTML with proper heading hierarchy
- All images use descriptive alt text
- Price currency: QAR (Qatari Riyal)
- English primary with RTL Arabic support ready (dir attribute on html)
- Always run `npm run build` after making changes to verify compilation
- Use Framer Motion for all animations — keep them subtle and elegant
- All product images come from Unsplash (configured in next.config.ts)

## Skill Creator — ALWAYS CREATE SKILLS
Whenever you perform a task more than once, or encounter a pattern that will repeat, you MUST create a skill and document it here. This is mandatory, not optional.

**When to create a skill:**
- Any task you do more than once (e.g., creating a component, adding a page)
- Any multi-step process that follows a pattern
- Any workflow that another developer (or future Claude session) would benefit from

**How to create a skill:**
1. Document the step-by-step process under the Skills section below
2. Include the file paths, naming conventions, and code patterns
3. Reference existing examples from the codebase
4. Keep instructions concrete and actionable

## Skills

### Create New Component
1. Determine if it needs `'use client'` (interactive = yes, display-only = no)
2. Create file in appropriate `src/components/` subdirectory:
   - `layout/` — Navbar, Footer, page wrappers
   - `sections/` — Page-specific sections (hero, testimonials)
   - `ui/` — Reusable primitives (buttons, modals, cards)
3. Use TypeScript with explicit prop interface
4. Export as named export (not default)
5. Naming: PascalCase file and component name
6. Styling: Tailwind classes, use design system colors (gold, cream, ivory, deep-black, rose-gold, charcoal)
7. Font references: `font-[family-name:var(--font-playfair)]` for headings, body uses Inter via CSS
8. Example pattern:
```tsx
'use client';
import { motion } from 'framer-motion';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl">{title}</h2>
    </motion.div>
  );
}
```

### Create New Page
1. Create directory under `src/app/` (e.g., `src/app/new-page/`)
2. Add `page.tsx` with default export
3. For static pages, include metadata export:
```tsx
export const metadata = { title: 'Page Title' };
```
4. For client pages, add `'use client'` and compose from section components
5. Follow the established layout pattern: header section with bg-ivory + pt-28, content section with max-w-7xl
6. Use Framer Motion for entrance animations

### Add New Product
1. Edit `src/data/products.json`
2. Follow schema: `{ id, slug, name, price, originalPrice?, description, category, sizes, colors: [{name, hex}], fabric, careInstructions: string[], images: string[], featured?, newArrival?, bestSeller? }`
3. Categories: "Casual", "Evening", "Bridal", "Haute Couture"
4. Slug: lowercase, hyphen-separated, URL-safe
5. Images: Unsplash URLs with `?w=800&q=80` params
6. Sizes: subset of ["XS", "S", "M", "L", "XL", "XXL"]

### Add New Collection
1. Edit `src/data/collections.json`
2. Follow schema: `{ id, name, slug, description, image }`
3. Slug must match a category value (lowercase, hyphenated)

### Add Animation to Section
1. Import `useRef` and `useInView` from framer-motion
2. Create ref and check visibility: `const isInView = useInView(ref, { once: true, margin: '-80px' })`
3. Wrap content in `motion.div` with conditional animate
4. Keep animations subtle: `opacity: 0 → 1`, `y: 20 → 0`, duration ~0.6s
