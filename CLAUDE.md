# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PAIO** (Physical AI Monitoring and Ops Platform) is a SXSW 2025 hackathon project that provides a comprehensive dashboard for monitoring and managing deployed physical AI robots. The platform includes a critical safety feature called **Guardian** for robot oversight and intervention.

Built with Next.js 15.5.5, React 19, TypeScript, and Tailwind CSS 4. The project uses the Next.js App Router architecture with Turbopack for fast development and builds.

### Core Features

- **Robot Monitoring Dashboard**: Real-time monitoring of deployed physical AI robots
- **Guardian Safety System**: Safety and oversight features for robot operations
- **Ops Platform**: Operational management tools for robot fleets

## Development Commands

### Running the Development Server
```bash
npm run dev
```
The dev server runs with Turbopack enabled for faster compilation. Access at http://localhost:3000

### Building for Production
```bash
npm run build
```
Production builds use Turbopack (`--turbopack` flag).

### Running Production Build Locally
```bash
npm start
```
Starts the production server (must run `npm run build` first).

### Linting
```bash
npm run lint
```
Runs ESLint with Next.js TypeScript configuration.

## Project Structure

```
src/
  app/              # Next.js App Router pages and layouts
    layout.tsx      # Root layout with Geist fonts configured
    page.tsx        # Homepage
    globals.css     # Global styles and Tailwind imports
```

### Key Architecture Points

- **App Router**: Uses Next.js 15 App Router (not Pages Router)
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `./src/*`)
- **Styling**: Tailwind CSS 4 via PostCSS plugin (`@tailwindcss/postcss`)
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google`
- **Build Tool**: Turbopack (not Webpack) for both dev and build

## Design System

This project has a comprehensive design system documented in `DESIGN_SYSTEM.md`. Key principles:

### Typography
- Primary font: Geist Sans with `-webkit-font-smoothing: antialiased`
- Monospace: Geist Mono (available via CSS variable `--font-geist-mono`)
- Font weight patterns: Light (300) for large headings, Bold (700) for branding
- Tracking: `-0.01em` (tight tracking for modern look)

### Color Palette
- Minimalist gray scale: `border-gray-200` for all borders
- Status colors: Green (success/active), Yellow (warning), Red (error), Purple/Blue (accents)
- Background: White (`bg-white`) is the default

### Layout Patterns
- Sidebar layout: `w-64` fixed sidebar + flex-1 main content
- Page max-width: `max-w-screen-2xl`
- Standard padding: `px-8 py-6` for pages, `p-6` for cards
- Grid system: 3-column (`grid-cols-3`) or 12-column (`grid-cols-12`) with `gap-6`

### Component Standards
- Cards: `border border-gray-200 bg-white`
- Buttons: Gray-based with hover transitions (`hover:bg-gray-50 transition-colors`)
- Badges: `px-2 py-1` with semantic background colors
- Status dots: `w-2 h-2 rounded-full` with semantic colors
- Spacing: Use `space-y-3` for stacks, `gap-4` or `gap-6` for grids

### Interactive States
- Hover: `hover:bg-gray-50` or `hover:bg-gray-100` with `transition-colors`
- Active: `bg-gray-100 text-black font-medium`
- Transitions: `transition-all duration-200` for enhanced animations

**Always consult `DESIGN_SYSTEM.md` when creating new UI components** to maintain consistency with existing design patterns.

## TypeScript Configuration

- Target: ES2017
- Module resolution: bundler (Next.js optimized)
- Strict mode: enabled
- Path alias: `@/*` → `./src/*`

## ESLint Configuration

Uses Next.js recommended presets:
- `next/core-web-vitals`
- `next/typescript`

Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`

## Next.js Specific Notes

### Image Optimization
Use the `next/image` component for all images. Images should be placed in the `public/` directory.

### Font Loading
Fonts are configured in `src/app/layout.tsx` using `next/font/google`. Variables are applied to the `<body>` element:
- `--font-geist-sans`
- `--font-geist-mono`

### Metadata
Page metadata should be exported from page/layout files using the `Metadata` type from `next`.

### CSS Variables
Tailwind uses CSS variables defined in `globals.css`:
- `--background`
- `--foreground`

## Styling Approach

- **Utility-first**: Use Tailwind utility classes
- **No CSS modules**: Global styles only in `globals.css`
- **Responsive design**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, etc.)
- **Dark mode**: Limited support with `dark:` variants prepared

## Build Optimizations

- Turbopack is enabled for both dev and production builds
- Image optimization via Next.js Image component
- Font optimization via `next/font`
- CSS optimization via Tailwind's built-in PostCSS pipeline
