import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 测试邮件发送功能
export async function GET(request: NextRequest) {
  try {
    const emailUser = process.env.EMAIL_USER || '1131811130@qq.com';
    const emailPassword = process.env.EMAIL_PASSWORD;
    const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL || '1131811130@qq.com';

    const config = {
      EMAIL_USER: emailUser,
      EMAIL_PASSWORD: emailPassword ? '***configured***' : 'NOT SET',
      ORDER_NOTIFICATION_EMAIL: recipientEmail,
    };

    if (!emailPassword) {
      return NextResponse.json({
        success: false,
        config,
        error: 'EMAIL_PASSWORD is not configured in environment variables',
        message: 'Please set EMAIL_PASSWORD in .env.local file',
      });
    }

    // 尝试创建传输器
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // 验证连接
    await transporter.verify();

    // 发送测试邮件
    const testMailOptions = {
      from: `"Gamelab Test" <${emailUser}>`,
      to: recipientEmail,
      subject: 'Test Email from Gamelab Shop',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify email configuration.</p>
        <p>If you receive this email, your email configuration is working correctly!</p>
      `,
      text: 'This is a test email to verify email configuration.',
    };

    const info = await transporter.sendMail(testMailOptions);

    return NextResponse.json({
      success: true,
      config,
      message: 'Test email sent successfully',
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('Email test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

