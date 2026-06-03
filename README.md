# Matvey Ermakov — Portfolio

Modern, minimal frontend developer portfolio built with Vite, React, and Tailwind CSS.

## Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Project structure

```
src/
  components/
    layout/     # MainLayout, Navbar, Footer, MobileMenu, ScrollProgress
    sections/   # Hero, FeaturedProjects, AllProjects, Skills, About, Contact
    ui/         # Section, Container, SectionHeader, Reveal, Button, SafeImage, SocialLinks
    projects/   # TechPill, ProjectFilters
    skills/     # SkillCategoryCard
    contact/    # ContactForm, ContactLinkCard
    icons/      # BrandIcons
  data/         # projects, skills, about, contact content
  hooks/        # useRevealVariants, useScrolled, useScrollLock, useMediaQuery, useScrollProgress, useFocusTrap
  lib/          # constants, scroll, cn, emailjs
  index.css     # Design tokens and utility classes
  App.jsx
  main.jsx
```

## Design system

Tokens live in `src/index.css` (`:root` CSS variables) and are mapped in `tailwind.config.js`:

- **Colors:** `background`, `foreground`, `muted`, `accent`, `border`, `surface`
- **Radius:** `sm`, `md`, `lg`, `xl` (via CSS variables)
- **Utilities:** `.surface-card`, `.surface-card-interactive`, `.text-section-title`, `.text-section-lead`

## Contact form (EmailJS)

The contact form is optional and only renders when EmailJS environment variables are set.

1. Create an account at [EmailJS](https://www.emailjs.com/) and add an email service and template.
2. Copy `.env.example` to `.env` and fill in:

   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

3. In your EmailJS template, use these form field names:

   - `from_name` — sender name
   - `reply_to` — sender email
   - `message` — message body

Never commit `.env` or hardcode keys in source.

## Assets

Place your resume at `public/resume.pdf`, then set `HERO.resumeAvailable` to `true` in `src/lib/constants.js` to show the hero Resume CTA.

Project and about photos fall back to `public/images/placeholder.svg` when a file is missing.

## Production checklist

- [ ] Set real GitHub/LinkedIn URLs in `src/lib/constants.js`
- [ ] Add project images and copy in `src/data/`
- [ ] Add `public/resume.pdf` and set `HERO.resumeAvailable: true`
- [ ] Configure EmailJS `.env` for contact form (optional)
- [ ] Run `npm run build` and deploy `dist/`
