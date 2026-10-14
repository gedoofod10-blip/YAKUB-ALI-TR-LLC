import { useEffect, useState } from "react";
import { X, Phone } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { BUSINESS, telLink, whatsappLink } from "../data/business";
import { WhatsAppIcon } from "./Icons";
import { cn } from "../utils/cn";

export default function WhatsAppFloat() {
  const { isAr } = useLang();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const quick = isAr
    ? [
        "أريد عرض سعر لقائمة مواد",
        "هل يتوفر لديكم توصيل للموقع؟",
        "استفسار عن أدوات صحية",
        "استفسار عن مستلزمات كهربائية",
      ]
    : [
        "I need a quote for a material list",
        "Do you deliver to site?",
        "Inquiry about sanitary ware",
        "Inquiry about electrical supplies",
      ];

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-3 transition-all duration-500",
        // Adjusted for mobile screens to sit comfortably above mobile bottom bar
        "bottom-20 lg:bottom-6",
        isAr ? "left-4 sm:left-6 items-start" : "right-4 sm:right-6 items-end",
        show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      )}
    >
      {/* Chat card */}
      <div
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[340px] sm:w-80 origin-bottom overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/30 ring-1 ring-black/10 transition-all duration-300",
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "pointer-events-none scale-90 opacity-0"
        )}
      >
        <div className="relative bg-[#075E54] p-4 text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 end-3 rounded-full p-1 hover:bg-white/10 active:scale-95"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-[#075E54] bg-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold">{isAr ? BUSINESS.shortAr : BUSINESS.shortEn}</div>
              <div className="text-xs text-emerald-100">
                {isAr ? "عادةً نرد خلال دقائق" : "Typically replies within minutes"}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ECE5DD] p-4">
          <div className="relative max-w-[90%] rounded-xl rounded-ss-none bg-white p-3 text-xs sm:text-sm text-slate-700 shadow-sm leading-relaxed">
            {isAr
              ? "أهلاً بك في يعقوب علي 👋 كيف يمكننا مساعدتك اليوم؟"
              : "Hello and welcome to Yakub Ali 👋 How can we help you today?"}
          </div>
        </div>
        <div className="space-y-1.5 p-3">
          {quick.map((q) => (
            <a
              key={q}
              href={whatsappLink(q)}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 active:scale-[0.98]"
            >
              {q}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-1.5">
            <a
              href={BUSINESS.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-600 active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4" /> {isAr ? "ابدأ المحادثة" : "Start chat"}
            </a>
            <a
              href={telLink}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-navy-900 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-navy-800 active:scale-95"
            >
              <Phone className="h-4 w-4" /> {isAr ? "اتصال" : "Call"}
            </a>
          </div>
        </div>
      </div>

      {/* FAB - Shown mainly on desktop or tablet, unobtrusive on mobile */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group relative flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/40 transition hover:scale-105 active:scale-95"
        aria-label="WhatsApp"
      >
        {!open && <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]" />}
        {open ? <X className="relative h-6 w-6 sm:h-7 sm:w-7" /> : <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />}
      </button>
    </div>
  );
}
