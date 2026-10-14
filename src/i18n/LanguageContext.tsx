import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Translations;
  setLang: (l: Lang) => void;
  toggle: () => void;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("ya-lang") : null;
    return stored === "en" || stored === "ar" ? stored : "ar";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ya-lang", l);
  };

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title =
      lang === "ar"
        ? "يعقوب علي للأدوات الكهربائية والصحية | الشارقة"
        : "Yakub Ali Elect & Sanitary Ware | Sharjah";
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: translations[lang],
    setLang,
    toggle: () => setLang(lang === "ar" ? "en" : "ar"),
    isAr: lang === "ar",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
