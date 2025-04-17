import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: "#e8f5ec",
          100: "#c3e6d0",
          200: "#9fd7b4",
          300: "#7ac899",
          400: "#55b97e",
          500: "#39a168", // Peacock green
          600: "#2d7f52",
          700: "#215e3d",
          800: "#143c28",
          900: "#081b14",
        },
      },
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      radii: {
        sm: { value: "4px" },
        md: { value: "8px" },
        xl: { value: "16px" },
      },
    },
  },
});
