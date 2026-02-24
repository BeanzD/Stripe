# Vercel 部署配置指南

## 错误说明

如果看到以下错误：
```
Error: Neither apiKey nor config.authenticator provided
```

这说明 **Stripe API 密钥未在 Vercel 中配置**。

## 配置步骤

### 第一步：获取 Stripe API 密钥

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. 找到 "API keys" 部分
3. 复制以下两个密钥：
   - **Secret key** (以 `sk_test_` 开头)
   - **Publishable key** (以 `pk_test_` 开头)

### 第二步：在 Vercel 中配置环境变量

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目（stripe-tutorial-demos）
3. 点击顶部的 **Settings** 标签
4. 在左侧菜单中选择 **Environment Variables**
5. 点击 **Add New** 按钮添加以下环境变量：

| 变量名 | 变量值 | 环境 |
|--------|--------|------|
| `STRIPE_SECRET_KEY` | `sk_test_xxxxxx` | Production, Preview, Development |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_xxxxxx` | Production, Preview, Development |

**重要提示：**
- 确保选择所有三个环境：Production, Preview, Development
- 不要包含引号或空格
- 使用测试密钥（`sk_test_` 和 `pk_test_`）进行开发和测试

### 第三步：重新部署

配置环境变量后，需要重新部署项目：

1. 在 Vercel 项目页面点击 **Deployments** 标签
2. 找到最新的部署记录
3. 点击右侧的三个点菜单
4. 选择 **Redeploy**
5. 确认重新部署

### 第四步：验证部署

部署完成后，访问您的 Vercel URL：
- 首页应该正常显示
- API 路由应该能正常工作
- 不会再出现 500 错误

## 常见问题

### Q: 为什么需要配置环境变量？

A: Stripe API 密钥是敏感信息，不应该直接写在代码中。使用环境变量可以：
- 保护密钥安全
- 在不同环境使用不同密钥
- 避免密钥泄露到代码仓库

### Q: 测试密钥和生产密钥有什么区别？

A:
- **测试密钥**（`sk_test_`, `pk_test_`）：用于开发和测试，不会产生真实交易
- **生产密钥**（`sk_live_`, `pk_live_`）：用于生产环境，会产生真实交易

### Q: 如何切换到生产密钥？

A: 在 Vercel 环境变量设置中：
1. 将 `STRIPE_SECRET_KEY` 改为 `sk_live_xxxxxx`
2. 将 `STRIPE_PUBLISHABLE_KEY` 改为 `pk_live_xxxxxx`
3. 重新部署项目

### Q: 部署后仍然报错怎么办？

A: 检查以下几点：
1. 确认环境变量名称完全正确（区分大小写）
2. 确认密钥值完整复制，没有遗漏字符
3. 确认选择了所有环境（Production, Preview, Development）
4. 查看部署日志获取详细错误信息

## 本地开发配置

在本地开发时，创建 `.env` 文件：

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**重要：** `.env` 文件已在 `.gitignore` 中，不会被提交到 Git 仓库。

## 安全提示

- ✅ 使用环境变量存储密钥
- ✅ 使用测试密钥进行开发
- ✅ 定期轮换密钥
- ❌ 不要将密钥提交到代码仓库
- ❌ 不要在前端代码中使用 Secret Key
- ❌ 不要在公开场合分享密钥
