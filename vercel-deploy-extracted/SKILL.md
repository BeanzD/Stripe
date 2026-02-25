---
name: vercel-deploy
description: 将Express.js项目转换为Vercel部署配置。当用户需要将现有的Express.js项目部署到Vercel时使用此技能。触发条件：(1) 用户提到"部署到Vercel"，(2) 用户遇到Vercel部署错误如"Cannot GET /"、"NOT_FOUND"、"样式失效"，(3) 用户需要配置vercel.json或api/index.js。
---

# Vercel部署转换指南

将Express.js项目转换为Vercel Serverless部署的完整指南。

## 核心原理

Vercel使用Serverless Functions，与传统的Express服务器有以下关键区别：

1. **无持久进程** - 每次请求创建新的函数实例
2. **路由机制不同** - 需要通过vercel.json配置路由
3. **静态文件服务** - Vercel会自动将public目录部署为静态文件

## 推荐方案：标准目录结构（最佳实践）

这是最符合Serverless架构的最佳实践，职责分离，最不容易出错。

### 步骤1：重构目录结构

创建 `public` 目录，将所有静态资源移入其中：

```
project/
├── public/              # 静态文件目录（Vercel自动服务）
│   ├── index.html
│   ├── demos.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── demos/
│   │   └── ...
│   └── images/
│       └── ...
├── api/                 # API目录（Serverless Functions）
│   └── index.js
├── vercel.json
├── package.json
└── .gitignore
```

**原理**：Vercel会自动将 `public` 目录下的内容部署为网站根目录的静态文件，通过CDN直接提供服务。

### 步骤2：创建精简的vercel.json

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/index.js"
    }
  ]
}
```

**原理**：明确告诉Vercel只有 `/api/*` 开头的请求才转发给后端Serverless Function，其他所有请求都由Vercel的静态文件服务（CDN）直接处理，互不干扰。

### 步骤3：创建简洁的api/index.js

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// API路由 - 只负责API逻辑
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/your-endpoint', (req, res) => {
    // 你的API逻辑
});

// Vercel Serverless导出
module.exports = (req, res) => {
    app(req, res);
};

// 本地开发支持
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
```

**原理**：后端只负责API逻辑，不再插手静态文件的分发，职责分离。

### 步骤4：更新.gitignore

```
node_modules/
.env
.vercel
```

### 步骤5：配置环境变量

在Vercel Dashboard中配置环境变量：
1. 进入项目Settings → Environment Variables
2. 添加所有必需的环境变量

---

## 备选方案：单文件入口（适用于简单项目）

如果项目结构简单，可以使用单文件入口方案。

### api/index.js

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// 静态文件服务 - 必须在路由之前
const staticPath = path.join(__dirname, '..');
app.use(express.static(staticPath, {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.css') {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        } else if (ext === '.js') {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (ext === '.svg') {
            res.setHeader('Content-Type', 'image/svg+xml');
        } else if (ext === '.html') {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
    }
}));

// API路由
app.get('/api/your-endpoint', (req, res) => {
    // 你的API逻辑
});

// 页面路由 - 必须在静态文件中间件之后
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Vercel Serverless导出
module.exports = (req, res) => {
    app(req, res);
};

// 本地开发支持
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
```

### vercel.json

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ]
}
```

---

## 常见问题与解决方案

### 问题1：Cannot GET /

**原因**：缺少根路由或路由配置错误

**解决方案**：
- **推荐方案**：使用public目录存放静态文件
- **备选方案**：确保api/index.js中有根路由

### 问题2：样式/CSS失效

**原因**：静态文件被API路由拦截，返回HTML而非CSS

**解决方案**：
- **推荐方案**：使用public目录，让Vercel自动处理静态文件
- **备选方案**：
  1. 确保静态文件中间件在路由之前配置
  2. 不要使用catch-all路由 `app.get('*', ...)`
  3. 为静态文件设置正确的Content-Type头

**错误示例**：
```javascript
// 错误：会拦截所有请求包括CSS文件
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
```

### 问题3：NOT_FOUND错误

**原因**：vercel.json配置错误或缺少

**解决方案**：
使用简单的rewrite配置

### 问题4：环境变量未生效

**原因**：.env文件未被Vercel读取

**解决方案**：
在Vercel Dashboard中手动配置环境变量

---

## 验证清单

部署前检查：

- [ ] `api/index.js` 存在且导出格式正确
- [ ] `vercel.json` 存在且配置正确
- [ ] 静态文件放在 `public/` 目录（推荐）
- [ ] 没有catch-all路由拦截静态文件
- [ ] 环境变量已在Vercel Dashboard中配置
- [ ] `.gitignore` 包含 `node_modules/` 和 `.env`

## 部署后验证

1. 访问首页 `https://您的域名/` - 应该能看到主页
2. 访问API `https://您的域名/api/health` - 应该返回 `{ "status": "ok", ... }`
3. 检查CSS样式是否正确加载

## 最佳实践总结

1. **静态文件放 `public/` 目录** - Vercel自动通过CDN提供服务
2. **API代码放 `api/` 目录** - Serverless Functions处理API请求
3. **职责分离** - 后端只负责API逻辑，不处理静态文件
4. **精简配置** - vercel.json只配置API路由重写

这是最符合Serverless架构的最佳实践！
