import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        barlow: ['BarlowRegular', 'regular'],
        barlowItalic: ['BarlowItalic', 'regular'],
        barlowMedium: ['BarlowMedium', 'medium'],
        barlowLight: ['BarlowLight', 'light'],
        barlowBold: ['BarlowBold', 'bold'],
      },
      colors: {
        primary: "#fd7fa4"
      }
    },
  },
  plugins: [],
};
export default config;
