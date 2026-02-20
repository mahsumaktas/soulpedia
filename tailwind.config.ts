import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        wiki: {
          bg: "#ffffff",
          bgDark: "#0f1115",
          border: "#e5e7eb",
          borderDark: "#272a30",
          blue: "#2563eb",
          blueDark: "#60a5fa",
          text: "#111827",
          textDark: "#f9fafb",
          grayBg: "#f9fafb",
          grayBgDark: "#171a21",
        }
      }
    }
  },
  plugins: [],
};
export default config;