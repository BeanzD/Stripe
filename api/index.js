const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const staticPath = path.join(__dirname, '..');
console.log('Static files path:', staticPath);

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

const customers = [];
const products = [];
const prices = [];
const subscriptions = [];
const paymentIntents = [];
const connectedAccounts = [];
const webhookEvents = [];

let customerIdCounter = 1;
let productIdCounter = 1;
let priceIdCounter = 1;
let subscriptionIdCounter = 1;
let paymentIntentIdCounter = 1;
let accountIdCounter = 1;
let eventIdCounter = 1;

app.post('/api/customers', async (req, res) => {
    try {
        const { email, name, phone } = req.body;
        const customer = await stripe.customers.create({
            email,
            name,
            phone
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await stripe.customers.retrieve(req.params.id);
        res.json(customer);
    } catch (error) {
        res.status(404).json({ error: 'Customer not found' });
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const customers = await stripe.customers.list({ limit });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    try {
        const { email, name } = req.body;
        const customer = await stripe.customers.update(req.params.id, {
            email,
            name
        });
        res.json(customer);
    } catch (error) {
        res.status(404).json({ error: 'Customer not found' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, description, images } = req.body;
        const product = await stripe.products.create({
            name,
            description,
            images: images ? [images] : []
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await stripe.products.list({ active: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/prices', async (req, res) => {
    try {
        const { product, unit_amount, currency, recurring } = req.body;
        console.log('创建价格请求:', { product, unit_amount, currency, recurring });
        
        const price = await stripe.prices.create({
            product,
            unit_amount: parseInt(unit_amount) * 100,
            currency: currency.toLowerCase(),
            recurring: recurring ? { interval: recurring } : undefined
        });
        
        console.log('创建价格成功:', price);
        console.log('价格对象结构:', {
            id: price.id,
            currency: price.currency,
            unit_amount: price.unit_amount,
            nickname: price.nickname,
            product: price.product
        });
        
        res.json(price);
    } catch (error) {
        console.error('创建价格错误:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/prices', async (req, res) => {
    try {
        const productId = req.query.product;
        let params = { active: true };
        if (productId) {
            params.product = productId;
        }
        const prices = await stripe.prices.list(params);
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/subscriptions', async (req, res) => {
    try {
        const { customer, price, trial_period_days, quantity } = req.body;
        const subscription = await stripe.subscriptions.create({
            customer,
            items: [{
                price,
                quantity: quantity || 1
            }],
            trial_period_days: trial_period_days || undefined
        });
        res.json(subscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/subscriptions/:id', async (req, res) => {
    try {
        const { price, pause_behavior } = req.body;
        let updateParams = {};
        
        if (price) {
            updateParams.items = [{
                id: req.body.item_id,
                price
            }];
        }
        
        if (pause_behavior) {
            updateParams.pause_collection = {
                behavior: pause_behavior
            };
        }
        
        const subscription = await stripe.subscriptions.update(req.params.id, updateParams);
        res.json(subscription);
    } catch (error) {
        res.status(404).json({ error: 'Subscription not found' });
    }
});

app.delete('/api/subscriptions/:id', async (req, res) => {
    try {
        const subscription = await stripe.subscriptions.cancel(req.params.id);
        res.json(subscription);
    } catch (error) {
        res.status(404).json({ error: 'Subscription not found' });
    }
});

app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, description } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount) * 100,
            currency: currency.toLowerCase(),
            description,
            automatic_payment_methods: {
                enabled: true
            }
        });
        res.json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/payment-intents/:id', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
        res.json(paymentIntent);
    } catch (error) {
        res.status(404).json({ error: 'Payment Intent not found' });
    }
});

app.post('/api/payment-intents/:id/confirm', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(req.params.id);
        res.json(paymentIntent);
    } catch (error) {
        res.status(404).json({ error: 'Payment Intent not found' });
    }
});

app.post('/api/payment-methods', async (req, res) => {
    try {
        const { customer, card } = req.body;
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: card.number,
                exp_month: card.exp_month,
                exp_year: card.exp_year,
                cvc: card.cvc
            }
        });
        
        if (customer) {
            await stripe.paymentMethods.attach(paymentMethod.id, { customer });
        }
        
        res.json(paymentMethod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/webhooks', async (req, res) => {
    try {
        const { url, events } = req.body;
        const webhook = await stripe.webhookEndpoints.create({
            url,
            enabled_events: events
        });
        res.json(webhook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/webhooks/trigger', async (req, res) => {
    try {
        const { type } = req.body;
        const event = {
            id: `evt_${eventIdCounter++}`,
            type,
            data: {
                object: {
                    id: `obj_${Math.random().toString(36).substring(2, 15)}`,
                    object: type.split('.')[0]
                }
            },
            created: Math.floor(Date.now() / 1000)
        };
        webhookEvents.push(event);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/webhooks/events', (req, res) => {
    const type = req.query.type;
    let filteredEvents = webhookEvents;
    if (type) {
        filteredEvents = webhookEvents.filter(e => e.type === type);
    }
    res.json({
        data: filteredEvents,
        object: 'list'
    });
});

app.post('/api/connected-accounts', async (req, res) => {
    try {
        const { type, email, country } = req.body;
        const accountType = type.toLowerCase().replace('（推荐）', '').trim();
        const account = await stripe.accounts.create({
            type: accountType,
            email,
            country: country.toLowerCase(),
            business_type: 'individual',
            capabilities: {
                transfers: { requested: true },
                card_payments: { requested: true }
            }
        });
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/account-links', async (req, res) => {
    try {
        const { account, type } = req.body;
        const accountLink = await stripe.accountLinks.create({
            account,
            refresh_url: 'http://localhost:3001/refresh',
            return_url: 'http://localhost:3001/return',
            type: type.toLowerCase().replace('流程', '').replace('信息', '').trim()
        });
        res.json(accountLink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/transfers', async (req, res) => {
    try {
        const { amount, currency, destination, application_fee_amount } = req.body;
        const transfer = await stripe.transfers.create({
            amount: parseInt(amount) * 100,
            currency: currency.toLowerCase(),
            destination,
            application_fee_amount: parseInt(application_fee_amount) * 100
        });
        res.json(transfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/risk/evaluate', async (req, res) => {
    try {
        const { payment_intent } = req.body;
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
        
        res.json({
            payment_intent,
            risk_level: paymentIntent.risk_level || 'normal',
            risk_score: paymentIntent.risk_score || 10,
            outcome: paymentIntent.outcome || {
                type: 'authorized',
                reason: null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/test-payment', async (req, res) => {
    try {
        const { amount, card_number, card_exp_month, card_exp_year, card_cvc, card_zip } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount) * 100,
            currency: 'usd',
            payment_method_types: ['card'],
            payment_method: {
                type: 'card',
                card: {
                    number: card_number,
                    exp_month: parseInt(card_exp_month),
                    exp_year: parseInt(card_exp_year),
                    cvc: card_cvc
                }
            },
            confirm: true,
            off_session: true
        });
        
        res.json({
            success: paymentIntent.status === 'succeeded',
            status: paymentIntent.status,
            message: paymentIntent.status === 'succeeded' ? '支付成功' : '支付失败',
            paymentIntentId: paymentIntent.id,
            paymentIntent
        });
    } catch (error) {
        res.json({
            success: false,
            status: 'failed',
            message: error.message,
            paymentIntentId: null
        });
    }
});

app.get('/api/config', (req, res) => {
    res.json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/demos.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'demos.html'));
});

module.exports = (req, res) => {
    app(req, res);
};

if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
