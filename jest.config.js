module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  roots: [
    '<rootDir>/src',
  ],
  globals: {
    'ts-jest': {
      babelConfig:
        {
          env:
            {
              test:
                {
                  plugins: ['dynamic-import-node'],
                },
            },
        },
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
    // '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
    // "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/@material-ui/core/esm",
  },
  testRegex: '(roots/.*|(\\.|/)(test))\\.(ts|tsx)?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text',
    'clover',
  ],
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@modules/(.*)$': '<rootDir>/src/store/modules/$1',
    '@components/(.*)$': '<rootDir>src/components/$1',
    '@pages/(.*)$': '<rootDir>src/pages/$1',
    '@placeholders/(.*)$': '<rootDir>src/placeholders/$1',
  },
  moduleDirectories: ['utils', 'modules', 'node_modules'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/interface.d.ts',
    '!src/**/*interfaces.d.ts',
    '!src/**/fixtures.ts',
    '!src/testHelpers.tsx',
  ],
  coverageThreshold: {
    global: {
      'branches': 40,
      'functions': 45,
      'lines': 65,
      'statements': 60,
    },
  },
  setupFiles: [
    // '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/src/setupMocks.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules',
    '<rootDir>/src/index.tsx',
    'src/store/index.tsx|rootReducer.ts',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '<rootDir>/config/setupTest.js',
  ],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
    'node_modules/(?!(@material-ui)/)',
    '/.pnp.js$',
  ],
};
