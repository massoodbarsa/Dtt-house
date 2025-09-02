module.exports = {
  root: true,
  env: { node: true },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
