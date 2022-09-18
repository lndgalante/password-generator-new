/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#E6E5EA',
          200: '#817D92',
          300: '#24232C',
          400: '#18171F',
        },
        green: {
          100: '#A4FFAF',
        },
        red: {
          100: '#F64A4A',
        },
        orange: {
          100: '#FB7C58',
        },
        yellow: {
          100: '#F8CD65',
        },
      },
    },
  },
};
