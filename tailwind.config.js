module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        redish: '#F16766',
        bluish: '#29A3E0',
        orangish: '#F19D0B',
        greyish: '#2E4B62',
        whitish: '#FAEFE0',
        violet: '#a186ed',
        purple: '#783F8E',
        offwhite: '#ffeddf',
      },
    },
    fontFamily: {
      Maven: ['Maven Pro', 'sans-serif'],
      Dancing: ['Dancing Script', 'cursive'],
      sans: ['Helvetica', 'Arial', 'sans-serif'],
    },
    container: {
      center: true,
      screens: {
        lg: '1124px',
        xl: '1124px',
        '2xl': '1124px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
