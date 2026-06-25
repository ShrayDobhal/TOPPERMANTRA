import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { NoiseOverlay, AnimatedBackgroundGradient, GridOverlay } from "../components/ui/Backgrounds";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-dark-text font-sans relative selection:bg-[#FF5722]/20 selection:text-[#FF5722] flex flex-col">
      {/* Global Background Layers */}
      <AnimatedBackgroundGradient />
      <GridOverlay />
      <NoiseOverlay />
      
      {/* Content wrapper */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
