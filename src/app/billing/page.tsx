'use client';

import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaQuestionCircle, FaEnvelope, FaClock } from 'react-icons/fa';

const BillingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
          Billing Terms & Conditions
        </h1>

        {/* 介绍段落 */}
        <p className="text-gray-300 mb-12 text-lg leading-relaxed">
          At GameLab, we are committed to providing a secure, reliable, and hassle-free shopping experience. This policy outlines the accepted payment methods, billing process, and important terms for purchases made on <strong className="text-white">www.shopgamelab.com</strong>.
        </p>

        {/* 分隔线 */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Accepted Payment Methods 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Accepted Payment Methods</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We currently accept the following secure payment options:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">Credit & Debit Cards – Visa, MasterCard</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed">
            All payments are processed through <strong className="text-white">encrypted</strong>, <strong className="text-white">PCI-compliant gateways</strong> to protect your information.
          </p>
        </section>

        {/* Currency 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Currency</h2>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">
              All prices on our website are displayed and processed in <strong className="text-white">British Pounds (GBP)</strong>.
            </li>
            <li className="list-disc">
              If you are purchasing from outside the UK, your bank or card provider may apply currency conversion fees or international transaction charges.
            </li>
            <li className="list-disc">
              GameLab is not responsible for these additional fees.
            </li>
          </ul>
        </section>

        {/* Payment Terms 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Payment Terms</h2>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">
              <strong className="text-white">Full payment is required at the time of purchase.</strong>
            </li>
            <li className="list-disc">
              Orders are only processed and shipped once payment has been successfully completed and verified.
            </li>
            <li className="list-disc">
              If a payment fails, is flagged by our system, or appears suspicious, we may place your order on hold or cancel it until the issue is resolved.
            </li>
          </ul>
        </section>

        {/* Order Confirmation 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Confirmation</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            After completing checkout, you will receive an order confirmation email which includes:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">A summary of your order</li>
            <li className="list-disc">Payment receipt</li>
            <li className="list-disc">Tracking details (once your order has shipped)</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed">
            If you do not receive this email, please check your <strong className="text-white">Spam/Junk folder</strong>, or contact us at <a href="mailto:contact@gamelabconsoles.com" className="text-purple-400 hover:underline">contact@gamelabconsoles.com</a>.
          </p>
        </section>

        {/* Sales Tax & VAT 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Sales Tax & VAT</h2>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">
              Taxes are calculated at checkout based on your shipping address and applicable regulations.
            </li>
            <li className="list-disc">
              For international customers, import duties and VAT may apply at the destination. These charges are the responsibility of the buyer.
            </li>
          </ul>
        </section>

        {/* 分隔线 */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Payment Security 部分 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Payment Security</h2>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">
              GameLab uses <strong className="text-white">industry-standard encryption and fraud prevention tools</strong> to protect your details.
            </li>
            <li className="list-disc">
              We never store your card details on our servers.
            </li>
            <li className="list-disc">
              All transactions are handled through trusted and secure payment providers.
            </li>
          </ul>
        </section>

        {/* Need Help? 部分 */}
        <section className="mb-12 mt-16">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Need Help?</h3>
          <p className="text-gray-300 mb-6 text-lg">
            If you have any billing questions or issues during checkout, please reach out to our support team:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <FaEnvelope className="text-2xl text-blue-500" />
              </div>
              <div>
                <span className="text-gray-300 text-lg">Email: </span>
                <a href="mailto:contact@gamelabconsoles.com" className="text-purple-400 hover:underline text-lg">
                  contact@gamelabconsoles.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <FaClock className="text-2xl text-red-500" />
              </div>
              <div>
                <span className="text-gray-300 text-lg">Support Hours: Monday – Friday | 9:00 AM – 5:00 PM GMT</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BillingPage;

