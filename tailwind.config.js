const plugin = require('tailwindcss/plugin')
const tailwindConfig = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,css,scss,sass,less,styl,md,mdx,json,yml,yaml}"],
  darkMode: 'media',
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      colors: {
        "gray-dark": "#273444",
        "gray-light": "#d3dce6",
        "white": "#ffffff",
        "black": "#000000",
        "light": "#eeeeee",
        "dark": "#333333",
      },
      fontFamily: {
        'sans': [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        'serif': [
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        'monospace': [
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
        "new-world": ["'New World'", "monospace"],
      },
    },
  },
  variants: {
    extend: {
      fontSize: {
        '7xl': '4rem',
        '8xl': '5rem',
        '9xl': '6rem',
        '10xl': '7rem',
      },
      fontWeight: {
        'extrathin': 100,
        'thin': 200,
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'thicc': 900,
      },
      lineHeight: {
        'none': 1,
        'tight': 1.25,
        'snug': 1.375,
        'normal': 1.5,
        'relaxed': 1.625,
        'loose': 1.75,
        '1': 1.125,
        '2': 1.250,
        '3': 1.333,
        '4': 1.5,
        '5': 1.666,
        '6': 1.75,
        '7': 2,
        '8': 2.25,
        '9': 2.5,
        '10': 2.75,
      },
      'letter-spacing': {
        'tight': '-.05em',
        'normal': '0',
        'wide': '.05em',
      },
      'text-transform': {
        'none': 'none',
        'uppercase': 'uppercase',
        'lowercase': 'lowercase',
        'capitalize': 'capitalize',
      },
      'text-decoration': {
        'none': 'none',
        'underline': 'underline',
        'line-through': 'line-through',
        'overline': 'overline',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

module.exports = tailwindConfig;