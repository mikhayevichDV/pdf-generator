export = {
  displayName: {
    name: 'API_E2E_TESTS',
    color: 'yellow',
  },
  moduleFileExtensions: ['ts', 'js'],
  rootDir: '../',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@repositories': '<rootDir>/src/repositories/index.ts',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
  },
  verbose: true,
  bail: true,
};
