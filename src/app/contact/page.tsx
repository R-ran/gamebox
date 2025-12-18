'use client';

import { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', comment: '' });
        // 3秒后清除成功消息
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        console.error('Contact form error:', data.error);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-16">
        {/* Get in touch 部分 */}
        <div className="max-w-4xl mx-auto mb-32">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-12">
            Get in touch
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name 和 Email 并排 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
            </div>

            {/* Phone number 全宽 */}
            <div>
              <label className="block text-white mb-2">Phone number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            {/* Comment textarea 全宽 */}
            <div>
              <label className="block text-white mb-2">Comment:</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Comment"
                rows={6}
                className="w-full bg-transparent border-2 border-white rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white resize-none"
                required
              />
            </div>

            {/* Send 按钮 */}
            <div className="flex flex-col items-center gap-3">
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold px-12 py-3 rounded hover:bg-gray-200 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                style={{ color: '#000' }}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>

        {/* Business Information 部分 */}
        <div className="max-w-4xl">
          <div className="h-10"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-left mb-8">
            Business Information
          </h2>
          
          <div className="space-y-4 text-lg text-gray-300">
            <div>
              <p className="font-semibold text-white mb-1">Address: </p>
              <p>Unit 2A, 17/F, Glenealy Tower, Central, Hong Kong 9990770</p>
            </div>
            
            <div>
              <p className="font-semibold text-white mb-1">Email:</p>
              
              <p className="text-gray-400 text-sm mt-1">
                <a href="mailto:support@shopgamelab.com" className="hover:text-white hover:underline">
                  support@shopgamelab.com
                </a>
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-white mb-1">Phone:</p>
              <p>+44 20 4538 4802</p>
            </div>
            
            <div>
              <p className="font-semibold text-white mb-1">Hours:</p>
              <p>9:00 AM – 5:00 PM (Mon-Fri)</p>
            </div>
          </div>
        </div>

        <div className="h-20"></div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

