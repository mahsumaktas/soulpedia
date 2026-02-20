import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        wiki: {
          bg: "#ffffff",
          bgDark: "#1a1a1a",
          border: "#a2a9b1",
          borderDark: "#444444",
          blue: "#0645ad",
          blueDark: "#6b9cf6",
          red: "#d33",
          text: "#202122",
          textDark: "#eaecf0",
          grayBg: "#f8f9fa",
          grayBgDark: "#222222",
        }
      }
    }
  },
  plugins: [],
};
export default config;