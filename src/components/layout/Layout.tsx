import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { DemoModeBanner } from '../common/DemoModeBanner';
import { FloatingQuickActions } from '../common/FloatingQuickActions';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7F0] text-[#4B2923]">
      <DemoModeBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
      <FloatingQuickActions />
      <Footer />
    </div>
  );
};
