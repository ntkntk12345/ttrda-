import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./src/components/**/*.{vue,js,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/app.vue",
    "./src/composables/**/*.{js,ts}",
    "./src/utils/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22d3ee",
        "background-dark": "#040714",
        "card-dark": "#1e293b",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      boxShadow: {
        cyan: "0 0 30px rgba(34, 211, 238, 0.2)",
      },
    },
  },
};
