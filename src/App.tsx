import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AdminAuthProvider } from './admin/AdminAuthContext';
import { ScrollToTop } from './components/common/ScrollToTop';

// Lazy loaded page components for optimal production performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const CustomCakes = lazy(() => import('./pages/CustomCakes').then(m => ({ default: m.CustomCakes })));
const BulkOrders = lazy(() => import('./pages/BulkOrders').then(m => ({ default: m.BulkOrders })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation').then(m => ({ default: m.OrderConfirmation })));
const OrderTracking = lazy(() => import('./pages/OrderTracking').then(m => ({ default: m.OrderTracking })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Admin modules
const AdminLayout = lazy(() => import('./admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminOverview = lazy(() => import('./admin/AdminOverview').then(m => ({ default: m.AdminOverview })));
const AdminOrders = lazy(() => import('./admin/AdminOrders').then(m => ({ default: m.AdminOrders })));
const AdminProducts = lazy(() => import('./admin/AdminProducts').then(m => ({ default: m.AdminProducts })));
const AdminCustomRequests = lazy(() => import('./admin/AdminCustomRequests').then(m => ({ default: m.AdminCustomRequests })));
const AdminBulkOrders = lazy(() => import('./admin/AdminBulkOrders').then(m => ({ default: m.AdminBulkOrders })));
const AdminScheduling = lazy(() => import('./admin/AdminScheduling').then(m => ({ default: m.AdminScheduling })));
const AdminSettings = lazy(() => import('./admin/AdminSettings').then(m => ({ default: m.AdminSettings })));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-3 border-[#E9AEBB] border-t-[#4B2923] animate-spin" />
  </div>
);

export function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <WishlistProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Storefront Routes */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:slug" element={<ProductDetails />} />
                    <Route path="/custom-cakes" element={<CustomCakes />} />
                    <Route path="/bulk-orders" element={<BulkOrders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                    <Route path="/track-order" element={<OrderTracking />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* Admin Portal Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="custom-requests" element={<AdminCustomRequests />} />
                    <Route path="bulk-orders" element={<AdminBulkOrders />} />
                    <Route path="scheduling" element={<AdminScheduling />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AdminAuthProvider>
        </WishlistProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
