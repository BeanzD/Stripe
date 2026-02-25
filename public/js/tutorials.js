const tutorials = {
    'introduction': {
        title: 'Stripe 简介',
        subtitle: '了解 Stripe 是什么，它能做什么，以及为什么选择 Stripe',
        content: `
            <div class="modal-section">
                <h3>什么是 Stripe？</h3>
                <p>Stripe 是一个全球领先的在线支付处理平台，为企业和开发者提供完整的支付解决方案。它通过简单易用的 API，让开发者能够快速集成支付功能到他们的网站和应用程序中。</p>
                <p>Stripe 成立于 2010 年，总部位于美国旧金山，目前支持 135+ 种货币和 46 个国家的本地支付方式，每月处理数十亿笔交易。</p>
            </div>

            <div class="modal-section">
                <h3>Stripe 的核心功能</h3>
                <ul>
                    <li><strong>支付处理</strong>：支持信用卡、借记卡、数字钱包等多种支付方式</li>
                    <li><strong>订阅和计费</strong>：灵活的订阅管理、发票生成和按比例计费</li>
                    <li><strong>Connect 平台</strong>：为多租户平台提供账户管理和资金分配</li>
                    <li><strong>风险管理</strong>：内置欺诈检测和风险评估工具</li>
                    <li><strong>身份验证</strong>：用户身份文件验证服务</li>
                    <li><strong>全球支付</strong>：支持 135+ 种货币和本地支付方式</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>应用场景</h3>
                <ul>
                    <li><strong>电商网站</strong>：处理商品和服务的在线支付</li>
                    <li><strong>SaaS 平台</strong>：管理订阅和经常性计费</li>
                    <li><strong>市场平台</strong>：连接买家和卖家，处理多方支付</li>
                    <li><strong>按需服务</strong>：处理实时支付和小额交易</li>
                    <li><strong>非营利组织</strong>：接受捐赠和定期捐款</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>为什么选择 Stripe？</h3>
                <div class="tip">
                    <div class="tip-title">优势</div>
                    <ul>
                        <li><strong>开发者友好</strong>：简洁的 API 设计，丰富的文档和示例</li>
                        <li><strong>快速集成</strong>：几分钟内即可完成基础支付集成</li>
                        <li><strong>安全可靠</strong>：PCI DSS Level 1 认证，符合最高安全标准</li>
                        <li><strong>全球化</strong>：支持多种货币和本地支付方式</li>
                        <li><strong>灵活定制</strong>：提供多种集成方式，满足不同需求</li>
                        <li><strong>持续创新</strong>：不断推出新功能和改进</li>
                    </ul>
                </div>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了 Stripe 的基本概念，接下来让我们学习如何配置 API 密钥，开始您的 Stripe 开发之旅。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('api-keys')">继续学习：API 密钥配置</button>
                    <a href="demos/getting-started/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'api-keys': {
        title: 'API 密钥配置',
        subtitle: '获取和配置 Stripe API 密钥，区分测试环境和生产环境',
        content: `
            <div class="modal-section">
                <h3>什么是 API 密钥？</h3>
                <p>API 密钥是用于身份验证的凭证，Stripe 使用 API 密钥来验证您的请求是否来自授权的应用程序。每次调用 Stripe API 时，您都需要提供有效的 API 密钥。</p>
                <p>Stripe 提供两种类型的 API 密钥：可发布密钥（Publishable Key）和秘密密钥（Secret Key）。</p>
            </div>

            <div class="modal-section">
                <h3>密钥类型</h3>
                <ul>
                    <li><strong>可发布密钥（pk_...）</strong>：可以在客户端代码中使用，如 JavaScript。用于创建支付意图等操作。</li>
                    <li><strong>秘密密钥（sk_...）</strong>：只能在服务器端使用，用于执行敏感操作，如创建客户、管理订阅等。</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>测试环境 vs 生产环境</h3>
                <p>Stripe 提供两个独立的环境：测试环境和生产环境。每个环境都有自己的一套 API 密钥。</p>
                <ul>
                    <li><strong>测试环境</strong>：使用测试密钥（以 _test_ 结尾），用于开发和测试。不会处理真实资金。</li>
                    <li><strong>生产环境</strong>：使用生产密钥（以 _live_ 结尾），用于正式上线。处理真实的支付交易。</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>获取 API 密钥</h3>
                <ol>
                    <li>登录 <a href="https://dashboard.stripe.com/" target="_blank">Stripe Dashboard</a></li>
                    <li>在左侧导航栏中，点击"开发者" → "API 密钥"</li>
                    <li>您将看到四种密钥：
                        <ul>
                            <li>可发布密钥（测试）</li>
                            <li>秘密密钥（测试）</li>
                            <li>可发布密钥（生产）</li>
                            <li>秘密密钥（生产）</li>
                        </ul>
                    </li>
                    <li>点击"显示"或"复制"按钮查看或复制密钥</li>
                </ol>
            </div>

            <div class="modal-section">
                <h3>配置 API 密钥</h3>
                <h4>Node.js 示例</h4>
                <pre><code class="language-javascript">// .env 文件
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx</code></pre>
                <pre><code class="language-javascript">// config.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  stripe,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
};</code></pre>

                <h4>Python 示例</h4>
                <pre><code class="language-python"># .env 文件
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx</code></pre>
                <pre><code class="language-python"># config.py
import os
import stripe

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
PUBLISHABLE_KEY = os.environ.get('STRIPE_PUBLISHABLE_KEY')</code></pre>

                <h4>Ruby 示例</h4>
                <pre><code class="language-ruby"># .env 文件
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx</code></pre>
                <pre><code class="language-ruby"># config/initializers/stripe.rb
Stripe.api_key = ENV['STRIPE_SECRET_KEY']
PUBLISHABLE_KEY = ENV['STRIPE_PUBLISHABLE_KEY']</code></pre>
            </div>

            <div class="modal-section">
                <div class="warning">
                    <div class="warning-title">安全最佳实践</div>
                    <ul>
                        <li>永远不要将秘密密钥提交到版本控制系统</li>
                        <li>使用环境变量或配置管理工具存储密钥</li>
                        <li>在生产环境中使用生产密钥，在测试环境中使用测试密钥</li>
                        <li>定期轮换 API 密钥</li>
                        <li>限制 API 密钥的权限范围（如需要）</li>
                        <li>监控 API 密钥的使用情况</li>
                    </ul>
                </div>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经配置好了 API 密钥，接下来让我们安装 Stripe CLI，设置完整的开发环境。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('environment')">继续学习：开发环境设置</button>
                    <a href="demos/getting-started/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'environment': {
        title: '开发环境设置',
        subtitle: '安装 Stripe CLI，配置开发环境，准备开始开发',
        content: `
            <div class="modal-section">
                <h3>为什么需要 Stripe CLI？</h3>
                <p>Stripe CLI（命令行接口）是一个强大的开发工具，它可以帮助您：</p>
                <ul>
                    <li>在本地开发环境中测试 Stripe 集成</li>
                    <li>转发 Webhook 事件到本地服务器</li>
                    <li>快速创建测试数据和资源</li>
                    <li>模拟支付流程和事件</li>
                    <li>调试 API 请求和响应</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>安装 Stripe CLI</h3>
                <h4>macOS</h4>
                <pre><code class="language-bash">brew install stripe/stripe-cli/stripe</code></pre>

                <h4>Windows</h4>
                <pre><code class="language-bash">choco install stripe-cli
# 或
scoop install stripe</code></pre>

                <h4>Linux</h4>
                <pre><code class="language-bash">curl -s https://packages.stripe.com/api/security/v1/keys/stripe-cli-gpg/public | gpg --dearmor > /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt-get update
sudo apt-get install stripe</code></pre>

                <h4>验证安装</h4>
                <pre><code class="language-bash">stripe --version</code></pre>
            </div>

            <div class="modal-section">
                <h3>登录 Stripe CLI</h3>
                <pre><code class="language-bash">stripe login</code></pre>
                <p>这将打开一个浏览器窗口，让您授权 CLI 访问您的 Stripe 账户。</p>
            </div>

            <div class="modal-section">
                <h3>配置 Webhook 转发</h3>
                <pre><code class="language-bash">stripe listen --forward-to localhost:3000/webhook</code></pre>
                <p>这将返回一个 Webhook 签名密钥（whsec_...），您需要在代码中使用它来验证 Webhook 签名。</p>
            </div>

            <div class="modal-section">
                <h3>触发测试事件</h3>
                <pre><code class="language-bash">stripe trigger payment_intent.succeeded
stripe trigger payment_intent.succeeded --add payment_intent:amount=2000</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经设置好了开发环境，接下来让我们学习如何使用 Stripe SDK 进行 API 调用。</p>
                <button class="btn btn-learn" onclick="openTutorial('sdk')">继续学习：SDK 使用</button>
            </div>
        `
    },

    'sdk': {
        title: 'SDK 使用',
        subtitle: '学习使用 Stripe 的服务器端 SDK 进行 API 调用',
        content: `
            <div class="modal-section">
                <h3>什么是 Stripe SDK？</h3>
                <p>Stripe SDK（软件开发工具包）是 Stripe 为各种编程语言提供的官方库，它们封装了 Stripe REST API，使您能够更方便地在应用程序中集成 Stripe 功能。</p>
                <p>Stripe 支持多种编程语言的 SDK，包括：Node.js、Python、Ruby、PHP、Java、Go 等。</p>
            </div>

            <div class="modal-section">
                <h3>安装 SDK</h3>
                <h4>Node.js</h4>
                <pre><code class="language-bash">npm install stripe</code></pre>

                <h4>Python</h4>
                <pre><code class="language-bash">pip install stripe</code></pre>

                <h4>Ruby</h4>
                <pre><code class="language-bash">gem install stripe</code></pre>
            </div>

            <div class="modal-section">
                <h3>初始化 SDK</h3>
                <h4>Node.js</h4>
                <pre><code class="language-javascript">const stripe = require('stripe')('sk_test_xxx');</code></pre>

                <h4>Python</h4>
                <pre><code class="language-python">import stripe
stripe.api_key = 'sk_test_xxx'</code></pre>

                <h4>Ruby</h4>
                <pre><code class="language-ruby">require 'stripe'
Stripe.api_key = 'sk_test_xxx'</code></pre>
            </div>

            <div class="modal-section">
                <h3>基本 API 调用</h3>
                <h4>创建客户</h4>
                <pre><code class="language-javascript">const customer = await stripe.customers.create({
  email: 'customer@example.com',
  name: '张三'
});</code></pre>

                <h4>创建支付意图</h4>
                <pre><code class="language-javascript">const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'cny',
  payment_method_types: ['card']
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>错误处理</h3>
                <pre><code class="language-javascript">try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'cny'
  });
  console.log('支付创建成功：', paymentIntent.id);
} catch (error) {
  if (error.type === 'StripeCardError') {
    console.error('卡片错误：', error.message);
  } else if (error.type === 'StripeInvalidRequestError') {
    console.error('无效请求：', error.message);
  } else {
    console.error('未知错误：', error.message);
  }
}</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经掌握了 SDK 的基本使用方法，接下来让我们学习如何处理支付。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('payment-intent')">继续学习：Payment Intent</button>
                    <a href="demos/payments/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'payment-intent': {
        title: 'Payment Intent',
        subtitle: '理解 Payment Intent 的概念，创建和管理支付意图',
        content: `
            <div class="modal-section">
                <h3>什么是 Payment Intent？</h3>
                <p>Payment Intent（支付意图）是 Stripe 中用于跟踪支付流程的核心对象。它代表了您打算从客户那里收取的一笔款项。</p>
            </div>

            <div class="modal-section">
                <h3>创建 Payment Intent</h3>
                <pre><code class="language-javascript">const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'cny',
  customer: 'cus_xxx',
  payment_method_types: ['card']
});

