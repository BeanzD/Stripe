# Vercel 部署配置说明

## 当前配置结构

项目使用Vercel的API Routes功能来部署Express应用。

### 文件结构

```
stripe-tutorial-demos/
├── api/
│   └── index.js          # Vercel API入口
├── server.js             # Express应用主文件
├── vercel.json          # Vercel配置文件
└── ...
```

### 工作原理

1. **api/index.js** - Vercel API入口点
   - 导入Express应用
   - 将请求转发给Express应用处理

2. **server.js** - Express应用
   - 定义所有路由和中间件
   - 导出Express应用实例

3. **vercel.json** - 路由配置
   - 静态资源直接由 Vercel 托管
   - 仅将 `/api/*` 请求重写到 `/api/index.js`
   - 确保 API 请求由 Express 应用处理，静态文件由 Vercel 处理

## 环境变量配置

### 必需的环境变量

在Vercel项目设置中添加以下环境变量：

| 变量名 | 变量值 | 环境 |
|--------|--------|------|
| `STRIPE_SECRET_KEY` | `sk_test_xxxxxx` | Production, Preview, Development |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_xxxxxx` | Production, Preview, Development |

**重要：** 必须选择所有三个环境（Production, Preview, Development）

### 配置步骤

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. 复制Secret key和Publishable key
3. 在Vercel项目设置中添加环境变量
4. 重新部署项目

## 部署流程

### 自动部署

推送到GitHub后，Vercel会自动部署：
```bash
git add .
git commit -m "更新代码"
git push origin main
```

### 手动重新部署

1. 访问Vercel项目页面
2. 点击 **Deployments** 标签
3. 找到最新的部署记录
4. 点击右侧的三个点菜单（⋮）
5. 选择 **Redeploy**

## 常见问题

### Q: 为什么使用api目录而不是直接使用server.js？

A: Vercel的API Routes功能要求：
- API函数必须放在`api/`目录中
- 每个文件导出一个处理函数
- 这样Vercel可以自动识别和部署

### Q: 访问时返回404错误？

A: 检查以下几点：
1. 确认`api/index.js`文件存在
2. 确认`vercel.json`配置正确
3. 确认`server.js`正确导出了Express应用
4. 查看Vercel部署日志

### Q: 环境变量未生效？

A:
1. 确认环境变量已添加到Vercel项目设置
2. 确认选择了所有环境（Production, Preview, Development）
3. 配置后必须重新部署
4. 查看部署日志确认环境变量已加载

### Q: 如何查看部署日志？

A:
1. 访问Vercel项目页面
2. 点击 **Deployments** 标签
3. 点击具体的部署记录
4. 查看构建和运行时日志

## 技术细节

### Vercel API Routes

Vercel的API Routes功能：
- 自动识别`api/`目录中的文件
- 每个文件成为一个serverless函数
- 支持动态路由（如`api/[id].js`）
- 自动处理HTTP请求

### Express应用导出

```javascript
// server.js
const app = express();

// 定义路由和中间件
app.get('/', (req, res) => {
    res.send('Hello World');
});

// 导出应用
if (require.main === module) {
    app.listen(PORT);
}
module.exports = app;
```

### API入口点

```javascript
// api/index.js
const app = require('../server');

module.exports = (req, res) => {
    app(req, res);
};
```

## 性能优化

### 缓存策略

Vercel自动缓存：
- 静态文件（CSS, JS, 图片）
- API响应（通过Cache-Control头）

### Serverless函数优化

- 函数冷启动时间：通常< 1秒
- 内存使用：默认1024MB，可配置
- 执行超时：默认10秒，可配置到60秒

## 监控和调试

### Vercel Analytics

1. 在Vercel项目页面点击 **Analytics** 标签
2. 查看访问量、响应时间、错误率等指标

### 日志查看

1. 访问Vercel项目页面
2. 点击 **Logs** 标签
3. 实时查看应用日志
4. 可以按时间、状态码、路径过滤

## 安全建议

1. **永远不要将API密钥提交到Git**
2. **使用环境变量存储敏感信息**
3. **定期轮换API密钥**
4. **限制API密钥的权限**
5. **使用HTTPS进行所有通信**

## 相关文档

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel API Routes](https://vercel.com/docs/functions/serverless-functions)
- [Express.js Documentation](https://expressjs.com/)
- [Stripe API Documentation](https://stripe.com/docs/api)
