import { useEffect, useState } from "react";
import { Download, X, Share2, PlusSquare } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { OfficialEmblem } from "./OfficialEmblem";
import { cn } from "../utils/cn";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const { isAr } = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error - iOS Safari navigator standalone property
      Boolean(window.navigator.standalone);

    if (isStandalone) {
      setInstalled(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Listen for BeforeInstallPrompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt banner after 2.5s for non-intrusive experience
      const timer = setTimeout(() => {
        const dismissed = sessionStorage.getItem("ya-pwa-dismissed");
        if (!dismissed) setShowBanner(true);
      }, 2500);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // If iOS and not dismissed, show after 3s
    if (isIOSDevice && !sessionStorage.getItem("ya-pwa-dismissed")) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("ya-pwa-dismissed", "true");
  };

  if (installed || !showBanner) return null;

  return (
    <>
      {/* Bottom PWA Install Floating Banner */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-500",
          "bottom-20 lg:bottom-6 inset-x-3 sm:inset-x-auto sm:end-6 sm:max-w-md"
        )}
      >
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/40 bg-navy-950/95 p-4 text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 end-2.5 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3.5 pe-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 border border-amber-400/30 p-1">
              <OfficialEmblem light className="h-full w-full object-contain" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white truncate">
                  {isAr ? "تطبيق يعقوب علي" : "Yakub Ali App"}
                </span>
                <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-amber-300">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                {isAr
                  ? "ثبّت الموقع كتطبيق على هاتفك لتصفح الكتالوج والطلب السريع بدون إنترنت"
                  : "Install on your home screen for fast catalog access & offline browsing"}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={handleInstallClick}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2 px-3 text-xs font-bold text-navy-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isAr ? "تثبيت التطبيق على الهاتف" : "Install Web App"}</span>
            </button>

            <button
              onClick={handleDismiss}
              className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              {isAr ? "لاحقاً" : "Later"}
            </button>
          </div>
        </div>
      </div>

      {/* iOS Manual Installation Guide Modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 end-4 rounded-full p-1 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 p-2 shadow-lg">
                <OfficialEmblem light className="h-full w-full object-contain" />
              </div>
              <h3 className="mt-3 text-lg font-black text-navy-900">
                {isAr ? "تثبيت التطبيق على آيفون" : "Install on iPhone / iPad"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {isAr
                  ? "اتبع الخطوات البسيطة لإضافة التطبيق إلى الشاشة الرئيسية"
                  : "Follow these simple steps to add to your Home Screen"}
              </p>
            </div>

            <ol className="mt-5 space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 font-bold text-white text-[11px]">
                  1
                </span>
                <div className="flex-1">
                  <span>{isAr ? "اضغط على زر المشاركة" : "Tap the Share button"}</span>{" "}
                  <Share2 className="inline h-4 w-4 text-blue-600 align-middle" />{" "}
                  <span>{isAr ? "أسفل المتصفح (سفاري)" : "in Safari"}</span>
                </div>
              </li>

              <li className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 font-bold text-white text-[11px]">
                  2
                </span>
                <div className="flex-1">
                  <span>{isAr ? "مرر لأسفل واختر" : "Scroll down and select"}</span>{" "}
                  <strong className="text-navy-900">
                    {isAr ? '"إضافة إلى الشاشة الرئيسية"' : '"Add to Home Screen"'}
                  </strong>{" "}
                  <PlusSquare className="inline h-4 w-4 text-slate-700 align-middle" />
                </div>
              </li>

              <li className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 font-bold text-white text-[11px]">
                  3
                </span>
                <div className="flex-1">
                  <span>{isAr ? 'اضغط "إضافة" (Add) في الزاوية العلوية' : 'Tap "Add" in the top corner'}</span>
                </div>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-navy-900 py-3 text-xs font-bold text-white hover:bg-navy-800 transition"
            >
              {isAr ? "حسناً، فهمت" : "Got it!"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
