/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // tailwind's font-sans will use the CSS variable provided by next/font
        sans: ['var(--font-montserrat)', 'system-ui', 'ui-sans-serif', 'Arial'],
      },
    },
  },
  plugins: [],
};
