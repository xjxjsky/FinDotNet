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
        transformIgnorePatterns: [
          "/node_modules/(?!(axios)/)" // 让 Jest 处理 axios 模块
        ],
      },
    },
  };
  