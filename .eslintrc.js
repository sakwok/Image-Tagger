module.exports = {
  // "parser": "@typescript-eslint/parser",
  "plugins": [
    // "@typescript-eslint",
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn"
  },
  "parserOptions": {
    "ecmaVersion": 6
  },

  "env": {
    "es6": true
  }
}