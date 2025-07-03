/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const config = {
  // An array of regexp pattern strings used to skip coverage collection
  modulePathIgnorePatterns: [],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Transform files with babel-jest
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },

  // Indicates which extensions Jest should treat as ESM
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],

  // Modern Node.js environment
  testEnvironment: "node",

  // Handle Nuxt.js aliases
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1"
  },
};

export default config;
