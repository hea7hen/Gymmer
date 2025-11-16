/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      fontWeight: {
        'extra-bold': '900',
      },
    },
  },
  plugins: [],
}

