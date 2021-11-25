module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  restoreMocks: true,
  automock: false,
  testRegex: '\\.test\\.(js|ts)',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  modulePaths: ['<rootDir>/src'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tmp/',
    '<rootDir>/dist/',
    '<rootDir>/test/fixtures',
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/config/index.ts',
    '<rootDir>/src/entry.ts',
  ],
};
