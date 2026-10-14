import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { ScrollToTop, useReveal } from "../hooks/useReveal";

export default function Layout() {
  useReveal();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <PWAInstallPrompt />
    </div>
  );
}
