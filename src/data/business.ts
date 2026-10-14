// ─────────────────────────────────────────────────────────────
// Central business configuration — edit links/phones here only.
// ─────────────────────────────────────────────────────────────
export const BUSINESS = {
  nameEn: "Yakub Ali Elect & Sanitary Ware TR L.L.C",
  nameAr: "يعقوب علي لتجارة الأدوات الكهربائية والصحية",
  shortEn: "Yakub Ali",
  shortAr: "يعقوب علي",
  phoneDisplay: "+971 56 477 3411",
  phoneRaw: "971564773411",
  addressEn: "S116 - Warehouses Land - Hay Hoshi - Sharjah - United Arab Emirates",
  addressAr: "S116 - أرض المستودعات - حي حوشي - الشارقة - الإمارات العربية المتحدة",
  plusCode: "7G2M+CQ Sharjah",
  rating: 4.0,
  reviewCount: 8,
  // Opening hours (split shift as per Google Maps: Closes 2 PM · Reopens 4 PM)
  hours: [
    { open: "08:00", close: "14:00" },
    { open: "16:00", close: "22:00" },
  ],
  fridayHours: [{ open: "16:00", close: "22:00" }],
  mapsSearch:
    "https://www.google.com/maps/search/?api=1&query=Yakub+Ali+Elect+%26+Sanitary+ware+TR+L.L.C+Hay+Hoshi+Sharjah",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=7G2M%2BCQ+Sharjah+United+Arab+Emirates",
  mapsEmbed:
    "https://www.google.com/maps?q=7G2M%2BCQ+Sharjah+United+Arab+Emirates&output=embed",
  // Social links — Facebook is the primary identity channel for the business.
  social: {
    facebook:
      "https://www.facebook.com/search/top?q=Yakub%20Ali%20Elect%20%26%20Sanitary%20ware%20TR%20L.L.C",
    instagram: "https://www.instagram.com/explore/search/keyword/?q=yakub%20ali%20sanitary%20ware%20sharjah",
    whatsapp: "https://wa.me/971564773411",
    maps: "https://www.google.com/maps/search/?api=1&query=Yakub+Ali+Elect+%26+Sanitary+ware+TR+L.L.C+Hay+Hoshi+Sharjah",
  },
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${BUSINESS.phoneRaw}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:+${BUSINESS.phoneRaw}`;
