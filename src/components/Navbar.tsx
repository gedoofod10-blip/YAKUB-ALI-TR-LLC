import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Languages, Clock, MapPin } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { useOpenStatus } from "../hooks/useOpenStatus";
import { BUSINESS, telLink, whatsappLink } from "../data/business";
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from "./Icons";
import Logo from "./Logo";
import MobileBottomBar from "./MobileBottomBar";
import { cn } from "../utils/cn";

export default function Navbar() {
  const { t, toggle, isAr } = useLang();
  const status = useOpenStatus(isAr);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/products", label: t.nav.products },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/reviews", label: t.nav.reviews },
    { to: "/contact", label: t.nav.contact },
  ];

  const statusLabel = status.open
    ? `${t.common.openNow} · ${t.common.closesAt} ${status.nextLabel}`
    : `${t.common.closedNow} · ${status.nextType === "reopens" ? t.common.reopensAt : t.common.opensAt} ${status.nextLabel}`;

  return (
    <>
      {/* Top bar (Desktop only) */}
      <div className="hidden bg-navy-950 text-xs text-slate-300 lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", status.open ? "animate-ping bg-emerald-400" : "bg-rose-400")} />
                <span className={cn("relative inline-flex h-2 w-2 rounded-full", status.open ? "bg-emerald-400" : "bg-rose-400")} />
              </span>
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              {statusLabel}
            </span>
            <a href={BUSINESS.mapsSearch} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              {isAr ? "حي حوشي، الشارقة" : "Hay Hoshi, Sharjah"}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={telLink} className="flex items-center gap-2 hover:text-white" dir="ltr">
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              {BUSINESS.phoneDisplay}
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white"><FacebookIcon className="h-4 w-4" /></a>
            <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white"><InstagramIcon className="h-4 w-4" /></a>
            <a href={BUSINESS.social.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-white"><WhatsAppIcon className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 shadow-md shadow-navy-900/5 backdrop-blur-xl" : "bg-white"
        )}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6">
          <Link to="/" aria-label="Home" className="flex items-center min-w-0 pr-1">
            <Logo size="md" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive ? "text-navy-900" : "text-slate-600 hover:text-navy-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-amber-500" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggle}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-slate-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-bold text-navy-800 transition hover:border-amber-400 hover:bg-amber-50 active:scale-95"
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className={isAr ? "font-inter" : "font-cairo"}>{isAr ? "EN" : "عربي"}</span>
            </button>

            {/* Desktop WhatsApp Quote */}
            <a
              href={whatsappLink(isAr ? "السلام عليكم، أرغب في الاستفسار عن منتجاتكم." : "Hello, I would like to inquire about your products.")}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-600 md:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.nav.quote}
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center rounded-xl p-2 text-navy-900 hover:bg-slate-100 active:scale-95 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          className={cn("absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col justify-between overflow-y-auto",
            isAr ? "right-0" : "left-0",
            open ? "translate-x-0" : isAr ? "translate-x-full" : "-translate-x-full"
          )}
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Logo size="sm" />
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-slate-100 active:scale-95"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-slate-700" />
              </button>
            </div>

            <div className="px-4 py-3">
              <div className={cn("flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold", status.open ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
                <Clock className="h-4 w-4" />
                {statusLabel}
              </div>
            </div>

            <nav className="flex flex-col px-3 py-2 space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-3 text-base font-bold transition flex items-center justify-between min-h-[48px]",
                      isActive
                        ? "bg-navy-900 text-white"
                        : "text-slate-700 hover:bg-slate-100 active:bg-slate-200"
                    )
                  }
                >
                  <span>{l.label}</span>
                  <span className={cn("text-xs opacity-60", isAr ? "font-cairo" : "font-inter")}>›</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={telLink}
                className="flex items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 text-sm font-bold text-white shadow-md active:scale-95"
              >
                <Phone className="h-4 w-4 text-amber-400" /> {t.nav.call}
              </a>
              <a
                href={BUSINESS.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/30 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" /> {t.common.whatsapp}
              </a>
            </div>

            <div className="flex items-center justify-around pt-2 text-slate-500">
              <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full hover:bg-slate-200"><FacebookIcon className="h-5 w-5 text-blue-600" /></a>
              <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full hover:bg-slate-200"><InstagramIcon className="h-5 w-5 text-pink-600" /></a>
              <a href={BUSINESS.mapsDirections} target="_blank" rel="noreferrer" aria-label="Maps" className="p-2 rounded-full hover:bg-slate-200"><MapPin className="h-5 w-5 text-red-600" /></a>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomBar onOpenMenu={() => setOpen(true)} />
    </>
  );
}
