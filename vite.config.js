import { defineConfig } from "vite";

export default defineConfig({
  base: "/fem-tic-tac-toe/",
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
