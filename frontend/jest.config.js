// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
  };
  