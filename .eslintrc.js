module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  plugins: ["vue"],
  rules: {
    "no-console": "error", // Throw an error for any console usage
    "vue/multi-word-component-names": "off",
  },
};
