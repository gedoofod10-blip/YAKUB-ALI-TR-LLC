import { Target, Eye, Handshake, ShieldCheck, HeartHandshake, Gem, HardHat, Wrench, Building2, Home as HomeIcon, MapPin } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { BUSINESS, whatsappLink } from "../data/business";
import { Button, PageHero, SectionHeader } from "../components/ui";
import { WhatsAppIcon, FacebookIcon } from "../components/Icons";

const valueIcons = [Handshake, ShieldCheck, HeartHandshake, Gem];
const teamIcons = [HardHat, Wrench, Building2, HomeIcon];

export default function About() {
  const { t, isAr } = useLang();
  return (
    <>
      <PageHero title={t.about.heroTitle} subtitle={t.about.heroSub} crumb={t.nav.about} image="/images/store.jpg" />

      {/* Story */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div className="reveal relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img src="/images/sanitary.jpg" alt="" className="aspect-[3/4] w-full rounded-2xl sm:rounded-3xl object-cover shadow-xl" />
              <img src="/images/electrical.jpg" alt="" className="mt-6 sm:mt-10 aspect-[3/4] w-full rounded-2xl sm:rounded-3xl object-cover shadow-xl" />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 start-1/2 -translate-x-1/2 rounded-2xl bg-navy-900 px-4 sm:px-6 py-3 sm:py-4 text-center text-white shadow-2xl">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">1500+</div>
              <div className="text-[11px] sm:text-xs text-slate-300">{t.hero.stat1}</div>
            </div>
          </div>

          <div className="reveal order-1 lg:order-2">
            <SectionHeader align="start" eyebrow={t.nav.about} title={t.about.storyTitle} />
            <p className="-mt-6 text-xs sm:text-base leading-relaxed text-slate-600">{t.about.story1}</p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-slate-600">{t.about.story2}</p>
            <div className="mt-5 sm:mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 sm:p-4 text-xs sm:text-sm text-navy-900">
              <MapPin className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-amber-600" />
              <span className="leading-relaxed">{isAr ? BUSINESS.addressAr : BUSINESS.addressEn}</span>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="whatsapp"
                className="w-full sm:w-auto"
                href={whatsappLink(isAr ? "السلام عليكم، أرغب في معرفة المزيد عن خدماتكم." : "Hello, I'd like to know more about your services.")}
              >
                <WhatsAppIcon className="h-5 w-5" /> {t.common.chatNow}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" href={BUSINESS.social.facebook}>
                <FacebookIcon className="h-5 w-5" /> Facebook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24 text-white">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-4 sm:gap-6 px-4 sm:px-6 md:grid-cols-2">
          {[
            { Icon: Target, title: t.about.missionTitle, text: t.about.mission },
            { Icon: Eye, title: t.about.visionTitle, text: t.about.vision },
          ].map(({ Icon, title, text }, i) => (
            <div key={title} className="reveal rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-amber-500 text-navy-950">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold">{title}</h3>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader title={t.about.valuesTitle} />
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => {
              const Icon = valueIcons[i] || Handshake;
              return (
                <div key={v.title} className="reveal rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="mb-3.5 sm:mb-4 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-navy-900">{v.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader title={t.about.teamTitle} />
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.team.map((v, i) => {
              const Icon = teamIcons[i] || HardHat;
              return (
                <div key={v.title} className="reveal group relative overflow-hidden rounded-3xl bg-slate-50 p-5 sm:p-7 transition hover:bg-navy-900" style={{ transitionDelay: `${i * 80}ms` }}>
                  <Icon className="absolute -end-4 -bottom-4 h-24 w-24 sm:h-28 sm:w-28 text-navy-900/5 transition group-hover:text-amber-400/10" />
                  <div className="mb-3.5 sm:mb-4 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-amber-500 text-navy-950">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-navy-900 transition group-hover:text-white">{v.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 transition group-hover:text-slate-300 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
