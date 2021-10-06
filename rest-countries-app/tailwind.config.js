const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
	purge: [
		'./**/*.html',
		'./src/**/*.js'
	],
  darkMode: 'class',
  theme: {
    colors: {
      gray: {
        light: 'hsl(0, 0%, 100%)',
        DEFAULT: 'hsl(0, 0%, 98%)',
        dark: 'hsl(0, 0%, 52%)',
      },
      blue: {
        light: 'hsl(209, 23%, 22%)',
        DEFAULT: 'hsl(207, 26%, 17%)',
        dark: 'hsl(200, 15%, 8%)',
      },
      current: 'currentColor',
    },
    fontFamily: {
			sans: ['Nunito Sans', 'sans-serif'],
		},
    screens: {
      xs: '530px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}