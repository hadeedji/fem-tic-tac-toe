/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    colors: {
      "navy-700": "#1A2A33",
      "navy-400": "#1F3641",
      "silver-700": "#A8BFC9",
      "silver-400": "#DBE8ED",
      "blue-700": "#31C3BD",
      "blue-400": "#65E9E4",
      "yellow-700": "#F2B137",
      "yellow-400": "#FFC860",
    },
    fontFamily: {
      sans: ["Outfit"],
    },
    fontSize: {
      base: [
        "14px",
        {
          letterSpacing: "0.8px",
          fontWeight: "500",
        },
      ],
      "h-xs": [
        "16px",
        {
          letterSpacing: "1px",
          fontWeight: "700",
        },
      ],
      "h-s": [
        "20px",
        {
          letterSpacing: "1.25px",
          fontWeight: "700",
        },
      ],
      "h-m": [
        "24px",
        {
          letterSpacing: "1.5px",
          fontWeight: "700",
        },
      ],
      "h-l": [
        "24px",
        {
          letterSpacing: "2.5px",
          fontWeight: "700",
        },
      ],
    },
  },
};
