/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // UNILAG brand colors
        unilag: {
          green: "#006838",
          "green-light": "#00894D",
          "green-dark": "#004D2A",
          gold: "#C5A55A",
          "gold-light": "#D4BC7A",
          "gold-dark": "#A88B3D",
        },
        // UI colors
        campus: {
          bg: "#F7F8FA",
          card: "#FFFFFF",
          border: "#E5E7EB",
          text: "#1F2937",
          "text-secondary": "#6B7280",
          accent: "#006838",
        },
      },
      fontFamily: {
        display: ['"DM Sans"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)",
        panel: "0 4px 20px rgba(0,0,0,0.08)",
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
