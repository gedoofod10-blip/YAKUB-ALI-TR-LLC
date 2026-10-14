import { useState } from "react";
import { MapPin, Phone, Clock, Navigation, Hash, Copy, Check } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { useOpenStatus } from "../hooks/useOpenStatus";
import { BUSINESS, telLink, whatsappLink } from "../data/business";
import { PageHero } from "../components/ui";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, GoogleIcon } from "../components/Icons";
import { cn } from "../utils/cn";

export default function Contact() {
  const { t, isAr } = useLang();
  const status = useOpenStatus(isAr);
  const [form, setForm] = useState({ name: "", phone: "", cat: t.contact.categories[0], msg: "" });
  const [copied, setCopied] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = isAr
      ? `السلام عليكم،\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالفئة: ${form.cat}\nالرسالة: ${form.msg}`
      : `Hello,\nName: ${form.name}\nPhone: ${form.phone}\nCategory: ${form.cat}\nMessage: ${form.msg}`;
    window.open(whatsappLink(msg), "_blank");
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText("+" + BUSINESS.phoneRaw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const inputCls = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20";

  return (
    <>
      <PageHero title={t.contact.heroTitle} subtitle={t.contact.heroSub} crumb={t.nav.contact} image="/images/store.jpg" />

      {/* Quick cards */}
      <section className="relative z-10 -mt-8 sm:-mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <a
            href={BUSINESS.social.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="reveal flex items-center gap-3.5 sm:gap-4 rounded-2xl sm:rounded-3xl bg-emerald-500 p-4 sm:p-6 text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-1 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" />
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-emerald-100">{t.common.whatsapp}</div>
              <div className="text-base sm:text-lg font-black" dir="ltr">{BUSINESS.phoneDisplay}</div>
            </div>
          </a>

          <a
            href={telLink}
            className="reveal flex items-center gap-3.5 sm:gap-4 rounded-2xl sm:rounded-3xl bg-navy-900 p-4 sm:p-6 text-white shadow-xl shadow-navy-900/30 transition hover:-translate-y-1 active:scale-[0.98] [transition-delay:80ms]"
          >
            <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-amber-400 shrink-0" />
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-300">{t.common.callUs}</div>
              <div className="text-base sm:text-lg font-black" dir="ltr">{BUSINESS.phoneDisplay}</div>
            </div>
          </a>

          <a
            href={BUSINESS.mapsDirections}
            target="_blank"
            rel="noreferrer"
            className="reveal flex items-center gap-3.5 sm:gap-4 rounded-2xl sm:rounded-3xl bg-amber-500 p-4 sm:p-6 text-navy-950 shadow-xl shadow-amber-500/30 transition hover:-translate-y-1 active:scale-[0.98] [transition-delay:160ms]"
          >
            <Navigation className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" />
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-navy-800">{t.common.directions}</div>
              <div className="text-base sm:text-lg font-black">{isAr ? "حي حوشي، الشارقة" : "Hay Hoshi, Sharjah"}</div>
            </div>
          </a>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-5">
          {/* Info */}
          <div className="reveal space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm">
              <div className={cn("mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold", status.open ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
                <span className={cn("h-2 w-2 rounded-full", status.open ? "bg-emerald-500" : "bg-rose-500")} />
                {status.open ? t.common.openNow : t.common.closedNow} · {status.open ? t.common.closesAt : status.nextType === "reopens" ? t.common.reopensAt : t.common.opensAt} {status.nextLabel}
              </div>

              <ul className="space-y-4 sm:space-y-5">
                <li className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.contact.address}</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-navy-900 leading-relaxed">{isAr ? BUSINESS.addressAr : BUSINESS.addressEn}</div>
                  </div>
                </li>

                <li className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.contact.phone}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <a href={telLink} dir="ltr" className="text-xs sm:text-sm font-semibold text-navy-900 hover:text-amber-600">{BUSINESS.phoneDisplay}</a>
                      <button onClick={copyPhone} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-navy-900" aria-label="Copy">
                        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </li>

                <li className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.contact.hours}</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-navy-900">{t.contact.hoursText}</div>
                    <div className="text-xs sm:text-sm font-semibold text-navy-900">{t.contact.fridayText}</div>
                  </div>
                </li>

                <li className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Hash className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.contact.plusCode}</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-navy-900" dir="ltr">{BUSINESS.plusCode}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-navy-950 p-5 sm:p-7 text-white">
              <h4 className="text-base sm:text-lg font-extrabold">{t.contact.followUs}</h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">{t.contact.social}</p>
              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
                <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-[#1877F2] p-3 text-xs sm:text-sm font-bold transition hover:brightness-110 active:scale-95"><FacebookIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> Facebook</a>
                <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-3 text-xs sm:text-sm font-bold transition hover:brightness-110 active:scale-95"><InstagramIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> Instagram</a>
                <a href={BUSINESS.social.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-[#25D366] p-3 text-xs sm:text-sm font-bold transition hover:brightness-110 active:scale-95"><WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> WhatsApp</a>
                <a href={BUSINESS.mapsSearch} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-white p-3 text-xs sm:text-sm font-bold text-navy-900 transition hover:bg-slate-100 active:scale-95"><GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> Google</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal lg:col-span-3">
            <form onSubmit={submit} className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-xl shadow-navy-900/5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900">{t.contact.formTitle}</h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">{t.contact.formSub}</p>

              <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-navy-900">{t.contact.name}</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-navy-900">{t.contact.phoneField}</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} dir="ltr" placeholder="+971 5x xxx xxxx" />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-navy-900">{t.contact.category}</label>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                    {t.contact.categories.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setForm({ ...form, cat: c })}
                        className={cn("rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold transition active:scale-95", form.cat === c ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 hover:border-amber-400")}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-bold text-navy-900">{t.contact.message}</label>
                  <textarea required rows={4} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} className={cn(inputCls, "resize-none")} />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 sm:mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 sm:py-4 font-bold text-sm sm:text-base text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" /> {t.common.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="reveal mx-auto max-w-7xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-2xl">
          <iframe
            title="Google Maps"
            src={BUSINESS.mapsEmbed}
            className="h-64 sm:h-80 lg:h-[28rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
