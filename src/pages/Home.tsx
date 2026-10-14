import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, ShieldCheck, BadgeDollarSign, Truck, Headset, MessageCircle,
  Star, MapPin, Phone, Clock, ChevronRight, ChevronLeft,
} from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { useOpenStatus } from "../hooks/useOpenStatus";
import { BUSINESS, telLink, whatsappLink } from "../data/business";
import { Button, SectionHeader, Stars } from "../components/ui";
import { WhatsAppIcon, GoogleIcon, FacebookIcon } from "../components/Icons";
import { cn } from "../utils/cn";
import { OfficialEmblem } from "../components/OfficialEmblem";
import TrustBanner from "../components/TrustBanner";
import UnifiedProductShowcase from "../components/UnifiedProductShowcase";

const whyIcons = [ShieldCheck, BadgeDollarSign, Truck, Headset, MessageCircle, Truck];

export default function Home() {
  const { t, isAr } = useLang();
  const status = useOpenStatus(isAr);
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className={cn("absolute inset-0", isAr ? "bg-gradient-to-l" : "bg-gradient-to-r", "from-navy-950 via-navy-950/85 to-navy-900/50")} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -top-32 -end-32 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 sm:gap-12 px-4 sm:px-6 pt-12 sm:pt-20 pb-20 sm:pb-36 lg:grid-cols-12 lg:pt-28">
          <div className="lg:col-span-7">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold text-amber-300 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              {t.hero.badge}
            </div>

            <h1 className="animate-fade-up mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.2] sm:leading-[1.15] tracking-tight [animation-delay:100ms]">
              {t.hero.title1}
              <br />
              <span className="text-gradient">{t.hero.title2}</span>
            </h1>

            <p className="animate-fade-up mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-slate-300 [animation-delay:200ms]">
              {t.hero.subtitle}
            </p>

            <div className="animate-fade-up mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 [animation-delay:300ms]">
              <Button
                variant="whatsapp"
                className="w-full sm:w-auto"
                href={whatsappLink(isAr ? "السلام عليكم، أرغب في طلب مواد من يعقوب علي للأدوات الكهربائية والصحية." : "Hello, I would like to order materials from Yakub Ali Elect & Sanitary Ware.")}
              >
                <WhatsAppIcon className="h-5 w-5" /> {t.hero.cta1}
              </Button>
              <Button variant="ghost" to="/products" className="w-full sm:w-auto">
                {t.hero.cta2} <Arrow className="h-4 w-4" />
              </Button>
            </div>

            {/* trust row */}
            <div className="animate-fade-up mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 [animation-delay:400ms]">
              <a
                href={BUSINESS.mapsSearch}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur transition hover:bg-white/10 w-fit"
              >
                <GoogleIcon className="h-6 w-6" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black">{BUSINESS.rating.toFixed(1)}</span>
                    <Stars value={BUSINESS.rating} />
                  </div>
                  <div className="text-[11px] text-slate-400">{BUSINESS.reviewCount} {t.common.reviews} · {t.common.rating}</div>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", status.open ? "animate-ping bg-emerald-400" : "bg-rose-400")} />
                  <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", status.open ? "bg-emerald-400" : "bg-rose-400")} />
                </span>
                <span>{status.open ? t.common.openNow : t.common.closedNow}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">
                  {status.open ? t.common.closesAt : status.nextType === "reopens" ? t.common.reopensAt : t.common.opensAt} {status.nextLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Floating info card */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-2xl backdrop-blur-xl lg:ms-auto">
              <div className="absolute -top-3 end-4 sm:-end-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-black text-navy-950 shadow-lg">
                {t.common.delivery}
              </div>

              <div className="flex items-center gap-3">
                <OfficialEmblem light className="h-11 w-14 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">{isAr ? BUSINESS.shortAr : BUSINESS.shortEn}</div>
                  <div className="text-[11px] text-amber-300">YAKUB ALI · TR LLC</div>
                </div>
              </div>

              <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-slate-300 leading-snug">{isAr ? BUSINESS.addressAr : BUSINESS.addressEn}</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                  <a href={telLink} dir="ltr" className="text-slate-300 hover:text-white font-medium">{BUSINESS.phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-slate-300">{t.contact.hoursText}</span>
                </li>
              </ul>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={telLink}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-navy-900 transition hover:bg-slate-100 active:scale-95"
                >
                  <Phone className="h-3.5 w-3.5" /> {t.common.callUs}
                </a>
                <a
                  href={BUSINESS.mapsDirections}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 active:scale-95"
                >
                  <MapPin className="h-3.5 w-3.5" /> {t.common.directions}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-navy-950/60 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 md:grid-cols-4 rtl:divide-x-reverse">
            {[
              { v: "1500+", l: t.hero.stat1 },
              { v: BUSINESS.rating.toFixed(1) + " ★", l: t.hero.stat2 },
              { v: t.hero.stat3v, l: t.hero.stat3 },
              { v: t.hero.stat4v, l: t.hero.stat4 },
            ].map((s, i) => (
              <div key={i} className="px-2 sm:px-4 py-4 sm:py-6 text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400">{s.v}</div>
                <div className="mt-1 text-[11px] sm:text-xs font-medium text-slate-400 truncate">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── TICKER ───────── */}
      <div className="overflow-hidden border-y border-slate-200 bg-white py-3 sm:py-4" dir="ltr">
        <div className="animate-marquee flex w-max gap-8 sm:gap-10 whitespace-nowrap">
          {[...t.ticker, ...t.ticker].map((item, i) => (
            <span key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-navy-800" dir={isAr ? "rtl" : "ltr"}>
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rotate-45 bg-amber-500" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ───────── BRAND CREDIBILITY & TRUST BANNER ───────── */}
      <TrustBanner />

      {/* ───────── MAIN PRODUCT SHOWCASE (UNIFIED CATALOG) ───────── */}
      <UnifiedProductShowcase />

      {/* ───────── WHY US ───────── */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute top-1/2 start-0 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow={isAr ? "مميزاتنا" : "Advantages"} title={t.why.title} subtitle={t.why.subtitle} light />
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.items.map((w, i) => {
              const Icon = whyIcons[i] || ShieldCheck;
              return (
                <div
                  key={w.title}
                  className="reveal group rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7 backdrop-blur transition hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/10"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 transition group-hover:bg-amber-500 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold">{w.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow={isAr ? "بسيط وسريع" : "Simple & Fast"} title={t.process.title} subtitle={t.process.subtitle} />
          <div className="relative grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
            <div className="absolute top-12 hidden h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent md:block" />
            {t.process.steps.map((s, i) => (
              <div key={s.title} className="reveal relative text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative mx-auto mb-4 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 border-slate-50 bg-navy-900 text-2xl sm:text-3xl font-black text-amber-400 shadow-xl">
                  {i + 1}
                  {i === 0 && <WhatsAppIcon className="absolute -end-1 -top-1 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-500 p-1.5 text-white" />}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-navy-900">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STORE + REVIEWS ───────── */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div className="reveal relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-amber-400/30 to-navy-500/20 blur-2xl" />
            <img src="/images/store.jpg" alt="Store" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />
            <div className="absolute -bottom-4 start-4 sm:-bottom-6 sm:start-6 flex items-center gap-3 rounded-2xl bg-white p-3 sm:p-4 shadow-xl ring-1 ring-black/5">
              <GoogleIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-xl font-black text-navy-900">{BUSINESS.rating.toFixed(1)}</span>
                  <Stars value={BUSINESS.rating} size="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500">{BUSINESS.reviewCount} {t.common.reviews}</div>
              </div>
            </div>
          </div>

          <div className="reveal mt-6 lg:mt-0">
            <span className="mb-2 sm:mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600">
              <Star className="h-3 w-3 fill-amber-500" /> {t.nav.reviews}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-navy-900">{t.reviews.heroTitle}</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600">{t.reviews.heroSub}</p>

            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {t.reviews.items.slice(0, 2).map((r) => (
                <div key={r.name} className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-navy-900 text-xs sm:text-sm font-black text-amber-400">{r.name.charAt(0)}</div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-navy-900">{r.name}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500">{r.time}</div>
                      </div>
                    </div>
                    <Stars value={r.stars} size="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </div>
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>

            <Link to="/reviews" className="mt-5 sm:mt-6 inline-flex items-center gap-1 font-bold text-sm sm:text-base text-navy-900 hover:text-amber-600">
              {t.common.viewAll} <Chevron className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-6 sm:p-12 lg:p-16 text-white shadow-2xl shadow-emerald-600/30">
          <WhatsAppIcon className="pointer-events-none absolute -bottom-10 -end-10 h-48 w-48 sm:h-64 sm:w-64 text-white/10" />
          <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">{t.cta.title}</h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-emerald-50">{t.cta.subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:col-span-2 lg:justify-end">
              <Button variant="white" className="w-full sm:w-auto" href={whatsappLink(isAr ? "السلام عليكم، أحتاج مواد اليوم. هل يمكنكم المساعدة؟" : "Hello, I need materials today. Can you help?")}>
                <WhatsAppIcon className="h-5 w-5 text-emerald-600" /> {t.cta.button}
              </Button>
              <Button variant="ghost" className="w-full sm:w-auto" href={BUSINESS.social.facebook}>
                <FacebookIcon className="h-5 w-5" /> Facebook
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
