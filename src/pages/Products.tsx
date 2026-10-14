import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Droplets, Zap, Wrench, Hammer, LayoutGrid, Sparkles, Check } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { whatsappLink } from "../data/business";
import { UNIFIED_PRODUCTS, Product } from "../data/unifiedProducts";
import { Button, PageHero } from "../components/ui";
import { WhatsAppIcon } from "../components/Icons";
import { cn } from "../utils/cn";

const catIcons: Record<string, typeof Droplets> = {
  all: LayoutGrid,
  sanitary: Droplets,
  electrical: Zap,
  plumbing: Wrench,
  tools: Hammer,
};

export default function Products() {
  const { t, isAr } = useLang();
  const [params, setParams] = useSearchParams();
  const active = params.get("cat") ?? "all";
  const [q, setQ] = useState("");

  const categories = [
    { key: "all", nameAr: "جميع المستلزمات (21)", nameEn: "All Materials (21)" },
    { key: "sanitary", nameAr: "الأدوات الصحية (8)", nameEn: "Sanitary Ware (8)" },
    { key: "electrical", nameAr: "المستلزمات الكهربائية (8)", nameEn: "Electrical Supplies (8)" },
    { key: "plumbing", nameAr: "مواد السباكة والمواسير (5)", nameEn: "Plumbing & Pipes (5)" },
    { key: "tools", nameAr: "المضخات والعدد (5)", nameEn: "Pumps & Tools (5)" },
  ];

  const list: Product[] = useMemo(() => {
    const term = q.trim().toLowerCase();
    return UNIFIED_PRODUCTS.filter((p) => {
      const matchCat = active === "all" || p.category === active;
      const matchSearch =
        !term ||
        p.nameAr.toLowerCase().includes(term) ||
        p.nameEn.toLowerCase().includes(term) ||
        p.descAr.toLowerCase().includes(term) ||
        p.descEn.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [active, q]);

  const catImages: Record<string, string> = {
    sanitary: "/images/sanitary.jpg",
    electrical: "/images/electrical.jpg",
    plumbing: "/images/plumbing.jpg",
    tools: "/images/tools.jpg",
  };

  return (
    <>
      <PageHero
        title={isAr ? "كتالوج المستلزمات والمواد" : "Material & Product Catalog"}
        subtitle={
          isAr
            ? "تصفح جميع المواد والمستلزمات المتوفرة في مستودعنا بحي حوشي بالشارقة. أسعار جملة ومشاريع مع إمكانية الطلب المباشر عبر واتساب."
            : "Explore verified plumbing, sanitary, electrical, and pump inventory in our Sharjah warehouse. Wholesale and direct WhatsApp ordering available."
        }
        crumb={t.nav.products}
        image="/images/sanitary.jpg"
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Sticky Filters & Search Bar */}
          <div className="sticky top-16 sm:top-20 z-30 -mx-4 sm:-mx-6 mb-8 sm:mb-10 bg-slate-50/95 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 sm:pb-0 [scrollbar-width:none]">
                {categories.map((c) => {
                  const Icon = catIcons[c.key] || LayoutGrid;
                  const isActive = active === c.key;

                  return (
                    <button
                      key={c.key}
                      onClick={() =>
                        c.key === "all" ? setParams({}) : setParams({ cat: c.key })
                      }
                      className={cn(
                        "shrink-0 flex items-center gap-1.5 rounded-full border px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition-all active:scale-95",
                        isActive
                          ? "border-navy-900 bg-navy-900 text-white shadow-md scale-105 ring-2 ring-amber-400"
                          : "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-slate-100"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 sm:h-4 sm:w-4",
                          isActive ? "text-amber-400" : "text-slate-400"
                        )}
                      />
                      <span>{isAr ? c.nameAr : c.nameEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={isAr ? "ابحث بالاسم أو الماركة..." : "Search name or brand..."}
                  className="w-full rounded-full border border-slate-200 bg-white py-2 sm:py-2.5 ps-10 pe-4 text-xs sm:text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                />
              </div>
            </div>
          </div>

          {/* Active Category Header Card */}
          {active !== "all" && (
            <div className="relative mb-8 sm:mb-10 overflow-hidden rounded-3xl bg-navy-900 text-white shadow-xl">
              <img
                src={catImages[active] || "/images/hero.jpg"}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div
                className={cn(
                  "absolute inset-0",
                  isAr ? "bg-gradient-to-l" : "bg-gradient-to-r",
                  "from-navy-950 to-transparent"
                )}
              />
              <div className="relative p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-black">
                  {categories.find((c) => c.key === active)?.[isAr ? "nameAr" : "nameEn"]}
                </h2>
                <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-300">
                  {isAr
                    ? "جميع المواد المعروضة أصلية ومطابقة لمواصفات البناء والتشطيب بدولة الإمارات العربية المتحدة."
                    : "All displayed items are authentic, compliant with UAE building & plumbing standards, and in stock."}
                </p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 sm:p-16 text-center bg-white">
              <p className="text-sm sm:text-base text-slate-600">
                {isAr
                  ? `لم نجد منتجات تطابق البحث "${q}". اسألنا على واتساب وسنوفره لك فوراً من المستودع.`
                  : `No products matching "${q}". Inquire via WhatsApp and we will source it for you.`}
              </p>
              <Button
                variant="whatsapp"
                className="mt-6"
                href={whatsappLink(
                  isAr
                    ? `السلام عليكم، أبحث عن مادة/منتج غير معروض: ${q}`
                    : `Hello, looking for an item not found in catalog: ${q}`
                )}
              >
                <WhatsAppIcon className="h-5 w-5" /> {t.common.whatsapp}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p, i) => {
                const name = isAr ? p.nameAr : p.nameEn;
                const desc = isAr ? p.descAr : p.descEn;
                const tag = isAr ? p.tagAr : p.tagEn;
                const specs = isAr ? p.specsAr : p.specsEn;
                const catName = isAr ? p.categoryAr : p.categoryEn;

                const waMsg = isAr
                  ? `السلام عليكم ورحمة الله،\nأرغب في الاستفسار عن توفر وسعر المنتج التالي:\n📌 *${p.nameAr}*\n🔖 العلامة: ${p.brand}\nكم السعر والكمية المتاحة؟`
                  : `Hello,\nI would like to inquire about price & stock for:\n📌 *${p.nameEn}*\n🔖 Brand: ${p.brand}\nWhat is the price and availability?`;

                return (
                  <div
                    key={p.id}
                    className="reveal group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10 hover:border-amber-400"
                    style={{ transitionDelay: `${(i % 6) * 50}ms` }}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={p.image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

                      {/* Tag / Badge */}
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

                      <p className="mt-1.5 flex-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {desc}
                      </p>

                      {/* Specs bullets */}
                      {specs && specs.length > 0 && (
                        <ul className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
                          {specs.slice(0, 2).map((sp, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </span>
                              <span className="truncate">{sp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <a
                        href={whatsappLink(waMsg)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 group-hover:bg-emerald-500 group-hover:shadow-emerald-500/30 active:scale-95 min-h-[42px]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>{isAr ? "طلب / استفسار عبر واتساب" : "Inquire via WhatsApp"}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bulk / Project Orders CTA */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="reveal mx-auto max-w-7xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-navy-950 text-white shadow-2xl">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-6 sm:p-10 lg:p-14">
              <h2 className="text-2xl sm:text-3xl font-black">
                {isAr ? "طلبات الجملة والمشاريع والمقاولين" : "Contractor & Bulk Project Supply"}
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr
                  ? "نوفر أسعاراً تفضيلية خاصة للكميات والمشاريع الكبيرة. أرسل جدول الكميات (BOQ) أو قائمة المواد وسنصدر لك عرض سعر معتمد وتفصيلي بسرعة."
                  : "We offer special tiered wholesale pricing for bulk villa and tower projects. Send us your BOQ or material list for an itemized, fast official quote."}
              </p>
              <div className="mt-5 sm:mt-6">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto"
                  href={whatsappLink(
                    isAr
                      ? "السلام عليكم، لدي قائمة مواد/مشروع جملة وأرغب في الحصول على عرض سعر خاص للمقاولين."
                      : "Hello, I have a bulk project BOQ list and would like contractor quotation pricing."
                  )}
                >
                  <WhatsAppIcon className="h-5 w-5" /> {t.common.requestQuote}
                </Button>
              </div>
            </div>
            <img
              src="/images/plumbing.jpg"
              alt="Project Supply"
              className="h-48 sm:h-72 lg:h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
