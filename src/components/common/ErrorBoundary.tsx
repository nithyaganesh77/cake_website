import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home, PhoneCall } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FFF7F0]">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_10px_35px_rgba(75,41,35,0.08)] border border-[#D7BFAE]/40 text-center">
            <div className="w-16 h-16 bg-[#F7DCE2] text-[#4B2923] rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-[#4B2923] mb-3">
              Something went unexpected
            </h2>
            
            <p className="text-[#8A554D] text-sm leading-relaxed mb-6">
              Our sweet kitchen encountered a momentary hiccup. We apologize for the inconvenience. Your cart items and data remain safe.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 bg-[#FFF7F0] rounded-xl text-left text-xs font-mono text-[#8A554D] max-h-24 overflow-y-auto border border-[#D7BFAE]/30">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#4B2923] text-white py-3 px-6 rounded-full font-medium hover:bg-[#2F1916] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>

              <a
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#4B2923] text-[#4B2923] py-3 px-6 rounded-full font-medium hover:bg-[#F7DCE2] transition-colors"
              >
                <Home className="w-4 h-4" />
                Return to Bakery Home
              </a>

              <a
                href="https://wa.me/917841716999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs text-[#8A554D] hover:text-[#4B2923] mt-2 underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Need immediate help? Contact Bakery WhatsApp (+91 78417 16999)
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
