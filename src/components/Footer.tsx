import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Star, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { BUSINESS, telLink } from "../data/business";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, GoogleIcon } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
  const { t, isAr } = useLang();
  const year = new Date().getFullYear();

  const quick = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/products", label: t.nav.products },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/reviews", label: t.nav.reviews },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-300">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-40 start-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-24 lg:pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Logo light />
            <p className="text-sm leading-relaxed text-slate-400">{t.footer.about}</p>
            <div className="flex items-center gap-2">
              <GoogleIcon className="h-5 w-5" />
              <span className="text-sm font-bold text-white">{BUSINESS.rating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />
                ))}
              </div>
              <span className="text-xs text-slate-500">({BUSINESS.reviewCount} {t.common.reviews})</span>
            </div>
            <div className="flex items-center gap-3">
              <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-white/5 p-2.5 transition hover:bg-[#1877F2] hover:text-white"><FacebookIcon className="h-5 w-5" /></a>
              <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/5 p-2.5 transition hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white"><InstagramIcon className="h-5 w-5" /></a>
              <a href={BUSINESS.social.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full bg-white/5 p-2.5 transition hover:bg-emerald-500 hover:text-white"><WhatsAppIcon className="h-5 w-5" /></a>
              <a href={BUSINESS.mapsSearch} target="_blank" rel="noreferrer" aria-label="Google Maps" className="rounded-full bg-white/5 p-2.5 transition hover:bg-red-500 hover:text-white"><MapPin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-extrabold uppercase tracking-wider text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {quick.map((q) => (
                <li key={q.to}>
                  <Link to={q.to} className="group inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-amber-400">
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100 rtl:-scale-x-100" />
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-extrabold uppercase tracking-wider text-white">{t.footer.categories}</h4>
            <ul className="space-y-2.5">
              {t.categories.items.map((c) => (
                <li key={c.key}>
                  <Link to={`/products?cat=${c.key}`} className="group inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-amber-400">
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100 rtl:-scale-x-100" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-extrabold uppercase tracking-wider text-white">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <a href={BUSINESS.mapsSearch} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                  {isAr ? BUSINESS.addressAr : BUSINESS.addressEn}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <a href={telLink} dir="ltr" className="text-slate-400 hover:text-white">{BUSINESS.phoneDisplay}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div className="text-slate-400">
                  <div>{t.contact.hoursText}</div>
                  <div>{t.contact.fridayText}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {year} {isAr ? BUSINESS.nameAr : BUSINESS.nameEn}. {t.footer.rights}</p>
          <p>{t.footer.license} · {BUSINESS.plusCode}</p>
        </div>
      </div>
    </footer>
  );
}
