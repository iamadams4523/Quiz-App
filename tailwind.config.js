module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '780px',
        lg: '1024px',
      },
      colors: {
        softPink: '#F4DDDD',
      },
    },
  },
  plugins: [],
};
