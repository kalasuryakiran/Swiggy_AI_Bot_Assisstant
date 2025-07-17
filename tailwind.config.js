/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // light gray
        input: 'var(--color-input)', // pure white
        ring: 'var(--color-ring)', // warm orange
        background: 'var(--color-background)', // soft off-white
        foreground: 'var(--color-foreground)', // near-black
        primary: {
          DEFAULT: 'var(--color-primary)', // warm orange
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // forest green
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // standard red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // light gray
          foreground: 'var(--color-muted-foreground)', // medium gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // golden yellow
          foreground: 'var(--color-accent-foreground)', // near-black
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // pure white
          foreground: 'var(--color-popover-foreground)', // near-black
        },
        card: {
          DEFAULT: 'var(--color-card)', // pure white
          foreground: 'var(--color-card-foreground)', // near-black
        },
        success: {
          DEFAULT: 'var(--color-success)', // confirmation green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // warning yellow
          foreground: 'var(--color-warning-foreground)', // near-black
        },
        error: {
          DEFAULT: 'var(--color-error)', // standard red
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': '0.375rem',
        'sm': '0.25rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'floating': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 200ms ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      screens: {
        'xs': '475px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}