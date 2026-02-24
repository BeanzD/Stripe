# Stripe 面试知识体系思维导图

## 一、Stripe 核心架构 【面试必问】

### 1.1 Stripe API 架构设计 【核心关键点】
- **RESTful API 设计**
  - 资源对象模型（Customer、PaymentIntent、Subscription等）
  - 版本控制机制（API版本化）
  - 统一响应格式
- **SDK 架构**
  - 服务端 SDK（Node.js、Python、Ruby等）
  - 客户端 SDK（Stripe.js、Stripe Elements）
  - SDK 版本管理与兼容性
- **数据模型关系**
  - Customer → PaymentMethod → PaymentIntent
  - Product → Price → Subscription
  - Account → Transfer → Balance

### 1.2 支付流程演进 【核心关键点】
- **传统支付方式（已废弃）**
  - Charge 对象：一次性扣款
  - 问题：无法预授权、不支持3D Secure
- **现代支付方式（推荐）**
  - PaymentIntent 对象：支付意图管理
  - 支持预授权、确认、取消流程
  - 更好的错误处理和用户体验

## 二、支付流程（Payment Intents）【面试必问】

### 2.1 PaymentIntent 核心概念 【核心关键点】
- **PaymentIntent 生命周期**
  1. 创建（requires_payment_method）
  2. 确认（requires_confirmation）
  3. 处理中（processing）
  4. 成功（succeeded）或失败（canceled）
- **关键属性**
  - amount、currency：金额和货币
  - payment_method：支付方式
  - client_secret：客户端安全凭证
  - confirmation_method：确认方式（automatic/manual）

### 2.2 支付确认流程 【核心关键点】
- **自动确认（automatic）**
  - Stripe 自动处理支付确认
  - 适用于大多数场景
  - 服务器端创建 PaymentIntent 即可
- **手动确认（manual）**
  - 需要客户端使用 Stripe.js 确认
  - 更灵活但需要更多客户端代码
- **区别与选择**
  - automatic：简单快速，适合标准流程
  - manual：灵活可控，适合复杂业务逻辑

### 2.3 3D Secure 验证流程 【面试必问】
- **3D Secure 触发条件**
  - 卡片需要额外验证
  - 风险评估触发
  - 地区法规要求
- **处理流程**
  1. PaymentIntent 状态变为 requires_action
  2. 客户端调用 handleCardAction()
  3. 用户完成3D验证
  4. Stripe 回调确认结果
- **最佳实践**
  - 监听 payment_intent.succeeded 事件
  - 处理 requires_action 状态
  - 提供清晰的错误提示

### 2.4 SetupIntent vs PaymentIntent 【核心关键点】
- **SetupIntent 用途**
  - 保存支付方式供未来使用
  - 不立即扣款
  - 适用于订阅、定期支付
- **PaymentIntent 用途**
  - 立即执行支付
  - 一次性交易
- **使用场景区分**
  - SetupIntent：首次绑定卡片、保存支付方式
  - PaymentIntent：实际支付交易

### 2.5 异步支付处理 【核心关键点】
- **异步场景**
  - 银行处理延迟
  - 需要人工审核
  - 预授权确认
- **处理策略**
  - 使用 Webhook 监听状态变化
  - 不要依赖同步响应
  - 实现幂等性处理
  - 设置合理的超时时间

## 三、订阅与计费【面试必问】

### 3.1 订阅核心概念 【核心关键点】
- **订阅对象结构**
  - Subscription：订阅主对象
  - Items：订阅项目列表
  - Status：订阅状态（active、past_due、canceled等）
- **价格模型**
  - Price：价格对象（unit_amount、currency）
  - Recurring：计费周期（month、year）
  - Product：产品信息
- **计费周期**
  - current_period_start/end：当前周期
  - trial_start/end：试用期
  - cancel_at：取消时间

### 3.2 Prorating 按比例计费 【面试必问】
- **Prorating 原理**
  - 订阅升级/降级时按时间比例计算费用
  - 确保公平计费
  - Stripe 自动计算
- **Proration 策略**
  - create_prorations：创建按比例计费
  - none：不按比例计费
  - always：总是按比例计费
- **预览计费**
  - 使用 Stripe API 预览费用变化
  - 在升级前告知用户
  - 处理按比例计费的发票

### 3.3 订阅管理操作 【核心关键点】
- **更新订阅**
  - 修改价格、数量
  - 更新元数据
  - 处理试用期
- **暂停订阅**
  - pause_collection：暂停计费
  - 保留客户访问
  - 恢复计费
- **取消订阅**
  - at_period_end：周期结束时取消
  - 立即取消
  - 保留历史数据

### 3.4 发票系统 【面试必问】
- **Invoice 对象**
  - 自动生成：订阅周期结束
  - 手动创建：一次性费用
  - 草稿状态：pending → finalized → paid
