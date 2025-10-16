# Design System

This document outlines the design system for a SaaS Platform

## Typography

### Font Families

**Primary Font:** Geist Sans
- Used for all body text, headings, and UI elements
- Loaded via `next/font/google`
- Applied with `-webkit-font-smoothing: antialiased` for crisp rendering
- Letter spacing: `-0.01em` (slightly tighter for modern look)

**Monospace Font:** Geist Mono
- Used for code, technical data, and numeric values
- Available via CSS variable `--font-geist-mono`

### Font Sizes & Weights

| Element | Classes | Usage |
|---------|---------|-------|
| Page Title | `text-3xl font-light tracking-tight` | Main page headings |
| Logo/Brand | `text-2xl font-bold tracking-tight italic` | Sidebar branding |
| Section Heading | `text-xl font-light` | Card titles, section headers |
| Company Badge | `text-lg font-bold` | Model vendor names |
| Body Text | `text-sm` | Primary body text, labels |
| Label/Caption | `text-xs` | Metadata, secondary information |
| Micro Text | `text-[10px]` | Tertiary information, fine print |

### Font Weight Patterns

- **Light (300):** Large headings for elegance
- **Medium (500):** Active states, emphasis
- **Semibold (600):** Active tabs, selected items
- **Bold (700):** Branding, vendor names, important callouts

---

## Color Palette

### Base Colors

```css
--background: #ffffff
--foreground: #000000
```

### Gray Scale (Primary Palette)

The design uses a comprehensive gray scale for most UI elements:

| Color | Tailwind Class | Usage |
|-------|---------------|-------|
| White | `bg-white` | Page backgrounds, cards, sidebar |
| Gray 50 | `bg-gray-50` | Subtle hover states, card headers |
| Gray 100 | `bg-gray-100` | Active navigation, selected items |
| Gray 200 | `border-gray-200` | All borders, dividers |
| Gray 300 | `bg-gray-300` | Vertical dividers |
| Gray 400 | `text-gray-400` `bg-gray-400` | Tertiary text, inactive elements, user avatar |
| Gray 500 | `text-gray-500` | Secondary text, labels |
| Gray 600 | `text-gray-600` | Body text (inactive) |
| Gray 900 | `bg-gray-900` | Dark mode backgrounds |

### Status Colors

Used for status indicators, badges, and alerts:

**Green (Success/Active)**
- `bg-green-50` - Badge background
- `bg-green-500` - Status dots, battery bars
- `text-green-600` - Vendor badge (NVIDIA)
- `text-green-700` - Badge text

**Yellow (Warning/Charging)**
- `bg-yellow-500` - Status indicators
- `text-yellow-600` - Warning text

**Red (Critical/Error)**
- `bg-red-500` - Critical battery, errors
- `text-red-600` - Error text
- `text-red-400` - Sign out button

**Purple (Accent)**
- `bg-purple-50` - Badge background
- `text-purple-600` - Vendor badge (Physical Intelligence)
- `text-purple-700` - Badge text

**Blue (Secondary Accent)**
- `text-blue-500` - Gradient accent
- `text-blue-600` - Vendor badge (Google)

---

## Layout

### Page Structure

```
[Sidebar (w-64)] | [Main Content (flex-1)]
                  | [Header (fixed top-right user menu)]
                  | [Content Area (scrollable)]
```

### Sidebar

- Width: `w-64` (256px)
- Background: `bg-white`
- Border: `border-r border-gray-200`
- Height: `h-screen`

**Sidebar Content:**
- Logo area: `px-6 py-6`
- Navigation: `px-3 mt-2`

### Main Content Area

- Max width: `max-w-screen-2xl`
- Padding: `px-8 py-6`
- Background: `bg-white min-h-screen`

### Page Header Pattern

```tsx
<div className="flex items-baseline gap-4 pb-4 border-b border-gray-200">
  <h1 className="text-3xl font-light tracking-tight text-black">Page Title</h1>
  <p className="text-gray-500 text-xs">Category Label</p>
</div>
```

