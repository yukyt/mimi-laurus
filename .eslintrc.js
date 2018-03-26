module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/require-default-props": 0,
        "react/prefer-stateless-function": 0,
        "guard-for-in": 0,
        "no-restricted-syntax": 0,
        "no-continue": 0,
        "no-plusplus": 0,
        "no-bitwise": 0,
        "react/jsx-uses-react": [
            1
        ],
        "no-console": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-filename-extension": [
            1,
            {
                    "extensions": [
                        ".js",
                        ".jsx"
                    ]
            }
        ]
    }
};