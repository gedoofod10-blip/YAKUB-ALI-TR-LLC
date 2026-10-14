import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { BUSINESS } from "../data/business";
import { Button, PageHero } from "../components/ui";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../components/Icons";
import { cn } from "../utils/cn";

interface GalleryPhoto {
  img: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  tag?: string;
}

const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    img: "/images/hero.jpg",
    titleAr: "صالة عرض يعقوب علي - حي حوشي",
    titleEn: "Yakub Ali Showroom - Hay Hoshi",
    categoryAr: "المعرض والمستودع",
    categoryEn: "Showroom & Warehouse",
    tag: "Sharjah Showroom",
  },
  {
    img: "/images/sanitary.jpg",
    titleAr: "تشكيلة أطقم وخلاطات الأدوات الصحية",
    titleEn: "Sanitary Ware & Faucets Display",
    categoryAr: "أدوات صحية",
    categoryEn: "Sanitary Ware",
  },
  {
    img: "/images/electrical.jpg",
    titleAr: "قسم الكابلات والقواطع والتمديدات الكهربائية",
    titleEn: "Cables, Breakers & Electrical Supplies",
    categoryAr: "مستلزمات كهربائية",
    categoryEn: "Electrical Supplies",
  },
  {
    img: "/images/plumbing.jpg",
    titleAr: "مستودع مواسير ومحابس السباكة PPR / UPVC",
    titleEn: "Plumbing Pipes, Valves & PPR Materials",
    categoryAr: "مواد السباكة",
    categoryEn: "Plumbing Materials",
  },
  {
    img: "https://images.pexels.com/photos/7031575/pexels-photo-7031575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
    titleAr: "أطقم الشطافات والدشات الأسود المطفي الفاخرة",
    titleEn: "Matte Black Shower Sets & Shattaf Collection",
    categoryAr: "أدوات صحية",
    categoryEn: "Sanitary Ware",
  },
  {
    img: "https://images.pexels.com/photos/28286038/pexels-photo-28286038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
    titleAr: "كابلات وأسلاك نحاس نقي معتمدة للمشاريع",
    titleEn: "Pure Copper Heavy-Duty Project Cables",
    categoryAr: "مستلزمات كهربائية",
    categoryEn: "Electrical Supplies",
  },
  {
    img: "/images/tools.jpg",
    titleAr: "جدار العدد ومضخات المياه والتثبيت",
    titleEn: "Tools, Fasteners & Water Booster Pumps",
    categoryAr: "مضخات وعدد",
    categoryEn: "Pumps & Tools",
  },
  {
    img: "/images/store.jpg",
    titleAr: "مستودع التحميل والشحن بحي حوشي بالشارقة",
    titleEn: "Sharjah Hay Hoshi Delivery & Logistics Hub",
    categoryAr: "المعرض والمستودع",
    categoryEn: "Showroom & Warehouse",
  },
];

export default function Gallery() {
  const { t, isAr } = useLang();
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? i : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx]);

  return (
    <>
      <PageHero
        title={t.gallery.heroTitle}
        subtitle={isAr ? "صور حقيقية لصالة العرض والمستودع وأقسام الصحي والكهرباء والسباكة في الشارقة." : "Authentic photography of our Sharjah showroom, warehouse and inventory collections."}
        crumb={t.nav.gallery}
        image="/images/electrical.jpg"
      />

      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Gallery Grid */}
          <div className="grid auto-rows-[200px] sm:auto-rows-[240px] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_ITEMS.map((g, i) => {
              const title = isAr ? g.titleAr : g.titleEn;
              const category = isAr ? g.categoryAr : g.categoryEn;

              return (
                <button
                  key={g.img + i}
                  onClick={() => setIdx(i)}
                  className={cn(
                    "reveal group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-navy-900 text-start active:scale-95 transition-transform",
                    i === 0 && "sm:col-span-2 sm:row-span-2 auto-rows-[400px]",
                    i === 3 && "sm:col-span-2"
                  )}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <img
                    src={g.img}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent opacity-90 transition group-hover:opacity-100" />

                  {/* Top category badge */}
                  <div className="absolute top-3.5 start-3.5">
                    <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white">
                      {category}
                    </span>
                  </div>

                  {/* Bottom title */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 sm:p-5 text-white">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold leading-snug">{title}</h4>
                      {g.tag && (
                        <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1 mt-0.5">
                          <Sparkles className="h-3 w-3" /> {g.tag}
                        </span>
                      )}
                    </div>
                    <Camera className="h-5 w-5 opacity-80 sm:opacity-0 transition sm:group-hover:opacity-100 shrink-0 ms-2" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Social & Contact Card */}
          <div className="reveal mt-12 sm:mt-16 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-navy-900 to-navy-950 p-6 sm:p-14 text-center text-white shadow-xl border border-white/10">
            <h3 className="text-xl sm:text-3xl font-black">
              {isAr ? "تابع تحديثات المواد والمخزون على حساباتنا" : "Follow our official channels for live updates"}
            </h3>
            <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.contact.social}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="whatsapp" className="w-full sm:w-auto" href={BUSINESS.social.whatsapp}>
                <WhatsAppIcon className="h-5 w-5" /> {isAr ? "تواصل مع المتجر مباشرة" : "Direct WhatsApp Chat"}
              </Button>
              <Button variant="white" className="w-full sm:w-auto" href={BUSINESS.social.facebook}>
                <FacebookIcon className="h-5 w-5 text-[#1877F2]" /> Facebook
              </Button>
              <Button variant="ghost" className="w-full sm:w-auto" href={BUSINESS.social.instagram}>
                <InstagramIcon className="h-5 w-5" /> Instagram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {idx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-3 sm:p-4 backdrop-blur-md"
          onClick={() => setIdx(null)}
          dir="ltr"
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/30 active:scale-95 z-10"
            onClick={() => setIdx(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-2 sm:left-4 rounded-full bg-white/15 p-2.5 sm:p-3 text-white hover:bg-white/30 active:scale-95 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure className="max-h-full max-w-5xl px-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_ITEMS[idx].img}
              alt={isAr ? GALLERY_ITEMS[idx].titleAr : GALLERY_ITEMS[idx].titleEn}
              className="max-h-[70vh] sm:max-h-[80vh] w-auto mx-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption
              className="mt-3 text-center text-sm sm:text-base font-bold text-white"
              dir={isAr ? "rtl" : "ltr"}
            >
              {isAr ? GALLERY_ITEMS[idx].titleAr : GALLERY_ITEMS[idx].titleEn}
              <div className="text-xs text-amber-300 font-normal mt-0.5">
                {isAr ? GALLERY_ITEMS[idx].categoryAr : GALLERY_ITEMS[idx].categoryEn}
              </div>
            </figcaption>
          </figure>

          <button
            className="absolute right-2 sm:right-4 rounded-full bg-white/15 p-2.5 sm:p-3 text-white hover:bg-white/30 active:scale-95 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx + 1) % GALLERY_ITEMS.length);
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
