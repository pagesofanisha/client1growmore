/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#F6EFD5',
          200: '#EEDDA9',
          300: '#E4C777',
          400: '#DBB24E',
          500: '#D4AF37', // metallic gold
          600: '#B89228',
          700: '#926F1E',
          800: '#76581E',
          900: '#634A1D',
          light: '#F5E6BE',
          DEFAULT: '#D4AF37',
          dark: '#9A7B2C',
        },
        obsidian: {
          950: '#06080F',
          900: '#0B0F19',
          850: '#101625',
          800: '#161F33',
          700: '#23304E',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 50px -10px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #F5DE88 0%, #D4AF37 50%, #9A7B2C 100%)',
      }
    },
  },
  plugins: [],
}
