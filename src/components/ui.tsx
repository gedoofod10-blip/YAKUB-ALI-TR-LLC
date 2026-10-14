import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { cn } from "../utils/cn";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
}) {
  return (
    <div className={cn("reveal mb-8 sm:mb-12 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-start")}>
      {eyebrow && (
        <span className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-600">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </span>
      )}
      <h2 className={cn("text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight", light ? "text-white" : "text-navy-900")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-2.5 sm:mt-4 text-xs sm:text-base leading-relaxed", light ? "text-slate-300" : "text-slate-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  crumb,
  image = "/images/hero.jpg",
}: {
  title: string;
  subtitle?: string;
  crumb: string;
  image?: string;
}) {
  const { t, isAr } = useLang();
  const Chevron = isAr ? ChevronLeft : ChevronRight;
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-12 sm:pt-20 pb-16 sm:pb-24 text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/80 to-navy-950" />
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-amber-400 transition-colors">{t.nav.home}</Link>
          <Chevron className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="text-amber-400 font-medium">{crumb}</span>
        </nav>
        <h1 className="animate-fade-up text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-fade-up mt-3 sm:mt-4 max-w-2xl text-xs sm:text-lg text-slate-300 leading-relaxed [animation-delay:150ms]">
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute -bottom-px inset-x-0 h-8 sm:h-12 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}

export function Button({
  children,
  href,
  to,
  variant = "primary",
  className,
  external = true,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: "primary" | "whatsapp" | "outline" | "ghost" | "white";
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 min-h-[44px]";
  const styles = {
    primary: "bg-amber-500 text-navy-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400",
    whatsapp: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600",
    outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
    ghost: "border border-white/30 text-white backdrop-blur hover:bg-white/10",
    white: "bg-white text-navy-900 shadow-lg hover:bg-slate-100",
  };
  const cls = cn(base, styles[variant], className);
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>;
  return (
    <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={onClick}>
      {children}
    </a>
  );
}

export function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn(size, i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")}>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </div>
  );
}
