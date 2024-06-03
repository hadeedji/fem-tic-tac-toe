import plugin from "tailwindcss/plugin";

const innerShadowPlugin = plugin(function ({ addUtilities, theme, e }) {
  const spacing = {
    1: "0.25rem",
    2: "0.5rem",
  };

  const utilities = {};

  const colors = theme("colors");
  for (const colorKey in colors) {
    if (typeof colors[colorKey] != "object") {
      continue;
    }

    const colorValue = colors[colorKey];
    const color = colorValue["900"];

    for (const spacingKey in spacing) {
      const spacingValue = spacing[spacingKey];
      utilities[`.${e(`inner-shadow-${spacingKey}-${colorKey}`)}`] = {
        "box-shadow": `inset 0 -${spacingValue} ${color}`,
      };
    }
  }

  addUtilities(utilities);
});

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    colors: {
      black: "#000",
      navy: {
        400: "#1F3641",
        700: "#1A2A33",
        900: "#10212A",
      },
      silver: {
        400: "#DBE8ED",
        700: "#A8BFC9",
        900: "#6B8997",
      },
      blue: {
        400: "#65E9E4",
        700: "#31C3BD",
        900: "#118C87",
      },
      yellow: {
        400: "#FFC860",
        700: "#F2B137",
        900: "#CC8B13",
      },
    },
    fontFamily: {
      sans: ["Outfit", "sans-serif"],
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
        "40px",
        {
          letterSpacing: "2.5px",
          fontWeight: "700",
        },
      ],
    },
  },
  plugins: [innerShadowPlugin],
};
