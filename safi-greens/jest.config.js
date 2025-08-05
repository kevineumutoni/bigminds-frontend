module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    '<rootDir>/jest.setup.js'
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  // :point_down: ADDED axios to transformIgnorePatterns!
  transformIgnorePatterns: [
    "/node_modules/(?!(@nivo|d3-|d3|internmap|delaunator|robust-predicates|axios)/)"
  ],
};