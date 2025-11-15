/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        voltage: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        current: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        resistance: {
          DEFAULT: '#a16207',
          dark: '#92400e',
        },
        power: {
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
        },
      },
    },
  },
  plugins: [],
}
