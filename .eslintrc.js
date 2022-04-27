module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "plugin:testing-library/react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": "off",
        "no-useless-catch": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off"
    }
}
