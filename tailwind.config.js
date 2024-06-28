/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    container: {
      center: true,
      screens: {
        xl: '1240px'
      },
      padding: {
        DEFAULT: '1rem'
      }
    },
    extend: {
      colors: {
        yellow1: '#ffcc00'
      },
      boxShadow: {
        'custom-amber':
          '0 10px 15px -3px rgba(251, 191, 36, 0.1), 0 4px 6px -2px rgba(251, 191, 36, 0.05)'
      },
      fontSize: {
        '8px': '0.5rem'
      }
    }
  },
  plugins: []
}
