module.exports = {
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    //   'vue/no-unused-vars': 'error'
  },
  parser: "vue-eslint-parser",
};
