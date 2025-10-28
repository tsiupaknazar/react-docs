/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        button: "var(--color-bg-button)",
        accent: "var(--color-text-accent)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "btn-text": "var(--color-bg-secondary)",
        input: "var(--color-bg-input)",
        doc: "var(--color-doc)",
        "doc-hover": "var(--color-doc-hover)",
      },
    },
  },
  plugins: [],
};
