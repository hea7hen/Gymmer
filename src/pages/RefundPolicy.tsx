export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-extra-bold text-gray-900 mb-4">Cancellation and Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. One-Time Payment Policy</h2>
            <p className="text-gray-700 mb-4">
              Gymmer operates on a one-time payment model:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Single payment of ₹10 for lifetime access</li>
              <li>No recurring charges or subscriptions</li>
              <li>No auto-renewal or hidden fees</li>
              <li>Immediate access upon successful payment</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Refund Eligibility</h2>
            <p className="text-gray-700 mb-4">
              Due to the instant digital nature of our service and the nominal one-time fee of ₹10, we have a 
              <strong> no-refund policy</strong> under normal circumstances. However, refunds may be considered in the following cases:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Duplicate Payment:</strong> If you were charged multiple times for the same transaction</li>
              <li><strong>Technical Error:</strong> If payment was processed but access was not granted due to technical issues</li>
              <li><strong>Unauthorized Transaction:</strong> If the payment was made without your authorization</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Refund Request Process</h2>
            <p className="text-gray-700 mb-4">
              To request a refund in eligible cases:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
              <li>Send an email to <strong>refunds@gymmer.com</strong> within <strong>7 days</strong> of payment</li>
              <li>Include the following information:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Your registered email address</li>
                  <li>Razorpay payment ID or transaction reference</li>
                  <li>Reason for refund request</li>
                  <li>Supporting evidence (if applicable)</li>
                </ul>
              </li>
              <li>Our team will review your request within 3-5 business days</li>
              <li>If approved, the refund will be processed to your original payment method</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Refund Timeline</h2>
            <p className="text-gray-700 mb-4">
              Once a refund is approved:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
              <li><strong>UPI:</strong> 1-3 business days</li>
              <li><strong>Net Banking:</strong> 5-7 business days</li>
              <li><strong>Wallets:</strong> 1-3 business days</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Note: Actual refund time may vary depending on your bank or payment provider.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Non-Refundable Situations</h2>
            <p className="text-gray-700 mb-4">
              Refunds will <strong>NOT</strong> be provided in the following cases:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Change of mind after accessing the platform</li>
              <li>Dissatisfaction with gym listings or information</li>
              <li>Account created but not used</li>
              <li>User error in selecting payment option</li>
              <li>Violation of Terms and Conditions leading to account suspension</li>
              <li>Requests made after 7 days of payment</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cancellation Policy</h2>
            <p className="text-gray-700 mb-4">
              Since Gymmer operates on a lifetime access model with a one-time payment:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>There are no subscriptions to cancel</li>
              <li>Your access remains active permanently after payment</li>
              <li>You may delete your account at any time, but no refund will be provided</li>
              <li>No future charges will be made to your payment method</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Account Deletion</h2>
            <p className="text-gray-700 mb-4">
              Users may request account deletion at any time:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Go to Account Settings → Delete Account</li>
              <li>Or email <strong>support@gymmer.com</strong> with your request</li>
              <li>Your data will be permanently deleted within 30 days</li>
              <li>Account deletion does not entitle you to a refund</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Payment Disputes</h2>
            <p className="text-gray-700 mb-4">
              If you have a payment dispute:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Contact us first at <strong>support@gymmer.com</strong></li>
              <li>We will work with you to resolve the issue promptly</li>
              <li>For payment-related queries, we may coordinate with Razorpay</li>
              <li>Most disputes are resolved within 7-10 business days</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Failed Transactions</h2>
            <p className="text-gray-700 mb-4">
              If your payment fails but amount was debited:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Amount will be automatically refunded by your bank within 5-7 days</li>
              <li>If not refunded, contact us with transaction details</li>
              <li>We will coordinate with Razorpay to resolve the issue</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Service Modifications</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Update gym listings and platform features</li>
              <li>Modify the Service without prior notice</li>
              <li>Temporarily suspend the Service for maintenance</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Such modifications do not entitle users to refunds as lifetime access to the platform remains valid.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact for Refunds</h2>
            <p className="text-gray-700 mb-4">
              For refund requests or payment issues, contact:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> refunds@gymmer.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Support:</strong> support@gymmer.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong> https://gymmer-pied.vercel.app
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Response Time:</strong> Within 24-48 hours
            </p>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Given the nominal fee of ₹10 and instant digital access, we encourage users 
                to review the platform features and gym listings before making payment. All refund requests will be 
                evaluated on a case-by-case basis.
              </p>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">
                <strong>Customer Satisfaction:</strong> While our refund policy is strict due to the nature of our 
                service, we are committed to resolving any genuine issues. Please reach out to us if you face any 
                problems, and we'll do our best to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

