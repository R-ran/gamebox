'use client';

import { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

const PrivacyChoicesPage = () => {
  const [dontShareAccount, setDontShareAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [isOptedOut, setIsOptedOut] = useState(false);

  const handleOptOut = () => {
    // Handle opt-out logic here
    setIsOptedOut(true);
    // You can add API call here to process the opt-out
    console.log('Opt-out requested', { dontShareAccount, email });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Your privacy choices
        </h1>

        {/* 说明段落 */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-12">
          <p>
            As described in our Privacy Policy, we collect personal information from your interactions with us and our website, including through cookies and similar technologies. We may also share this personal information with third parties, including advertising partners. We do this in order to show you ads on other websites that are more relevant to your interests and for other reasons outlined in our privacy policy.
          </p>
          <p>
            Sharing of personal information for targeted advertising based on your interaction on different websites may be considered "sales", "sharing", or "targeted advertising" under certain U.S. state privacy laws. Depending on where you live, you may have the right to opt out of these activities. If you would like to exercise this opt-out right, please follow the instructions below.
          </p>
          <p>
            If you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will treat this as a request to opt-out of activity that may be considered a "sale" or "sharing" of personal information or other uses that may be considered targeted advertising for the device and browser you used to visit our website.
          </p>
          <p>
            By clicking "opt out", the browser on this device will be opted out of sharing personal data. If you select the checkbox and enter an email, the related customer account will also be opted out.
          </p>
        </div>

        {/* 交互元素 */}
        {!isOptedOut ? (
          <div className="space-y-6 max-w-md mx-auto">
            {/* 复选框和邮箱输入 */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShareAccount}
                  onChange={(e) => setDontShareAccount(e.target.checked)}
                  className="mt-1 w-5 h-5 border-2 border-white bg-black text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
                />
                <span className="text-gray-300 text-lg">
                  Don't share data from my account (optional)
                </span>
              </label>
              
              {dontShareAccount && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-black border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                />
              )}
            </div>

            {/* Opt out 按钮 */}
            <button
              onClick={handleOptOut}
              className="w-full px-6 py-4 border-2 border-white bg-black text-white font-semibold text-lg hover:bg-white hover:text-black transition-colors duration-200"
            >
              Opt out
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Opt-out Successful</h2>
              <p className="text-gray-300 text-lg">
                Your privacy preferences have been saved. Your browser on this device has been opted out of sharing personal data.
                {dontShareAccount && email && (
                  <span className="block mt-2">
                    Your account associated with {email} has also been opted out.
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyChoicesPage;

