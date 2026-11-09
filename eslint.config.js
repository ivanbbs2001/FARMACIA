import globals from "globals";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
export default [{
  files: ["src/**/*.{js,jsx}"],
  languageOptions: { globals: globals.browser, ecmaVersion: "latest", sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } } },
  plugins: { react, "react-hooks": hooks },
  rules: { "no-undef": "error", "no-redeclare": "error", "no-dupe-keys": "error",
    "react/jsx-uses-vars": "error", "react/jsx-no-undef": "error", "react/jsx-uses-react": "off", "react-hooks/rules-of-hooks": "error",
    "no-unused-vars": "off" }
}];