res.json({ clientSecret: paymentIntent.client_secret });</code></pre>
            </div>

            <div class="modal-section">
                <h3>确认支付</h3>
                <pre><code class="language-javascript">const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: '张三' }
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>Payment Intent 状态</h3>
                <ul>
                    <li>requires_payment_method - 需要提供支付方式</li>
                    <li>requires_confirmation - 需要确认支付</li>
                    <li>requires_action - 需要额外操作（如 3D Secure）</li>
                    <li>processing - 正在处理支付</li>
                    <li>succeeded - 支付成功</li>
                    <li>canceled - 支付已取消</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了 Payment Intent 的概念，接下来让我们学习如何使用 Stripe Elements。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('stripe-elements')">继续学习：Stripe Elements</button>
                    <a href="demos/payments/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'stripe-elements': {
        title: 'Stripe Elements',
        subtitle: '使用 Stripe Elements 构建自定义支付表单',
        content: `
            <div class="modal-section">
                <h3>什么是 Stripe Elements？</h3>
                <p>Stripe Elements 是一组预构建的 UI 组件，用于安全地收集敏感支付信息。</p>
            </div>

            <div class="modal-section">
                <h3>加载 Stripe.js</h3>
                <pre><code class="language-html">&lt;script src="https://js.stripe.com/v3/"&gt;&lt;/script&gt;</code></pre>
            </div>

            <div class="modal-section">
                <h3>创建 Card Element</h3>
                <pre><code class="language-javascript">const stripe = Stripe('pk_test_xxx');
const elements = stripe.elements();

const cardElement = elements.create('card', {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d'
    }
  }
});

cardElement.mount('#card-element');</code></pre>
            </div>

            <div class="modal-section">
                <h3>确认支付</h3>
                <pre><code class="language-javascript">const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: '张三' }
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经学会了如何使用 Stripe Elements，接下来让我们学习如何支持多种支付方式。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('payment-methods')">继续学习：支付方式</button>
                    <a href="demos/payments/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'payment-methods': {
        title: '支付方式',
        subtitle: '支持多种支付方式：信用卡、支付宝、微信支付等',
        content: `
            <div class="modal-section">
                <h3>支持的支付方式</h3>
                <ul>
                    <li><strong>全球支付方式</strong>：信用卡、Apple Pay、Google Pay、iDEAL、Sofort 等</li>
                    <li><strong>中国本地支付方式</strong>：支付宝、微信支付、银联</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>创建支付方式</h3>
                <pre><code class="language-javascript">const { paymentMethod, error } = await stripe.createPaymentMethod({
  type: 'card',
  card: cardElement,
  billing_details: {
    name: '张三',
    email: 'zhangsan@example.com'
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>保存支付方式</h3>
                <pre><code class="language-javascript">const paymentMethod = await stripe.paymentMethods.attach(
  'pm_xxx',
  { customer: 'cus_xxx' }
);</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了支付方式的使用，接下来让我们学习如何使用 Stripe Checkout。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('checkout')">继续学习：Stripe Checkout</button>
                    <a href="demos/payments/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'checkout': {
        title: 'Stripe Checkout',
        subtitle: '使用 Stripe Checkout 快速实现托管支付页面',
        content: `
            <div class="modal-section">
                <h3>什么是 Stripe Checkout？</h3>
                <p>Stripe Checkout 是一个预构建的托管支付页面，可以快速集成到您的网站中。</p>
            </div>

            <div class="modal-section">
                <h3>创建 Checkout Session</h3>
                <pre><code class="language-javascript">const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'cny',
        product_data: {
          name: '高级会员'
        },
        unit_amount: 9900
      },
      quantity: 1
    }
  ],
  mode: 'payment',
  success_url: 'https://your-website.com/success',
  cancel_url: 'https://your-website.com/cancel'
});

res.json({ url: session.url });</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经学会了使用 Stripe Checkout，接下来让我们学习如何构建订阅系统。</p>
                <button class="btn btn-learn" onclick="openTutorial('products-prices')">继续学习：产品和价格</button>
            </div>
        `
    },

    'products-prices': {
        title: '产品和价格',
        subtitle: '创建产品和价格对象，定义订阅计划',
        content: `
            <div class="modal-section">
                <h3>产品和价格概述</h3>
                <p>在 Stripe 中，产品和价格是订阅系统的核心组件。</p>
            </div>

            <div class="modal-section">
                <h3>创建产品</h3>
                <pre><code class="language-javascript">const product = await stripe.products.create({
  name: '高级会员',
  description: '享受所有高级功能'
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>创建价格</h3>
                <pre><code class="language-javascript">const price = await stripe.prices.create({
  product: 'prod_xxx',
  unit_amount: 9900,
  currency: 'cny',
  recurring: {
    interval: 'month'
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经学会了如何创建产品和价格，接下来让我们学习如何创建订阅。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('create-subscription')">继续学习：创建订阅</button>
                    <a href="demos/subscriptions/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'create-subscription': {
        title: '创建订阅',
        subtitle: '为用户创建订阅，设置计费周期和试用期',
        content: `
            <div class="modal-section">
                <h3>什么是订阅？</h3>
                <p>订阅（Subscription）是 Stripe 中用于管理定期计费的对象。</p>
            </div>

            <div class="modal-section">
                <h3>创建订阅</h3>
                <pre><code class="language-javascript">const subscription = await stripe.subscriptions.create({
  customer: 'cus_xxx',
  items: [{
    price: 'price_xxx'
  }],
  trial_period_days: 14
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>订阅状态</h3>
                <ul>
                    <li>trialing - 试用期中</li>
                    <li>active - 活跃中</li>
                    <li>past_due - 逾期未付</li>
                    <li>canceled - 已取消</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经学会了如何创建订阅，接下来让我们学习如何管理订阅。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('manage-subscription')">继续学习：管理订阅</button>
                    <a href="demos/subscriptions/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'manage-subscription': {
        title: '管理订阅',
        subtitle: '更新、暂停、取消订阅，处理订阅变更',
        content: `
            <div class="modal-section">
                <h3>更新订阅</h3>
                <pre><code class="language-javascript">const subscription = await stripe.subscriptions.update('sub_xxx', {
  items: [{
    id: subscription.items.data[0].id,
    price: 'price_new_xxx'
  }],
  proration_behavior: 'create_prorations'
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>暂停订阅</h3>
                <pre><code class="language-javascript">const subscription = await stripe.subscriptions.update('sub_xxx', {
  pause_collection: {
    behavior: 'void',
    resumes_at: Math.floor(Date.now() / 1000) + 86400 * 30
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>取消订阅</h3>
                <pre><code class="language-javascript">const subscription = await stripe.subscriptions.cancel('sub_xxx');</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经学会了如何管理订阅，接下来让我们学习按比例计费。</p>
                <button class="btn btn-learn" onclick="openTutorial('prorations')">继续学习：按比例计费</button>
            </div>
        `
    },

    'prorations': {
        title: '按比例计费',
        subtitle: '理解按比例计费机制，处理订阅升级和降级',
        content: `
            <div class="modal-section">
                <h3>什么是按比例计费？</h3>
                <p>按比例计费（Proration）是 Stripe 在订阅变更时自动计算费用差异的机制。</p>
            </div>

            <div class="modal-section">
                <h3>预览按比例计费</h3>
                <pre><code class="language-javascript">const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
  customer: 'cus_xxx',
  subscription: 'sub_xxx',
  subscription_items: [{
    id: 'si_xxx',
    price: 'price_new_xxx'
  }]
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>升级订阅</h3>
                <pre><code class="language-javascript">const subscription = await stripe.subscriptions.update('sub_xxx', {
  items: [{
    id: subscription.items.data[0].id,
    price: 'price_premium_xxx'
  }],
  proration_behavior: 'create_prorations'
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了按比例计费的机制，接下来让我们学习 Webhooks。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('webhooks')">继续学习：Webhooks</button>
                    <a href="demos/subscriptions/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'webhooks': {
        title: 'Webhooks',
        subtitle: '设置和使用 Webhooks，处理 Stripe 事件通知',
        content: `
            <div class="modal-section">
                <h3>什么是 Webhooks？</h3>
                <p>Webhooks 是 Stripe 向您的服务器发送事件通知的机制。</p>
            </div>

            <div class="modal-section">
                <h3>常用 Webhook 事件</h3>
                <ul>
                    <li>payment_intent.succeeded - 支付成功</li>
                    <li>customer.subscription.created - 订阅创建</li>
                    <li>invoice.paid - 发票支付成功</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>创建 Webhook 端点</h3>
                <pre><code class="language-javascript">app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('支付成功：', event.data.object.id);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).send('Webhook 签名验证失败');
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经学会了如何使用 Webhooks，接下来让我们学习 Connect 平台。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('connect')">继续学习：Connect 平台</button>
                    <a href="demos/advanced/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'connect': {
        title: 'Connect 平台',
        subtitle: '构建多租户平台，管理子账户和资金分配',
        content: `
            <div class="modal-section">
                <h3>什么是 Stripe Connect？</h3>
                <p>Stripe Connect 是 Stripe 提供的平台解决方案，允许您构建多租户市场或平台。</p>
            </div>

            <div class="modal-section">
                <h3>创建 Connected Account</h3>
                <pre><code class="language-javascript">const account = await stripe.accounts.create({
  type: 'express',
  country: 'CN',
  email: 'merchant@example.com',
  capabilities: {
    transfers: { requested: true },
    card_payments: { requested: true }
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>资金分配</h3>
                <pre><code class="language-javascript">const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'cny',
  application_fee_amount: 200,
  transfer_data: {
    destination: 'acct_xxx'
  }
});</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了 Connect 平台的基本概念，接下来让我们学习风险评估。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('radar')">继续学习：风险评估</button>
                    <a href="demos/advanced/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'radar': {
        title: '风险评估',
        subtitle: '使用 Radar 进行欺诈检测和风险管理',
        content: `
            <div class="modal-section">
                <h3>什么是 Radar？</h3>
                <p>Radar 是 Stripe 内置的欺诈检测和风险评估工具，帮助您识别和阻止欺诈交易。</p>
            </div>

            <div class="modal-section">
                <h3>风险评估等级</h3>
                <ul>
                    <li><strong>正常</strong>：交易风险低，可以正常处理</li>
                    <li><strong>中等</strong>：交易有一定风险，需要额外验证</li>
                    <li><strong>高</strong>：交易风险高，建议拒绝</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>获取风险评估</h3>
                <pre><code class="language-javascript">const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'cny',
  payment_method_types: ['card']
});

console.log('风险评估：', paymentIntent.outcome.risk_level);
console.log('风险评分：', paymentIntent.outcome.risk_score);</code></pre>
            </div>

            <div class="modal-section">
                <h3>设置风险规则</h3>
                <p>您可以在 Stripe Dashboard 中设置自定义风险规则，例如：</p>
                <ul>
                    <li>阻止来自特定国家的交易</li>
                    <li>要求高风险交易进行额外验证</li>
                    <li>设置交易金额上限</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了风险评估，接下来让我们学习身份验证。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('identity')">继续学习：身份验证</button>
                    <a href="demos/advanced/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'identity': {
        title: '身份验证',
        subtitle: '使用 Identity 验证用户身份文件',
        content: `
            <div class="modal-section">
                <h3>什么是 Identity？</h3>
                <p>Stripe Identity 是一个身份验证服务，允许您验证用户的身份文件，如身份证、护照等。</p>
            </div>

            <div class="modal-section">
                <h3>创建验证会话</h3>
                <pre><code class="language-javascript">const verificationSession = await stripe.identity.verificationSessions.create({
  type: 'document',
  metadata: {
    user_id: 'user_123'
  }
});

res.json({ clientSecret: verificationSession.client_secret });</code></pre>
            </div>

            <div class="modal-section">
                <h3>客户端集成</h3>
                <pre><code class="language-javascript">const stripe = Stripe('pk_test_xxx');

const { error, verificationSession } = await stripe.verifyIdentity(
  clientSecret
);

if (error) {
  console.error('验证失败：', error.message);
} else {
  console.log('验证成功：', verificationSession.status);
}</code></pre>
            </div>

            <div class="modal-section">
                <h3>验证状态</h3>
                <ul>
                    <li>processing - 正在处理</li>
                    <li>verified - 验证成功</li>
                    <li>requires_input - 需要额外输入</li>
                    <li>canceled - 已取消</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了身份验证，接下来让我们学习 Stripe CLI。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('stripe-cli')">继续学习：Stripe CLI</button>
                    <a href="demos/tools/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'stripe-cli': {
        title: 'Stripe CLI',
        subtitle: '使用命令行工具进行开发和调试',
        content: `
            <div class="modal-section">
                <h3>Stripe CLI 概述</h3>
                <p>Stripe CLI 是一个强大的命令行工具，用于开发和调试 Stripe 集成。</p>
            </div>

            <div class="modal-section">
                <h3>常用命令</h3>
                <pre><code class="language-bash"># 登录
stripe login

# 转发 Webhook
stripe listen --forward-to localhost:3000/webhook

# 触发测试事件
stripe trigger payment_intent.succeeded

# 创建测试资源
stripe fixtures customers create</code></pre>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了 Stripe CLI，接下来让我们学习测试方法。</p>
                <div class="demo-links">
                    <button class="btn btn-learn" onclick="openTutorial('testing')">继续学习：测试方法</button>
                    <a href="demos/tools/index.html" class="btn btn-demo" target="_blank">查看演示</a>
                </div>
            </div>
        `
    },

    'testing': {
        title: '测试方法',
        subtitle: '使用测试卡和测试数据进行集成测试',
        content: `
            <div class="modal-section">
                <h3>测试卡号</h3>
                <p>Stripe 提供了一组测试卡号，用于模拟不同的支付场景：</p>
                <ul>
                    <li><strong>成功支付</strong>：4242 4242 4242 4242</li>
                    <li><strong>支付失败</strong>：4000 0000 0000 0002</li>
                    <li><strong>需要 3D 验证</strong>：4000 0025 0000 3155</li>
                    <li><strong>余额不足</strong>：4000 0000 0000 9995</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>测试过期日期</h3>
                <p>使用任何未来的日期，例如：12/34</p>
            </div>

            <div class="modal-section">
                <h3>测试 CVC</h3>
                <p>使用任何三位数字，例如：123</p>
            </div>

            <div class="modal-section">
                <h3>测试邮政编码</h3>
                <p>使用任何五位数字，例如：12345</p>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了测试方法，接下来让我们学习最佳实践。</p>
                <button class="btn btn-learn" onclick="openTutorial('best-practices')">继续学习：最佳实践</button>
            </div>
        `
    },

    'best-practices': {
        title: '最佳实践',
        subtitle: '学习 Stripe 开发的最佳实践和安全建议',
        content: `
            <div class="modal-section">
                <h3>安全实践</h3>
                <ul>
                    <li>永远不要在前端代码中使用秘密密钥</li>
                    <li>始终验证 Webhook 签名</li>
                    <li>使用 HTTPS 进行所有通信</li>
                    <li>定期轮换 API 密钥</li>
                    <li>实现适当的错误处理</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>性能优化</h3>
                <ul>
                    <li>使用异步处理避免阻塞</li>
                    <li>缓存频繁访问的数据</li>
                    <li>使用批量 API 减少请求次数</li>
                    <li>实现重试逻辑处理临时性错误</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>错误处理</h3>
                <ul>
                    <li>捕获并记录所有错误</li>
                    <li>向用户提供友好的错误消息</li>
                    <li>实现适当的重试机制</li>
                    <li>监控错误率并及时响应</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>下一步</h3>
                <p>现在您已经了解了最佳实践，接下来让我们学习故障排查。</p>
                <button class="btn btn-learn" onclick="openTutorial('troubleshooting')">继续学习：故障排查</button>
            </div>
        `
    },

    'troubleshooting': {
        title: '故障排查',
        subtitle: '常见问题解决方案和调试技巧',
        content: `
            <div class="modal-section">
                <h3>常见错误</h3>
                <h4>API 密钥错误</h4>
                <p>确保使用正确的 API 密钥，并区分测试密钥和生产密钥。</p>

                <h4>支付失败</h4>
                <p>检查卡片信息是否正确，账户是否有足够余额，是否需要 3D 验证。</p>

                <h4>Webhook 签名验证失败</h4>
                <p>确保使用正确的 Webhook 签名密钥，并正确处理时间戳。</p>
            </div>

            <div class="modal-section">
                <h3>调试技巧</h3>
                <ul>
                    <li>使用 Stripe CLI 进行本地测试</li>
                    <li>查看 Dashboard 中的日志和事件</li>
                    <li>启用详细的错误日志</li>
                    <li>使用测试卡模拟各种场景</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>获取帮助</h3>
                <ul>
                    <li><a href="https://stripe.com/docs" target="_blank">Stripe 文档</a></li>
                    <li><a href="https://support.stripe.com/" target="_blank">Stripe 支持</a></li>
                    <li><a href="https://discord.gg/stripe" target="_blank">Stripe Discord 社区</a></li>
                    <li><a href="https://stackoverflow.com/questions/tagged/stripe" target="_blank">Stack Overflow</a></li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>恭喜！</h3>
                <p>您已经完成了 Stripe 教程的所有章节。现在您可以开始构建自己的 Stripe 集成了！</p>
                <p>祝您开发顺利！</p>
            </div>
        `
    }
};