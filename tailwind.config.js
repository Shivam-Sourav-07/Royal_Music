/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          black: '#090909',
          charcoal: '#171411',
          night: '#0f0c0a',
          gold: '#C9A44C',
          'gold-bright': '#E6C878',
          'gold-deep': '#9a7b2e',
          burgundy: '#551B2B',
          'burgundy-deep': '#3a121d',
          ivory: '#F5EBD5',
          beige: '#B6A98D',
          parchment: '#e8dcc0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #9a7b2e 0%, #E6C878 40%, #C9A44C 60%, #9a7b2e 100%)',
        'gold-shine': 'linear-gradient(110deg, #9a7b2e 0%, #C9A44C 30%, #F5E6B0 50%, #C9A44C 70%, #9a7b2e 100%)',
        'royal-radial': 'radial-gradient(ellipse at top, #1a1411 0%, #090909 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(201,164,76,0.25), 0 0 80px rgba(201,164,76,0.1)',
        'decree': '0 10px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(201,164,76,0.3)',
        'inner-gold': 'inset 0 0 20px rgba(201,164,76,0.15)',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-live': 'pulse-live 1.8s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
