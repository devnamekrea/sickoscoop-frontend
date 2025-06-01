/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"  // Added this for completeness
  ],
  theme: {
    extend: {
      // Add custom animations that your app uses
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      // Add any custom colors your app might need
      colors: {
        // You can add custom colors here if needed
      },
      // Add custom gradients if you want more control
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Add custom blur values
      blur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}