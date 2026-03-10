/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // MAIN BRAND
        primary: "#28a745",
        "primary-light": "#5dd879",
        "primary-dark": "#155724",
        "primary-hover": "#218838",

        // YELLOW BRAND
        yellow: "#ffc107",
        "yellow-light": "#fff3cd",
        "yellow-dark": "#e0a800",

        // ACCENT
        accent: "#ff9900",
        "accent-dark": "#cc7a00",

        // STATUS COLORS (very useful for dashboards)
        success: "#28a745",
        warning: "#ffc107",
        danger: "#dc3545",
        info: "#17a2b8",

        // BACKGROUNDS
        background: "#f8f9fa",
        "background-dark": "#e9ecef",

        // BORDERS
        border: "#e5e7eb",
        "border-dark": "#d1d5db",

        // TEXT
        "text-primary": "#212529",
        "text-secondary": "#6c757d",

        // CARD COLORS
        card: "#ffffff",
        "card-hover": "#f9fafb",
      },
    },
  },
  plugins: [],
};
