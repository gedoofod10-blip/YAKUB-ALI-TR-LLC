import { useState } from "react";
import { Truck, Package, FileText, Lightbulb, Search, RefreshCw, ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { whatsappLink } from "../data/business";
import { PageHero, SectionHeader } from "../components/ui";
import { WhatsAppIcon } from "../components/Icons";
import { cn } from "../utils/cn";

const icons = [Truck, Package, FileText, Lightbulb, Search, RefreshCw];

export default function Services() {
  const { t, isAr } = useLang();
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [sel, setSel] = useState(0);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const svc = t.services.items[sel].title;
    const msg = isAr
      ? `السلام عليكم،\nالاسم: ${name}\nالخدمة المطلوبة: ${svc}\nالتفاصيل: ${details}`
      : `Hello,\nName: ${name}\nService: ${svc}\nDetails: ${details}`;
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <>
      <PageHero title={t.services.heroTitle} subtitle={t.services.heroSub} crumb={t.nav.services} image="/images/tools.jpg" />

      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((s, i) => {
              const Icon = icons[i] || Truck;
              return (
                <div
                  key={s.title}
                  className="reveal group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy-900/10"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="absolute -top-10 -end-10 h-32 w-32 rounded-full bg-amber-400/10 transition group-hover:scale-150" />
                  <div className="relative mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-navy-900 text-amber-400 shadow-lg shadow-navy-900/20">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <span className="absolute top-5 end-5 sm:top-6 sm:end-6 text-4xl sm:text-5xl font-black text-slate-100">0{i + 1}</span>
                  <h3 className="relative text-lg sm:text-xl font-extrabold text-navy-900">{s.title}</h3>
                  <p className="relative mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  <button
                    onClick={() => {
                      setSel(i);
                      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="relative mt-4 sm:mt-5 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-navy-900 transition hover:text-amber-600 active:scale-95"
                  >
                    {t.services.bookTitle} <Arrow className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="relative overflow-hidden bg-navy-950 py-16 sm:py-24 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -bottom-32 start-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeader align="start" light eyebrow={t.common.whatsapp} title={t.services.bookTitle} subtitle={t.services.bookSub} />
            <ul className="-mt-4 space-y-2.5 sm:space-y-3">
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs sm:text-sm font-black text-navy-950">{i + 1}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold">{s.title}</div>
                    <div className="text-[11px] sm:text-xs text-slate-400">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submit} className="reveal rounded-3xl bg-white p-5 sm:p-8 text-slate-800 shadow-2xl">
            <label className="block text-xs sm:text-sm font-bold text-navy-900">{t.contact.name}</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
            />

            <label className="mt-4 sm:mt-5 block text-xs sm:text-sm font-bold text-navy-900">{t.nav.services}</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {t.services.items.map((s, i) => (
                <button
                  type="button"
                  key={s.title}
                  onClick={() => setSel(i)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-start text-xs font-bold transition active:scale-95",
                    sel === i ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 hover:border-amber-400"
                  )}
                >
                  {s.title}
                </button>
              ))}
            </div>

            <label className="mt-4 sm:mt-5 block text-xs sm:text-sm font-bold text-navy-900">{t.contact.message}</label>
            <textarea
              required
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
            />

            <button
              type="submit"
              className="mt-5 sm:mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" /> {t.common.send}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
