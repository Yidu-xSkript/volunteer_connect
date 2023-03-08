/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1C7280',
        'auth': '#E3EFF1'
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      heading: ['Gloock', 'serif']
    }
  },
  plugins: [],
}
