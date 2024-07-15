import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#d3b9d3",
        "gray-500": "#573058",
        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        "test-10": "#09848F",
        purple: {
          100: "#e9dce9",
          200: "#d3b9d3",
          300: "#bd96be",
          400: "#a773a8",
          500: "#915092",
          600: "#744075",
          700: "#573058",
          800: "#3a203a",
          900: "#1d101d",
        },
        purpleSecondary: {
          100: "#f7e9f1",
          200: "#eed3e4",
          300: "#e6bcd6",
          400: "#dda6c9",
          500: "#d590bb",
          600: "#aa7396",
          700: "#805670",
          800: "#553a4b",
          900: "#2b1d25",
        },
        purpleLight: {
          100: "#f5eef4",
          200: "#ebdee9",
          300: "#e2cdde",
          400: "#d8bdd3",
          500: "#ceacc8",
          600: "#a58aa0",
          700: "#7c6778",
          800: "#524550",
          900: "#292228",
        },
        grayGreen: {
          100: "#eff5f5",
          200: "#deeceb",
          300: "#cee2e1",
          400: "#bdd9d7",
          500: "#adcfcd",
          600: "#8aa6a4",
          700: "#687c7b",
          800: "#455352",
          900: "#232929",
        },
        whiteGreen: {
          100: "#f7fbfb",
          200: "#eff8f7",
          300: "#e8f4f3",
          400: "#e0f1ef",
          500: "#d8edeb",
          600: "#adbebc",
          700: "#828e8d",
          800: "#565f5e",
          900: "#2b2f2f",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: "#F8F4EB",
        // background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
