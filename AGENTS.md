# AGENTS.md - PT. Comtech Metalindo Terpadu (COMET)

This file contains instructions for AI coding agents working on the COMET project.

## Project Overview

COMET is a Next.js 15 multilingual website for PT. Comtech Metalindo Terpadu, built with TypeScript, React 19, and TailwindCSS. The project focuses on modern roofing solutions with internationalization support (English/Indonesian).

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4.1.13
- **UI Components**: Radix UI primitives, shadcn/ui pattern
- **Internationalization**: Custom dictionary system with locale routing
- **Build Tool**: Uses standard Next.js build process
- **Package Manager**: Supports npm/yarn/pnpm/bun

## Development Commands

```bash
# Start development server
npm run dev          # or yarn/pnpm/bun dev

# Build for production
npm run build        # or yarn/pnpm/bun build

# Start production server
npm run start        # or yarn/pnpm/bun start

# Run linting
npm run lint         # ESLint with Next.js config
```

## Project Structure

```
src/
├── app/[lang]/              # Internationalized routes
│   ├── contact/            # Contact page
│   ├── dictionaries/        # Language dictionaries and utilities
│   ├── home/               # Home page components
│   └── utils/              # Route-specific utilities
├── components/
│   ├── app/                # App-level components (header, footer, etc.)
│   ├── assets/             # SVG icon components
│   └── ui/                 # Reusable UI components (shadcn/ui style)
├── lib/                    # Shared utilities
└── middleware.ts           # Locale detection middleware
```

## Code Style & Conventions

### TypeScript
- Strict mode enabled in tsconfig.json
- Use proper typing for all components and functions
- Prefer type imports: `import type { ComponentType } from "react"`

### Components
- Use functional components with TypeScript
- Follow shadcn/ui patterns for UI components
- Place reusable components in `src/components/ui/`
- App-specific components go in `src/components/app/`

### Styling
- Primary: TailwindCSS classes
- Use class-variance-authority for component variants
- Utility: tailwind-merge (tw-merge) for conditional classes
- Custom fonts: Geist and Exo 2 from next/font/google

### Internationalization
- **Required Languages**: Must implement both `id` (Bahasa Indonesia) and `en` (English)
- **Dictionary files**: Located at `src/app/[lang]/dictionaries/` with structure:
  - `src/app/[lang]/dictionaries/en/index.json` - English translations
  - `src/app/[lang]/dictionaries/id/index.json` - Indonesian translations
  - `src/app/[lang]/dictionaries/index.ts` - Dictionary loader utility
- **Language Detection**: Automatic language detection via middleware
  - Setup in `src/middleware.ts`
  - Detects browser language from `accept-language` header
  - Redirects to appropriate locale if not present in URL
  - Default locale: `en` (English)
- Use `getDictionary()` function from `src/app/[lang]/dictionaries/index.ts` for translations
- Locale routing via `[lang]` dynamic segment

## Key Dependencies

- **UI**: @radix-ui components, lucide-react icons
- **Styling**: class-variance-authority, clsx, tailwind-merge
- **Internationalization**: @formatjs/intl-localematcher, negotiator
- **Interactive**: swiper for carousels

## File Naming
- Use kebab-case for files: `hero-cover.tsx`, `brand-button.tsx`
- Component files should match component name
- Use descriptive names that reflect component purpose

## Development Guidelines

1. **Component Creation**: Follow existing patterns in `src/components/`
2. **Styling**: Use TailwindCSS utility classes, avoid custom CSS unless necessary
3. **Internationalization**: Always consider both English and Indonesian content
4. **TypeScript**: Maintain strict typing, use proper interfaces
5. **Performance**: Leverage Next.js optimizations (fonts, images, etc.)

## Testing & Quality

- ESLint configuration with Next.js rules enabled
- Run `npm run lint` before committing changes
- TypeScript compiler provides build-time type checking

## Deployment

- Built for Vercel deployment (default Next.js target)
- Production build via `npm run build`
- Static generation supported for internationalized routes
