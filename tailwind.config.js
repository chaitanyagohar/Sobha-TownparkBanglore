// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}"],
  theme: {
    extend: {
       colors: {
        'brand-gold': '#f59e0b', // A premium, rich gold color
      },
      // VVV ADD THIS CODE VVV
        keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 2.5s infinite',
      },
    },
  },
  plugins: [],
};