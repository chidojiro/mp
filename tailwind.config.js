/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('./colors');

module.exports = {
  mode: 'jit',
  content: ['./**/*.{tsx,ts,json}'],
  theme: {
    colors,
    fontWeight: {
      semibold: 500,
      bold: 700,
    },

    extend: {
      fontSize: {
        small: '10px',
        'medium-sm': '11px',
        medium: '12px',
        'regular-sm': '13px',
        regular: '14px',
        h5: '16px',
        h4: '18px',
        h3: '20px',
        h2: '24px',
        h1: '28px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#464646',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      },
      borderRadius: {
        lg: '0.625rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { transform: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in .1s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
