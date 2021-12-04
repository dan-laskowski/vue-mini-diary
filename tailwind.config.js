module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        'rich-black': '#000814',
        'oxford-blue': '#001D3D',
        'prussian-blue': '#003566',
        'mikado-yellow': '#ffc300',
        'gold-web-golden': '#ffd60a',
      },
    },
    fontFamily: {
      Taviraj: ['Taviraj, serif'],
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
