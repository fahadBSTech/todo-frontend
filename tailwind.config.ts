import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grayCustom: "#808080",
        emptyStateBoxborderColor: "#333333",
        customPurple: '#8284FA',
        createTaskButtonColor: '#1E6F9F',
        taskCard: '#262626',
        black: '#0D0D0D',
        textColor: '#4EA8DE'
      },
    },
  },
  plugins: [],
} satisfies Config;
