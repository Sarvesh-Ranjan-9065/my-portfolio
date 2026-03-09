/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        cyan: {
          glow: '#00f5ff',
          soft: '#67e8f9',
          dim: '#164e63',
        }
      }
    },
  },
  plugins: [],
}
