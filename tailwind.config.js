import daisyui from "daisyui";
import colors from "tailwindcss/colors.js";
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  safelist: [
    {
      pattern: /bg-*-*/,
      variants: ["after"],
    },
    {
      pattern: /bg-*/,
      variants: ["after"],
    },
  ],
  theme: {
    colors: {
      ...colors,
    },
  },

  plugins: [daisyui],
  daisyui: {
    styled: true,
    themes: false,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
