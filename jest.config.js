module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest'
  },
  testEnvironment: 'jest-environment-jsdom'
}
