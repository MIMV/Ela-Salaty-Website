// Icons used throughout the site - all inline SVG, no external deps
const Icons = {
  Fajr: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="22" r="5" />
      <line x1="16" y1="13" x2="16" y2="9" />
      <line x1="9" y1="22" x2="5" y2="22" />
      <line x1="27" y1="22" x2="23" y2="22" />
      <line x1="10.5" y1="16.5" x2="8" y2="14" />
      <line x1="21.5" y1="16.5" x2="24" y2="14" />
      <line x1="3" y1="28" x2="29" y2="28" />
    </svg>
  ),
  Sunrise: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 26h26" />
      <path d="M6 22a10 10 0 0 1 20 0" />
      <path d="M16 6v6" />
      <path d="M12 10l4-4 4 4" />
    </svg>
  ),
  Dhuhr: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="5" />
      <line x1="16" y1="4" x2="16" y2="7" />
      <line x1="16" y1="25" x2="16" y2="28" />
      <line x1="4" y1="16" x2="7" y2="16" />
      <line x1="25" y1="16" x2="28" y2="16" />
      <line x1="7.5" y1="7.5" x2="9.5" y2="9.5" />
      <line x1="22.5" y1="22.5" x2="24.5" y2="24.5" />
      <line x1="7.5" y1="24.5" x2="9.5" y2="22.5" />
      <line x1="22.5" y1="9.5" x2="24.5" y2="7.5" />
    </svg>
  ),
  Asr: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 20a5 5 0 0 1 10 0h2a3 3 0 0 1 0 6H8a4 4 0 0 1 0-8z" />
      <circle cx="22" cy="14" r="4" />
    </svg>
  ),
  Maghrib: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 26h26" />
      <path d="M6 22a10 10 0 0 1 20 0" />
      <path d="M16 18V4" />
      <path d="M12 14l4 4 4-4" />
    </svg>
  ),
  Isha: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 19.5A8.5 8.5 0 1 1 12.5 10a7 7 0 0 0 9.5 9.5z" />
      <path d="M25 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    </svg>
  ),
  Athan: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4h8v4l-2 2v10l2 2v4h-8v-4l2-2V10l-2-2z" />
      <path d="M16 4V1" />
      <circle cx="16" cy="22" r="1.5" />
      <path d="M9 14l-2 2 2 2" />
      <path d="M23 14l2 2-2 2" />
    </svg>
  ),
  Themes: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 5v22" />
      <path d="M5 16a16 16 0 0 1 22 0" />
      <circle cx="22" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Widgets: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="10" height="10" rx="2" />
      <rect x="18" y="4" width="10" height="10" rx="2" />
      <rect x="4" y="18" width="10" height="10" rx="2" />
      <circle cx="23" cy="23" r="5" />
    </svg>
  ),
  Watch: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="8" width="14" height="16" rx="3" />
      <path d="M12 8l1-4h6l1 4" />
      <path d="M12 24l1 4h6l1-4" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  ),
  Siri: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="3" />
      <circle cx="16" cy="16" r="7" />
      <circle cx="16" cy="16" r="11" opacity="0.5" />
    </svg>
  ),
  World: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 4c4 4 4 20 0 24" />
      <path d="M16 4c-4 4-4 20 0 24" />
      <path d="M4 16h24" />
    </svg>
  ),
  Azkar: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 6h10a4 4 0 0 1 4 4v18a3 3 0 0 0-3-3H5z" />
      <path d="M27 6H17a4 4 0 0 0-4 4v18a3 3 0 0 1 3-3h11z" />
    </svg>
  ),
  Privacy: (props) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4l11 4v8c0 7-5 11-11 12-6-1-11-5-11-12V8z" />
      <path d="M11 16l4 4 7-7" />
    </svg>
  ),
  Star: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Apple: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  ),
  ArrowRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  Play: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Pin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z" />
      <circle cx="12" cy="9" r="3" />
    </svg>
  ),
  Check: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
};

const IconByName = {
  athan: Icons.Athan,
  themes: Icons.Themes,
  widgets: Icons.Widgets,
  watch: Icons.Watch,
  siri: Icons.Siri,
  world: Icons.World,
  azkar: Icons.Azkar,
  privacy: Icons.Privacy,
};

const PrayerIconByName = {
  fajr: Icons.Fajr,
  sunrise: Icons.Sunrise,
  dhuhr: Icons.Dhuhr,
  asr: Icons.Asr,
  maghrib: Icons.Maghrib,
  isha: Icons.Isha,
};

// Crescent + minaret + Kaaba SVGs used by the hero scene
const CrescentSVG = (props) => (
  <svg viewBox="0 0 200 200" {...props}>
    <defs>
      <radialGradient id="moonG" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fff7d1" />
        <stop offset="55%" stopColor="#ffe084" />
        <stop offset="100%" stopColor="#ffae00" />
      </radialGradient>
      <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
    <circle cx="100" cy="100" r="78" fill="url(#moonG)" filter="url(#moonGlow)" opacity="0.4" />
    <path
      d="M 100 22 a 78 78 0 1 0 0 156 a 60 60 0 1 1 0 -156"
      fill="url(#moonG)"
    />
  </svg>
);

const MinaretsBG = (props) => (
  <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" {...props}>
    <defs>
      <linearGradient id="silG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#04060d" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#04060d" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g fill="url(#silG)">
      {/* far minarets */}
      <rect x="80" y="200" width="14" height="200" />
      <polygon points="65,200 109,200 87,165" />
      <circle cx="87" cy="160" r="6" />
      <path d="M 87 152 v -8" stroke="#04060d" strokeWidth="2" />

      <rect x="1100" y="180" width="14" height="220" />
      <polygon points="1085,180 1129,180 1107,145" />
      <circle cx="1107" cy="140" r="6" />
      <path d="M 1107 132 v -8" stroke="#04060d" strokeWidth="2" />

      {/* dome cluster center */}
      <path d="M 380 400 L 380 280 Q 380 220 440 200 Q 460 195 500 192 Q 540 195 560 200 Q 620 220 620 280 L 620 400 Z" />
      <path d="M 440 200 Q 500 130 560 200 Z" />
      <circle cx="500" cy="135" r="6" />
      <path d="M 500 130 v -16" stroke="#04060d" strokeWidth="3" />

      {/* side dome */}
      <path d="M 700 400 L 700 290 Q 700 250 740 240 Q 760 237 780 235 Q 800 237 820 240 Q 860 250 860 290 L 860 400 Z" />
      <path d="M 740 240 Q 780 200 820 240 Z" />

      {/* foreground tall minaret */}
      <rect x="260" y="120" width="20" height="280" />
      <rect x="252" y="140" width="36" height="14" />
      <polygon points="252,120 288,120 270,95" />
      <circle cx="270" cy="90" r="7" />
      <path d="M 270 80 v -12" stroke="#04060d" strokeWidth="3" />

      <rect x="940" y="140" width="20" height="260" />
      <rect x="932" y="160" width="36" height="14" />
      <polygon points="932,140 968,140 950,115" />
      <circle cx="950" cy="110" r="7" />
      <path d="M 950 100 v -12" stroke="#04060d" strokeWidth="3" />
    </g>
  </svg>
);

Object.assign(window, { Icons, IconByName, PrayerIconByName, CrescentSVG, MinaretsBG });