### Grid System

- 3-column cards: `grid grid-cols-3 gap-6`
- 12-column layout: `grid grid-cols-12 gap-6`
- Responsive breakpoints follow Tailwind defaults

---

## Components

### Buttons

**Navigation Link (Inactive)**
```tsx
className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-all duration-200"
```

**Navigation Link (Active)**
```tsx
className="block px-3 py-2 text-sm bg-gray-100 text-black font-medium transition-all duration-200"
```

**Tab Button (Inactive)**
```tsx
className="text-sm text-gray-500 hover:text-black transition-colors"
```

**Tab Button (Active)**
```tsx
className="text-sm text-black font-semibold transition-colors"
```

**Interactive Button**
```tsx
className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
```

### Cards

**Basic Card**
```tsx
className="border border-gray-200 bg-white"
```

**Card with Header**
```tsx
<div className="border border-gray-200 bg-white">
  <div className="p-6 border-b border-gray-200">
    {/* Header content */}
  </div>
  <div className="p-6 space-y-3">
    {/* Body content */}
  </div>
</div>
```

**Card Header Alternative (with gray background)**
```tsx
className="px-4 py-3 border-b border-gray-200 bg-gray-50"
```

### Badges

**Status Badge**
```tsx
className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium"
```

Available variants:
- Active: `bg-green-50 text-green-700`
- Testing: `bg-gray-100 text-gray-600`
- Warning: `bg-yellow-50 text-yellow-700`
- Error: `bg-red-50 text-red-700`
- Info: `bg-purple-50 text-purple-700`

### Status Indicators

**Status Dot**
```tsx
className="w-2 h-2 rounded-full bg-green-500"
```

**Status Dot (Large)**
```tsx
className="w-3 h-3 rounded-full bg-green-500"
```

Colors:
- Active: `bg-green-500`
- Idle: `bg-gray-400`
- Charging: `bg-yellow-500`
- Error: `bg-red-500`

### User Avatar

**Round Avatar**
```tsx
className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium"
```

### Dropdown Menu

**Menu Container**
```tsx
className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50"
```

**Menu Section Divider**
```tsx
<hr className="my-1 border-gray-200 dark:border-gray-700" />
```

### Tabs

**Tab Container**
```tsx
<div className="flex justify-center mt-6">
  <div className="inline-flex flex-col">
    <div className="flex gap-4 items-center pb-4">
      {/* Tab buttons */}
    </div>
    <div className="border-b border-gray-200"></div>
  </div>
</div>
```

**Tab Divider**
```tsx
<div className="h-4 w-px bg-gray-300"></div>
```

### Data Display

**Label-Value Pair**
```tsx
<div>
  <div className="text-xs text-gray-500">Label</div>
  <div className="text-sm mt-1">Value</div>
</div>
```

Grouped in containers with: `space-y-3`

### Progress Bars (Battery)

```tsx
<div className="flex-1 h-2 bg-gray-200">
  <div className="h-full bg-green-500" style={{ width: '87%' }} />
</div>
```

Colors:
- High (>60%): `bg-green-500`
- Medium (30-60%): `bg-yellow-500`
- Low (<30%): `bg-red-500`

---

## Spacing

### Padding Scale

- Page container: `px-8 py-6`
- Card padding: `p-6`
- Card header: `px-4 py-3`
- Button padding: `px-3 py-2` (nav), `px-4 py-2` (menu)
- Badge padding: `px-2 py-1`
- Sidebar branding: `px-6 py-6`

### Gap Scale

- Minimal: `gap-2`
- Standard: `gap-4`
- Comfortable: `gap-6`

### Spacing Utilities

- Stack spacing: `space-y-1`, `space-y-3`, `space-y-4`
- Horizontal lists: `space-x-2`, `space-x-4`

---

## Borders & Edges

### Border Style