- **发票项目**
  - 每个发票包含多个 line items
  - 支持折扣和税收
  - 关联到订阅或一次性费用

## 四、Webhook 机制【面试必问】

### 4.1 Webhook 核心原理 【核心关键点】
- **Webhook 作用**
  - Stripe 主动推送事件到你的服务器
  - 实现异步事件处理
  - 避免轮询 API
- **事件驱动架构**
  - 事件类型：payment_intent.succeeded、invoice.paid等
  - 事件数据：完整的对象信息
  - 处理顺序：按时间顺序处理

### 4.2 签名验证 【核心关键点】
- **签名验证原理**
  - Stripe 使用你的 Webhook 密钥签名
  - 防止伪造请求
  - 验证时间戳防止重放攻击
- **验证步骤**
  1. 提取签名和时间戳
  2. 按时间戳排序事件
  3. 使用密钥验证签名
  4. 验证时间戳在合理范围内
- **安全最佳实践**
  - 妥善保管 Webhook 密钥
  - 使用环境变量存储
  - 定期轮换密钥

### 4.3 事件类型与处理 【面试必问】
- **核心事件类型**
  - Payment 事件：payment_intent.succeeded、failed
  - Invoice 事件：invoice.paid、payment_failed
  - Subscription 事件：customer.subscription.created、updated
  - Customer 事件：customer.created、deleted
- **事件处理策略**
  - 实现幂等性：使用事件 ID 去重
  - 异步处理：使用消息队列
  - 错误重试：指数退避重试机制
  - 监控告警：处理失败告警

### 4.4 重试机制 【核心关键点】
- **Webhook 重试策略**
  - Stripe 自动重试失败的 Webhook
  - 指数退避：1h、2h、4h、8h、24h
  - 最多重试 8 次
- **处理要求**
  - 必须返回 2xx 状态码
  - 处理时间 < 30 秒
  - 超时返回 408 会立即重试

## 五、错误与异常处理【面试必问】

### 5.1 Stripe 错误体系 【核心关键点】
- **错误类型分类**
  - CardError：卡片相关错误
  - APIError：API 调用错误
  - AuthenticationError：认证失败
  - RateLimitError：速率限制
  - InvalidRequestError：无效请求
- **错误信息结构**
  - type：错误类型
  - code：错误代码（card_declined等）
  - message：人类可读的错误信息
  - decline_code：银行拒绝码

### 5.2 常见错误处理 【面试必问】
- **卡片拒绝处理**
  - insufficient_funds：余额不足
  - card_declined：卡片被拒绝
  - expired_card：卡片过期
  - incorrect_cvc：CVC 错误
- **处理策略**
  - 友好提示用户
  - 提供重试选项
  - 记录详细错误日志
  - 触发业务流程（如更新订单状态）

### 5.3 异常处理最佳实践 【核心关键点】
- **服务端处理**
  - try-catch 包裹 Stripe 调用
  - 区分可恢复和不可恢复错误
  - 实现优雅降级
  - 记录完整错误堆栈
- **客户端处理**
  - 监听 Stripe.js 错误事件
  - 显示用户友好的错误信息
  - 提供重试和取消选项
  - 验证表单数据

## 六、安全与签名验证【面试必问】

### 6.1 API 密钥管理 【核心关键点】
- **密钥类型**
  - Publishable Key（pk_）：客户端使用
  - Secret Key（sk_）：服务端使用
  - Restricted Keys：限制权限的密钥
- **安全实践**
  - 永远不要在前端使用 Secret Key
  - 使用环境变量存储密钥
  - 定期轮换密钥
  - 使用 Restricted Keys 限制权限

### 6.2 PCI DSS 合规 【面试必问】
- **PCI DSS 要求**
  - 永远不要处理原始卡片数据
  - 使用 Stripe Elements 托管卡片输入
  - 服务器不接触敏感数据
- **Stripe Elements 优势**
  - PCI DSS Level 1 认证
  - 自动处理卡片验证
  - 支持多种支付方式
  - 响应式设计

### 6.3 接口安全 【核心关键点】
- **HTTPS 要求**
  - 生产环境必须使用 HTTPS
  - TLS 1.2+
  - 有效的 SSL 证书
- **请求验证**
  - 验证请求来源
  - 实现 CORS 策略
  - 限制请求频率

### 6.4 幂等性与并发 【核心关键点】
- **幂等性实现**
  - 使用 idempotency_key 参数
  - 相同 key 重复请求返回相同结果
  - 防止重复扣款
- **并发控制**
  - 使用乐观锁
  - 实现分布式锁
  - 处理竞态条件

## 七、测试与上线【面试必问】

