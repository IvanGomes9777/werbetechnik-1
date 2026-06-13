import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: 'var(--noir)',
        panel: 'var(--panel)',
        olive: 'var(--olive)',
        'olive-bright': 'var(--olive-bright)',
        'olive-soft': 'var(--olive-soft)',
        paper: 'var(--paper)',
        'paper-dim': 'var(--paper-dim)',
        line: 'var(--line)',
        // Legacy-Aliase (früheres „Gold"-Design) → aktuelles Olive-System.
        // Ohne diese rendern u. a. die Cookie-Buttons ohne Hintergrundfarbe.
        gold: 'var(--olive-bright)',
        'gold-soft': 'var(--olive-soft)',
      },
      borderColor: {
        line: 'var(--line)',
      },
      fontFamily: {
        // Variant display/body fonts
        anton: ['var(--font-anton)', 'sans-serif'],
        // Display-Schrift des Projekts: Marcellus (ersetzt Playfair).
        // Alias-Keys bleiben (playfair/display), damit Bestandscode unverändert erbt.
        playfair: ['var(--font-marcellus)', 'serif'],
        display: ['var(--font-marcellus)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        sora: ['var(--font-sora)', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'sans-serif'],
        robotocond: ['var(--font-roboto-cond)', 'sans-serif'],
      },
      maxWidth: {
        content: '1240px',
      },
      letterSpacing: {
        // Legacy-Alias: tracking-eyebrow (passt zur .eyebrow-Komponente).
        eyebrow: '0.42em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'color-shift': {
          '0%,100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(60deg)' },
        },
        'satin-sweep': {
          '0%': { transform: 'translateX(-60%) rotate(8deg)', opacity: '0' },
          '50%': { opacity: '0.9' },
          '100%': { transform: 'translateX(160%) rotate(8deg)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'color-shift': 'color-shift 6s ease-in-out infinite',
        'satin-sweep': 'satin-sweep 9s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
