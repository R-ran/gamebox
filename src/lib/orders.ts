// 订单工具函数

export interface OrderData {
  items: any[];
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  paymentMethod: string;
  paymentId: string;
  total: number;
}

export interface OrderResponse {
  success: boolean;
  order?: {
    orderNumber: string;
    items: any[];
    customer: any;
    shipping: any;
    paymentMethod: string;
    paymentId: string;
    total: number;
    status: string;
    createdAt: string;
  };
  error?: string;
}

// 创建订单
export async function createOrder(orderData: OrderData): Promise<OrderResponse> {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Order creation error:', error);
    return {
      success: false,
      error: 'Order creation failed',
    };
  }
}

