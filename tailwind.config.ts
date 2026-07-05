import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        "canvas-secondary": "#0d1117",
        "canvas-tertiary": "#161b22",
        "canvas-elevated": "#1c2028",
        ink: "#FFFFFF",
        "label-secondary": "rgba(235,235,245,0.60)",
        "label-tertiary": "rgba(235,235,245,0.30)",
        "label-quaternary": "rgba(235,235,245,0.18)",
        "fill-primary": "rgba(120,120,128,0.36)",
        "fill-secondary": "rgba(120,120,128,0.32)",
        "fill-tertiary": "rgba(118,118,128,0.24)",
        "fill-quaternary": "rgba(118,118,128,0.18)",
        separator: "rgba(84,84,88,0.65)",
        "separator-opaque": "#2a2f38",
        accent: "#0A84FF",
        "accent-cyan": "#00E5FF",
        "accent-green": "#30D158",
        "accent-orange": "#FF9F0A",
        "accent-red": "#FF453A",
        "accent-purple": "#BF5AF2",
        "accent-teal": "#64D2FF",
      },
      boxShadow: {
        "ios-sm": "0 1px 3px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.3)",
        "ios-md": "0 4px 16px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.3)",
        "ios-lg": "0 8px 32px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.3)",
        dock: "0 0 0 0.5px rgba(255,255,255,0.15), 0 8px 40px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        "ios-xs": "8px",
        "ios-sm": "10px",
        "ios-md": "14px",
        "ios-lg": "22px",
        "ios-xl": "38px",
      },
      fontFamily: {
        ios: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          "Inter",
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
