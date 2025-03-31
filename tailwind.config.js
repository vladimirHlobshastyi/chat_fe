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
        destructive: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        text: {
          DEFAULT: '#1d2939', // main text color
          primary: '#FFFFFF',
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
          DEFAULT: '#3641F519',
          error: '#ffecec',
          success: '#12B76A1A',
        },
        success: {
          DEFAULT: '#11b86a',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          150: '#f3f4f7',
          200: '#e4e7ec',
          300: '#D1D5DB',
          400: '#98a2b3',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          50: '#ecf3ff',
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
        minimal: '0.7px',
        DEFAULT: '1px',
        second: '1.25px',
        medium: '1.5px',
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
