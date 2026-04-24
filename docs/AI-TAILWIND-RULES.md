# AI Tailwind Rules

## Goal
Keep code clean, readable, and maintainable for developers.

AI should prefer reusable styling patterns over long inline Tailwind class strings.


---

## Core Rules

### 1. Keep className short
- Do not add long Tailwind class lists by default.
- Prefer a maximum of **5 to 6 utility classes per element**.
- If styling becomes longer than that, extract it.

### 2. Reuse repeated styles
- If the same group of Tailwind classes appears more than once, move it into a reusable class or component.
- Do not duplicate the same styling pattern across multiple elements.

### 3. Prefer semantic classes
Use readable global or reusable class names such as:
- `heading-1`
- `heading-2`
- `card`
- `btn`
- `btn-primary`
- `section-title`

Avoid repeating raw utility strings when a semantic class can be used.

### 4. Use global component classes
When styling is reused, define it in Tailwind using `@layer components`.

Example:

```css
@layer components {
  .heading-1 {
    @apply text-2xl font-bold text-gray-900 mb-4;
  }

  .card {
    @apply rounded-xl border border-gray-200 bg-white p-4 shadow-sm;
  }

  .btn-primary {
    @apply rounded-md bg-blue-600 px-4 py-2 text-white;
  }
}