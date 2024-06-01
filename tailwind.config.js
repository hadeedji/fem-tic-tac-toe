import plugin from "tailwindcss/plugin";

const innerShadowPlugin = plugin(function ({ addUtilities, theme, e }) {
  const colors = Object.keys(theme("colors"))
    .filter((key) => key.endsWith("-900"))
    .reduce((obj, key) => {
      obj[key] = theme("colors")[key];
      return obj;
    }, {});

  const spacing = {
    1: "0.25rem",
    2: "0.5rem",
  };

  const utilities = Object.keys(colors).flatMap((colorKey) => {
    const colorValue = colors[colorKey];

    return Object.keys(spacing).map((spacingKey) => {
      const spacingValue = spacing[spacingKey];

      return {
        [`.${e(`inner-shadow-${spacingKey}-${colorKey}`)}`]: {
          "box-shadow": `inset 0 -${spacingValue} ${colorValue}`,
        },
      };
    });
  });

  addUtilities(utilities);
});

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    colors: {
      "navy-900": "#10212A",
      "navy-700": "#1A2A33",
      "navy-400": "#1F3641",
      "silver-900": "#6B8997",
      "silver-700": "#A8BFC9",
      "silver-400": "#DBE8ED",
      "blue-900": "#118C87",
      "blue-700": "#31C3BD",
      "blue-400": "#65E9E4",
      "yellow-900": "#CC8B13",
      "yellow-700": "#F2B137",
      "yellow-400": "#FFC860",
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
        "24px",
        {
          letterSpacing: "2.5px",
          fontWeight: "700",
        },
      ],
    },
  },
  plugins: [innerShadowPlugin],
};
