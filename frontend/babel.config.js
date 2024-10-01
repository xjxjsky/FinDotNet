module.exports = {
    presets: [
      ['@babel/preset-env', { modules: 'commonjs' }], // 将模块格式设置为 CommonJS
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      ["@babel/plugin-transform-class-properties", { "loose": true }],
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
    ]
  };
  