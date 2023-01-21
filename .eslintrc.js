module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  parser: "@babel/eslint-parser",
  plugins: ["react", "react-hooks", "import"],
  rules: {
    "react/prop-types": [0],
    "react/display-name": [0],
    "no-unused-vars": [
      "error",
      { ignoreRestSiblings: true, args: "after-used" },
    ],
    "no-unsafe-optional-chaining": "error",
    "block-scoped-var": "error",
    curly: ["error", "multi-line"],
    "default-case-last": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-implied-eval": "error",
    "no-self-compare": "error",
    "no-var": "error",
    yoda: ["error", "never", { exceptRange: true }],
    "no-unneeded-ternary": "error",

    "react/button-has-type": "error",
    "react/prefer-stateless-function": [0],
    "react/jsx-fragments": ["error", "element"],

    // These are very slow and seem unlikely to be a problem
    "import/no-unused-modules": "off",
    "import/namespace": "off",
    "import/named": "off",
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      { name: "Link", linkAttribute: "to" },
    ],
    "import/resolver": ["webpack", "node"],
  },
};
