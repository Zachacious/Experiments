import nodeResolve from "@rollup/plugin-node-resolve"; // locate and bundle dependencies in node_modules (mandatory)
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "src/index.js",
    output: [
      {
        name: "main",
        file: "main.js",
        format: "umd",
      },
    ],
    plugins: [nodeResolve(), uglify()],
  },
];
