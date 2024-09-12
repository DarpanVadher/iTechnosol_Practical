module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',  // Ensure Jest uses ts-jest to transform TypeScript files
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/__test__/**/*.test.ts'],  // Matches your test files
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',  // Adjust this if you are using path aliases
    },
};
  