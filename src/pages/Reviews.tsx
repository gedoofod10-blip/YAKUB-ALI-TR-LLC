import { Quote, BadgeCheck, ExternalLink } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { BUSINESS } from "../data/business";
import { Button, PageHero, Stars } from "../components/ui";
import { GoogleIcon } from "../components/Icons";

const distribution = [4, 2, 0, 2, 0]; // 5★,4★,3★,2★,1★

export default function Reviews() {
  const { t, isAr } = useLang();
  const total = distribution.reduce((a, b) => a + b, 0);

  return (
    <>
      <PageHero title={t.reviews.heroTitle} subtitle={t.reviews.heroSub} crumb={t.nav.reviews} image="/images/store.jpg" />

      <section className="py-12 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 px-4 sm:px-6 lg:grid-cols-3">
          {/* Summary */}
          <aside className="reveal lg:col-span-1">
            <div className="lg:sticky lg:top-28 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-navy-900/5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500">
                <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" /> {t.common.rating}
              </div>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl sm:text-6xl font-black leading-none text-navy-900">{BUSINESS.rating.toFixed(1)}</span>
                <div className="pb-1">
                  <Stars value={BUSINESS.rating} size="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="mt-1 text-[11px] sm:text-xs text-slate-500">{t.reviews.basedOn} {BUSINESS.reviewCount} {t.common.reviews}</div>
                </div>
              </div>

              <h4 className="mt-6 sm:mt-8 text-xs sm:text-sm font-extrabold text-navy-900">{t.reviews.summaryTitle}</h4>
              <ul className="mt-3 space-y-2">
                {distribution.map((n, i) => {
                  const star = 5 - i;
                  const pct = total ? (n / total) * 100 : 0;
                  return (
                    <li key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-3 font-bold text-slate-600">{star}</span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-amber-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-5 text-end text-slate-500">{n}</span>
                    </li>
                  );
                })}
              </ul>

              <Button variant="primary" className="mt-6 sm:mt-8 w-full" href={BUSINESS.mapsSearch}>
                <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" /> {t.reviews.writeReview}
              </Button>
            </div>
          </aside>

          {/* List */}
          <div className="space-y-4 sm:space-y-5 lg:col-span-2">
            {t.reviews.items.map((r, i) => (
              <article key={r.name} className="reveal relative rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm" style={{ transitionDelay: `${i * 70}ms` }}>
                <Quote className="absolute top-5 end-5 sm:top-6 sm:end-6 h-8 w-8 sm:h-10 sm:w-10 text-slate-100" />
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-navy-800 to-navy-950 text-sm sm:text-base font-black text-amber-400">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-navy-900">
                        {r.name}
                        {"guide" in r && r.guide && (
                          <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-blue-700">
                            <BadgeCheck className="h-3 w-3" /> {t.reviews.localGuide}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] sm:text-xs text-slate-500">
                        <Stars value={r.stars} size="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span>·</span>
                        <span>{r.time}</span>
                      </div>
                    </div>
                  </div>
                  <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">{r.text}</p>
                {r.reply && (
                  <div className="mt-3 sm:mt-4 rounded-2xl bg-slate-50 p-3.5 sm:p-4 text-xs sm:text-sm">
                    <div className="mb-1 text-[11px] sm:text-xs font-bold text-navy-900">{t.reviews.ownerResponse}</div>
                    <p className="text-slate-600 leading-relaxed">{r.reply}</p>
                  </div>
                )}
              </article>
            ))}
            <a
              href={BUSINESS.mapsSearch}
              target="_blank"
              rel="noreferrer"
              className="reveal flex items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-slate-200 p-5 sm:p-6 text-xs sm:text-sm font-bold text-slate-500 transition hover:border-amber-400 hover:text-navy-900 active:scale-[0.99]"
            >
              {isAr ? "عرض جميع التقييمات على خرائط جوجل" : "See all reviews on Google Maps"} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
