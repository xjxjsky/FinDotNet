// craco.config.js
module.exports = {
    babel: {
      plugins: [
        "@babel/plugin-proposal-private-property-in-object"
      ],
    },
    jest: {
      configure: {
        transformIgnorePatterns: [
          "/node_modules/(?!(axios)/)" // 让 Jest 处理 axios 模块
        ],
      },
    },
  };
  