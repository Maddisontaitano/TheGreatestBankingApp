module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        weak: '#FF4A4A',
        medium: '#FFDA4A',
        strong: '#4AFF5F'
      },
    },
  },
  variants: {},
  plugins: [],
}
