import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Public Atelier Components
import Header from './components/Header';
import Hero from './components/Hero';
import LivingComposition from './components/LivingComposition';
import ArccaManifesto from './components/ArccaManifesto';
import WorkshopReels from './components/WorkshopReels';
import ProductShowcase from './components/ProductShowcase';
import ArccaProjectsGrid from './components/ArccaProjectsGrid';
import BespokeStudio from './components/BespokeStudio';
import Testimonials from './components/Testimonials';
import Showroom from './components/Showroom';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileActionBar from './components/MobileActionBar';
import QuotationDrawer from './components/QuotationDrawer';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

// Dedicated Suite Category Page
import CategoryPage from './pages/CategoryPage';
import DesignDemoPage from './pages/DesignDemoPage';

// Admin CMS & Store Manager Portal
import { AdminAuthProvider } from './admin/AdminAuthContext';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import DashboardOverview from './admin/DashboardOverview';
import ProductManager from './admin/ProductManager';
import OrderManager from './admin/OrderManager';
import InquiryManager from './admin/InquiryManager';
import CustomerManager from './admin/CustomerManager';
import StaffManager from './admin/StaffManager';

// Turnkey Commercial Platform Components
import PlatformAcquisition from './components/PlatformAcquisition';
import AcquisitionModal from './components/AcquisitionModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicWebsite() {
  const [isAcquisitionOpen, setIsAcquisitionOpen] = React.useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-espresso text-linen font-body">
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#C6A75E] focus:text-[#241A14] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header onOpenAcquisition={() => setIsAcquisitionOpen(true)} />
      <main id="main-content">
        <Hero />
        <LivingComposition />
        <ArccaManifesto />
        <WorkshopReels />
        <ProductShowcase />
        <ArccaProjectsGrid />
        <BespokeStudio />
        <Testimonials />
        <Showroom />
        <PlatformAcquisition onOpenAcquisition={() => setIsAcquisitionOpen(true)} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
      <QuotationDrawer />
      <AcquisitionModal 
        isOpen={isAcquisitionOpen} 
        onClose={() => setIsAcquisitionOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<PublicWebsite />} />

            {/* Dedicated Category Suite Portals */}
            <Route path="/collections/:slug" element={<CategoryPage />} />

            {/* Interactive Material & Timber Innovation Demo */}
            <Route path="/demo" element={<DesignDemoPage />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Store Manager CMS Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="orders" element={<OrderManager />} />
              <Route path="inquiries" element={<InquiryManager />} />
              <Route path="customers" element={<CustomerManager />} />
              <Route path="staff" element={<StaffManager />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </CartProvider>
  );
}
