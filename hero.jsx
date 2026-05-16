// HERO — 3D-feeling scene with floating iPhones, crescent moon, mosque silhouette, and stars

function StarField({ density = 220 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, w, h, stars = [], shooting = [];

    const resize = () => {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    resize();
    window.addEventListener('resize', resize);

    // build stars
    stars = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 * window.devicePixelRatio + 0.3,
      base: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() * 2 * Math.PI,
      tspeed: Math.random() * 0.02 + 0.005,
      drift: (Math.random() - 0.5) * 0.05,
    }));

    let last = 0;
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.twinkle += s.tspeed;
        s.x += s.drift;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        const a = s.base * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 244, 220, ${a})`;
        ctx.fill();

        if (s.r > 1.4 * window.devicePixelRatio) {
          // glow
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          g.addColorStop(0, `rgba(255, 244, 220, ${a * 0.4})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // occasional shooting star
      if (t - last > 4000 + Math.random() * 6000) {
        last = t;
        shooting.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.4,
          vx: (3 + Math.random() * 3) * window.devicePixelRatio,
          vy: (1 + Math.random() * 2) * window.devicePixelRatio,
          life: 1,
        });
      }
      shooting = shooting.filter(s => {
        s.x += s.vx; s.y += s.vy; s.life -= 0.012;
        if (s.life <= 0) return false;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        g.addColorStop(0, `rgba(255, 220, 150, ${s.life})`);
        g.addColorStop(1, 'rgba(255, 220, 150, 0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.8 * window.devicePixelRatio;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.stroke();
        return true;
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);
  return <canvas ref={ref} />;
}

// Mouse-parallax wrapper
function Parallax({ depth = 30, children, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `translate3d(${-x * depth}px, ${-y * depth}px, 0)`;
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [depth]);
  return <div ref={ref} style={{ ...style, transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1)' }}>{children}</div>;
}

function HeroScene() {
  return (
    <div className="hero__scene">
      {/* secondary phone left */}
      <Parallax depth={20} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-phone-secondary" style={{ transform: 'translateX(-160px) rotateY(15deg)' }}>
          <div className="iphone">
            <div className="iphone__island" />
            <div className="iphone__screen">
              <img src="images/shot-ramadan-lanterns.jpeg" alt="Ramadan lanterns theme" />
            </div>
          </div>
        </div>
      </Parallax>

      {/* secondary phone right */}
      <Parallax depth={20} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-phone-secondary right" style={{ transform: 'translateX(160px) rotateY(-15deg)' }}>
          <div className="iphone">
            <div className="iphone__island" />
            <div className="iphone__screen">
              <img src="images/shot-maghrib-dome.jpeg" alt="Maghrib mosque theme" />
            </div>
          </div>
        </div>
      </Parallax>

      <Parallax depth={50} style={{ position: 'absolute', inset: 0 }}>
        <CrescentSVG className="crescent" />
      </Parallax>

      <Parallax depth={40} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
        <div className="hero-phone-wrap">
          <div className="iphone">
            <div className="iphone__island" />
            <div className="iphone__screen">
              <img src="images/shot-isha-mosque.jpeg" alt="Ela-Salaty Isha screen" />
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

// Athan playback modal — embeds a cinematic Athan video
const ATHAN_VIDEO_SRC = 'video/athan.mp4';

function AthanModal({ t, lang, onClose }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Try to autoplay with sound; if the browser blocks it, fall back to muted.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        v.muted = false;
        await v.play();
      } catch {
        try {
          v.muted = true;
          await v.play();
        } catch {}
      }
    };
    tryPlay();
  }, []);

  return (
    <div className="athan-modal" onClick={onClose}>
      <div className="athan-modal__inner" onClick={e => e.stopPropagation()}>
        <button className="athan-modal__close" onClick={onClose} aria-label={t.athan.close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="athan-modal__video">
          <video
            ref={videoRef}
            src={ATHAN_VIDEO_SRC}
            controls
            playsInline
            preload="auto"
            poster="images/shot-isha-mosque.jpeg"
          />
        </div>

        <div className="athan-modal__caption">
          <div className="athan-modal__title">{t.athan.title}</div>
          <div className="athan-modal__sub">{t.athan.sub}</div>
          <div className="athan-wave" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ t, lang }) {
  const [showAthan, setShowAthan] = React.useState(false);
  // Split title into words for staggered animation
  const titleWords = [t.hero.title1, t.hero.title2, t.hero.title3];

  return (
    <section className="section section--hero" id="top">
      <div className="hero">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="dot" />
            <span>{t.hero.eyebrow}</span>
          </div>
          <h1 className="hero__title">
            <span className="word">{titleWords[0]}</span>
            {' '}
            <span className="word grad">{titleWords[1]}</span>
            {' '}
            <span className="word">{titleWords[2]}</span>
          </h1>
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__ctas">
            <a href="https://apps.apple.com/us/app/id586106611" target="_blank" rel="noreferrer" className="btn-primary">
              <Icons.Apple style={{ width: 18, height: 18 }} />
              {t.hero.ctaPrimary}
            </a>
            <button className="btn-ghost" type="button" onClick={() => setShowAthan(true)}>
              <Icons.Play style={{ width: 14, height: 14 }} />
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>

        <HeroScene />
      </div>

      <div className="scroll-cue">
        <span>{t.hero.scroll}</span>
        <span className="scroll-cue__line" />
      </div>

      {showAthan && <AthanModal t={t} lang={lang} onClose={() => setShowAthan(false)} />}
    </section>
  );
}

Object.assign(window, { Hero, StarField, Parallax });
