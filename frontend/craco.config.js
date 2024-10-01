// craco.config.js
module.exports = {
    babel: {
      plugins: [
        ["@babel/plugin-transform-class-properties", { "loose": true }],
        ["@babel/plugin-transform-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    },
    jest: {
      configure: {
        preset: 'ts-jest',
        testEnvironment: 'jsdom',
        transform: {
          "^.+\\.tsx?$": "ts-jest",
          "^.+\\.jsx?$": "babel-jest",
        },
        transformIgnorePatterns: [
          "/node_modules/(?!(axios)/)" // 让 Jest 处理 axios 模块
        ],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
        moduleNameMapper: {
          "\\.(css|less|scss|sass)$": "identity-obj-proxy"
        },
      },
    },
  };
  