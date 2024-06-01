import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/fem-tic-tac-toe/",
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  plugins: [
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        replaceAttrValues: {
          "#31C3BD": "currentColor",
          "#F2B137": "currentColor",
        },
        svgoConfig: {
          plugins: ["removeDimensions"],
        },
      },
    }),
  ],
});
