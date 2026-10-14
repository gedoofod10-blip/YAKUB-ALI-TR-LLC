import { useLang } from "../i18n/LanguageContext";
import { OfficialEmblem } from "./OfficialEmblem";
import { cn } from "../utils/cn";

export { OfficialEmblem, OfficialEmblem as BrandMark } from "./OfficialEmblem";

export default function Logo({
  light = false,
  compact = false,
  size = "md",
}: {
  light?: boolean;
  compact?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { isAr } = useLang();

  const emblemSizes = {
    sm: "h-9 w-11 sm:h-10 sm:w-12",
    md: "h-11 w-14 sm:h-13 sm:w-16",
    lg: "h-14 w-18 sm:h-16 sm:w-20",
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 max-w-full">
      {/* Official Symbol / Emblem from the business logo */}
      <div className={cn("relative shrink-0 transition-transform hover:scale-105", emblemSizes[size])}>
        <OfficialEmblem light={light} className="h-full w-full object-contain" />
      </div>

      {!compact && (
        <div className="flex flex-col justify-center leading-tight min-w-0">
          {/* Main Brand Title: Bilingual (Arabic + English) */}
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span
              className={cn(
                "font-black tracking-tight truncate",
                light ? "text-white" : "text-[#0a1f3d]",
                size === "lg"
                  ? "text-lg sm:text-xl"
                  : size === "sm"
                  ? "text-xs sm:text-sm"
                  : "text-sm sm:text-base lg:text-lg",
                isAr ? "font-cairo" : "font-inter"
              )}
            >
              {isAr ? "يعقوب علي" : "YAKUB ALI"}
            </span>
            <span
              className={cn(
                "font-extrabold uppercase shrink-0",
                light ? "text-amber-300" : "text-[#c7972b]",
                size === "lg" ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs",
                isAr ? "font-inter tracking-wider" : "font-cairo"
              )}
            >
              {isAr ? "YAKUB ALI" : "يعقوب علي"}
            </span>
          </div>

          {/* Subtitle Line 1: Primary language category */}
          <div
            className={cn(
              "font-bold truncate",
              light ? "text-slate-200" : "text-[#14345d]",
              size === "lg" ? "text-xs" : "text-[10px] sm:text-[11px]",
              isAr ? "font-cairo" : "font-inter uppercase tracking-wider"
            )}
          >
            {isAr
              ? "لتجارة الأدوات الكهربائية والصحية ذ.م.م"
              : "ELECTRIC & SANITARY WARE TR. LLC"}
          </div>

          {/* Subtitle Line 2: Secondary language category (hidden on small screens to keep compact) */}
          <div
            className={cn(
              "hidden sm:block font-medium opacity-85 truncate",
              light ? "text-slate-400" : "text-slate-500",
              "text-[9px] sm:text-[9.5px]",
              isAr ? "font-inter uppercase tracking-wider" : "font-cairo"
            )}
          >
            {isAr
              ? "ELECTRIC & SANITARY WARE TR. LLC"
              : "لتجارة الأدوات الكهربائية والصحية ذ.م.م"}
          </div>
        </div>
      )}
    </div>
  );
}
