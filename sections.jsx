// All non-hero sections of the Ela-Salaty website

// =============================================================
// LIVE PRAYER TIMES — interactive, with countdown that updates
// =============================================================

// Sample prayer times for Cairo
const PRAYERS = [
  { key: 'fajr',    h: 4,  m: 21, ampm: 'AM' },
  { key: 'sunrise', h: 6,  m: 0,  ampm: 'AM' },
  { key: 'dhuhr',   h: 12, m: 52, ampm: 'PM' },
  { key: 'asr',     h: 16, m: 29, ampm: 'PM' },
  { key: 'maghrib', h: 19, m: 43, ampm: 'PM' },
  { key: 'isha',    h: 21, m: 11, ampm: 'PM' },
];

function pad(n) { return String(n).padStart(2, '0'); }

// Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) for AR display
function toArabicDigits(s) {
  const map = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  return String(s).replace(/[0-9]/g, d => map[+d]);
}

function fmtNum(n, lang) {
  return lang === 'ar' ? toArabicDigits(n) : String(n);
}

function fmtTime(p, lang) {
  const h12 = ((p.h + 11) % 12) + 1;
  return `${fmtNum(pad(h12), lang)}:${fmtNum(pad(p.m), lang)}`;
}

function LivePrayerTimes({ t, lang }) {
  const [now, setNow] = React.useState(new Date());
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const [pickedIdx, setPickedIdx] = React.useState(null);

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Find current state: which prayer is next or "current" (passed but next not yet)
  const state = React.useMemo(() => {
    const minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    let lastIdx = -1;
    PRAYERS.forEach((p, i) => {
      const pm = p.h * 60 + p.m;
      if (pm <= minutes) lastIdx = i;
    });
    const nextIdx = (lastIdx + 1) % PRAYERS.length;
    return { lastIdx, nextIdx, nowMinutes: minutes };
  }, [now]);

  // priority: picked > hovered > next
  const focusedIdx = pickedIdx ?? hoverIdx ?? state.nextIdx;
  const focusedP = PRAYERS[focusedIdx];

  // Compute countdown for the focused prayer
  const focusedCountdown = React.useMemo(() => {
    const fM = focusedP.h * 60 + focusedP.m;
    let diff = fM - state.nowMinutes;
    // If looking at the "next" prayer of the day, and it's tomorrow's (e.g. Fajr after Isha), wrap forward
    if (focusedIdx === state.nextIdx && diff < 0) diff += 24 * 60;
    const isPast = diff < 0;
    const abs = Math.abs(diff);
    const hh = Math.floor(abs / 60);
    const mm = Math.floor(abs % 60);
    const ss = Math.floor((abs * 60) % 60);
    return { isPast, hh, mm, ss };
  }, [focusedIdx, focusedP, state]);

  const labelText = focusedCountdown.isPast
    ? `${t.times.labels[focusedP.key]} ${t.times.began}`
    : `${t.times.remaining} ${t.times.labels[focusedP.key]}`;

  const countdown = `${fmtNum(pad(focusedCountdown.hh), lang)}:${fmtNum(pad(focusedCountdown.mm), lang)}:${fmtNum(pad(focusedCountdown.ss), lang)}`;

  return (
    <section className="section" id="prayers">
      <div className="times-block">
        <div className="reveal">
          <div className="eyebrow"><span className="eyebrow__text">{t.times.eyebrow}</span></div>
          <h2 className="h-section">{t.times.title}</h2>
          <p className="lede">{t.times.sub}</p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ padding: '14px 18px', border: '1px solid var(--line)', borderRadius: 16, background: 'var(--glass)', minWidth: 160 }}>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 4 }}>{t.times.now}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {fmtNum(pad(((now.getHours() + 11) % 12) + 1), lang)}:{fmtNum(pad(now.getMinutes()), lang)}
                <span style={{ fontSize: 12, color: 'var(--text-faint)', marginInlineStart: 6 }}>
                  {now.getHours() >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
            </div>
            <div style={{ padding: '14px 18px', border: '1px solid var(--brand-soft)', borderRadius: 16, background: 'rgba(255,174,0,0.06)', minWidth: 160 }}>
              <div style={{ fontSize: 12, color: 'var(--brand)', marginBottom: 4 }}>
                {t.times.remaining} {t.times.labels[PRAYERS[state.nextIdx].key]}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--brand)' }}>
                {countdown}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: phone-like card */}
        <div className="times-card reveal">
          <div className="times-card__head">
            <div className="times-card__city">
              <Icons.Pin style={{ width: 16, height: 16, color: 'var(--brand)' }} />
              {t.times.city}
            </div>
            <div className="times-card__date">
              {(() => {
                const months = lang === 'ar'
                  ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
                  : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                const d = now;
                return `${fmtNum(d.getDate(), lang)} ${months[d.getMonth()]} ${fmtNum(d.getFullYear(), lang)}`;
              })()}
            </div>
          </div>

          <div className="times-card__hero">
            <div className="times-card__label">
              {focusedCountdown.isPast
                ? (<><strong style={{ color: 'var(--brand)' }}>{t.times.labels[focusedP.key]}</strong> {t.times.began}</>)
                : (<>{t.times.remaining} <strong style={{ color: 'var(--brand)' }}>{t.times.labels[focusedP.key]}</strong></>)}
            </div>
            <div className="times-card__countdown">{countdown}</div>
            <div className="times-card__until">
              {fmtTime(focusedP, lang)} <span style={{ fontSize: 11, marginInlineStart: 4 }}>{focusedP.ampm}</span>
              {pickedIdx !== null && (
                <button
                  onClick={() => setPickedIdx(null)}
                  style={{ marginInlineStart: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--glass)', border: '1px solid var(--line)', fontSize: 10, fontWeight: 600, color: 'var(--text-dim)' }}
                >
                  {lang === 'ar' ? 'إلغاء' : 'Reset'}
                </button>
              )}
            </div>
          </div>

          <div className="times-row">
            {PRAYERS.map((p, i) => {
              const Icn = PrayerIconByName[p.key] || Icons.Dhuhr;
              const isActive = i === focusedIdx;
              const isPassed = i <= state.lastIdx && i !== focusedIdx;
              return (
                <div
                  key={p.key}
                  className={`times-cell ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onClick={() => setPickedIdx(pickedIdx === i ? null : i)}
                >
                  <Icn className="times-cell__icon" />
                  <div className="times-cell__timewrap">
                    <span className="times-cell__time">{fmtTime(p, lang)}</span>
                    <span className="times-cell__ampm">{p.ampm}</span>
                  </div>
                  <span className="times-cell__name">{t.times.labels[p.key]}</span>
                </div>
              );
            })}
          </div>
          <div className="times-tap-hint">{t.times.tapHint}</div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// QIBLA COMPASS — interactive draggable compass
// =============================================================

function QiblaCompass({ t, lang }) {
  // Qibla bearing from Cairo to Makkah ≈ 137.14° (clockwise from north)
  const QIBLA = 137.14;
  // dialRotation = how the user has rotated the dial (degrees, clockwise)
  // dial.N appears at angle (-dialRotation) on the screen (top = 0°, clockwise)
  // Kaaba appears at angle (QIBLA - dialRotation) on the screen
  const [dialRotation, setDialRotation] = React.useState(0);
  const dragRef = React.useRef({ active: false, startAng: 0, startRot: 0 });
  const stageRef = React.useRef(null);

  const getAngle = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const p = e.touches ? e.touches[0] : e;
    return Math.atan2(p.clientY - cy, p.clientX - cx) * 180 / Math.PI;
  };
  const onDown = (e) => {
    dragRef.current = { active: true, startAng: getAngle(e), startRot: dialRotation };
    e.preventDefault();
  };
  React.useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const a = getAngle(e);
      setDialRotation(dragRef.current.startRot + (a - dragRef.current.startAng));
    };
    const onUp = () => { dragRef.current.active = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  // Gentle idle drift
  React.useEffect(() => {
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = now - last; last = now;
      if (!dragRef.current.active) setDialRotation(r => r + dt * 0.004);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Angle from device-top (12 o'clock world) to Kaaba
  const angleFromTop = ((QIBLA - dialRotation) % 360 + 360) % 360;
  // Angle from device-top to N (for the N-needle on screen)
  const northFromTop = ((-dialRotation) % 360 + 360) % 360;

  return (
    <section className="section" id="qibla">
      <div className="qibla-block">
        <div className="qibla-stage" ref={stageRef}>
          <div className="qibla-ring qibla-ring--outer" />
          <div className="compass" onMouseDown={onDown} onTouchStart={onDown}>
            <svg
              className="compass__svg"
              viewBox="-100 -100 200 200"
              style={{ transform: `rotate(${dialRotation}deg)` }}
              aria-hidden="true"
            >
              {/* inner dashed circle */}
              <circle cx="0" cy="0" r="88" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" strokeDasharray="2 3" />
              <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="1 4" />

              {/* tick marks */}
              {Array.from({ length: 72 }).map((_, i) => {
                const ang = i * 5;
                const isMajor = i % 18 === 0; // 90°
                const isMid = i % 6 === 0;    // 30°
                const r1 = isMajor ? 76 : (isMid ? 80 : 84);
                const r2 = 92;
                const rad = ang * Math.PI / 180;
                const x1 = r1 * Math.sin(rad), y1 = -r1 * Math.cos(rad);
                const x2 = r2 * Math.sin(rad), y2 = -r2 * Math.cos(rad);
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={isMajor ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)'}
                    strokeWidth={isMajor ? 1.8 : (isMid ? 1.1 : 0.7)}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Cardinal labels — counter-rotated so they always read upright */}
              {[
                { l: 'N', ang: 0,   c: 'rgba(255,255,255,0.85)' },
                { l: 'E', ang: 90,  c: 'rgba(255,255,255,0.65)' },
                { l: 'S', ang: 180, c: 'rgba(255,255,255,0.65)' },
                { l: 'W', ang: 270, c: 'rgba(255,255,255,0.65)' },
              ].map(c => {
                const r = 66;
                const rad = c.ang * Math.PI / 180;
                const x = r * Math.sin(rad), y = -r * Math.cos(rad);
                return (
                  <text
                    key={c.l}
                    x={x} y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={c.c}
                    fontWeight="800"
                    fontSize="15"
                    transform={`rotate(${-dialRotation} ${x} ${y})`}
                    style={{ letterSpacing: '0.04em' }}
                  >{c.l}</text>
                );
              })}

              {/* N arrow on dial — removed per request */}

              {/* Kaaba marker — sits at QIBLA° clockwise from N */}
              <g transform={`rotate(${QIBLA}) translate(0, -78)`}>
                <g transform={`rotate(${-QIBLA - dialRotation})`}>
                  <rect x="-16" y="-16" width="32" height="32" rx="4"
                    fill="#0a0a0a"
                    stroke="#ffae00"
                    strokeWidth="2"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255,174,0,0.7))' }}
                  />
                  {/* Kiswa lines */}
                  <line x1="-14" y1="-2" x2="14" y2="-2" stroke="#ffae00" strokeWidth="2" />
                  <line x1="-14" y1="-8" x2="14" y2="-8" stroke="#ffae00" strokeWidth="1" opacity="0.6" />
                  <line x1="-14" y1="4" x2="14" y2="4" stroke="#ffae00" strokeWidth="1" opacity="0.6" />
                  <rect x="-3" y="-14" width="6" height="10" fill="#ffae00" opacity="0.4" />
                </g>
              </g>

              {/* Qibla guide line from center to Kaaba */}
              <line
                x1="0" y1="0"
                x2={62 * Math.sin(QIBLA * Math.PI / 180)}
                y2={-62 * Math.cos(QIBLA * Math.PI / 180)}
                stroke="#ffae00"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                opacity="0.5"
              />
            </svg>

            {/* Fixed device-top arrow (sits outside dial, points down into dial) */}
            <div className="compass__device-top" />
            <div className="compass__hub" />
          </div>
          <div className="compass__deg">
            {lang === 'ar' ? toArabicDigits(angleFromTop.toFixed(1)) : angleFromTop.toFixed(1)}° {t.qibla.to}
          </div>
        </div>

        <div className="reveal">
          <div className="eyebrow"><span className="eyebrow__text">{t.qibla.eyebrow}</span></div>
          <h2 className="h-section">{t.qibla.title}</h2>
          <p className="lede">{t.qibla.sub}</p>

          <div className="qibla-info">
            <div className="qibla-stat">
              <span className="qibla-stat__num">{lang === 'ar' ? toArabicDigits(QIBLA.toFixed(2)) : QIBLA.toFixed(2)}°</span>
              <span className="qibla-stat__label">{t.qibla.to} · {t.qibla.from} {t.times.city}</span>
            </div>
            <div className="qibla-stat">
              <span className="qibla-stat__num">{lang === 'ar' ? toArabicDigits(Math.round(northFromTop)) : Math.round(northFromTop)}°</span>
              <span className="qibla-stat__label">{lang === 'ar' ? 'الشمال من رأس الجهاز' : 'North from device top'}</span>
            </div>
            <div className="qibla-stat">
              <span className="qibla-stat__num">{lang === 'ar' ? toArabicDigits(Math.round(angleFromTop)) : Math.round(angleFromTop)}°</span>
              <span className="qibla-stat__label">{t.qibla.drag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// FEATURES GRID
// =============================================================

function Features({ t }) {
  const featured = t.features.cards[0];
  const rest = t.features.cards.slice(1);
  const FeaturedIcn = IconByName[featured.icon] || Icons.Athan;
  return (
    <section className="section" id="features">
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow__text">{t.features.eyebrow}</span></div>
        <h2 className="h-section">{t.features.title}</h2>
        <p className="lede" style={{ marginInline: 'auto' }}>{t.features.sub}</p>
      </div>

      <div className="features-grid reveal-stagger">
        <div className="feature-card feature-card--feat">
          <div className="feature-card__icon" style={{ width: 64, height: 64 }}>
            <FeaturedIcn />
          </div>
          <div>
            <h3 className="feature-card__title">{featured.title}</h3>
            <p className="feature-card__desc">{featured.desc}</p>
          </div>
        </div>
        {rest.map((c, i) => {
          const Icn = IconByName[c.icon] || Icons.Themes;
          return (
            <div key={i} className="feature-card">
              <div className="feature-card__icon"><Icn /></div>
              <div>
                <h3 className="feature-card__title">{c.title}</h3>
                <p className="feature-card__desc">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// =============================================================
// THEMES SHOWCASE
// =============================================================

const THEME_IMAGES = [
  'images/shot-isha-mosque.jpeg',
  'images/shot-maghrib-dome.jpeg',
  'images/shot-ramadan-lanterns.jpeg',
  'images/shot-fajr-cartoon.jpeg',
];

function Themes({ t }) {
  return (
    <section className="section" id="themes">
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow__text">{t.themes.eyebrow}</span></div>
        <h2 className="h-section">{t.themes.title}</h2>
        <p className="lede" style={{ marginInline: 'auto' }}>{t.themes.sub}</p>
      </div>

      <div className="themes-rail reveal-stagger">
        {t.themes.list.map((theme, i) => (
          <div className="theme-card" key={i}>
            <img src={THEME_IMAGES[i]} alt={theme.name} />
            <div className="theme-card__cap">
              <div className="theme-card__name">{theme.name}</div>
              <div className="theme-card__sub">{theme.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================================
// REVIEWS
// =============================================================

function Reviews({ t }) {
  return (
    <section className="section" id="reviews">
      <div className="reveal" style={{ maxWidth: 760 }}>
        <div className="eyebrow"><span className="eyebrow__text">{t.reviews.eyebrow}</span></div>
        <h2 className="h-section">{t.reviews.title}</h2>
        <p className="lede">{t.reviews.sub}</p>
      </div>

      <div className="stats-row reveal-stagger">
        {t.reviews.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat__num">{s.num}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="quotes-grid reveal-stagger">
        {t.reviews.quotes.map((q, i) => (
          <div className="quote" key={i} dir={q.dir || 'inherit'}>
            <div className="quote__stars">
              {Array.from({ length: q.stars }).map((_, j) => <Icons.Star key={j} />)}
            </div>
            <h3 className="quote__title">{q.title}</h3>
            <p className="quote__body">{q.body}</p>
            <div className="quote__by">— {q.by}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================================
// PRIVACY
// =============================================================

function Privacy({ t }) {
  return (
    <section className="section" id="privacy">
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow__text">{t.privacy.eyebrow}</span></div>
        <h2 className="h-section">{t.privacy.title}</h2>
        <p className="lede" style={{ marginInline: 'auto' }}>{t.privacy.sub}</p>
      </div>

      <div className="privacy-grid reveal-stagger">
        {t.privacy.points.map((p, i) => (
          <div className="privacy-card" key={i}>
            <div className="privacy-card__num">{p.num}</div>
            <div className="privacy-card__label">{p.label}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <span className="privacy-verified">
          <Icons.Check style={{ width: 16, height: 16 }} />
          {t.privacy.verified}
        </span>
      </div>
    </section>
  );
}

// =============================================================
// GALLERY (App Store screenshots)
// =============================================================

const ALL_SHOTS = [
  'images/shot-isha-mosque.jpeg',
  'images/shot-maghrib-dome.jpeg',
  'images/shot-ramadan-lanterns.jpeg',
  'images/shot-fajr-cartoon.jpeg',
  'images/shot-times-list.jpeg',
  'images/shot-athkar.jpeg',
  'images/shot-qibla.jpeg',
];

function Gallery({ t }) {
  return (
    <section className="section section--tight" id="gallery">
      <div className="reveal" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow__text">{t.gallery.eyebrow}</span></div>
        <h2 className="h-section">{t.gallery.title}</h2>
        <p className="lede" style={{ marginInline: 'auto' }}>{t.gallery.sub}</p>
      </div>

      <div className="gallery-scroller">
        {ALL_SHOTS.map((s, i) => (
          <div className="gallery-item" key={i}>
            <img src={s} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================================
// CTA + FOOTER
// =============================================================

function CtaFooter({ t }) {
  return (
    <>
      <section className="cta-section" id="download">
        <div className="reveal">
          <h2 className="h-display">{t.cta.title}</h2>
          <p className="lede" style={{ marginInline: 'auto' }}>{t.cta.sub}</p>
          <a href="https://apps.apple.com/us/app/id586106611" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '18px 32px', fontSize: 16 }}>
            <Icons.Apple style={{ width: 20, height: 20 }} />
            {t.cta.btn}
          </a>
          <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 16 }}>{t.cta.sub2}</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer__brand">
            <img src="images/icon.png" alt="" />
            <span>{t.footer.tag}</span>
          </div>
          <nav className="footer__links">
            <a href="https://apps.apple.com/us/app/id586106611" target="_blank" rel="noreferrer">{t.footer.links.appstore}</a>
            <a href="mailto:info@iPhoneIslam.com">{t.footer.links.contact}</a>
            <a href="https://apps.apple.com/us/developer/i4islam/id301048985" target="_blank" rel="noreferrer">{t.footer.links.moreApps}</a>
          </nav>
          <div className="footer__copy">{t.footer.copy}</div>
          <div className="footer__note">{t.footer.note}</div>
        </div>
      </footer>
    </>
  );
}

Object.assign(window, { LivePrayerTimes, QiblaCompass, Features, Themes, Reviews, Privacy, Gallery, CtaFooter });
