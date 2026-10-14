import { Link, useLocation } from "react-router-dom";
import { Phone, Package, Menu, Home } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { telLink, whatsappLink } from "../data/business";
import { WhatsAppIcon } from "./Icons";
import { cn } from "../utils/cn";

export default function MobileBottomBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { isAr } = useLang();
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isProducts = pathname === "/products";

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto items-center px-1">
        {/* Home */}
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center justify-center py-1 text-center transition-colors",
            isHome ? "text-amber-600 font-bold" : "text-slate-600 hover:text-navy-900"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">{isAr ? "الرئيسية" : "Home"}</span>
        </Link>

        {/* Products */}
        <Link
          to="/products"
          className={cn(
            "flex flex-col items-center justify-center py-1 text-center transition-colors",
            isProducts ? "text-amber-600 font-bold" : "text-slate-600 hover:text-navy-900"
          )}
        >
          <Package className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">{isAr ? "المنتجات" : "Products"}</span>
        </Link>

        {/* Center Prominent WhatsApp Button */}
        <div className="flex justify-center -mt-5">
          <a
            href={whatsappLink(isAr ? "السلام عليكم، أرغب في الاستفسار عن منتجاتكم." : "Hello, I would like to inquire about your products.")}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/40 ring-4 ring-white active:scale-95 transition-transform"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        </div>

        {/* Call Direct */}
        <a
          href={telLink}
          className="flex flex-col items-center justify-center py-1 text-center text-slate-600 hover:text-navy-900 transition-colors"
        >
          <Phone className="h-5 w-5 text-navy-900" />
          <span className="text-[10px] mt-1 font-medium">{isAr ? "اتصال" : "Call"}</span>
        </a>

        {/* Open Menu / More */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 text-center text-slate-600 hover:text-navy-900 transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">{isAr ? "المزيد" : "Menu"}</span>
        </button>
      </div>
    </div>
  );
}
