import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Search from './pages/Search';
import GymDetail from './pages/GymDetail';
import Saved from './pages/Saved';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/admin/Dashboard';
import ManageGyms from './pages/admin/ManageGyms';
import EditGym from './pages/admin/EditGym';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/search" element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                } />
                <Route path="/gym/:slug" element={
                  <ProtectedRoute>
                    <GymDetail />
                  </ProtectedRoute>
                } />
                <Route path="/saved" element={<Saved />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/gyms" element={<ManageGyms />} />
                <Route path="/admin/gyms/:gymId/edit" element={<EditGym />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
