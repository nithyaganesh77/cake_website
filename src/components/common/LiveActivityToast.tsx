import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cake, X, MapPin } from 'lucide-react';

interface ActivityItem {
  id: string;
  name: string;
  location: string;
  action: string;
  timeAgo: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    name: 'Aishwarya M.',
    location: 'RS Puram, Coimbatore',
    action: 'reserved a 1kg Belgian Dark Truffle Cake',
    timeAgo: '4 mins ago',
  },
  {
    id: '2',
    name: 'Chef Ananya',
    location: 'Bakery Studio, Podanur',
    action: 'just pulled a fresh batch of Fudgy Brownies from the oven',
    timeAgo: '8 mins ago',
  },
  {
    id: '3',
    name: 'Gautam & Sneha',
    location: 'Saibaba Colony',
    action: 'pre-ordered a Velvet Rose Anniversary Cake',
    timeAgo: '14 mins ago',
  },
  {
    id: '4',
    name: 'Kavitha R.',
    location: 'Saravanampatti',
    action: 'booked an Eggless Korean Bento Cake (4")',
    timeAgo: '19 mins ago',
  },
  {
    id: '5',
    name: 'Harish Kumar',
    location: 'Ramanathapuram',
    action: 'customized a 3-tier milestone birthday order',
    timeAgo: '27 mins ago',
  },
];

export const LiveActivityToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 6 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    // Cycle through activities every 18 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setIsVisible(true);
      }, 1000);
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = ACTIVITIES[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pointer-events-auto bg-[#2F1916]/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl border border-[#E9AEBB]/30 shadow-2xl flex items-start gap-3.5"
          >
            {/* Visual Icon with pulsing ring */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-9 h-9 rounded-xl bg-[#4B2923] border border-[#E9AEBB]/40 flex items-center justify-center text-[#E9AEBB]">
                <Cake className="w-4 h-4" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9AEBB] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E9AEBB]"></span>
              </span>
            </div>

            {/* Notification Text */}
            <div className="flex-1 pr-2">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#E9AEBB]">
                <Sparkles className="w-3 h-3" />
                <span>Live Studio Update</span>
                <span className="text-[#D7BFAE]/60">•</span>
                <span className="text-[#D7BFAE]/80">{current.timeAgo}</span>
              </div>
              
              <p className="text-xs text-[#FFF7F0] mt-0.5 leading-snug">
                <span className="font-bold text-white">{current.name}</span>{' '}
                <span className="text-[#D7BFAE]">{current.action}</span>
              </p>

              <div className="flex items-center gap-1 mt-1 text-[10px] text-[#D7BFAE]/80">
                <MapPin className="w-2.5 h-2.5 text-[#E9AEBB]" />
                <span>{current.location}</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="text-[#D7BFAE]/60 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-md"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
