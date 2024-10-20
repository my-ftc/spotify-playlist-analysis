import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      margin: {
        '1p': '1%',
        '2p': '2%',
        '3p': '3%',
        '4p': '4%',
        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
      },
    },
  },
  plugins: [],
};

export default config;
