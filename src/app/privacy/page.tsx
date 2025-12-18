'use client';

import Header from '../../components/header';
import Footer from '../../components/footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="h-10"></div>
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>

        {/* 最后更新日期 */}
        <p className="text-gray-400 mb-12 text-sm md:text-base">
          Last updated: January 29, 2024
        </p>

        {/* 介绍部分 */}
        <section className="mb-10">
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            This Privacy Policy describes how GameLab Ltd ("we," "us," or "our") collects, uses, and shares your personal information when you use our website, products, and services (collectively, the "Services"). By using our Services, you agree to the collection and use of information in accordance with this policy. Please read this Privacy Policy carefully. We may update this Privacy Policy from time to time, and we will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            For purposes of this Privacy Policy, "Collector" refers to any individual who uses our Services, including but not limited to customers, website visitors, and newsletter subscribers.
          </p>
        </section>

        {/* How We Collect And Use Your Personal Information */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How We Collect And Use Your Personal Information</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We collect personal information that you provide directly to us when you:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">Place an order or make a purchase</li>
            <li className="list-disc">Create an account on our website</li>
            <li className="list-disc">Subscribe to our newsletter or marketing communications</li>
            <li className="list-disc">Contact us for customer support</li>
            <li className="list-disc">Participate in surveys, contests, or promotions</li>
            <li className="list-disc">Post reviews or comments on our website</li>
          </ul>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            The types of personal information we may collect include:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc"><strong className="text-white">Contact Data:</strong> Name, mailing address, phone number, email address</li>
            <li className="list-disc"><strong className="text-white">Payment Information:</strong> Credit card numbers, billing address, and other payment details (processed securely through third-party payment processors)</li>
            <li className="list-disc"><strong className="text-white">Account Information:</strong> Username, password, and other account credentials</li>
            <li className="list-disc"><strong className="text-white">Customer Support Interactions:</strong> Records of your communications with our customer support team</li>
            <li className="list-disc"><strong className="text-white">Information You Provide:</strong> Any other information you choose to provide to us</li>
          </ul>
        </section>

        {/* How We Use Your Personal Information */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How We Use Your Personal Information</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We use the personal information we collect for various purposes, including:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">To provide, maintain, and improve our Services</li>
            <li className="list-disc">To process and fulfill your orders and transactions</li>
            <li className="list-disc">To communicate with you about your orders, account, and our Services</li>
            <li className="list-disc">To send you marketing communications, newsletters, and promotional materials (with your consent where required)</li>
            <li className="list-disc">To respond to your inquiries, comments, and customer support requests</li>
            <li className="list-disc">To detect, prevent, and address technical issues, fraud, and security threats</li>
            <li className="list-disc">To comply with legal obligations and enforce our terms and policies</li>
            <li className="list-disc">To personalize your experience and provide tailored content and recommendations</li>
          </ul>
        </section>

        {/* Do Not Sell My Personal Information */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Do Not Sell My Personal Information</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We do not sell your personal information to third parties. We are committed to protecting your privacy and will not engage in the sale of personal information as defined under applicable privacy laws.
          </p>
        </section>

        {/* How We Share Your Personal Information */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How We Share Your Personal Information</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We may share your personal information in the following circumstances:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc"><strong className="text-white">Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, shipping, data analytics, and customer support.</li>
            <li className="list-disc"><strong className="text-white">Legal Compliance:</strong> We may disclose your information if required by law, regulation, or legal process, or to respond to government requests. This includes compliance with California Civil Code Section 1798.83 (Shine the Light Law) and the General Data Protection Regulation (GDPR) for European users.</li>
            <li className="list-disc"><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal information may be transferred to the acquiring entity.</li>
            <li className="list-disc"><strong className="text-white">With Your Consent:</strong> We may share your information with third parties when you have provided explicit consent for such sharing.</li>
          </ul>
        </section>

        {/* Information We Collect Automatically */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Information We Collect Automatically</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            When you visit our website, we automatically collect certain information about your device and browsing behavior using technologies such as cookies, pixels, web beacons, and similar tracking technologies. This information may include:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">IP address and location data</li>
            <li className="list-disc">Browser type and version</li>
            <li className="list-disc">Device information (e.g., device type, operating system)</li>
            <li className="list-disc">Pages visited and time spent on pages</li>
            <li className="list-disc">Referring website addresses</li>
            <li className="list-disc">Search terms used to find our website</li>
          </ul>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We use this automatically collected information to analyze trends, administer the website, track user movements, and gather demographic information. You can control cookies through your browser settings, but note that disabling cookies may affect the functionality of our Services.
          </p>
        </section>

        {/* Information We Collect From Third Parties */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Information We Collect From Third Parties</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We may receive personal information about you from third parties, including:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc">Vendors and contractors who provide services to us</li>
            <li className="list-disc">Social media platforms when you interact with our social media accounts</li>
            <li className="list-disc">Publicly available sources and databases</li>
          </ul>
        </section>

        {/* Companies who support our site */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Companies who support our site</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We work with various companies that support our website and operations, including:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc"><strong className="text-white">Payment Processors:</strong> Companies that process payments on our behalf</li>
            <li className="list-disc"><strong className="text-white">Shipping Companies:</strong> Logistics and delivery partners who fulfill and ship your orders</li>
            <li className="list-disc"><strong className="text-white">Analytics Providers:</strong> Services that help us understand how visitors use our website</li>
            <li className="list-disc"><strong className="text-white">Marketing Platforms:</strong> Tools that help us manage and send marketing communications</li>
            <li className="list-disc"><strong className="text-white">Customer Support Tools:</strong> Platforms that enable us to provide customer service</li>
          </ul>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            These companies are contractually obligated to protect your personal information and use it only for the purposes we specify.
          </p>
        </section>

        {/* Security and Retention of Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Security and Retention of Your Information</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Rights</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="space-y-3 text-gray-300 text-lg mb-4 ml-6">
            <li className="list-disc"><strong className="text-white">Right to Access/Know:</strong> You have the right to request access to the personal information we hold about you and to know how we use and share it.</li>
            <li className="list-disc"><strong className="text-white">Right to Delete:</strong> You may request that we delete your personal information, subject to certain exceptions.</li>
            <li className="list-disc"><strong className="text-white">Right to Data Portability:</strong> You may request a copy of your personal information in a structured, machine-readable format.</li>
            <li className="list-disc"><strong className="text-white">Right to Opt-Out:</strong> You have the right to opt-out of the sale or sharing of your personal information, and to opt-out of targeted advertising (where applicable).</li>
            <li className="list-disc"><strong className="text-white">Right to Correct/Appeal:</strong> You may request correction of inaccurate personal information and appeal decisions regarding your privacy rights.</li>
          </ul>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            To exercise any of these rights, please contact us using the contact information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
          </p>
        </section>

        {/* Complaints */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Complaints</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            If you have concerns about how we handle your personal information, you may file a complaint with us using the contact information below. You also have the right to lodge a complaint with your local data protection authority or supervisory authority if you believe we have violated applicable privacy laws.
          </p>
        </section>

        {/* International Users */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">International Users</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            If you are accessing our Services from outside the United States, please note that your information may be transferred to, stored, and processed in the United States and other countries where we operate. By using our Services, you consent to the transfer of your information to these countries, which may have different data protection laws than your country of residence.
          </p>
        </section>

        {/* Minors */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Minors</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            Our Services are not intended for individuals under the age of 18 (or the age of majority in your jurisdiction). We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from a minor without parental consent, we will take steps to delete such information.
          </p>
        </section>

        {/* Refund Processing */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Refund Processing</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            When processing refunds, we may use the payment information you provided at the time of purchase to process the refund to your original payment method. We retain transaction records in accordance with our legal and business obligations.
          </p>
        </section>

        {/* Do Not Sell Data */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Do Not Sell Data</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We do not sell your personal information to third parties. We are committed to maintaining your privacy and will not engage in the sale of personal information as defined under applicable privacy laws, including the California Consumer Privacy Act (CCPA) and other similar regulations.
          </p>
        </section>

        {/* Notice of Accessibility */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Notice of Accessibility</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards. If you encounter any accessibility barriers on our website, please contact us using the information provided below.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact</h2>
          <p className="text-gray-300 mb-4 text-lg leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="text-gray-300 text-lg space-y-2 mb-6">
            <p>
              <strong className="text-white">Email:</strong>{' '}
              <a href="mailto:support@amazegamelab.com" className="text-blue-400 hover:underline">
                support@amazegamelab.com
              </a>
            </p>
            <p>
              <strong className="text-white">Business Address:</strong><br />
              GameLab Ltd<br />
              Unit 2A, 13/F, Ginzaway Commercial Building<br />
              4000 Causeway Bay, Hong Kong, Hong Kong 999077
            </p>
            <p>
              <strong className="text-white">Warehouse Address:</strong><br />
              Unit 10, 8 Black Road<br />
              Brentwood, CM14 5AG, United Kingdom
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;

