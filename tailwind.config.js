/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgPrimary': '#F7F8FA',
        'bgPrimaryDark': '#121212',
         'hov': '#008080',
         'hovDark' : '#00ADB5',
         'card' : '#FFD5C2',
         'cardDark' : '#393E46',
         'text' : '#E5E5E5',
         'textDark' : '#333333',
         'icons' : '#FFC300',
         'iconsDark' : '#FFC300',
      },
    },
  },
  plugins: [],
}

