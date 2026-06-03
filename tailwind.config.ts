import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        main: "var(--bg-main)",
        card: "var(--bg-card)",
        "outline-variant": "var(--outline-variant)",
        "buttons-menu": "var(--bg-buttons-menu)",
        "button-selected": "var(--bg-button-selected)",
        "button-unselected": "var(--bg-button-unselected)",
        title: "var(--title)",
        subtitle: "var(--subtitle)",
        "text-button-selected": "var(--text-button-selected)",
        "text-button-unselected": "var(--text-button-unselected)",
        "text-on-surface-variant": "var(--text-on-surface-variant)",
      },
    },
  },
  plugins: [],
} satisfies Config;
