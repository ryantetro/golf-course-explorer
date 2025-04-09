/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Enhanced color palette for a professional look
      colors: {
        "golf-green": "#1B5E20", // Darker green for a richer look
        "fairway-green": "#4CAF50", // Keep this as a vibrant fairway color
        "sand-trap": "#D2B48C", // Sandy beige for bunkers
        "water-hazard": "#0288D1", // Deeper blue for water hazards
        "golf-gold": "#FFD700", // Gold for accents
        "clubhouse-gray": "#374151", // Dark gray for professional contrast
        "tee-box": "#F5F5F5", // Light gray for backgrounds
        "flagstick-red": "#D32F2F", // Red for flagsticks or highlights
      },
      // Background images and textures
      backgroundImage: {
        "golf-gradient": "linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)",
        "fairway-texture": "url('https://www.transparenttextures.com/patterns/green-grass.png')", // Grass texture
        "sand-texture": "url('https://www.transparenttextures.com/patterns/sand.png')", // Sand texture
        "water-texture": "url('https://www.transparenttextures.com/patterns/water.png')", // Water texture
      },
      // Custom fonts for a professional look
      fontFamily: {
        "golf-heading": ["Playfair Display", "serif"], // Elegant font for headings
        "golf-body": ["Open Sans", "sans-serif"], // Clean font for body text
      },
      // Enhanced animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "swing": "swing 0.3s ease-in-out",
        "putt": "putt 1s ease-in-out",
        "spin": "spin 1s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        swing: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        putt: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // Box shadows for depth
      boxShadow: {
        "golf-card": "0 8px 16px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
        "golf-hover": "0 12px 24px rgba(0, 0, 0, 0.15)",
      },
      // Border radius for a softer look
      borderRadius: {
        "golf": "1rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For better text styling
    require('@tailwindcss/forms'), // For better form styling
  ],
};