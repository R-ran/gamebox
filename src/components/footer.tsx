'use client';

import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FooterProps {
  hasStickyBar?: boolean;
}

const Footer = ({ hasStickyBar = false }: FooterProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter your email address');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (data.success) {
        setNewsletterStatus('success');
        setNewsletterMessage('Thank you for subscribing!');
        setNewsletterEmail('');
        // 3秒后重置状态
        setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage('');
        }, 3000);
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterStatus('error');
      setNewsletterMessage('An error occurred. Please try again later.');
    }
  };

  const quickLinks = [
    { label: 'About us', href: '/about' },
    { label: 'Return Policy & Refund Policy', href: '/policy' },
    { label: 'Contact us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/tos' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Billing Terms & Conditions', href: '/billing' },
    { label: 'Your privacy choices', href: '/privacy-choices' },
  ];

  const payIcons = [
    { name: 'Apple Pay', src: '/apple.png' },
    { name: 'Google Pay', src: '/googlepay.png' },
    { name: 'Visa', src: '/visa.png' },
    { name: 'YinLian', src: '/yinlianpay.png' },
    { name: 'PayPal', src: '/paypal.png' },
    { name: 'Airwallex', src: '/airwallex.avif' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      {/* Logo */}
      <div className="text-center mb-4 py-6">
      <Link href="/" className="inline-block">
        <h2 className="text-5xl font-bold hover:text-blue-400 transition-colors">GAMELAB</h2>
      </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between gap-10">
        
        {/* Quick Links */}
        <div className="md:flex-1">
          <h3 className="font-semibold mb-3 text-2xl">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div className="md:flex-1 md:text-center">
          <h3 className="font-semibold mb-3 text-2xl">Customer Support</h3>
          <address className="text-sm not-italic space-y-1">
            <p>Unit 2A, 17/F, Glenealy Tower, Central, Hong Kong 999077</p>
            <p>
              <a href="mailto:support@shopgamelab.com" className="hover:underline">
                support@shopgamelab.com
              </a>
            </p>
            <p>9:00 AM - 5:00 PM (Mon-Fri)</p>
          </address>
        </div>

        {/* Newsletter */}
        <div className="md:flex-1 md:flex md:flex-col md:items-end">
          <h3 className="font-semibold mb-3 text-2xl md:text-right">Welcome to the Collector's List</h3>
          <div className="md:w-full md:flex md:flex-col md:items-center">
            <p className="text-sm mb-3 text-center">
              Be the first to know about limited console drops, new colours, and exclusive bundles.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 justify-center w-full max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterStatus === 'loading'}
                  className="flex-1 px-3 py-2 rounded bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  aria-label="Subscribe"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {newsletterStatus === 'loading' ? '...' : '→'}
                </button>
              </div>
              {newsletterMessage && (
                <p className={`text-sm text-center ${
                  newsletterStatus === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Payment icons + copyright */}
<div className={`bg-white ${hasStickyBar ? 'pb-24' : ''}`}>
  <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col items-center gap-4">
    {/* 图标行 */}
    <div className="flex flex-wrap justify-center items-center gap-3">
      {payIcons.map((icon) => (
        <img
          key={icon.name}
          src={icon.src}
          alt={icon.name}
          className="h-8 object-contain"
          width={68}
          height={48}
        />
      ))}
    </div>

    {/* 版权文字 */}
    <p className="text-sm text-neutral-800">© 2025, Gamelab</p>
  </div>
</div>

      {/* Scroll-to-top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;