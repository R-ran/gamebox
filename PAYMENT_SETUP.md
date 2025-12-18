# 支付接口配置说明

本项目已集成以下支付方式：
- PayPal
- Apple Pay
- Google Pay
- Visa (通过Stripe)
- 银联支付 (YinLian Pay)
- 空中云汇 (Airwallex)

## 配置步骤

### 1. 环境变量配置

复制 `.env.example` 文件为 `.env.local`，并填入相应的API密钥：

```bash
cp .env.example .env.local
```

### 2. PayPal配置

1. 访问 [PayPal Developer](https://developer.paypal.com/)
2. 创建应用并获取 Client ID 和 Secret
3. 在 `.env.local` 中配置：
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_SECRET=your_secret
   ```

### 3. Stripe配置 (Visa)

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 获取 Publishable Key 和 Secret Key
3. 在 `.env.local` 中配置：
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

### 4. 银联支付配置

1. 联系银联获取商户号和密钥
2. 在 `.env.local` 中配置：
   ```
   YINLIAN_MERCHANT_ID=your_merchant_id
   YINLIAN_SECRET_KEY=your_secret_key
   ```

### 5. 空中云汇 (Airwallex) 配置

1. **注册并登录空中云汇账户**
   - 访问 [Airwallex 官网](https://www.airwallex.com/) 注册账户
   - 完成企业认证和账户验证

2. **获取 API 密钥和客户端 ID**
   - 登录 Airwallex 商户后台
   - 导航至"开发者中心"或"API Keys"页面
   - 在"API Keys"页面可以看到 API 密钥和客户端 ID
   - 如果尚未生成，按照页面提示创建新的 API 密钥和客户端 ID

3. **在 `.env.local` 中配置**：
   ```
   AIRWALLEX_API_KEY=your_airwallex_api_key
   AIRWALLEX_CLIENT_ID=your_airwallex_client_id
   ```

**注意事项**：
- API 密钥和客户端 ID 是访问空中云汇 API 的重要凭证，请妥善保管，避免泄露
- 建议先在沙盒环境中测试
- 参考 [Airwallex API 文档](https://www.airwallex.com/docs/api) 获取详细的 API 接口说明

### 6. Apple Pay配置

Apple Pay需要：
- HTTPS环境
- 有效的Apple Pay证书
- 在Apple Developer中配置Merchant ID

在 `.env.local` 中配置：
```
# Apple Pay配置
APPLE_PAY_MERCHANT_ID=merchant.com.yourdomain.gamelab
APPLE_PAY_DOMAIN=yourdomain.com
APPLE_PAY_CERTIFICATE_PATH=/path/to/apple_pay_certificate.pem
APPLE_PAY_KEY_PATH=/path/to/apple_pay_key.pem
```

配置说明：
- `APPLE_PAY_MERCHANT_ID`: 在Apple Developer中创建的Merchant ID，格式为 `merchant.com.yourdomain.appname`
- `APPLE_PAY_DOMAIN`: 你的网站域名（不含协议），例如 `gamelab.com`
- `APPLE_PAY_CERTIFICATE_PATH`: Apple Pay证书文件路径（可选，用于生产环境）
- `APPLE_PAY_KEY_PATH`: Apple Pay私钥文件路径（可选，用于生产环境）

**注意**：开发环境可以不配置证书和密钥路径，系统会使用模拟验证。

### 7. Google Pay配置

Google Pay需要：
- 在Google Pay Console中注册商户
- 配置支付网关（如Stripe）

在 `.env.local` 中配置：
```
# Google Pay使用Stripe作为支付网关，需要配置Stripe密钥
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

或者如果你想使用其他支付网关，可以修改 `src/lib/payment.ts` 中的 `initializeGooglePay` 函数。

**Google Pay环境变量说明**：
- Google Pay本身不需要单独的环境变量
- 它使用Stripe作为支付网关，所以需要配置Stripe的密钥
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe公钥（前端使用）
- `STRIPE_SECRET_KEY`: Stripe私钥（后端使用）

**Google Pay环境设置**：
在 `src/lib/payment.ts` 中，可以修改环境：
```typescript
const paymentsClient = new window.google.payments.api.PaymentsClient({
  environment: 'PRODUCTION', // 生产环境使用 'PRODUCTION'，测试环境使用 'TEST'
});
```

## 完整环境变量示例

在 `.env.local` 文件中，所有支付方式的环境变量示例：

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret

# Stripe Configuration (for Visa and Google Pay)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# YinLian Pay Configuration
YINLIAN_MERCHANT_ID=your_yinlian_merchant_id
YINLIAN_SECRET_KEY=your_yinlian_secret_key

# Airwallex Configuration
AIRWALLEX_API_KEY=your_airwallex_api_key
AIRWALLEX_CLIENT_ID=your_airwallex_client_id

# Apple Pay Configuration
APPLE_PAY_MERCHANT_ID=merchant.com.yourdomain.gamelab
APPLE_PAY_DOMAIN=yourdomain.com
APPLE_PAY_CERTIFICATE_PATH=/path/to/apple_pay_certificate.pem
APPLE_PAY_KEY_PATH=/path/to/apple_pay_key.pem

# Email Configuration (QQ Mail)
EMAIL_USER=1131811130@qq.com
EMAIL_PASSWORD=your_qq_email_authorization_code
ORDER_NOTIFICATION_EMAIL=1131811130@qq.com
```

## 测试模式

如果没有配置API密钥，系统会在开发模式下使用模拟支付，返回成功状态但不进行真实扣款。

## 邮件通知配置

### QQ邮箱SMTP配置

1. 登录QQ邮箱，进入"设置" -> "账户"
2. 开启"POP3/SMTP服务"或"IMAP/SMTP服务"
3. 生成授权码（不是邮箱密码）
4. 在 `.env.local` 中配置：
   ```
   EMAIL_USER=1131811130@qq.com
   EMAIL_PASSWORD=your_qq_email_authorization_code
   ORDER_NOTIFICATION_EMAIL=1131811130@qq.com
   ```

**注意**：
- `EMAIL_PASSWORD` 是QQ邮箱的授权码，不是登录密码
- 授权码可以在QQ邮箱设置中生成
- 如果没有配置邮件密码，订单仍会创建成功，但不会发送邮件通知

## 注意事项

1. **安全性**：所有密钥应存储在环境变量中，不要提交到代码仓库
2. **HTTPS**：生产环境必须使用HTTPS
3. **测试环境**：建议先在沙盒/测试环境中测试所有支付方式
4. **错误处理**：确保实现完整的错误处理和用户反馈
5. **邮件服务**：订单支付成功后会自动发送邮件通知到配置的邮箱地址

## API路由

支付处理API位于：`/api/payment`

请求格式：
```json
{
  "paymentMethod": "paypal|applepay|googlepay|visa|yinlianpay|airwallex",
  "amount": 100.00,
  "currency": "GBP",
  "orderData": {
    "items": [...],
    "shipping": {...},
    "customer": {...}
  }
}
```

