/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Ensure you include the flowbite-react files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
  ],
};