**Standard Border**
```
border border-gray-200
```

**Directional Borders**
- Bottom: `border-b border-gray-200`
- Right: `border-r border-gray-200`

**Border Radius**
- Cards/Menus: `rounded-lg` (8px)
- Avatar/Badges: `rounded-full`
- No rounded corners on cards by default

---

## Interactions & Animations

### Hover States

**Text Hover**
```tsx
hover:text-black
```

**Background Hover**
```tsx
hover:bg-gray-50
hover:bg-gray-100
```

**Opacity Hover**
```tsx
hover:opacity-80
```

**Scale Hover**
```tsx
hover:scale-110
hover:shadow-md
```

### Transitions

**Standard**
```tsx
transition-colors
```

**Enhanced**
```tsx
transition-all duration-200
```

### Active States

- Background: `bg-gray-100`
- Font weight: `font-medium` or `font-semibold`
- Border/outline: `border-2 border-black`
- Scale: `scale-125`

---

## Shadows

Shadows are used sparingly:

- Dropdown menus: `shadow-xl`
- Interactive hover: `shadow-md`
- Elevated cards: `shadow-lg`

---

## Dark Mode Support

Limited dark mode support is prepared:

- Background: `dark:bg-gray-900`, `dark:bg-gray-800`
- Text: `dark:text-white`, `dark:text-gray-300`, `dark:text-gray-400`
- Borders: `dark:border-gray-700`, `dark:border-gray-800`
- Hover: `dark:hover:bg-gray-700`

---

## Z-Index Layering

- Fixed user menu: `z-50`
- Dropdown menus: `z-50`
- Headers: `z-40`

---

## Accessibility

- All interactive elements have `transition` for smooth feedback
- Buttons include `aria-label` when text is not visible
- Focus states follow browser defaults (can be enhanced)
- Color contrast meets WCAG AA standards for text

---

## Best Practices

1. **Consistency:** Always use `border-gray-200` for all borders
2. **Spacing:** Use the standard padding patterns for similar components
3. **Hover States:** Include `transition-colors` or `transition-all` for smooth interactions
4. **Font Weights:** Reserve `font-bold` for branding and critical information
5. **Status Colors:** Use semantic colors only for status indicators, not decorative purposes
6. **White Space:** Embrace generous white space with `gap-6` and `space-y-3`
7. **Backgrounds:** Default to white backgrounds with subtle gray accents
8. **Typography:** Use `font-light` for large headings to maintain elegance

---

## Component Variants Reference

### Button States

| State | Classes |
|-------|---------|
| Default | `text-gray-600 hover:text-black hover:bg-gray-50` |
| Active | `bg-gray-100 text-black font-medium` |
| Hover | `hover:bg-gray-50 transition-colors` |
| Danger | `text-red-600 hover:bg-gray-100` |

### Text Hierarchy

| Level | Size | Weight | Color |
|-------|------|--------|-------|
| Primary | `text-sm` | `font-normal` | `text-black` |
| Secondary | `text-sm` | `font-normal` | `text-gray-600` |
| Tertiary | `text-xs` | `font-normal` | `text-gray-500` |
| Micro | `text-[10px]` | `font-normal` | `text-gray-400` |

---

## Usage Examples

### Creating a New Page

```tsx
export default function NewPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-8 py-6">
        <div className="flex items-baseline gap-4 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-light tracking-tight text-black">
            Page Title
          </h1>
          <p className="text-gray-500 text-xs">Category</p>
        </div>

        {/* Page content */}
      </div>
    </div>
  );
}
```

### Creating a Card

```tsx
<div className="border border-gray-200 bg-white">
  <div className="p-6 border-b border-gray-200">
    <h3 className="text-xl font-light">Card Title</h3>
  </div>
  <div className="p-6 space-y-3">
    <div>
      <div className="text-xs text-gray-500">Label</div>
      <div className="text-sm mt-1">Value</div>
    </div>
  </div>
</div>
```
