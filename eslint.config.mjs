import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", ".claude/**", "design-references/**", "node_modules/**", "next-env.d.ts"] },
];
export default config;
