import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next already registers the jsx-a11y plugin; turn on its full recommended set.
  { rules: jsxA11y.flatConfigs.recommended.rules },
  globalIgnores([".next/**", "out/**", "playwright-report/**", "test-results/**", "next-env.d.ts"]),
]);
