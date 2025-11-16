export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-extra-bold text-gray-900 mb-4">Shipping and Delivery Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none">
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Digital Service - No Physical Shipping</h2>
              <p className="text-gray-700 mb-0">
                Gymmer is a <strong>100% digital platform</strong>. We do not ship any physical products. 
                All services are delivered electronically and instantly upon successful payment.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Service Delivery</h2>
            <p className="text-gray-700 mb-4">
              Upon successful payment of ₹10, you will receive:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Instant Access:</strong> Immediate access to the Gymmer platform</li>
              <li><strong>Lifetime Validity:</strong> Your access never expires</li>
              <li><strong>No Downloads:</strong> Access directly through your web browser</li>
              <li><strong>No Physical Delivery:</strong> No shipping, packaging, or delivery charges</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How Service is Delivered</h2>
            <p className="text-gray-700 mb-4">
              The delivery process is completely digital:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
              <li>You complete payment through Razorpay (secure payment gateway)</li>
              <li>Payment is processed instantly (within seconds)</li>
              <li>Your account is automatically activated</li>
              <li>You are redirected to the gym search page</li>
              <li>You can immediately start browsing 70+ gyms</li>
            </ol>
            <p className="text-gray-700 mb-4">
              <strong>Total Time:</strong> Less than 30 seconds from payment to access
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. What You Get Access To</h2>
            <p className="text-gray-700 mb-4">
              Your ₹10 payment gives you instant access to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Complete database of 70+ independent gyms in Bangalore</li>
              <li>Detailed gym information (prices, amenities, location, contact)</li>
              <li>Advanced filtering (by area, price, gym type, amenities)</li>
              <li>Ability to save favorite gyms</li>
              <li>Direct contact information for gym owners</li>
              <li>Compare prices and features across gyms</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Delivery Timeline</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="pb-3 text-gray-900 font-semibold">Stage</th>
                    <th className="pb-3 text-gray-900 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-3">Payment Processing</td>
                    <td className="py-3">Instant (3-5 seconds)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">Account Activation</td>
                    <td className="py-3">Automatic & Instant</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">Access Granted</td>
                    <td className="py-3">Immediate</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Total Delivery Time</td>
                    <td className="py-3 font-semibold text-primary">Less than 30 seconds</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Access Method</h2>
            <p className="text-gray-700 mb-4">
              You can access Gymmer from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Any Web Browser:</strong> Chrome, Firefox, Safari, Edge</li>
              <li><strong>Any Device:</strong> Desktop, laptop, tablet, mobile phone</li>
              <li><strong>Any Location:</strong> Access from anywhere with internet</li>
              <li><strong>Any Time:</strong> 24/7 availability</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Simply login with your registered email and password at: <strong>https://gymmer-pied.vercel.app</strong>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. No Shipping Charges</h2>
            <p className="text-gray-700 mb-4">
              Since this is a digital service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>✅ No shipping fees</li>
              <li>✅ No packaging charges</li>
              <li>✅ No delivery charges</li>
              <li>✅ No handling fees</li>
              <li>✅ No customs or import duties</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>You pay exactly ₹10 - nothing more!</strong>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Delivery Confirmation</h2>
            <p className="text-gray-700 mb-4">
              You will know your service is delivered when:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>You see "Payment Successful" message</li>
              <li>You are redirected to the gym search page (/search)</li>
              <li>You can browse and filter gym listings</li>
              <li>Your account shows "Active" status</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Delivery Issues</h2>
            <p className="text-gray-700 mb-4">
              In rare cases, if you don't get instant access:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Payment succeeded but no access:</strong> Contact us immediately at abinair314@gmail.com</li>
              <li><strong>Payment failed but amount debited:</strong> Refund processed automatically within 5-7 days</li>
              <li><strong>Account not activated:</strong> Try logging out and logging back in</li>
              <li><strong>Technical error:</strong> Clear browser cache or try a different browser</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We will resolve any delivery issues within <strong>24 hours</strong>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. International Access</h2>
            <p className="text-gray-700 mb-4">
              Being a digital service, Gymmer is accessible globally:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>✅ Works from any country</li>
              <li>✅ No geo-restrictions</li>
              <li>✅ Same instant delivery worldwide</li>
              <li>✅ No international shipping complications</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <em>Note: While the service is accessible globally, our gym listings are specific to Bangalore, India.</em>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Return and Exchange</h2>
            <p className="text-gray-700 mb-4">
              Since this is a digital service with instant delivery:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Physical returns are not applicable</li>
              <li>Exchanges are not applicable</li>
              <li>Refunds follow our Refund Policy (see Refund Policy page)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              Our service is designed for maximum uptime:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>24/7 Availability:</strong> Access anytime, day or night</li>
              <li><strong>Scheduled Maintenance:</strong> Rare, typically less than 1 hour</li>
              <li><strong>Uptime Target:</strong> 99.9% availability</li>
              <li><strong>Mobile Optimized:</strong> Works seamlessly on all devices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Support and Assistance</h2>
            <p className="text-gray-700 mb-4">
              If you need help accessing the service after payment:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> abinair314@gmail.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Response Time:</strong> Within 24 hours
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong> https://gymmer-pied.vercel.app
            </p>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700 mb-2">
                <strong>✅ Summary:</strong>
              </p>
              <p className="text-sm text-gray-700">
                Gymmer is a 100% digital service with <strong>instant delivery</strong>. No physical products are shipped. 
                You get immediate lifetime access upon payment. No shipping charges, no waiting time, no delivery hassles!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

