# DeepSource 集成指南

本项目已配置 DeepSource 免费版，用于演示其代码质量分析功能。

---

## 一、DeepSource 功能演示清单

| 功能 | 状态 | 说明 |
|------|------|------|
| **JavaScript 静态分析** | ✅ 已配置 | 检测 Bug 风险、反模式、性能问题、安全漏洞 |
| **Vue.js 框架支持** | ✅ 已配置 | 分析 `.vue` 单文件组件 |
| **Secrets 检测** | ✅ 已配置 | 自动扫描意外提交的密钥/Token |
| **测试覆盖率追踪** | ✅ 已配置 | 通过 CI 上报 lcov 覆盖率数据 |
| **ESLint 规则集成** | ✅ 已配置 | DeepSource 读取 `.eslintrc.js` 执行规则 |
| **Autofix (Prettier)** | ✅ 已配置 | DeepSource 自动提 PR 修复代码格式 |
| **Autofix (ESLint)** | ✅ 已配置 | DeepSource 自动提 PR 修复 Lint 问题 |
| **GitHub Actions CI** | ✅ 已配置 | 自动化 lint + test + coverage 上报 |
| **Issue 分类** | ✅ 自动 | Bug Risk / Anti-pattern / Performance / Security / Style |
| **代码健康度指标** | ✅ 自动 | 展示项目整体代码质量趋势 |

---

## 二、快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

### 3. 运行测试 + 覆盖率

```bash
npm run test:coverage
```

### 4. 代码检查

```bash
npm run lint        # 检查
npm run lint:fix    # 自动修复
npm run format      # Prettier 格式化
```

### 5. 完整验证 (lint + test + build)

```bash
npm run validate
```

---

## 三、接入 DeepSource 步骤

### Step 1: 注册 DeepSource

1. 前往 [https://deepsource.com](https://deepsource.com)
2. 使用 GitHub 账号登录（免费版）
3. 授权访问你的 GitHub 仓库

### Step 2: 激活仓库

1. 在 DeepSource Dashboard 中点击 **"Activate Repository"**
2. 选择本项目的 GitHub 仓库
3. DeepSource 会自动检测 `.deepsource.toml` 配置文件
4. 首次激活后会自动触发全量分析

### Step 3: 配置 DSN (用于覆盖率上报)

1. 在 DeepSource 项目设置页面，找到 **DSN (Data Source Name)**
2. 复制 DSN 值
3. 在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加：
   - Name: `DEEPSOURCE_DSN`
   - Value: 你复制的 DSN

### Step 4: 推送代码触发分析

```bash
git add .
git commit -m "feat: integrate DeepSource for code quality analysis"
git push origin main
```

DeepSource 会在每次 push 和 PR 时自动运行分析。

---

## 四、DeepSource 分析维度说明

### 4.1 Bug Risk (Bug 风险)
- 未使用的变量
- 不可达代码
- 重复的对象 key
- 无效的 typeof 比较

### 4.2 Anti-pattern (反模式)
- 使用 `eval()` 或 `new Function()`
- 使用 `var` 而非 `let/const`
- 不必要的参数重赋值

### 4.3 Performance (性能)
- 循环内定义函数
- 循环内使用 `await`

### 4.4 Security (安全)
- 硬编码的密钥/Token
- `javascript:` 伪协议使用
- 不安全的正则表达式

### 4.5 Style (代码风格)
- 缺少分号
- 不一致的引号风格
- 缺少严格相等 (`===`)

### 4.6 Coverage (测试覆盖率)
- 行覆盖率
- 分支覆盖率
- 函数覆盖率
- 覆盖率变化趋势

---

## 五、Autofix 功能

DeepSource 的 Autofix 功能已通过 Transformers 配置启用：

- **Prettier Transformer**: 自动格式化代码
- **ESLint Transformer**: 自动修复 ESLint 可修复的问题

使用方式：
1. 在 DeepSource Dashboard 查看检测到的 Issue
2. 点击 **"Autofix this issue"** 按钮
3. DeepSource 会自动创建一个修复 PR

---

## 六、项目文件结构

```
.deepsource.toml          # DeepSource 主配置文件
.eslintrc.js              # ESLint 配置 (DeepSource 会读取)
.prettierrc               # Prettier 配置 (Autofix Transformer 使用)
.editorconfig             # 编辑器行为配置
.eslintignore             # ESLint 忽略规则
.prettierignore           # Prettier 忽略规则
jest.config.js            # Jest 测试配置 (覆盖率输出 lcov)
.github/
  workflows/
    deepsource.yml        # CI 工作流 (lint + test + coverage 上报)
tests/
  setup.js                # 测试环境初始化
  unit/
    const.spec.js          # 常量配置测试
    couponData.spec.js     # Mock 数据接口测试
    storageUtil.spec.js    # localStorage 工具测试
    toast.spec.js          # Toast 组件测试
    urlUtil.spec.js        # URL 工具函数测试
```

---

## 七、DeepSource 免费版限制

| 特性 | 免费版 |
|------|--------|
| 公开仓库 | ✅ 无限制 |
| 私有仓库 | ✅ 最多 5 个成员 |
| 静态分析 | ✅ 完整 |
| Autofix | ✅ 完整 |
| 测试覆盖率 | ✅ 完整 |
| Secrets 检测 | ✅ 完整 |
| 历史趋势 | ✅ 最近 90 天 |
| GitHub/GitLab 集成 | ✅ 完整 |

---

## 八、常用 DeepSource 命令

```bash
# 安装 DeepSource CLI (可选)
curl https://deepsource.io/cli | sh

# 手动上报覆盖率
./bin/deepsource report --analyzer test-coverage \
  --key javascript \
  --value-file coverage/lcov.info
```

---

## 九、Badge

在 README.md 中添加 DeepSource badge：

```markdown
[![DeepSource](https://app.deepsource.com/gh/<OWNER>/<REPO>.svg/?label=active+issues&show_trend=true&token=<TOKEN>)](https://app.deepsource.com/gh/<OWNER>/<REPO>/)

[![DeepSource](https://app.deepsource.com/gh/<OWNER>/<REPO>.svg/?label=resolved+issues&show_trend=true&token=<TOKEN>)](https://app.deepsource.com/gh/<OWNER>/<REPO>/)
```

替换 `<OWNER>`, `<REPO>`, `<TOKEN>` 为实际值（可在 DeepSource Dashboard 的 Settings → Badges 中找到）。
