# The Hot Slice - Pizza Ordering System

## Introduction

The Hot Slice is a pizza ordering system. The application allows users to select a pizzas and make an order. The user can add the pizza to the cart and proceed to the checkout. The user can also view the cart and remove items from it. The application is built with React, TypeScript, Redux, and Tailwindcss. It was primarily developed as a learning project to practice writing unit, integration, and end-to-end tests.

## Technologies

- React
- TypeScript
- Redux
- Tailwindcss
- Vitest
- React Testing Library
- Cypress

## Installation

1. Clone the repository: https://github.com/PDochev/the-hot-slice.git

2. Install dependencies:

   ```bash
   npm install
   ```

3. Commands:

   - Run the application:

     ```js
     npm run dev
     ```

   - Run the tests:

     ```js
     npm run test
     ```

   - Run the Cypress tests (E2E):

     **The server needs to be running in order to run the Cypress tests**

     ```js
     npm run cy:open
     ```

## Few things to consider when setting up the testing environment with Vitest and React Testing Library

To make [jest-dom matchers](https://github.com/testing-library/jest-dom#custom-matchers) available in all test files:

1. create new file _src/setupTests.js_
1. add these contents:

```js
import "@testing-library/jest-dom";
```

## Add Vitest and Testing Library plugins to ESLint

In _.eslintrc.cjs_:

1. Add these to to the `extends` array:

```js
   'plugin:testing-library/react',
   'plugin:vitest/recommended',
   'plugin:jest-dom/recommended',
```

1. This step avoids linting errors when using the `test` and `expect` Vitest globals without importing them first.

At the top, require the Vitest plugin:

```js
const vitest = require("eslint-plugin-vitest");
```

Then Add this property / value to the top-level `module.exports` object:

```js
    globals: {
      ...vitest.environments.env.globals,
    },
```

## Update a few ESLint rules

Add these to the `rules` object in _.eslintrc.cjs_:

```js
    "no-unused-vars": "warn", // warning, not error
    "vitest/expect-expect": "off", // eliminate distracting red squiggles while writing tests
    "react/prop-types": "off", // turn off props validation
```

## Update vite configuration for tests

Update _vite.config.js_ based on the [Vitest Testing Library example](https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts). Add this property / value to the `defineConfig` argument:

```js
  test: {
    globals: true,
    environment: "jsdom",
    // this points to the setup file created earlier
    setupFiles: "./src/setup.js",
    // you might want to disable the `css: true` line, since we don't have
    // tests that rely on CSS -- and parsing CSS is slow.
    // I'm leaving it in here because often people want to parse CSS in tests.
    css: true,
  },
```

## TypeScript Types for Vitest and Jest-Dom

We need to tell TypeScript to include type definitions for Vitest global variables and Jest DOM matchers.

Add "types": ["vitest/globals", "@testing-library/jest-dom"], to _tsconfig.app.json_ in the compilerOptions object:

```js
   "compilerOptions": {
   "types": ["vitest/globals", "@testing-library/jest-dom"],
  },
```
