// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',             //测试环境：根据需要选择 jsdom（前端）或 node（后端）
    testMatch: [                          //使用 testMatch 属性来指定要运行测试的文件
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    testPathIgnorePatterns: [             //使用 testPathIgnorePatterns 属性来忽略特定的目录或文件
      "/node_modules/",
      "/dist/",
      "/path/to/ignore/",
      "src/App.test.tsx"
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)"  
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js" // 添加这一行 添加对图片文件的映射
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // 确保文件路径正确

  };
  