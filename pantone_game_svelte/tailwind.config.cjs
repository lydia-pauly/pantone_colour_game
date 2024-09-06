const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
            "primary": "#FF",
            "secondary": "#00",
            "accent": "#374151",
            "neutral": "#f3f4f6",
            "base-100": "#111827",
            "info": "#3b82f6",
            "success": "#a3e635",
            "warning": "#f97316",
            "error": "#ef4444",
          },
        },
      ],
    },
  plugins: [daisyui],
};

module.exports = config;
