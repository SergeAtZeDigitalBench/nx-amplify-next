/* eslint-disable */
export default {
  displayName: 'fe-next',
  preset: '../../jest.preset.js',
  globals: {
    Uint8Array: Uint8Array,
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/fe-next',
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
