/** @type {import('tailwindcss').Config} */
export default {

  variants: {
    extend: {
      scrollbar: ['rounded']
    },
  },
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "night",
      {
        Upc: {
        
"primary": "#f59e0b",
        
"secondary": "#1db990",
        
"accent": "#67a623",
        
"neutral": "#d1cfd0",
        
"base-100": "#f3f4f6",
        
"info": "#3abff8",
        
"success": "#36d399",
        
"warning": "#fbbd23",
        
"error": "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}