module.exports = {
    // 测试环境
    testEnvironment: 'jsdom',

    // 文件扩展名解析顺序
    moduleFileExtensions: ['js', 'json', 'vue'],

    // 模块路径别名 (对应 webpack alias)
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // 转换配置
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue2-jest',
    },

    // 忽略转换的目录
    transformIgnorePatterns: ['/node_modules/'],

    // 测试文件匹配模式
    testMatch: [
        '<rootDir>/tests/**/*.spec.js',
        '<rootDir>/tests/**/*.test.js',
    ],

    // 覆盖率配置 - DeepSource 需要 lcov 格式
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/main.js',
        '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'text-summary', 'lcov', 'clover', 'json-summary'],

    // 覆盖率阈值 (DeepSource 也会追踪这些指标)
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        },
    },

    // Setup 文件
    setupFiles: ['<rootDir>/tests/setup.js'],
};
