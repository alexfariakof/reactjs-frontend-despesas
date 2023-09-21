/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, 
  coverageDirectory: 'coverage',
  bail: false // Impede que o Jest interrompa a execução dos testes após o primeiro erro
};