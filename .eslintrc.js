module.exports = {
  extends: ['eslint:recommended', 'prettier'], // extending recommended config and config derived from eslint-config-prettier
  plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  globals: {
    window: true,
    document: true,
    customElements: true,
    HTMLElement: true,
    MutationObserver: true,
    Event: true,
    CustomEvent: true,
    Worker: true,
    setTimeout: true,
    HandstandContainer: true,
    HandstandLabel: true,
    HandstandTextinput: true
  },
  rules: {
    'prettier/prettier': [ // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
  },
};
