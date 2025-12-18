// 邮件工具函数

import nodemailer from 'nodemailer';

export interface OrderEmailData {
  orderNumber: string;
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
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  paymentMethod: string;
  paymentId: string;
  total: number;
  createdAt: string;
}

// 创建邮件传输器
function createTransporter() {
  const emailUser = process.env.EMAIL_USER || '1131811130@qq.com';
  const emailPassword = process.env.EMAIL_PASSWORD; // QQ邮箱授权码

  console.log('Email configuration check:');
  console.log('- EMAIL_USER:', emailUser);
  console.log('- EMAIL_PASSWORD:', emailPassword ? '***configured***' : 'NOT SET');
  console.log('- ORDER_NOTIFICATION_EMAIL:', process.env.ORDER_NOTIFICATION_EMAIL || '1131811130@qq.com');

  if (!emailPassword) {
    console.warn('Email password not configured. Email sending will be disabled.');
    console.warn('Please set EMAIL_PASSWORD in .env.local file with your QQ email authorization code.');
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // 使用SSL
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // 验证连接配置
    transporter.verify((error, success) => {
      if (error) {
        console.error('Email transporter verification failed:', error);
      } else {
        console.log('Email transporter verified successfully');
      }
    });

    return transporter;
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
}

// 生成订单邮件HTML内容
function generateOrderEmailHTML(data: OrderEmailData): string {
  const itemsList = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">£${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">£${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #9333ea; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 20px; }
    .order-info { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { background-color: #9333ea; color: white; padding: 10px; text-align: left; }
    .total { font-size: 18px; font-weight: bold; color: #9333ea; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
    </div>
    
    <div class="content">
      <div class="order-info">
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${data.orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod.toUpperCase()}</p>
        <p><strong>Payment ID:</strong> ${data.paymentId}</p>
      </div>

      <div class="order-info">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${data.customer.firstName} ${data.customer.lastName}</p>
        <p><strong>Email:</strong> ${data.customer.email}</p>
        <p><strong>Phone:</strong> ${data.customer.phone}</p>
      </div>

      <div class="order-info">
        <h2>Shipping Address</h2>
        <p>${data.shipping.address}</p>
        <p>${data.shipping.city}, ${data.shipping.postcode}</p>
        <p>${data.shipping.country}</p>
      </div>

      <div class="order-info">
        <h2>Order Items</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        <div style="text-align: right; margin-top: 15px;">
          <p class="total">Total: £${data.total.toFixed(2)}</p>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>This is an automated email. Please do not reply.</p>
      <p>&copy; ${new Date().getFullYear()} Gamelab. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

export interface NewsletterEmailData {
  email: string;
}

// 生成联系表单邮件HTML内容
function generateContactEmailHTML(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #9333ea; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 20px; }
    .info-box { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <div class="info-box">
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      </div>

      <div class="info-box">
        <h2>Message</h2>
        <p style="white-space: pre-wrap;">${data.comment}</p>
      </div>
    </div>

    <div class="footer">
      <p>This is an automated email from the contact form.</p>
      <p>&copy; ${new Date().getFullYear()} Gamelab. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// 发送联系表单邮件
export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return false;
    }

    const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL || '1131811130@qq.com';

    const mailOptions = {
      from: `"Gamelab Contact Form" <${process.env.EMAIL_USER || '1131811130@qq.com'}>`,
      to: recipientEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: generateContactEmailHTML(data),
      text: `
New Contact Form Submission

Contact Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.comment}
      `,
      replyTo: data.email, // 设置回复地址为用户邮箱
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully!');
    console.log('- Message ID:', info.messageId);
    console.log('- To:', recipientEmail);
    console.log('- Subject:', mailOptions.subject);
    return true;
  } catch (error: any) {
    console.error('Error sending contact email:');
    console.error('- Error message:', error.message);
    console.error('- Error code:', error.code);
    console.error('- Full error:', error);
    return false;
  }
}

// 生成Newsletter订阅邮件HTML内容
function generateNewsletterEmailHTML(data: NewsletterEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #9333ea; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 20px; }
    .info-box { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Newsletter Subscription</h1>
    </div>
    
    <div class="content">
      <div class="info-box">
        <h2>Subscriber Information</h2>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
    </div>

    <div class="footer">
      <p>This is an automated email from the newsletter subscription form.</p>
      <p>&copy; ${new Date().getFullYear()} Gamelab. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// 发送Newsletter订阅邮件
export async function sendNewsletterSubscriptionEmail(data: NewsletterEmailData): Promise<boolean> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return false;
    }

    const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL || '1131811130@qq.com';

    const mailOptions = {
      from: `"Gamelab Newsletter" <${process.env.EMAIL_USER || '1131811130@qq.com'}>`,
      to: recipientEmail,
      subject: `New Newsletter Subscription: ${data.email}`,
      html: generateNewsletterEmailHTML(data),
      text: `
New Newsletter Subscription

Subscriber Email: ${data.email}
Subscription Date: ${new Date().toLocaleString()}
      `,
      replyTo: data.email, // 设置回复地址为订阅者邮箱
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Newsletter subscription email sent successfully!');
    console.log('- Message ID:', info.messageId);
    console.log('- To:', recipientEmail);
    console.log('- Subject:', mailOptions.subject);
    return true;
  } catch (error: any) {
    console.error('Error sending newsletter subscription email:');
    console.error('- Error message:', error.message);
    console.error('- Error code:', error.code);
    console.error('- Full error:', error);
    return false;
  }
}

// 发送订单确认邮件
export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<boolean> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return false;
    }

    const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL || '1131811130@qq.com';

    const mailOptions = {
      from: `"Gamelab Shop" <${process.env.EMAIL_USER || '1131811130@qq.com'}>`,
      to: recipientEmail,
      subject: `New Order Confirmation - ${data.orderNumber}`,
      html: generateOrderEmailHTML(data),
      text: `
Order Confirmation

Order Number: ${data.orderNumber}
Order Date: ${new Date(data.createdAt).toLocaleString()}
Payment Method: ${data.paymentMethod.toUpperCase()}

Customer Information:
Name: ${data.customer.firstName} ${data.customer.lastName}
Email: ${data.customer.email}
Phone: ${data.customer.phone}

Shipping Address:
${data.shipping.address}
${data.shipping.city}, ${data.shipping.postcode}
${data.shipping.country}

Order Items:
${data.items.map(item => `- ${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total: £${data.total.toFixed(2)}
      `,
    };

    console.log('📧 Sending order confirmation email...');
    console.log('- Payment Method:', data.paymentMethod.toUpperCase());
    console.log('- Order Number:', data.orderNumber);
    console.log('- Customer Email:', data.customer.email);
    console.log('- Recipient Email:', recipientEmail);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent successfully!');
    console.log('- Message ID:', info.messageId);
    console.log('- To:', recipientEmail);
    console.log('- Subject:', mailOptions.subject);
    console.log('- Payment Method:', data.paymentMethod.toUpperCase());
    return true;
  } catch (error: any) {
    console.error('Error sending order confirmation email:');
    console.error('- Error message:', error.message);
    console.error('- Error code:', error.code);
    console.error('- Full error:', error);
    return false;
  }
}

