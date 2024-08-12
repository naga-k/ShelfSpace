/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},    // Ensures CSS imports are handled correctly
    tailwindcss: {},         // Tailwind CSS plugin
    autoprefixer: {},        // Automatically adds vendor prefixes to CSS rules
  },
};

export default config;
