# Vercel 环境变量配置指南

## 问题诊断

如果您访问Vercel部署的应用时遇到以下错误：
```
Error: Neither apiKey nor config.authenticator provided
```

**原因：** Stripe API密钥未在Vercel中配置。

## 解决方案

### 第一步：获取Stripe API密钥

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. 找到 "API keys" 部分
3. 复制以下两个密钥：
   - **Secret key**（以 `sk_test_` 开头）
   - **Publishable key**（以 `pk_test_` 开头）

### 第二步：在Vercel中配置环境变量

#### 方法A：通过Vercel Dashboard配置

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目（Stripe）
3. 点击顶部的 **Settings** 标签
4. 在左侧菜单中选择 **Environment Variables**
5. 点击 **Add New** 按钮添加环境变量

#### 添加第一个环境变量：STRIPE_SECRET_KEY

- **Key**: `STRIPE_SECRET_KEY`
- **Value**: `sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`（您的密钥）
- **Environment**: 选择所有三个选项
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- 点击 **Save**

#### 添加第二个环境变量：STRIPE_PUBLISHABLE_KEY

- **Key**: `STRIPE_PUBLISHABLE_KEY`
- **Value**: `pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`（您的密钥）
- **Environment**: 选择所有三个选项
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- 点击 **Save**

#### 方法B：通过Vercel CLI配置

如果您安装了Vercel CLI，可以使用以下命令：

```bash
# 添加环境变量
vercel env add STRIPE_SECRET_KEY
# 选择环境：production, preview, development
# 输入密钥值

vercel env add STRIPE_PUBLISHABLE_KEY
# 选择环境：production, preview, development
# 输入密钥值
```

### 第三步：重新部署项目

配置环境变量后，需要重新部署项目：

#### 方法A：通过Vercel Dashboard

1. 在Vercel项目页面点击 **Deployments** 标签
2. 找到最新的部署记录
3. 点击右侧的三个点菜单（⋮）
4. 选择 **Redeploy**
5. 确认重新部署

#### 方法B：通过Git推送

如果您本地有未推送的更改，可以推送触发部署：

```bash
git add .
git commit -m "更新Vercel配置"
git push origin main
```

#### 方法C：通过Vercel CLI

```bash
vercel --prod
```

### 第四步：验证部署

部署完成后，访问您的Vercel URL：
- 首页应该正常显示
- API路由应该能正常工作
- 不会再出现500错误

## 常见问题

### Q: 为什么需要配置环境变量？

A:
- Stripe API密钥是敏感信息，不应该直接写在代码中
- 使用环境变量可以保护密钥安全
- 在不同环境可以使用不同的密钥（测试/生产）
- 避免密钥泄露到代码仓库

### Q: 我已经配置了环境变量，但还是报错？

A: 请检查以下几点：
1. 确认环境变量名称完全正确（区分大小写）
2. 确认密钥值完整复制，没有遗漏字符
3. 确认选择了所有环境（Production, Preview, Development）
4. 配置后必须重新部署项目
5. 查看Vercel部署日志获取详细错误信息

### Q: 如何查看部署日志？

A:
1. 访问Vercel项目页面
2. 点击 **Deployments** 标签
3. 点击具体的部署记录
4. 查看构建和运行时日志

### Q: 测试密钥和生产密钥有什么区别？

A:
- **测试密钥**（`sk_test_`, `pk_test_`）：
  - 用于开发和测试
  - 不会产生真实交易
  - 可以使用Stripe提供的测试卡号

- **生产密钥**（`sk_live_`, `pk_live_`）：
  - 用于生产环境
  - 会产生真实交易
  - 需要完成Stripe账户验证

### Q: 如何切换到生产密钥？

A:
1. 在Vercel环境变量设置中，将密钥值改为生产密钥
2. 重新部署项目
3. 确保使用真实卡号进行测试

### Q: 部署成功但访问时还是报错？

A: 请检查：
1. 环境变量是否已配置
2. 环境变量名称是否正确
3. 是否已重新部署
4. 查看Vercel日志中的具体错误信息

## 安全提示

✅ **推荐做法：**
- 使用环境变量存储密钥
- 使用测试密钥进行开发
- 定期轮换密钥
- 限制API密钥的权限

❌ **不要这样做：**
- 将密钥直接写在代码中
- 将密钥提交到Git仓库
- 在前端代码中使用Secret Key
- 在公开场合分享密钥

## 验证配置

配置完成后，可以通过以下方式验证：

### 1. 检查环境变量

在Vercel Dashboard中：
- Settings → Environment Variables
- 确认两个环境变量都已添加
- 确认选择了所有环境

### 2. 查看部署日志

在部署日志中应该看到：
```
API Server running at http://localhost:3001
Stripe API Key: 已配置
```

而不是：
```
错误: 未配置 STRIPE_SECRET_KEY 环境变量
```

### 3. 访问应用

访问您的Vercel URL，应该能正常看到首页。

## 获取帮助

如果仍然遇到问题：

1. 查看Vercel部署日志
2. 查看Stripe API密钥是否有效
3. 确认Vercel项目配置正确
4. 查看项目文档：[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 总结

配置Vercel环境变量的关键步骤：
1. ✅ 获取Stripe API密钥
2. ✅ 在Vercel中添加环境变量（选择所有环境）
3. ✅ 重新部署项目
4. ✅ 验证部署成功

完成这些步骤后，您的应用应该能正常访问了！
