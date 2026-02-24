# Stripe 测试账号配置说明

## 配置步骤

### 1. 获取 Stripe API 密钥

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 登录或注册 Stripe 账号
3. 进入 "Developers" → "API keys"
4. 复制以下密钥：
   - **Secret key**: 以 `sk_test_` 开头
   - **Publishable key**: 以 `pk_test_` 开头

### 2. 配置 .env 文件

在项目根目录下编辑 `.env` 文件，填入你的 Stripe API 密钥：

```env
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
PORT=3001
```

### 3. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:3001` 启动

### 4. 测试支付功能

使用 Stripe 提供的测试卡号进行测试：

| 卡号 | 描述 |
|------|------|
| 4242 4242 4242 4242 | 成功支付 |
| 4000 0000 0000 0002 | 卡片被拒绝 |
| 4000 0025 0000 03155 | 需要 3D 验证 |
| 4000 0000 0000 9995 | 余额不足 |

其他测试信息：
- 过期日期：任意未来日期（如 12/34）
- CVC：任意 3 位数字（如 123）
- 邮编：任意 5 位数字（如 12345）

## API 端点

### 客户管理
- `POST /api/customers` - 创建客户
- `GET /api/customers/:id` - 获取客户信息
- `GET /api/customers` - 列出所有客户
- `PUT /api/customers/:id` - 更新客户信息

### 产品和价格
- `POST /api/products` - 创建产品
- `GET /api/products` - 获取所有产品
- `POST /api/prices` - 创建价格
- `GET /api/prices` - 获取价格列表

### 订阅管理
- `POST /api/subscriptions` - 创建订阅
- `PUT /api/subscriptions/:id` - 更新订阅
- `DELETE /api/subscriptions/:id` - 取消订阅

### 支付
- `POST /api/create-payment-intent` - 创建支付意图
- `GET /api/payment-intents/:id` - 获取支付意图
- `POST /api/payment-intents/:id/confirm` - 确认支付
- `POST /api/payment-methods` - 创建支付方式
- `POST /api/test-payment` - 测试支付

### Webhook
- `POST /api/webhooks` - 创建 webhook
- `POST /api/webhooks/trigger` - 触发 webhook 事件
- `GET /api/webhooks/events` - 获取 webhook 事件列表

### Connect 平台
- `POST /api/connected-accounts` - 创建关联账户
- `POST /api/account-links` - 创建账户链接
- `POST /api/transfers` - 创建转账

### 风险评估
- `POST /api/risk/evaluate` - 评估支付风险

### 配置
- `GET /api/config` - 获取 Stripe 可发布密钥

## 注意事项

1. **测试环境**：当前配置使用的是 Stripe 测试环境（`sk_test_` 和 `pk_test_`），不会产生真实交易
2. **API 限制**：测试环境有相同的 API 限制，但不会产生费用
3. **数据持久化**：测试环境的数据会保留，可以随时查看和管理
4. **Webhook**：测试环境可以使用 Stripe CLI 本地测试 webhook

## 故障排查

### 问题：API 密钥无效
- 检查 `.env` 文件中的密钥是否正确
- 确认使用的是测试密钥（`sk_test_` 和 `pk_test_`）

### 问题：支付失败
- 确认使用的是测试卡号
- 检查卡号格式是否正确
- 查看错误消息了解具体原因

### 问题：服务器无法启动
- 确认端口 3001 未被占用
- 检查 Node.js 和 npm 是否正确安装
- 查看控制台错误信息

## 相关资源

- [Stripe 官方文档](https://stripe.com/docs)
- [Stripe API 参考](https://stripe.com/docs/api)
- [Stripe 测试模式](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com/)