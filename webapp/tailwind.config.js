module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        // light: {
        //   'primary': '#EE8039',
        //   'secondary': '#BFB0D6',
        //   'accent': '#F9F6F0',
        //   'neutral': '#1E293B',
        //   'base-100': '#F9F6F0',
        //   'info': '#CBE0DE',
        //   'success': '#9DC278',
        //   'warning': '#F6B64B',
        //   'error': '#DD513C',
        // },
        // dark: {
        //   'primary': '#EE8039',
        //   'secondary': '#BFB0D6',
        //   'accent': '#F9F6F0',
        //   'neutral': '#1E293B',
        //   'base-100': '#4E4E4E',
        //   'info': '#CBE0DE',
        //   'success': '#9DC278',
        //   'warning': '#F6B64B',
        //   'error': '#DD513C',
        // },
      },
    ],
    darkTheme: 'dark',
  },
};