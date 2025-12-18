import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterSubscriptionEmail } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // 验证邮箱格式
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 发送邮件
    const emailSent = await sendNewsletterSubscriptionEmail({ email });

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send subscription email. Please try again later.',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your subscription.',
      },
      { status: 500 }
    );
  }
}

