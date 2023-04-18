/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens :{

      sm: '640px',
      md: '768px	',
      lg: '1024px	',
      xl: '1280px	',



    },
    extend: {
      colors: {
        'element': "var(--Orange)",
        'element-pale': "var(--Pale--orange)",
        'primary': "var(--Very--dark--blue)",
        'secondary': "var(--Dark--grayish--blue)",
        'off': " var(--Grayish--blue)",
        "regular": "var(--Light--grayish--blue)",
        'light': "var(--White)",
      }
    },
  },
  plugins: [],
}