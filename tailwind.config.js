const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
  
    extend: {
      fontSize: { 
        'xxs': '0.5rem',
        'xss': '0.6rem'
      },
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      transformOrigin: {
        "0": "0%"
      },
      zIndex: {
        "-1": "-1"
      },
      scale: { 
        "60": '0.6'
      }
    },
  },
  variants: {
    borderColor: ["responsive", "hover", "focus"],
    extend: {}
  },
  plugins: [
    //require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
