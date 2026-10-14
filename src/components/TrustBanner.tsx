import { ShieldCheck, Award, MapPin, Truck, CheckCircle2, Star, BadgeCheck, Phone } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { BUSINESS, telLink, whatsappLink } from "../data/business";
import { OfficialEmblem } from "./OfficialEmblem";
import { GoogleIcon, WhatsAppIcon } from "./Icons";

export default function TrustBanner() {
  const { isAr } = useLang();

  const trustPoints = isAr
    ? [
        {
          icon: ShieldCheck,
          title: "شركة مرخصة رسمياً (ذ.م.م)",
          desc: "يعقوب علي لتجارة الأدوات الكهربائية والصحية ذ.م.م - مسجلة ومعتمدة بإمارة الشارقة.",
        },
        {
          icon: MapPin,
          title: "مستودع فعلي بحي حوشي",
          desc: "أرض المستودعات S116 - الشارقة، مخزون دائم ومتاح للمعانية الفورية والاستلام المباشر.",
        },
        {
          icon: Award,
          title: "منتجات أصلية 100% ومضمونة",
          desc: "نوفر بضائع معتمدة ومطابقة للمواصفات الإماراتية القياسية بدون أي تهاون في الجودة.",
        },
        {
          icon: Truck,
          title: "توصيل سريع للمواقع والمشاريع",
          desc: "أسطول توصيل مباشر لمواقع الفلل والمباني في الشارقة وعجمان ودبي والإمارات الشمالية.",
        },
        {
          icon: Star,
          title: "تقييم موثق على Google Maps",
          desc: "تقييم 4.0 نجوم من عملاء ومقاولين ومرشدين محليين حقيقيين مع شفافية كاملة في التعامل.",
        },
        {
          icon: BadgeCheck,
          title: "أسعار جملة ومشاريع للمقاولين",
          desc: "أسعار تفضيلية للمقاولين وشركات الصيانة مع تسهيل إصدار عروض الأسعار وفواتير الكميات.",
        },
      ]
    : [
        {
          icon: ShieldCheck,
          title: "Officially Licensed LLC",
          desc: "Yakub Ali Elect & Sanitary Ware TR L.L.C - registered and licensed in Sharjah, UAE.",
        },
        {
          icon: MapPin,
          title: "Physical Warehouse in Hay Hoshi",
          desc: "S116 Warehouses Land, Hay Hoshi, Sharjah - ready stock for on-site inspection and direct pickup.",
        },
        {
          icon: Award,
          title: "100% Genuine Certified Goods",
          desc: "Supplying compliant, high-durability plumbing and electrical products meeting UAE standards.",
        },
        {
          icon: Truck,
          title: "Fast Site Delivery Across UAE",
          desc: "Prompt delivery directly to villa and project job sites across Sharjah, Dubai and Northern Emirates.",
        },
        {
          icon: Star,
          title: "Verified Google Business (4.0 ★)",
          desc: "Rated 4.0 stars by verified contractors, technicians, and local guides with open transparency.",
        },
        {
          icon: BadgeCheck,
          title: "Wholesale & Contractor Rates",
          desc: "Competitive bulk pricing and fast BOQ quotations for fit-out and construction contractors.",
        },
      ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071426] via-[#0b1b33] to-[#0a1f3d] py-16 sm:py-24 text-white">
      <div className="bg-grid absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -top-40 end-1/4 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 start-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Official Brand Identity Card */}
        <div className="reveal mx-auto mb-16 max-w-5xl rounded-3xl border border-amber-400/30 bg-white/[0.04] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid items-center gap-8 md:grid-cols-12">
            {/* Emblem and Official Mark */}
            <div className="flex flex-col items-center justify-center text-center md:col-span-4 md:border-e md:border-white/10 md:pe-8">
              <div className="relative h-28 w-36 sm:h-32 sm:w-40 drop-shadow-2xl transition-transform hover:scale-105">
                <OfficialEmblem light className="h-full w-full object-contain" />
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{isAr ? "هوية رسمية معتمدة" : "Verified Official Brand"}</span>
              </div>
            </div>

            {/* Official Business Details */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-[11px] font-black uppercase text-amber-300 border border-amber-400/30">
                  {isAr ? "رخصة تجارية بالشارقة" : "Sharjah Licensed"}
                </span>
                <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-300">
                  {BUSINESS.plusCode}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isAr ? BUSINESS.nameAr : BUSINESS.nameEn}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-amber-300">
                  {isAr ? BUSINESS.nameEn : BUSINESS.nameAr}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr
                  ? "كيان تجاري قائم ومرخص في دولة الإمارات العربية المتحدة، متخصص في استيراد وتوريد مستلزمات السباكة، الأدوات الصحية، الكابلات والتجهيزات الكهربائية، والمضخات والعدد بالجملة والتجزئة."
                  : "An established licensed trading entity in the United Arab Emirates, specializing in sanitary ware, plumbing supplies, certified electrical equipment, and water booster systems for wholesale and retail."}
              </p>

              {/* Google rating + quick call */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/10">
                <a
                  href={BUSINESS.mapsSearch}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold hover:bg-white/20 transition"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span className="font-extrabold text-amber-400">{BUSINESS.rating.toFixed(1)} ★</span>
                  <span className="text-slate-300">({BUSINESS.reviewCount} {isAr ? "تقييمات موثقة" : "Reviews"})</span>
                </a>

                <a
                  href={telLink}
                  dir="ltr"
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition"
                >
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span>{BUSINESS.phoneDisplay}</span>
                </a>

                <a
                  href={whatsappLink(isAr ? "السلام عليكم، أرغب في التأكد من توفر المواد في المستودع." : "Hello, checking stock at the warehouse.")}
                  target="_blank"
                  rel="noreferrer"
                  className="ms-auto flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>{isAr ? "تواصل مع المستودع" : "Contact Warehouse"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Credibility Pillars */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="reveal group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-white/[0.08]"
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 group-hover:bg-amber-500 group-hover:text-navy-950 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white">
                  {point.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
