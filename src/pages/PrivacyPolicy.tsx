export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-extra-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Create an account and register for our services</li>
              <li>Make a payment for lifetime access</li>
              <li>Save gym listings as favorites</li>
              <li>Contact gym owners through our platform</li>
              <li>Communicate with us for support</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Types of Information</h2>
            <p className="text-gray-700 mb-4">
              The information we collect includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number</li>
              <li><strong>Payment Information:</strong> Payment transaction details (processed securely by Razorpay)</li>
              <li><strong>Usage Information:</strong> Pages viewed, gyms searched, filters used</li>
              <li><strong>Device Information:</strong> Browser type, IP address, device type</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Provide access to our gym discovery platform</li>
              <li>Process your one-time payment of ₹10</li>
              <li>Save your favorite gyms and preferences</li>
              <li>Send important service updates and notifications</li>
              <li>Improve our platform and user experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Payment Information Security</h2>
            <p className="text-gray-700 mb-4">
              All payment transactions are processed securely through Razorpay, a PCI-DSS compliant payment gateway. 
              We do not store your complete credit/debit card information on our servers. Payment details are encrypted 
              and handled entirely by Razorpay's secure infrastructure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Payment Processors:</strong> Razorpay for processing payments</li>
              <li><strong>Service Providers:</strong> Firebase for authentication and data storage</li>
              <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Storage and Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Secure HTTPS encryption for all data transmission</li>
              <li>Firebase Authentication for secure user login</li>
              <li>Firestore database with security rules</li>
              <li>Regular security audits and updates</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of promotional communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and maintain 
              your session. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our service is not intended for users under the age of 18. We do not knowingly collect information from 
              children under 18. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting 
              the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> privacy@gymmer.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong> https://gymmer-pied.vercel.app
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                By using Gymmer, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

