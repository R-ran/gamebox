// 支付工具函数

export interface PaymentRequest {
  paymentMethod: string;
  amount: number;
  currency: string;
  orderData: {
    items: any[];
    shipping: any;
    customer: any;
  };
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  approvalUrl?: string;
  clientSecret?: string;
  message?: string;
  redirectUrl?: string;
  error?: string;
}

// 处理支付请求
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: 'Payment processing failed',
    };
  }
}

// Apple Pay初始化
export async function initializeApplePay(amount: number, currency: string) {
  if (typeof window === 'undefined' || !window.ApplePaySession) {
    return null;
  }

  const request = {
    countryCode: 'GB',
    currencyCode: currency,
    supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: 'Gamelab',
      amount: amount.toFixed(2),
    },
  };

  const session = new window.ApplePaySession(3, request);
  return session;
}

// Google Pay初始化
export async function initializeGooglePay(amount: number, currency: string) {
  if (typeof window === 'undefined' || !window.google?.payments?.api) {
    return null;
  }

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['VISA', 'MASTERCARD'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'stripe',
            'stripe:version': '2018-10-31',
            'stripe:publishableKey': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'GAMELAB',
      merchantName: 'Gamelab',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: amount.toFixed(2),
      currencyCode: currency,
    },
  };

  const paymentsClient = new window.google.payments.api.PaymentsClient({
    environment: 'TEST', // 或 'PRODUCTION'
  });

  return { paymentsClient, paymentRequest };
}

// 声明全局类型
declare global {
  interface Window {
    ApplePaySession?: any;
    google?: {
      payments?: {
        api?: any;
      };
    };
  }
}

