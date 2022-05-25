module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest'
  },
  moduleNameMapper: {
    '^@/utils$': '<rootDir>/src/utils',
    '^@/store$': '<rootDir>/src/store',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1'
  },
  testEnvironment: 'jest-environment-jsdom'
}
