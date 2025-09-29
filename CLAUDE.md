# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run Biome linting
- `npm run format` - Format code with Biome

## Project Architecture

This is a Next.js 15 application for YayaGo, a car-sharing platform in Dubai. The project uses:

- **Framework**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 with custom animations
- **UI Components**: Custom component library built on Radix UI primitives
- **Animation**: Framer Motion, GSAP, and Lenis for smooth scrolling
- **Linting/Formatting**: Biome (configured for Next.js and React best practices)
- **Font**: Geist Sans/Mono and Montserrat fonts

### Key Directory Structure

- `app/` - Next.js App Router with nested layouts
  - `(inner)/` - Route group for main application pages with shared layout
  - `auth/` - Authentication pages outside main layout
- `components/` - Reusable UI components
  - `ui/` - Base UI components (shadcn/ui style)
  - `animate-ui/` - Animated UI primitives and effects
  - `kokonutui/` - Third-party UI components
  - `blocks/` - Larger composite components
  - `hero/` - Homepage hero section components
- `lib/` - Utility functions and shared logic
- `seo/` - SEO configuration and metadata

### Routing Structure

The app uses Next.js App Router with route groups:
- Main pages are under `(inner)/` route group sharing a common layout
- Authentication pages (`auth/`) use the root layout
- Dynamic routes for brands, locations, and services

### Component Architecture

- Custom UI components extend Radix UI primitives
- Animations use Framer Motion with GSAP for complex sequences
- Progressive enhancement with smooth scrolling via Lenis
- Responsive design with Tailwind CSS utility classes

### Configuration Notes

- Biome handles both linting and formatting (replaces ESLint + Prettier)
- TypeScript paths configured with `@/*` alias for root imports
- Next.js images configured for external image domains (Unsplash, Pexels, etc.)
- SEO metadata centrally managed in root layout with template system

### Development Workflow

1. Use `npm run dev` to start development with hot reload
2. Run `npm run lint` before commits to ensure code quality
3. Use `npm run format` to auto-format code according to project standards
4. Build with `npm run build` to verify production readiness