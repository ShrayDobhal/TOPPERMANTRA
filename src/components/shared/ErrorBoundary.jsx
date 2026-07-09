import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Attempt to recover by routing back to dashboard or reloading
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-center font-sans">
          <div className="bg-white p-10 sm:p-12 rounded-[40px] border border-[#E9ECEF] shadow-xl max-w-xl w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl flex items-center justify-center text-white shadow-xl mb-8 animate-pulse">
                <ShieldAlert size={36} className="text-[#FF5722]" />
              </div>
              
              <h2 className="text-3xl font-heading font-black text-[#0F172A] mb-4 tracking-tight leading-tight">
                System Collision <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Something Went Wrong</span>
              </h2>
              
              <p className="text-[#64748B] mb-8 font-medium leading-relaxed max-w-md">
                We encountered an unexpected error on this dashboard view. Our custodians have been notified. Let's get you back on track.
              </p>

              {this.state.error && (
                <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-left overflow-x-auto max-h-32 custom-scrollbar">
                  <p className="text-xs font-mono text-slate-500 break-all select-all leading-normal">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <button
                  onClick={this.handleReset}
                  className="w-full sm:flex-1 py-4 px-6 bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
                >
                  <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  Reset Dashboard
                </button>
                <a
                  href="/"
                  className="w-full sm:flex-1 py-4 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] font-extrabold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
