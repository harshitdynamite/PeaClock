import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e8f5ec" },
          100: { value: "#c3e6d0" },
          200: { value: "#9fd7b4" },
          300: { value: "#7ac899" },
          400: { value: "#55b97e" },
          500: { value: "#39a168" }, // Peacock green
          600: { value: "#2d7f52" },
          700: { value: "#215e3d" },
          800: { value: "#143c28" },
          900: { value: "#081b14" },
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
