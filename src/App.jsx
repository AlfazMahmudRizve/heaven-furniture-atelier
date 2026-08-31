import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';

// Public Atelier Components
import Header from './components/Header';
import Hero from './components/Hero';
import ArccaManifesto from './components/ArccaManifesto';
import ProductShowcase from './components/ProductShowcase';
import ArccaProjectsGrid from './components/ArccaProjectsGrid';
import BespokeStudio from './components/BespokeStudio';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

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

function PublicWebsite() {
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
      <Header />
      <main>
        <Hero />
        <ArccaManifesto />
        <ProductShowcase />
        <ArccaProjectsGrid />
        <BespokeStudio />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<PublicWebsite />} />

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
  );
}
