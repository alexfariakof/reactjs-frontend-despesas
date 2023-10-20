/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true, 
  coverageDirectory: 'coverage',
  bail: false, // Impede que o Jest interrompa a execução dos testes após o primeiro erro
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.test.ts', 
    '!src/**/*.test.tsx',
    '!src/**/App.tsx', 
    '!src/**/index.tsx', 
    '!src/**/index.ts', 
    '!src/shared/services/axios-config/**', 
    '!src/shared/themes/**', 
    '!src/shared/environment/**',    
  ],
  testEnvironmentOptions: {
    NODE_TLS_REJECT_UNAUTHORIZED: 0,
  },
  //setupFiles: ['./setupTests.js'],
  moduleNameMapper: {
    'src/shared/services/axios-config/index.js': './__mocks__/axios-config.ts', // Mock the axios-config module
  },
};