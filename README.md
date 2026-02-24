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

## Git 性能优化

**重要：** 此项目已优化Git性能，移除了`node_modules`目录。

- 跟踪文件数：从1305个减少到21个（**98.4%优化**）
- Git操作速度：提升约4倍

详细优化说明请查看 [GIT_OPTIMIZATION.md](./GIT_OPTIMIZATION.md)

### 克隆项目后

```bash
# 安装依赖（不要将node_modules提交到Git）
npm install

# 配置环境变量
cp .env.example .env
# 编辑.env文件，添加Stripe API密钥

# 启动项目
npm start
```

## Vercel 部署

### ⚠️ 重要：必须先配置环境变量

**在部署之前，必须先在 Vercel 中配置环境变量，否则会报错！**

详细配置步骤请查看 [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)

### 快速配置步骤

1. **获取 Stripe API 密钥**
   - 访问 [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - 复制 Secret key（`sk_test_` 开头）和 Publishable key（`pk_test_` 开头）

2. **在 Vercel 中添加环境变量**
   - 进入 Vercel 项目 → Settings → Environment Variables
   - 添加以下环境变量（**必须选择所有环境**：Production, Preview, Development）：
     - `STRIPE_SECRET_KEY`: `sk_test_xxxxxx`
     - `STRIPE_PUBLISHABLE_KEY`: `pk_test_xxxxxx`

3. **重新部署**
   - 配置环境变量后，在 Vercel 中重新部署项目

### 常见问题

**错误：访问Vercel应用时报错 `Neither apiKey nor config.authenticator provided`**
- 原因：未在Vercel中配置 `STRIPE_SECRET_KEY` 环境变量
- 解决：按照上述步骤在Vercel中配置环境变量，然后重新部署
- 详细说明：查看 [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)

**错误：`FUNCTION_INVOCATION_FAILED`**
- 原因：代码未正确导出为模块或缺少环境变量
- 解决：
  1. 确保已配置所有必需的环境变量
  2. 检查 Vercel 部署日志查看具体错误信息
  3. 确保代码已导出为模块（`module.exports = app`）

详细故障排除请查看 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

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
