// https://create-react-app.dev/docs/running-tests
// https://jestjs.io/ja/docs/next/configuration
const config = {
  preset: "jest-playwright-jsdom",
  verbose: true,
  rootDir: "./",
  roots: ["./"],
  // testMatch: ["<rootDir>/**/*.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // https://jestjs.io/docs/configuration#setupfiles-array
  setupFilesAfterEnv: ["./setupTests.ts"],
}

module.exports = config
