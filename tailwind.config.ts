import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',  // Page components
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Custom components
    './app/**/*.{js,ts,jsx,tsx,mdx}', // App directory for Next.js 13+ App Router
    './node_modules/@chakra-ui/**/*.{js,ts,jsx,tsx}', // Chakra UI components
    './node_modules/@emotion/react/**/*.{js,ts,jsx,tsx}', // Emotion React components
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
