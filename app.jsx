// Main React app for Ela-Salaty website

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "auto"
}/*EDITMODE-END*/;

// Theme phases for dynamic scroll-based background
// Each phase: top, mid, bot, orbX, orbY, orbColor, orbGlow, starsOpacity
const PHASES = [
  // Fajr - deep navy + soft pink hint
  { top:'#0a0e24', mid:'#1a1638', bot:'#2a1f3e', orbX:30, orbY:80, orbC:'#ff8a5b', orbG:'rgba(255,138,91,0.45)', stars:0.6 },
  // Sunrise/morning - dawn peach + blue
  { top:'#3a2a4a', mid:'#7a4f5a', bot:'#f5a878', orbX:40, orbY:55, orbC:'#ffd28a', orbG:'rgba(255,210,138,0.6)', stars:0.15 },
  // Dhuhr - midday (toned for readability)
  { top:'#15406b', mid:'#2a609a', bot:'#3a75ad', orbX:55, orbY:25, orbC:'#fff7d1', orbG:'rgba(255,247,209,0.5)', stars:0 },
  // Asr - warm afternoon (toned for readability)
  { top:'#2f3f5d', mid:'#80543a', bot:'#a06a45', orbX:70, orbY:45, orbC:'#ffae00', orbG:'rgba(255,174,0,0.55)', stars:0 },
  // Maghrib - sunset
  { top:'#1f1530', mid:'#7a2a4a', bot:'#d97757', orbX:78, orbY:75, orbC:'#ff6b35', orbG:'rgba(255,107,53,0.6)', stars:0.3 },
  // Isha - deep night
  { top:'#050811', mid:'#0c1226', bot:'#1a1430', orbX:60, orbY:25, orbC:'#ffae00', orbG:'rgba(255,174,0,0.4)', stars:1 },
];

function mix(a, b, t) {
  // hex/rgb mix
  const ah = a.replace('#','');
  const bh = b.replace('#','');
  const ar = parseInt(ah.slice(0,2),16), ag = parseInt(ah.slice(2,4),16), ab = parseInt(ah.slice(4,6),16);
  const br = parseInt(bh.slice(0,2),16), bg = parseInt(bh.slice(2,4),16), bb = parseInt(bh.slice(4,6),16);
  const r = Math.round(ar + (br-ar)*t);
  const g = Math.round(ag + (bg-ag)*t);
  const bl = Math.round(ab + (bb-ab)*t);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${bl.toString(16).padStart(2,'0')}`;
}
function lerp(a, b, t) { return a + (b-a)*t; }

function useScrollPhase() {
  React.useEffect(() => {
    const root = document.documentElement;
    let raf;
    const update = () => {
      const sc = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, sc / max));
      // map p ∈ [0,1] across PHASES segments
      const segs = PHASES.length - 1;
      const seg = Math.min(segs - 1, Math.floor(p * segs));
      const localT = p * segs - seg;
      const a = PHASES[seg], b = PHASES[seg + 1];
      root.style.setProperty('--sky-top', mix(a.top, b.top, localT));
      root.style.setProperty('--sky-mid', mix(a.mid, b.mid, localT));
      root.style.setProperty('--sky-bot', mix(a.bot, b.bot, localT));
      root.style.setProperty('--stars-opacity', String(lerp(a.stars, b.stars, localT)));
      const orb = document.querySelector('.sky');
      if (orb) {
        orb.style.setProperty('--orb-x', `${lerp(a.orbX, b.orbX, localT)}%`);
        orb.style.setProperty('--orb-y', `${lerp(a.orbY, b.orbY, localT)}%`);
        orb.style.setProperty('--orb-c', mix(a.orbC, b.orbC, localT));
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { update(); raf = 0; });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Nav({ t, lang, setLang }) {
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="nav__brand">
        <img src="images/icon.png" alt="" />
        <span>{lang === 'ar' ? 'إلى صلاتي' : 'Ela-Salaty'}</span>
      </a>
      <div className="nav__links">
        <a href="#features">{t.nav.features}</a>
        <a href="#prayers">{t.nav.prayers}</a>
        <a href="#qibla">{t.nav.qibla}</a>
        <a href="#themes">{t.nav.themes}</a>
        <a href="#privacy">{t.nav.privacy}</a>
      </div>
      <div className="nav__right">
        <button
          className="lang-btn"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          aria-label="Switch language"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14 }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" />
          </svg>
          {t.nav.switchLang}
        </button>
        <a href="#download" className="cta-pill">
          {t.nav.download}
          <Icons.ArrowRight style={{ width: 14, height: 14 }} />
        </a>
      </div>
    </nav>
  );
}

function detectLang() {
  try {
    const stored = localStorage.getItem('ela-lang');
    if (stored === 'en' || stored === 'ar') return stored;
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('ar') ? 'ar' : 'en';
  } catch { return 'en'; }
}

function App() {
  const [lang, setLang] = React.useState(detectLang());
  const t = window.I18N[lang];

  // Apply html lang/dir
  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar'
      ? 'إلى صلاتي — أجمل تطبيق للصلاة على آي-فون'
      : 'Ela-Salaty — The most beautiful prayer app on iOS';
    try { localStorage.setItem('ela-lang', lang); } catch {}
  }, [lang]);

  useScrollPhase();
  useReveal();

  return (
    <>
      <div className="sky" />
      <div className="stars"><StarField /></div>
      <Nav t={t} lang={lang} setLang={setLang} />
      <main className="app">
        <Hero t={t} lang={lang} />
        <LivePrayerTimes t={t} lang={lang} />
        <Features t={t} />
        <QiblaCompass t={t} lang={lang} />
        <Themes t={t} />
        <Reviews t={t} />
        <Gallery t={t} />
        <Privacy t={t} />
        <CtaFooter t={t} />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
