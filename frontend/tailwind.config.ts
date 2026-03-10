import type { Config } from 'tailwindcss';

/*
  ═══════════════════════════════════════════════════════════════════
  HomeWard — Design Tokens (single source of truth)
  ═══════════════════════════════════════════════════════════════════
  Update values here — changes apply everywhere in the app.

  Colours are used as Tailwind utilities: bg-brand-primary, text-text-muted etc.
  Base HTML elements (<p>, <h1>, <a> etc.) are auto-styled in globals.css
  using @apply, so they pick up these values without any classes on them.

  TODO [CHALLENGE: Design System]
  - Replace NHS colours with your organisation's palette
  - Add a darkMode config + 'dark:' variant classes for a clinical dark mode
  ═══════════════════════════════════════════════════════════════════
*/

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ── Colours ────────────────────────────────────────────────
      colors: {
        brand: {
          primary: '#181818', // NHS Blue — update to rebrand
          secondary: '#EBEBEB',
          accent: '#D10F3F', // NHS Teal
        },
        status: {
          // WCAG AA contrast required — do not reduce when rebranding
          escalated: '#d5281b',
          warning: '#ffb81c',
          stable: '#007f3b',
          discharged: '#768692',
        },
        surface: {
          bg: '#f0f4f5',
          card: '#ffffff',
          border: '#d8dde0',
        },
        text: {
          primary: '#212b32',
          muted: '#4c6272',
        },
      },

      // ── Fonts ───────────────────────────────────────────────────
      fontFamily: {
        sans: ['Alexandria', 'sans-serif'], // update to change app font
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
