import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          DEFAULT: "#C6A15B",
          50: "#F8F4EC",
          100: "#F0E8D6",
          200: "#E0D1AD",
          300: "#D0BA84",
          400: "#C6A15B",
          500: "#B08A3F",
          600: "#8C6E32",
          700: "#685225",
          800: "#443619",
          900: "#201B0C"
        },
        charcoal: {
          DEFAULT: "#242424",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#242424",
          900: "#1A1A1A"
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          50: "#FDFCFA",
          100: "#F5F1E8",
          200: "#EBE3D1",
          300: "#E0D5BA"
        },
        darktext: "#292929"
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "cinematic-gradient": "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
