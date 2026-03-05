# 优惠券列表 Demo

一个优惠券列表的前端演示项目，基于 Vue 2.7 + Webpack 5 构建。

## 功能

- 优惠券列表展示（可用 / 已过期 / 已使用等多种状态）
- 兑换码输入 & 兑换
- 优惠券选择模式（通过 URL 参数切换）
- Mock 数据模拟，无需后端接口

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## URL 参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `coupontype` | 优惠券展示模式：`1` = 全部优惠券（含兑换入口）；其他 = 可用优惠券选择模式 | `?coupontype=1` |
| `cityId` | 城市 ID（演示用） | `?cityId=1` |

## 项目结构

```
src/
├── main.js                    # 入口文件
├── App.vue                    # 主页面
├── components/
│   ├── TopNavbar.vue          # 顶部导航栏
│   ├── ExchangeCoupon.vue     # 兑换码输入组件
│   └── CouponInfoCard.vue     # 优惠券卡片组件
├── configs/
│   └── const.js               # 常量配置
├── mock/
│   └── couponData.js          # Mock 数据 & 模拟接口
└── utils/
    ├── urlUtil.js             # URL 工具函数
    ├── storageUtil.js         # localStorage 工具函数
    └── toast.js               # 轻量 Toast 提示
```

## 技术栈

- Vue 2.7（Composition API）
- Webpack 5
- Sass
