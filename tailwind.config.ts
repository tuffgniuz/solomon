import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        contrast: "var(--contrast)",
        shadow: "var(--shadow)",
        "polar-night-0": "var(--polar-night-0)",
        "polar-night-1": "var(--polar-night-1)",
        "polar-night-2": "var(--polar-night-2)",
        "polar-night-3": "var(--polar-night-3)",
        "snowstorm-0": "var(--snowstorm-0)",
        "snowstorm-1": "var(--snowstorm-1)",
        "snowstorm-2": "var(--snowstorm-2)",
        "aurora-green": "var(--aurora-green)",
        "aurora-red": "var(--aurora-red)",
        "aurora-orange": "var(--aurora-orange)",
        "aurora-yellow": "var(--aurora-yellow)",
        "aurora-purple": "var(--aurora-purple)",
        "frost-blue": "var(--frost-blue)",
      },
    },
  },
  plugins: [],
} satisfies Config;
