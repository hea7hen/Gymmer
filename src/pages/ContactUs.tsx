import { Mail, Clock } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-extra-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions? We're here to help! Reach out to us and we'll respond as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="bg-primary p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Email Us</h3>
                  <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>
              <a 
                href="mailto:abinair314@gmail.com" 
                className="text-primary hover:text-primary-dark font-semibold text-lg"
              >
                abinair314@gmail.com
              </a>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-gray-700 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Response Time</h3>
                  <p className="text-sm text-gray-600">Average response time</p>
                </div>
              </div>
              <p className="text-gray-700 font-semibold text-lg">
                Within 24 hours
              </p>
            </div>
          </div>

          {/* What We Can Help With */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Can Help You With</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="text-primary mr-3 text-xl">💳</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Payment Issues</h4>
                  <p className="text-sm text-gray-600">Problems with payment or access after payment</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="text-primary mr-3 text-xl">🔐</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Account Help</h4>
                  <p className="text-sm text-gray-600">Login issues, password reset, account access</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="text-primary mr-3 text-xl">💰</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Refund Requests</h4>
                  <p className="text-sm text-gray-600">Duplicate payments or technical errors</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="text-primary mr-3 text-xl">🏋️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Gym Information</h4>
                  <p className="text-sm text-gray-600">Questions about gym listings or data</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="text-primary mr-3 text-xl">🐛</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Technical Support</h4>
                  <p className="text-sm text-gray-600">Website issues, bugs, or errors</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="text-primary mr-3 text-xl">💡</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">General Inquiries</h4>
                  <p className="text-sm text-gray-600">Any other questions or feedback</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out the details below and send directly to our email:
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Describe your issue or question in detail..."
                ></textarea>
              </div>

              <a
                href="mailto:abinair314@gmail.com"
                className="btn-primary w-full text-center inline-block"
              >
                Send Email
              </a>
              
              <p className="text-sm text-gray-500 text-center">
                Clicking above will open your email client. You can also copy our email: 
                <strong className="text-primary"> abinair314@gmail.com</strong>
              </p>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Before You Contact</h2>
            <p className="text-gray-600 mb-4">You might find answers in our policy pages:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="/privacy-policy" 
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Privacy Policy</h4>
                <p className="text-sm text-gray-600">How we handle your data</p>
              </a>
              <a 
                href="/terms-and-conditions" 
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Terms & Conditions</h4>
                <p className="text-sm text-gray-600">Service usage terms</p>
              </a>
              <a 
                href="/refund-policy" 
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Refund Policy</h4>
                <p className="text-sm text-gray-600">Cancellation & refunds</p>
              </a>
            </div>
          </div>

          {/* Business Hours Note */}
          <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> We typically respond to all emails within 24 hours during business days. 
              For urgent payment or access issues, please mention "URGENT" in your email subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

