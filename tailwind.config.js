/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HSL-based brand colors for consistent saturation
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
          glow: 'hsl(var(--brand-glow))',
        },
        primary: {
          DEFAULT: '#FF8C42',
          dark: '#E67835',
          light: '#FFB17A',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#E8DFD0',
        },
        gray: {
          900: '#1A1A1A',
          800: '#2D2D2D',
          600: '#6B6B6B',
          400: '#9B9B9B',
          200: '#E0E0E0',
          100: '#F5F5F5',
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, hsl(var(--brand-glow) / 0.4) 0%, transparent 70%)',
        'radial-glow-strong': 'radial-gradient(circle at center, hsl(var(--brand-glow) / 0.6) 0%, transparent 60%)',
        'gradient-orange': 'linear-gradient(180deg, hsl(var(--brand) / 1) 0%, hsl(var(--brand) / 0.95) 50%, hsl(var(--brand) / 0.9) 100%)',
        'gradient-orange-vertical': 'linear-gradient(180deg, hsl(var(--brand-glow) / 0.3) 0%, hsl(var(--brand-glow) / 0.1) 50%, transparent 100%)',
      },
      fontWeight: {
        'extra-bold': '900',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'zoom-in': 'zoom-in 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      backgroundSize: {
        'gradient-size': '200% 200%',
      },
    },
  },
  plugins: [],
}

