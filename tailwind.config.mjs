// module.exports = {
//   content: ["./public/index.html", "./src/**/*.{html,js}"],
//   // ...
// }

export default {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  // tailwind.config.js

  theme: {
    extend: {
      colors: {
        light: "var(--color-light)",
        sea: "var(--color-sea)",
        ocean: "var(--color-ocean)",
        sun: "var(--color-sun)",
        orange: "var(--color-orange)",
        gray: "var(--color-gray)",
      },

      // screens: {
      //   "custom-size": {
      //     raw: "(min-width: 820px) and (max-width: 820px) and (min-height: 1180px) and (max-height: 1180px)",
      //   },
      // },
    },
  },
  plugins: [],
}
