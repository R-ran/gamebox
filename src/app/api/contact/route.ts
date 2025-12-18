import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/email';

// 发送联系表单邮件
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, comment } = body;

    if (!name || !email || !phone || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const success = await sendContactEmail({
      name,
      email,
      phone,
      comment,
    });

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
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
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

