import { cn } from "../utils/cn";

export function OfficialEmblem({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const navyFill = light ? "#ffffff" : "url(#oe-navy)";
  const navySoft = light ? "#93c5fd" : "url(#oe-navy-soft)";
  const strokeColor = light ? "#0f172a" : "#0a1f3d";

  return (
    <svg
      viewBox="0 0 500 370"
      className={cn("drop-shadow-md", className)}
      aria-hidden="true"
    >
      <defs>
        {/* Navy Gradients */}
        <linearGradient id="oe-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a1f3d" />
          <stop offset="100%" stopColor="#071426" />
        </linearGradient>
        <linearGradient id="oe-navy-soft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14345d" />
          <stop offset="100%" stopColor="#0a1f3d" />
        </linearGradient>

        {/* Gold Gradients */}
        <linearGradient id="oe-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3cc69" />
          <stop offset="45%" stopColor="#c7972b" />
          <stop offset="100%" stopColor="#9e7418" />
        </linearGradient>
        <linearGradient id="oe-gold-bright" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Water Drop Gradient */}
        <linearGradient id="oe-drop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        <filter id="oe-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity={light ? "0.4" : "0.2"} />
        </filter>
      </defs>

      {/* Top Golden Arc Swoosh */}
      <path
        d="M 140 145 C 150 90, 210 40, 305 50 C 375 58, 420 100, 425 125 C 418 120, 370 70, 300 62 C 215 54, 160 98, 148 142 Z"
        fill="url(#oe-gold)"
      />

      {/* Plug Cable */}
      <path
        d="M 125 175 C 115 235, 145 320, 245 340 C 205 330, 140 295, 138 210 C 138 188, 134 180, 134 180 Z"
        fill={navyFill}
      />

      {/* Plug Body & Prongs */}
      <g transform="translate(118, 175) rotate(-35)" fill={navyFill}>
        <rect x="-7" y="-18" width="4" height="12" rx="1.5" />
        <rect x="3" y="-18" width="4" height="12" rx="1.5" />
        <path d="M -12 -6 L 12 -6 C 14 -6, 15 -4, 14 0 L 10 14 C 9 17, 6 18, 0 18 C -6 18, -9 17, -10 14 L -14 0 C -15 -4, -14 -6, -12 -6 Z" />
        <line x1="-10" y1="2" x2="10" y2="2" stroke={light ? "#0a1f3d" : "#ffffff"} strokeWidth="1.2" opacity="0.4" />
        <line x1="-8" y1="7" x2="8" y2="7" stroke={light ? "#0a1f3d" : "#ffffff"} strokeWidth="1.2" opacity="0.4" />
      </g>

      {/* Letter 'Y' (Navy / White in light mode) */}
      <path
        d="M 115 90 L 195 90 L 195 102 L 175 102 L 218 178 L 260 90 L 235 90 L 235 102 L 275 102 L 275 90 L 222 205 L 222 255 L 255 255 L 255 268 L 180 268 L 180 255 L 210 255 L 210 205 L 155 102 L 138 102 L 138 90 Z"
        fill={navyFill}
        filter="url(#oe-shadow)"
      />

      {/* Letter 'A' (Gold Serif with integrated lightning bolt) */}
      <path
        d="M 285 95 L 340 95 L 360 95 L 435 268 L 385 268 L 370 230 L 265 230 L 275 208 L 360 208 L 325 125 L 290 208 L 285 95 Z"
        fill="url(#oe-gold)"
        filter="url(#oe-shadow)"
      />

      {/* Lightning Bolt */}
      <polygon
        points="280,105 225,188 268,188 240,248 310,165 268,165"
        fill="url(#oe-gold-bright)"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Water Faucet / Tap (Navy / White) */}
      <g transform="translate(372, 140)" fill={navyFill}>
        <rect x="20" y="-8" width="18" height="5" rx="1.5" />
        <rect x="26.5" y="-3" width="5" height="12" />
        <circle cx="29" cy="-5.5" r="3.5" fill={navySoft} />
        <path d="M -5 12 L 32 12 C 45 12, 54 20, 54 34 L 54 48 L 40 48 L 40 36 C 40 28, 35 24, 25 24 L -5 24 Z" />
        <circle cx="-5" cy="18" r="6" />
        <rect x="38" y="44" width="18" height="6" rx="1.5" />
      </g>

      {/* Water Drop */}
      <g transform="translate(419, 212)">
        <path
          d="M 0 0 C 0 0, -14 18, -14 28 C -14 36, -8 44, 0 44 C 8 44, 14 36, 14 28 C 14 18, 0 0, 0 0 Z"
          fill="url(#oe-drop)"
        />
        <ellipse cx="-4.5" cy="27" rx="3" ry="6.5" transform="rotate(-20 -4.5 27)" fill="#ffffff" opacity="0.65" />
        <circle cx="3" cy="35" r="1.8" fill="#ffffff" opacity="0.45" />
      </g>

      {/* Bottom Flowing Waves */}
      <path
        d="M 140 260 C 160 300, 210 330, 275 315 C 340 300, 395 285, 435 292 C 370 280, 310 295, 255 305 C 195 315, 155 290, 140 260 Z"
        fill={navyFill}
      />
      <path
        d="M 185 285 C 235 325, 305 325, 385 270 C 330 295, 260 298, 205 275 Z"
        fill={navySoft}
        opacity="0.85"
      />
      <path
        d="M 230 310 C 270 330, 320 325, 370 295 C 335 312, 285 315, 245 302 Z"
        fill="url(#oe-gold)"
        opacity="0.75"
      />
    </svg>
  );
}

export { OfficialEmblem as BrandMark };
