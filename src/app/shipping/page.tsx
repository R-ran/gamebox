'use client';

import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaQuestionCircle } from 'react-icons/fa';

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        
        
        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          GameLab Shipping Policy
        </h1>

        {/* 介绍段落 */}
        <p className="text-gray-300 mb-12 text-lg">
          At Gamelab, we want your console to reach you quickly and safely. Please review the details below:
        </p>

        {/* Order Processing 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Processing</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Orders are processed within <strong className="text-white">1-2 business days</strong> (Monday-Friday). You'll receive an email with tracking details once your order has shipped.
          </p>
        </section>

        {/* Delivery Times 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Delivery Times</h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              <strong className="text-white">Standard Shipping</strong> (<strong className="text-white">FREE</strong>): 2-8 business days
            </p>
            <p>
              <strong className="text-white">Express Shipping</strong> (<strong className="text-white">£9.99</strong>): 1-3 business days
            </p>
            <p className="text-gray-400 text-base mt-4">
              Delivery times may vary depending on your location, courier availability, and unexpected delays (weather, holidays, etc.).
            </p>
          </div>
        </section>

        {/* Shipping Areas 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Shipping Areas</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            We currently ship to the <strong className="text-white">UK, EU, US, Canada, and Australia</strong>.
          </p>
        </section>

        {/* Address Changes 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Address Changes</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            If you need to update your shipping address, please email <strong className="text-white">support@shopgamelab.com</strong> within <strong className="text-white">24 hours</strong> of placing your order.
          </p>
        </section>

        {/* Tracking 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tracking</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Every order includes a tracking link so you can follow your delivery in real time.
          </p>
        </section>

        {/* Lost or Damaged Orders 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Lost or Damaged Orders</h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              If your package arrives damaged or doesn't arrive within the expected timeframe, please contact us at <strong className="text-white">support@shopgamelab.com</strong> within <strong className="text-white">7 days</strong> so we can help.
            </p>
            <p>
              We are not responsible for parcels marked as "delivered" by the courier but not located – please check with neighbours or your local delivery office first.
            </p>
          </div>
        </section>

        {/* Questions? 部分 */}
        <section className="mb-12 mt-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <FaQuestionCircle className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Questions?</h3>
              <p className="text-gray-300 text-lg">
                Reach us anytime at <strong className="text-white">support@shopgamelab.com</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPage;

