import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '../../../lib/email';

// 发送订单确认邮件
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order } = body;

    if (!order) {
      return NextResponse.json(
        { error: 'Order data is required' },
        { status: 400 }
      );
    }

    const emailData = {
      orderNumber: order.orderNumber,
      customer: order.customer,
      shipping: order.shipping,
      items: order.items,
      paymentMethod: order.paymentMethod,
      paymentId: order.paymentId,
      total: order.total,
      createdAt: order.createdAt || new Date().toISOString(),
    };

    const success = await sendOrderConfirmationEmail(emailData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Order confirmation email sent successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email (email not configured or error occurred)',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

