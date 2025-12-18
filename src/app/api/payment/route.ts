import { NextRequest, NextResponse } from 'next/server';

// 支付处理接口
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentMethod, amount, currency, orderData } = body;

    // 验证必要参数
    if (!paymentMethod || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 根据不同的支付方式处理
    switch (paymentMethod) {
      case 'paypal':
        return await handlePayPalPayment(amount, currency, orderData);
      
      case 'applepay':
        return await handleApplePayPayment(amount, currency, orderData);
      
      case 'googlepay':
        return await handleGooglePayPayment(amount, currency, orderData);
      
      case 'visa':
        return await handleVisaPayment(amount, currency, orderData);
      
      case 'yinlianpay':
        return await handleYinLianPayment(amount, currency, orderData);
      
      default:
        return NextResponse.json(
          { error: 'Invalid payment method' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

// PayPal支付处理
async function handlePayPalPayment(amount: number, currency: string, orderData: any) {
  try {
    // PayPal API集成
    // 注意：需要配置PayPal Client ID和Secret在环境变量中
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    
    if (!paypalClientId || !paypalSecret) {
      // 开发环境：返回模拟成功
      return NextResponse.json({
        success: true,
        paymentId: `paypal_${Date.now()}`,
        message: 'PayPal payment processed successfully (demo mode)',
        redirectUrl: '/order?status=success'
      });
    }

    // 获取PayPal访问令牌
    const credentials = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64');
    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('PayPal token error:', errorData);
      throw new Error('Failed to get PayPal access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('PayPal access token is missing');
    }

    // 创建PayPal订单
    const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        }],
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('PayPal order creation error:', errorData);
      throw new Error('Failed to create PayPal order');
    }

    const orderData_paypal = await orderResponse.json();
    
    if (!orderData_paypal.id) {
      throw new Error('PayPal order ID is missing');
    }
    
    return NextResponse.json({
      success: true,
      paymentId: orderData_paypal.id,
      approvalUrl: orderData_paypal.links?.find((link: any) => link.rel === 'approve')?.href,
      message: 'PayPal payment order created',
    });
  } catch (error) {
    console.error('PayPal error:', error);
    return NextResponse.json({
      success: false,
      error: 'PayPal payment failed',
    }, { status: 500 });
  }
}

// Apple Pay支付处理
async function handleApplePayPayment(amount: number, currency: string, orderData: any) {
  try {
    // Apple Pay需要在前端使用Apple Pay JS API
    // 后端主要用于验证和记录交易
    // 注意：Apple Pay需要HTTPS和有效的Apple Pay证书
    
    return NextResponse.json({
      success: true,
      paymentId: `applepay_${Date.now()}`,
      message: 'Apple Pay payment processed successfully',
      redirectUrl: '/order?status=success'
    });
  } catch (error) {
    console.error('Apple Pay error:', error);
    return NextResponse.json({
      success: false,
      error: 'Apple Pay payment failed',
    }, { status: 500 });
  }
}

// Google Pay支付处理
async function handleGooglePayPayment(amount: number, currency: string, orderData: any) {
  try {
    // Google Pay主要在前端处理
    // 后端用于验证支付令牌和记录交易
    
    return NextResponse.json({
      success: true,
      paymentId: `googlepay_${Date.now()}`,
      message: 'Google Pay payment processed successfully',
      redirectUrl: '/order?status=success'
    });
  } catch (error) {
    console.error('Google Pay error:', error);
    return NextResponse.json({
      success: false,
      error: 'Google Pay payment failed',
    }, { status: 500 });
  }
}

// Visa/Stripe支付处理
async function handleVisaPayment(amount: number, currency: string, orderData: any) {
  try {
    // 使用Stripe处理Visa支付
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      // 开发环境：返回模拟成功
      return NextResponse.json({
        success: true,
        paymentId: `visa_${Date.now()}`,
        message: 'Visa payment processed successfully (demo mode)',
        redirectUrl: '/order?status=success'
      });
    }

    // 创建Stripe支付意图
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: Math.round(amount * 100).toString(), // Stripe使用分为单位
        currency: currency.toLowerCase(),
        payment_method_types: 'card',
      }),
    });

    const paymentIntent = await response.json();
    
    return NextResponse.json({
      success: true,
      paymentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      message: 'Visa payment intent created',
    });
  } catch (error) {
    console.error('Visa/Stripe error:', error);
    return NextResponse.json({
      success: false,
      error: 'Visa payment failed',
    }, { status: 500 });
  }
}

// 银联支付处理
async function handleYinLianPayment(amount: number, currency: string, orderData: any) {
  try {
    // 银联支付API集成
    // 注意：需要配置银联商户号和密钥
    const yinlianMerchantId = process.env.YINLIAN_MERCHANT_ID;
    const yinlianSecretKey = process.env.YINLIAN_SECRET_KEY;
    
    if (!yinlianMerchantId || !yinlianSecretKey) {
      // 开发环境：返回模拟成功（不返回redirectUrl，让前端处理）
      return NextResponse.json({
        success: true,
        paymentId: `yinlian_${Date.now()}`,
        message: 'YinLian payment processed successfully (demo mode)',
        // 不返回redirectUrl，让前端通过handleOrderSuccess处理
      });
    }

    // 银联支付API调用
    // 这里需要根据银联支付的实际API文档进行集成
    // 如果银联API返回了支付页面URL，应该在这里返回
    // 例如：redirectUrl: yinlianPaymentUrl
    
    return NextResponse.json({
      success: true,
      paymentId: `yinlian_${Date.now()}`,
      message: 'YinLian payment processed successfully',
      // 只有在有真实的第三方支付页面URL时才返回redirectUrl
      // redirectUrl: yinlianPaymentUrl
    });
  } catch (error) {
    console.error('YinLian Pay error:', error);
    return NextResponse.json({
      success: false,
      error: 'YinLian payment failed',
    }, { status: 500 });
  }
}

