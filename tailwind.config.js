const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        fontFamily: {
            display: ["Inter", "sans-serif"],
        },
        colors: {
            'light-blue': colors.lightBlue,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            orange: colors.orange
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
