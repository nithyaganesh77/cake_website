import React, { useState } from 'react';
import { Database, AlertTriangle, ChevronRight, X } from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';

export const DemoModeBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // If in cloud mode, don't show the local demo banner
  if (dataProvider.isCloud() || isDismissed) {
    return null;
  }

  return (
    <aside aria-label="Demo Mode Notice" className="bg-[#4B2923] text-[#FFF7F0] text-xs py-2 px-4 border-b border-[#E9AEBB]/30 transition-all sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9AEBB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9AEBB]"></span>
          </span>
          <p className="truncate">
            <strong className="font-semibold text-[#E9AEBB]">Local Demo Mode</strong> — Orders and customizations are stored securely in your browser's IndexedDB.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:inline-flex items-center gap-1 underline text-[#E9AEBB] hover:text-white"
          >
            Setup Cloud Sync <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner"
            className="text-[#D7BFAE] hover:text-white p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#8A554D] text-[#D7BFAE] flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="text-[11px] leading-relaxed">
            To switch to live Supabase cloud database, provide <code className="bg-[#2F1916] px-1.5 py-0.5 rounded text-[#E9AEBB]">VITE_SUPABASE_URL</code> and <code className="bg-[#2F1916] px-1.5 py-0.5 rounded text-[#E9AEBB]">VITE_SUPABASE_ANON_KEY</code> in your <code className="bg-[#2F1916] px-1.5 py-0.5 rounded text-[#E9AEBB]">.env</code> file.
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-[11px] bg-[#8A554D] text-white px-3 py-1 rounded-full hover:bg-[#A36960]"
          >
            Understood
          </button>
        </div>
      )}
    </aside>
  );
};

