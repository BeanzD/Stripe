# Stripe Tutorial Demos

Stripe 教程演示项目，包含完整的支付、订阅、Webhook等功能演示。

## 本地运行

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
创建 `.env` 文件并添加：
```
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

3. 启动服务器：
```bash
npm start
```

访问 `http://localhost:3001` 查看网站。

## Vercel 部署

### 1. 连接 GitHub 仓库

将此项目推送到 GitHub 后，在 Vercel 中导入该仓库。

### 2. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

- `STRIPE_SECRET_KEY`: Stripe 密钥（以 `sk_` 开头）
- `STRIPE_PUBLISHABLE_KEY`: Stripe 可发布密钥（以 `pk_` 开头）

### 3. 部署配置

项目已包含 `vercel.json` 配置文件，会自动处理：
- Node.js 服务器
- API 路由
- 静态文件服务

### 4. 获取密钥

从 [Stripe Dashboard](https://dashboard.stripe.com/apikeys) 获取 API 密钥：
- 使用测试密钥进行开发和测试
- 生产环境请使用实时密钥

## 项目结构

```
stripe-tutorial-demos/
├── css/                 # 样式文件
├── demos/               # 演示页面
│   ├── payments/       # 支付演示
│   ├── subscriptions/  # 订阅演示
│   ├── tools/          # 工具演示
│   └── advanced/       # 高级功能
├── js/                 # JavaScript 文件
├── server.js           # Express 服务器
├── vercel.json         # Vercel 部署配置
└── index.html          # 首页
```

## 功能特性

- 支付演示
- 订阅管理
- Webhook 处理
- 连接账户
- 风险评估
- Stripe 面试思维导图

## 技术栈

- Node.js + Express
- Stripe API
- HTML/CSS/JavaScript
- Vercel 部署
