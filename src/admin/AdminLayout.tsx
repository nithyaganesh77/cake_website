import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Cake,
  Calendar,
  Sparkles,
  Users,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { AdminLogin } from './AdminLogin';
import { dataProvider } from '@/services/dataProvider';

export const AdminLayout: React.FC = () => {
  const { isAdmin, adminEmail, logout, isLoading } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#E9AEBB] border-t-[#4B2923] animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Orders & Sales', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Product Catalog', path: '/admin/products', icon: Cake },
    { label: 'Custom Cake Requests', path: '/admin/custom-requests', icon: Sparkles },
    { label: 'Bulk & Events', path: '/admin/bulk-orders', icon: Users },
    { label: 'Slots & Delivery', path: '/admin/scheduling', icon: Calendar },
    { label: 'Studio Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2F1916] text-[#FFF7F0] border-r border-[#4B2923] shrink-0">
        {/* Brand header */}
        <div className="p-6 border-b border-[#4B2923]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4B2923] flex items-center justify-center text-[#E9AEBB]">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white block leading-tight">
                Cakes &amp; Dessert
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#D7BFAE]">
                Operations Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E9AEBB] text-[#2F1916] shadow-sm'
                      : 'text-[#D7BFAE] hover:bg-[#4B2923] hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer controls */}
        <div className="p-4 border-t border-[#4B2923] space-y-3">
          <div className="bg-[#4B2923]/60 rounded-xl p-3 text-[11px] text-[#D7BFAE]">
            <p className="font-semibold text-white truncate">{adminEmail}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-[#E9AEBB] mt-0.5">
              <Database className="w-3 h-3" />
              {dataProvider.isCloud() ? 'Cloud Synced' : 'Local IndexedDB'}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#4B2923] hover:bg-[#8A554D] rounded-xl text-xs font-semibold text-white transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              Store <ArrowUpRight className="w-3 h-3" />
            </Link>

            <button
              onClick={logout}
              className="p-2 bg-[#4B2923] hover:bg-red-900 rounded-xl text-[#D7BFAE] hover:text-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#D7BFAE]/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-[#4B2923] hover:bg-[#FFF7F0] rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h2 className="font-serif font-bold text-lg text-[#4B2923]">
              Admin Control Center
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7F0] text-[#4B2923] border border-[#D7BFAE]">
              <span className={`w-2 h-2 rounded-full ${dataProvider.isCloud() ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {dataProvider.isCloud() ? 'Supabase Live' : 'Local Sandbox'}
            </span>

            <Link
              to="/"
              className="text-xs text-[#8A554D] hover:text-[#4B2923] font-medium hidden sm:block"
            >
              View Website →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="relative w-64 bg-[#2F1916] text-[#FFF7F0] h-full flex flex-col justify-between p-4 z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#4B2923] mb-4">
                <span className="font-serif font-bold text-lg text-white">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold ${
                        isActive ? 'bg-[#E9AEBB] text-[#2F1916]' : 'text-[#D7BFAE]'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#4B2923]">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#4B2923] rounded-xl text-xs font-semibold"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

