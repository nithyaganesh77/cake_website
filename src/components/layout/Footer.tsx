import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2F1916] text-[#FFF7F0] pt-16 pb-10 border-t border-[#4B2923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4B2923]/80">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4B2923] flex items-center justify-center text-[#E9AEBB]">
                <Cake className="w-6 h-6" />
              </div>
              <span className="font-serif font-extrabold text-2xl text-white tracking-tight">
                Cakes &amp; Dessert
              </span>
            </div>
            
            <p className="text-sm text-[#D7BFAE] leading-relaxed">
              Made with Love. Baked for Beautiful Moments. We handcraft fudgy brownies, artisanal celebration cakes, and bespoke desserts in our Coimbatore studio.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/cakesanddessert.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#4B2923] flex items-center justify-center text-[#E9AEBB] hover:bg-[#E9AEBB] hover:text-[#2F1916] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://wa.me/918637478423"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4B2923] px-3.5 py-1.5 rounded-full text-xs text-[#FFF7F0] hover:bg-[#8A554D] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                WhatsApp Baker (+91 863 747 8423)
              </a>
              <a
                href="https://www.swiggy.com/direct/brand/708273?source=swiggy-direct&subSource=whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FC8019] px-3.5 py-1.5 rounded-full text-xs text-white hover:bg-[#e26e10] transition-colors font-bold"
              >
                <span>⚡ Swiggy Same-Day</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg text-white mb-4">
              Boutique Menu
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D7BFAE]">
              <li>
                <Link to="/shop?category=cat-courier-slabs" className="hover:text-[#E9AEBB] transition-colors text-amber-200 font-medium">
                  📦 Courier Brownie Slabs (Pan-India)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cat-brownies" className="hover:text-[#E9AEBB] transition-colors">
                  Signature Fudgy Brownies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cat-celebration-cakes" className="hover:text-[#E9AEBB] transition-colors">
                  Artisanal Celebration Cakes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cat-bento-cakes" className="hover:text-[#E9AEBB] transition-colors">
                  Korean Bento &amp; Petite Cakes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cat-dessert-jars" className="hover:text-[#E9AEBB] transition-colors">
                  Dessert Tins &amp; Jars
                </Link>
              </li>
              <li>
                <Link to="/custom-cakes" className="hover:text-[#E9AEBB] transition-colors">
                  Custom Cake Builder
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="hover:text-[#E9AEBB] transition-colors">
                  Corporate &amp; Event Gifting
                </Link>
              </li>
            </ul>
          </div>

          {/* Service & Delivery */}
          <div>
            <h4 className="font-serif font-semibold text-lg text-white mb-4">
              Ordering &amp; Delivery
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D7BFAE]">
              <li>
                <Link to="/track-order" className="hover:text-[#E9AEBB] transition-colors">
                  Track Order Status
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E9AEBB] transition-colors">
                  Our Baking Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E9AEBB] transition-colors">
                  Contact Studio
                </Link>
              </li>
              <li className="pt-2 text-xs text-[#D7BFAE]/80">
                <span className="font-semibold text-white block mb-1">Serviceable Areas:</span>
                Coimbatore Central, Podanur, Madukkarai, RS Puram, Gandhipuram, Peelamedu, Singanallur, Saravanampatti.
              </li>
            </ul>
          </div>

          {/* Contact Studio */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-lg text-white mb-4">
              Coimbatore Kitchen
            </h4>
            
            <div className="flex items-start gap-3 text-sm text-[#D7BFAE]">
              <MapPin className="w-5 h-5 text-[#E9AEBB] shrink-0 mt-0.5" />
              <span>Podanur Main Road, Coimbatore, Tamil Nadu 641023 (Studio Pickup by Appointment)</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#D7BFAE]">
              <Phone className="w-4 h-4 text-[#E9AEBB] shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+918637478423" className="hover:text-white font-medium">+91 863 747 8423</a>
                <a href="tel:+917841716999" className="hover:text-white text-xs text-[#D7BFAE]/80">+91 78417 16999</a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#D7BFAE]">
              <Mail className="w-4 h-4 text-[#E9AEBB] shrink-0" />
              <a href="mailto:cakesanddessert1@gmail.com" className="hover:text-white truncate">
                cakesanddessert1@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#D7BFAE]">
              <Clock className="w-4 h-4 text-[#E9AEBB] shrink-0" />
              <span>Daily Pre-Order Drops: 10 AM – 9 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7BFAE]/70">
          <p>© {new Date().getFullYear()} Cakes &amp; Dessert. Handcrafted with <Heart className="w-3.5 h-3.5 inline text-[#E9AEBB] fill-[#E9AEBB]" /> in Coimbatore. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#FFF7F0]">Story</Link>
            <Link to="/contact" className="hover:text-[#FFF7F0]">Contact</Link>
            <Link to="/track-order" className="hover:text-[#FFF7F0]">Tracking</Link>
            <Link to="/admin" className="text-[#E9AEBB] hover:underline">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
