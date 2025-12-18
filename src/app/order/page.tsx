'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Link from 'next/link';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';

const OrderContent = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const paymentMethod = searchParams.get('payment');
  const orderNumber = searchParams.get('orderNumber');
  
  const [orderFormData, setOrderFormData] = useState({
    orderNumber: '',
    emailOrPhone: ''
  });

  const [trackingFormData, setTrackingFormData] = useState({
    trackingNumber: ''
  });

  const [copied, setCopied] = useState(false);

  // 复制订单号
  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Track by order:', orderFormData);
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Track by tracking number:', trackingFormData);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 如果支付成功，显示订单成功页面
  if (status === 'success' && orderNumber) {
    const paymentMethodNames: { [key: string]: string } = {
      paypal: 'PayPal',
      applepay: 'Apple Pay',
      googlepay: 'Google Pay',
      visa: 'Visa',
      yinlianpay: 'YinLian Pay',
    };

    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="h-10"></div>
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 成功图标 */}
            <div className="mb-8 flex justify-center">
              <FaCheckCircle className="text-green-500 text-6xl md:text-8xl" />
            </div>

            {/* 成功标题 */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Order Confirmed!
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* 订单号 */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
              <p className="text-gray-400 mb-2">Order Number</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-3xl font-bold text-purple-400">{orderNumber}</p>
                <button
                  onClick={copyOrderNumber}
                  className="p-2 hover:bg-gray-800 rounded transition"
                  title="Copy order number"
                >
                  <FaCopy className={`text-xl ${copied ? 'text-green-400' : 'text-gray-400'}`} />
                </button>
              </div>
              {copied && (
                <p className="text-green-400 text-sm mt-2">Copied to clipboard!</p>
              )}
            </div>

            {/* 支付方式 */}
            {paymentMethod && (
              <div className="mb-8">
                <p className="text-gray-400 mb-2">Payment Method</p>
                <p className="text-xl font-semibold">
                  {paymentMethodNames[paymentMethod] || paymentMethod}
                </p>
              </div>
            )}

            {/* 说明 */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800 text-left">
              <h2 className="text-xl font-bold mb-4">What's Next?</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• You will receive an order confirmation email shortly</li>
                <li>• We'll send you tracking information once your order ships</li>
                <li>• Expected delivery: 2-8 business days</li>
              </ul>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Continue Shopping
              </Link>
              <Link
                href={`/order?orderNumber=${orderNumber}`}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition"
              >
                Track Order
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-16">
        {/* 标题 */}
        <h1 className="text-5xl md:text-6xl font-bold text-left mb-12">
          Track Your Order
        </h1>

        {/* 追踪表单区域 */}
        <div className="max-w-6xl mx-auto">
          <div className="border-2 border-white rounded-lg p-8">
            <div className="flex items-start gap-8">
              {/* 左侧：通过订单号和联系方式追踪 */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-white mb-2">Order Number</label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={orderFormData.orderNumber}
                    onChange={handleOrderChange}
                    placeholder="Order Number"
                    className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Email or Phone Number</label>
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={orderFormData.emailOrPhone}
                    onChange={handleOrderChange}
                    placeholder="Email or Phone Number"
                    className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <button
                  onClick={handleOrderSubmit}
                  className="w-full bg-transparent border-2 border-white text-white font-bold py-3 rounded hover:bg-white hover:text-black transition cursor-pointer"
                >
                  Track
                </button>
              </div>

              {/* 中间分隔线和Or - 桌面端 */}
              <div className="hidden md:flex relative items-center justify-center px-4">
                <div className="absolute inset-y-0 border-l-2 border-dashed border-white"></div>
                <div className="relative bg-black px-2 z-10">
                  <span className="text-white text-lg">Or</span>
                </div>
              </div>

              {/* 右侧：通过追踪号追踪 */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-white mb-2">Tracking Number</label>
                  <input
                    type="text"
                    name="trackingNumber"
                    value={trackingFormData.trackingNumber}
                    onChange={handleTrackingChange}
                    placeholder="Tracking Number"
                    className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="h-[48px]"></div>

                <button
                  onClick={handleTrackingSubmit}
                  className="w-full bg-transparent border-2 border-white text-white font-bold py-3 rounded hover:bg-white hover:text-black transition cursor-pointer"
                >
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-20"></div>
      </main>
      <Footer />
    </div>
  );
};

const OrderPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl">Loading...</p>
        </main>
        <Footer />
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
};

export default OrderPage;

