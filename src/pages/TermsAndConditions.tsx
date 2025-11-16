export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-extra-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Gymmer ("the Service"), you accept and agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              Gymmer is a gym discovery platform that provides:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Access to a curated list of 70+ independent gyms in Bangalore</li>
              <li>Comparison of gym prices, amenities, and features</li>
              <li>Filtering and search capabilities</li>
              <li>Ability to save favorite gyms</li>
              <li>Contact information for gym owners</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. One-Time Payment</h2>
            <p className="text-gray-700 mb-4">
              Access to the Service requires a one-time payment of ₹10 (Indian Rupees Ten only). This payment grants:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Lifetime access to the platform</li>
              <li>No recurring charges or subscriptions</li>
              <li>Access to all current and future gym listings</li>
              <li>All platform features without additional fees</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Account</h2>
            <p className="text-gray-700 mb-4">
              To use the Service, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Information Accuracy</h2>
            <p className="text-gray-700 mb-4">
              While we strive to provide accurate and up-to-date gym information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Gym prices, amenities, and hours may change without notice</li>
              <li>We recommend contacting gyms directly to confirm details</li>
              <li>We are not responsible for discrepancies in gym information</li>
              <li>Users should verify information before making decisions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Scrape, copy, or redistribute gym data without permission</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Impersonate others or provide false information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our Service integrates with third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Razorpay:</strong> Payment processing (subject to Razorpay's terms)</li>
              <li><strong>Firebase:</strong> Authentication and data storage (subject to Google's terms)</li>
              <li><strong>Google Maps:</strong> Location services (if applicable)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You are responsible for complying with third-party terms of service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Gymmer is provided "as is" without warranties of any kind</li>
              <li>We are not liable for any indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount you paid (₹10)</li>
              <li>We are not responsible for gym quality, safety, or services</li>
              <li>We do not endorse any specific gym or facility</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on Gymmer, including but not limited to text, graphics, logos, and software, is the property 
              of Gymmer or its licensors and is protected by copyright and intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Suspend or terminate accounts that violate these terms</li>
              <li>Modify or discontinue the Service at any time</li>
              <li>Remove content that violates our policies</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Users may delete their accounts at any time through account settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall 
              be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these Terms and Conditions at any time. Continued use of the Service after changes constitutes 
              acceptance of the new terms. We will notify users of significant changes via email or platform notification.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms and Conditions, contact us at:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> support@gymmer.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong> https://gymmer-pied.vercel.app
            </p>

            <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> By completing the ₹10 payment and accessing Gymmer, you acknowledge that 
                you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

