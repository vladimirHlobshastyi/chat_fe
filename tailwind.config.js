/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#465fff',
          dark: '#3641f5',
          light: '#9cb9ff', // Used as focus
        },
        secondary: {
          DEFAULT: '#ffffff',
          dark: '#f9fafb',
        },
        red: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
          light: '#ffecec',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        text: {
          DEFAULT: '#FFFFFF',
          primary: '#344054', // main text color
          secondary: '#344055',
          disabled: '#d0d5dd',
          success: '#11b86a',
          error: '#f04439',
        },
        border: {
          DEFAULT: '#D1D5DB',
          focus: '#9cb9ff',
          error: '#fea29b',
          success: '#6ce9a7',
          disabled: '#F3F4F6',
        },
        ring: {
          focus: '#3641F519',
          error: '#ffecec',
          success: '#12B76A1A',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'theme-xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      },
      borderWidth: {
        DEFAULT: '1px',
        radio: '1.25px',
      },
      width: {
        radio: '20px',
        radioInner: '8px',
      },
      height: {
        radio: '20px',
        radioInner: '8px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        modalIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        modalOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        fadeOut: 'fadeOut 0.2s ease-in',
        modalIn: 'modalIn 0.2s ease-out',
        modalOut: 'modalOut 0.2s ease-in',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
