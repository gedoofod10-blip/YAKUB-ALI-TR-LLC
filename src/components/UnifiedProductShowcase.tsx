import { useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, Zap, Wrench, Hammer, LayoutGrid, Check, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { whatsappLink } from "../data/business";
import { UNIFIED_PRODUCTS } from "../data/unifiedProducts";
import { WhatsAppIcon } from "./Icons";
import { SectionHeader } from "./ui";
import { cn } from "../utils/cn";

export default function UnifiedProductShowcase() {
  const { isAr } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const categories = [
    { key: "all", nameAr: "جميع المنتجات المتوفرة", nameEn: "All In-Stock Items", icon: LayoutGrid },
    { key: "sanitary", nameAr: "أدوات صحية ودشات", nameEn: "Sanitary Ware & Showers", icon: Droplets },
    { key: "electrical", nameAr: "مستلزمات كهربائية وإضاءة", nameEn: "Electrical & Lighting", icon: Zap },
    { key: "plumbing", nameAr: "مواد السباكة والمواسير", nameEn: "Plumbing & Pipes", icon: Wrench },
    { key: "tools", nameAr: "مضخات مياه وعدد", nameEn: "Water Pumps & Tools", icon: Hammer },
  ];

  const filtered = UNIFIED_PRODUCTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  // Show first 12 items on homepage with link to full products page
  const displayItems = filtered.slice(0, 12);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={isAr ? "المخزون الفعلي المعتمد" : "Verified Store Inventory"}
          title={isAr ? "مستلزمات متوفرة في المستودع" : "Available Warehouse Materials"}
          subtitle={
            isAr
              ? "تشكيلة شاملة من الأدوات الصحية، الكابلات والتجهيزات الكهربائية، ومواد السباكة والمضخات متوفرة للتسليم الفوري أو الشحن للموقع."
              : "A comprehensive range of sanitary fixtures, electrical equipment, plumbing pipes, and water pumps ready for immediate pickup or jobsite delivery."
          }
        />

        {/* Filter Pills */}
        <div className="mb-10 sm:mb-12 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 px-1 [scrollbar-width:none]">
          {categories.map((c) => {
            const Icon = c.icon;
            const active = activeCategory === c.key;
            return (
              <button
                type="button"
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={cn(
                  "shrink-0 flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all active:scale-95",
                  active
                    ? "bg-navy-900 text-white shadow-lg shadow-navy-900/20 scale-105 ring-2 ring-amber-400"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-amber-400 hover:bg-slate-100"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-amber-400" : "text-slate-400"
                  )}
                />
                <span>{isAr ? c.nameAr : c.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Product Cards Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayItems.map((p, idx) => {
            const name = isAr ? p.nameAr : p.nameEn;
            const desc = isAr ? p.descAr : p.descEn;
            const tag = isAr ? p.tagAr : p.tagEn;
            const specs = isAr ? p.specsAr : p.specsEn;
            const catName = isAr ? p.categoryAr : p.categoryEn;

            const waMsg = isAr
              ? `السلام عليكم ورحمة الله،\nأرغب في الاستفسار عن توفر وسعر المنتج التالي من يعقوب علي:\n📌 *${p.nameAr}*\n🔖 العلامة: ${p.brand}\nكم السعر والكمية المتاحة؟`
              : `Hello,\nI would like to inquire about price and stock for:\n📌 *${p.nameEn}*\n🔖 Brand: ${p.brand}\nWhat is the current price and availability?`;

            return (
              <div
                key={p.id}
                className="reveal group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10 hover:border-amber-400"
                style={{ transitionDelay: `${(idx % 4) * 60}ms` }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                    {tag ? (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] sm:text-[11px] font-black text-navy-950 shadow-md">
                        <Sparkles className="h-3 w-3" />
                        {tag}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
                        <Check className="h-3 w-3 stroke-[3]" />
                        {isAr ? "متوفر" : "In Stock"}
                      </span>
                    )}

                    <span className="rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-amber-300 border border-amber-300/30">
                      {p.brand}
                    </span>
                  </div>

                  {/* Bottom category label on image */}
                  <div className="absolute bottom-3 start-3">
                    <span className="inline-flex items-center rounded-lg bg-white/20 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {catName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-base font-extrabold text-navy-900 leading-snug group-hover:text-amber-600 transition-colors">
                    {name}
                  </h3>

                  <p className="mt-1.5 flex-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {desc}
                  </p>

                  {/* Specs List */}
                  <ul className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3">
                    {specs.slice(0, 2).map((sp, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[11px] text-slate-600"
                      >
                        <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        <span className="truncate">{sp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* WhatsApp Inquiry Button */}
                  <a
                    href={whatsappLink(waMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 group-hover:bg-emerald-500 group-hover:shadow-emerald-500/30 active:scale-95 min-h-[42px]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>{isAr ? "اسأل عن السعر والتوفر" : "Inquire via WhatsApp"}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-all hover:scale-105 active:scale-95"
          >
            <span>{isAr ? "تصفح الكتالوج الكامل والبحث في جميع الأصناف" : "Browse Full Unified Catalog"}</span>
            <Arrow className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
