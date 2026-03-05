module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',     // Vue 2 推荐规则
        'plugin:prettier/recommended', // Prettier 集成
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        // ============================================================
        // DeepSource 会读取并执行以下 ESLint 规则
        // 这些规则覆盖了 DeepSource 关注的多个维度:
        //   - Bug Risk (Bug 风险)
        //   - Anti-pattern (反模式)
        //   - Performance (性能)
        //   - Security (安全)
        //   - Style (代码风格)
        // ============================================================

        // --- Bug Risk ---
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-undef': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-unreachable': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',

        // --- Anti-patterns ---
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-with': 'error',
        'no-var': 'error',
        'prefer-const': 'warn',
        'no-param-reassign': 'warn',

        // --- Performance ---
        'no-loop-func': 'warn',
        'no-await-in-loop': 'warn',

        // --- Security ---
        'no-script-url': 'error',

        // --- Style ---
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'multi-line'],
        'no-multi-spaces': 'warn',
        'no-trailing-spaces': 'warn',
        'semi': ['error', 'always'],
        'quotes': ['error', 'single', { avoidEscape: true }],

        // --- Vue 特定规则 ---
        'vue/no-unused-components': 'warn',
        'vue/no-unused-vars': 'warn',
        'vue/require-default-prop': 'warn',
        'vue/require-prop-types': 'warn',
        'vue/html-self-closing': 'off',       // 关闭自闭合标签要求
        'vue/max-attributes-per-line': 'off',  // 由 Prettier 控制
        'vue/singleline-html-element-content-newline': 'off',
    },
    overrides: [
        {
            files: ['tests/**/*.{spec,test}.js'],
            env: { jest: true },
            rules: {
                'no-console': 'off',
            },
        },
    ],
};
