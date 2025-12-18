import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '../../../lib/email';

// 生成订单号
function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `GL${timestamp}${random}`;
}

// 创建订单
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, shipping, paymentMethod, paymentId, total } = body;

    // 验证必要参数
    if (!items || !customer || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 生成订单号
    const orderNumber = generateOrderNumber();

    // 创建订单对象
    const order = {
      orderNumber,
      items,
      customer,
      shipping,
      paymentMethod,
      paymentId: paymentId || `payment_${Date.now()}`,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // 这里可以将订单保存到数据库
    // 例如：await saveOrderToDatabase(order);

    // 发送订单确认邮件（异步，不阻塞响应）
    console.log('=== Order Creation ===');
    console.log('Order Number:', order.orderNumber);
    console.log('Payment Method:', order.paymentMethod);
    console.log('Payment ID:', order.paymentId);
    console.log('Customer Email:', order.customer.email);
    console.log('Total Amount: £' + order.total.toFixed(2));
    console.log('Attempting to send order confirmation email...');
    
    sendOrderConfirmationEmail({
      orderNumber: order.orderNumber,
      customer: order.customer,
      shipping: order.shipping,
      items: order.items,
      paymentMethod: order.paymentMethod,
      paymentId: order.paymentId,
      total: order.total,
      createdAt: order.createdAt,
    })
      .then((success) => {
        if (success) {
          console.log('✅ Order confirmation email sent successfully!');
          console.log('- Order Number:', order.orderNumber);
          console.log('- Payment Method:', order.paymentMethod);
          console.log('- Customer Email:', order.customer.email);
        } else {
          console.warn('❌ Order confirmation email failed to send');
          console.warn('- Order Number:', order.orderNumber);
          console.warn('- Payment Method:', order.paymentMethod);
          console.warn('- Customer Email:', order.customer.email);
          console.warn('Please check email configuration in .env.local');
        }
      })
      .catch((error) => {
        // 邮件发送失败不影响订单创建
        console.error('❌ Error sending order confirmation email:');
        console.error('- Order Number:', order.orderNumber);
        console.error('- Payment Method:', order.paymentMethod);
        console.error('- Error message:', error.message);
        console.error('- Error code:', error.code);
        console.error('- Full error:', error);
      });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Order creation failed' },
      { status: 500 }
    );
  }
}

// 获取订单信息
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Order number is required' },
        { status: 400 }
      );
    }

    // 这里应该从数据库查询订单
    // 例如：const order = await getOrderFromDatabase(orderNumber);

    return NextResponse.json({
      success: true,
      order: null, // 实际应该返回查询到的订单
    });
  } catch (error) {
    console.error('Order retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    );
  }
}