### 7.1 测试环境 【核心关键点】
- **测试密钥**
  - pk_test_、sk_test_：测试环境密钥
  - 不处理真实资金
  - 完整的 API 功能
- **测试卡号**
  - 4242 4242 4242 4242：成功支付
  - 4000 0000 0000 0002：支付失败
  - 4000 0025 0000 3155：需要 3D 验证
  - 4000 0000 0000 9995：余额不足
- **Stripe CLI 工具**
  - stripe login：登录账户
  - stripe listen：转发 Webhook
  - stripe trigger：触发测试事件
  - stripe fixtures：创建测试数据

### 7.2 测试策略 【面试必问】
- **单元测试**
  - Mock Stripe API 响应
  - 测试错误处理逻辑
  - 验证幂等性
- **集成测试**
  - 使用测试密钥
  - 测试完整支付流程
  - 验证 Webhook 处理
- **端到端测试**
  - 使用 Stripe Test Clock
  - 模拟时间流逝
  - 测试订阅周期

### 7.3 上线检查清单 【核心关键点】
- **上线前检查**
  - 切换到生产密钥（pk_live_、sk_live_）
  - 配置生产 Webhook URL
  - 验证 HTTPS 证书
  - 设置监控和告警
- **监控指标**
  - API 成功率
  - 响应时间
  - 错误率
  - Webhook 处理时间

### 7.4 生产环境注意事项 【面试必问】
- **生产环境配置**
  - 使用生产密钥
  - 配置真实 Webhook URL
  - 启用所有必要的事件类型
  - 设置合理的超时时间
- **性能优化**
  - 实现缓存策略
  - 使用异步处理
  - 数据库连接池
  - CDN 加速静态资源

## 八、常见业务场景【面试必问】

### 8.1 退款与争议 【核心关键点】
- **退款流程**
  - 创建 Refund 对象
  - 指定退款金额（部分或全部）
  - 退款原因记录
  - 异步处理：需要 Webhook 监听
- **争议处理**
  - Dispute 对象：争议信息
  - 证据提交：提供交易证据
  - 争议状态：needs_response、under_review、won、lost
  - 自动响应时间限制

### 8.2 多币种支付 【面试必问】
- **多币种支持**
  - PaymentIntent 支持不同货币
  - 实时汇率转换
  - 本地化显示
- **最佳实践**
  - 统一使用最小单位（cents）
  - 避免浮点数计算
  - 正确处理货币符号

### 8.3 分账与平台 【核心关键点】
- **Connect 平台**
  - Connected Account：子账户
  - 平台费率：application_fee
  - 资金分配：destination 参数
- **账户类型**
  - Standard：完全托管
  - Express：快速入驻
  - Custom：完全自定义
- **资金流转**
  - Charge → Transfer → Balance
  - 平台费用扣除
  - 子账户资金到账

### 8.4 客户生命周期 【面试必问】
- **客户管理**
  - 创建客户对象
  - 关联支付方式和订阅
  - 客户元数据
- **生命周期事件**
  - customer.created：新客户
  - customer.updated：信息更新
  - customer.deleted：客户删除
  - customer.subscription.created：订阅创建

## 九、面试高频考点总结【面试必问】

### 9.1 必问问题 【核心关键点】
1. **PaymentIntent vs Charge 的区别？**
   - 答：PaymentIntent 是现代支付方式，支持预授权和更好的错误处理；Charge 是旧方式，已不推荐使用

2. **如何处理 3D Secure？**
   - 答：监听 requires_action 状态，使用 handleCardAction() 处理，监听 payment_intent.succeeded 事件

3. **Webhook 签名验证如何实现？**
   - 答：提取签名和时间戳，验证时间戳在合理范围内，使用 Webhook 密钥验证签名

4. **如何实现幂等性？**
   - 答：使用 idempotency_key 参数，相同 key 重复请求返回相同结果

5. **订阅升级如何按比例计费？**
   - 答：Stripe 自动计算，使用 proration_behavior 参数控制策略

### 9.2 核心关键点记忆 【核心关键点】
- **支付流程**：PaymentIntent → 确认 → 处理 → 完成
- **Webhook**：签名验证 → 幂等性 → 异步处理 → 重试机制
- **订阅**：Product → Price → Subscription → Invoice → Payment
- **安全**：密钥分离 → HTTPS → PCI DSS → 幂等性
- **错误处理**：错误分类 → 友好提示 → 日志记录 → 监控告警

### 9.3 实战经验分享 【面试必问】
- **性能优化**
  - 使用异步处理避免阻塞
  - 实现合理的缓存策略
  - 数据库查询优化
- **监控告警**
  - 设置关键指标监控
  - 配置合理的告警阈值
  - 建立故障响应流程
- **团队协作**
  - API 密钥权限管理
  - 环境配置标准化
  - 代码审查和测试流程
