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
        'bgUI': 'rgb(15 118 110)',
        'bgUIDark': '#1e1e1e',
        'bgInputsDark': 'rgb(55 65 81)',
        'bgSidebar': 'rgb(13 148 136)',
        'bgSidebarDark': 'rgb(4 47 46)',
        'bgPrimaryDark': '#121212',
        'hovLinks': 'rgb(153 246 228)',
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

