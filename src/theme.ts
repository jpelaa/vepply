import { theme } from "@chakra-ui/core";

// example theme.js
export default {
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
};

// Let's say you want to add custom colors
export const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      100: "#e5dbff",
      200: "#d0bfff",
      300: "#b197fc",
      400: "#9775fa",
      500: "#845ef7",
      600: "#7950f2",
      700: "#7048e8",
      800: "#6741d9",
      900: "#5f3dc4",
    },
  },
};
