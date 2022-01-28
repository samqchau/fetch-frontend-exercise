module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'standard',
        "prettier",
        "prettier/prettier",
        "plugin:prettier/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "prettier/prettier": ["error", {
            "endOfLine":"auto"
        }],
    },
    globals: {
        JSX: true,
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
