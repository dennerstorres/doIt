module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    indent: 0,
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: ['error', 'single', {avoidEscape: true}],
    semi: ['error', 'always'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: false,
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        jsxSingleQuote: true,
      },
    ],
  },
};
