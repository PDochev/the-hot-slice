/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
        extraSmall: ["0.5rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
      colors: {
        background: "#f8f9fa",
        foreground: "#44403c",
        primary: "#fce181",
        secondary: "#026670",
        accent: "#9fedd7",
        muted: "#84b19e",
        border: "#fef9c7",
        destructive: "#e43d12",
      },
    },
  },
  plugins: [],
};
