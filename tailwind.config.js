const palette = {
  purple: {
    50: '#f0f3fc',
    100: '#dbe2f8',
    200: '#c3cef4',
    300: '#aabaef',
    400: '#98aceb',
    500: '#869de8',
    600: '#7e95e5',
    700: '#738be2',
    800: '#6981de',
    900: '#566fd8',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#d5ddff',
    A700: '#bcc8ff',
  },
  blue: {
    50: '#ebf8fa',
    100: '#cceef4',
    200: '#aae2ec',
    300: '#88d6e4',
    400: '#6fcedf',
    500: '#55c5d9',
    600: '#4ebfd5',
    700: '#44b8cf',
    800: '#3bb0ca',
    900: '#2aa3c0',
    A100: '#ffffff',
    A200: '#cef5ff',
    A400: '#9beaff',
    A700: '#81e5ff',
  },
  green: {
    50: '#f4faeb',
    100: '#e4f2cd',
    200: '#d2eaac',
    300: '#c0e28b',
    400: '#b3db72',
    500: '#a5d559',
    600: '#9dd051',
    700: '#93ca48',
    800: '#8ac43e',
    900: '#79ba2e',
    A100: '#fefffd',
    A200: '#e5ffca',
    A400: '#cdff97',
    A700: '#c0ff7e',
  },
  yellow: {
    50: '#fff7e0',
    100: '#ffeab3',
    200: '#ffdd80',
    300: '#ffcf4d',
    400: '#ffc426',
    500: '#ffba00',
    600: '#ffb300',
    700: '#ffab00',
    800: '#ffa300',
    900: '#ff9400',
    A100: '#ffffff',
    A200: '#fff9f2',
    A400: '#ffe1bf',
    A700: '#ffd5a6',
  },
  orange: {
    50: '#ffefeb',
    100: '#ffd8cd',
    200: '#ffbeac',
    300: '#ffa48a',
    400: '#ff9171',
    500: '#ff7d58',
    600: '#ff7550',
    700: '#ff6a47',
    800: '#ff603d',
    900: '#ff4d2d',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#ffded9',
    A700: '#ffc8bf',
  },
  sleepy: {
    DEFAULT: '#B4B4B4',
  },
  gray: {
    100: '#464646',
    200: '#797979',
    300: '#969696',
    400: '#BFBFBF',
    500: '#DEDEDE',
    600: '#E2E2E2',
    700: '#EFEFEF',
    800: '#F7F7F7',
  },
};

module.exports = {
  mode: 'jit',
  content: ['./**/*.{tsx,ts}'],
  theme: {
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
    extend: {
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
      colors: {
        purple: {
          ...palette.purple,
          DEFAULT: palette.purple[500],
          light: palette.purple[300],
          dark: palette.purple[700],
        },
        green: {
          ...palette.green,
          DEFAULT: palette.green[500],
          light: palette.green[300],
          dark: palette.green[700],
        },
        orange: {
          ...palette.orange,
          DEFAULT: palette.orange[500],
          light: palette.orange[300],
          dark: palette.orange[700],
        },
        primary: {
          ...palette.blue,
          DEFAULT: palette.blue[500],
          light: palette.blue[300],
          dark: palette.blue[700],
        },
        secondary: {
          ...palette.yellow,
          DEFAULT: palette.yellow[500],
          light: palette.yellow[300],
          dark: palette.yellow[700],
        },
        danger: palette.orange.DEFAULT,
        warning: palette.yellow.DEFAULT,
        sleepy: palette.sleepy.DEFAULT,
        gray: palette.gray,
        input: palette.gray[600],
        'input-focus': palette.gray[400],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};