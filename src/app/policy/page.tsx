'use client';

import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaQuestionCircle } from 'react-icons/fa';

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          GameLab Return & Refund Policy
        </h1>

        {/* 介绍段落 */}
        <p className="text-gray-300 mb-12 text-lg">
          We want you to love your GameLab console. If something isn't right, we've made our return process simple.
        </p>

        {/* Returns & Exchanges 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Returns & Exchanges</h2>
          <ul className="space-y-4 text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>You can return or exchange your order within <strong className="text-white">30 days of delivery</strong>.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>Items must be in their <strong className="text-white">original condition and packaging</strong>.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>If your item arrives damaged or faulty, we'll cover the return shipping and send a replacement or refund.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>For change of mind, customers cover return shipping.</span>
            </li>
          </ul>
        </section>

        {/* Refunds 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Refunds</h2>
          <ul className="space-y-4 text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>Once your return is received and inspected, we'll process your refund to the <strong className="text-white">original payment method</strong>.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>Refunds are usually completed within <strong className="text-white">5-10 business days</strong> after we receive your return.</span>
            </li>
          </ul>
        </section>

        {/* How to Start a Return 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Start a Return</h2>
          <ol className="space-y-4 text-gray-300 text-lg list-decimal list-inside">
            <li className="pl-2">
              Email <strong className="text-white">support@shopgamelab.com</strong> with your order number and reason for return.
            </li>
            <li className="pl-2">
              Our team will provide instructions and a return label if applicable.
            </li>
          </ol>
        </section>

        {/* Non-Returnable Items 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Non-Returnable Items</h2>
          <ul className="space-y-4 text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>Items returned used, damaged, or without original packaging may not qualify for a full refund.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-white">•</span>
              <span>Returns requested after 30 days of delivery cannot be accepted.</span>
            </li>
          </ul>
        </section>

        {/* Need help? 部分 */}
        <section className="mb-12 mt-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <FaQuestionCircle className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Need help?</h3>
              <p className="text-gray-300 text-lg">
                Our support team is available Monday-Friday, 9am-5pm GMT at <strong className="text-white">support@shopgamelab.com</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyPage;

