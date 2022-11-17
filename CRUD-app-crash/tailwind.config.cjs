/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'tw-',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // './pages/**/*.{html,js}',
    // './components/**/*.{html,js}',
    // './node_modules/@my-company/tailwind-components/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005745',
        communicate: '#f6f4f2',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable transparent this!
  },
};
