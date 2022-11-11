/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // './pages/**/*.{html,js}',
    // './components/**/*.{html,js}',
    // './node_modules/@my-company/tailwind-components/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable transparent this!
  },
};
