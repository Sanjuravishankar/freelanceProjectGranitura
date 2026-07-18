"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Destinations ── */
const DESTINATIONS = [
  {
    id: "usa", label: "United States", short: "USA",
    cx: 148, cy: 148,
    stat: "12+ Years", statLabel: "Trade Partner",
    detail: "Premium granite slabs for residential & commercial projects across 14 US states.",
    flag: "🇺🇸", color: "#d4bc8a",
  },
  {
    id: "uk", label: "United Kingdom", short: "UK",
    cx: 368, cy: 100,
    stat: "£18M+", statLabel: "Annual Export",
    detail: "High-spec stone for London developments, heritage projects & luxury interiors.",
    flag: "🇬🇧", color: "#c8dfd1",
  },
  {
    id: "uae", label: "United Arab Emirates", short: "UAE",
    cx: 530, cy: 180,
    stat: "AED 40M+", statLabel: "Annual Export",
    detail: "Luxury stone for landmark towers, hotels, and high-end interiors in the Gulf.",
    flag: "🇦🇪", color: "#d4bc8a",
  },
  {
    id: "saudi", label: "Saudi Arabia", short: "KSA",
    cx: 510, cy: 200,
    stat: "Vision 2030", statLabel: "Key Partner",
    detail: "Supplying premium granite for NEOM and Saudi Arabia's megaproject boom.",
    flag: "🇸🇦", color: "#c8dfd1",
  },
];

const ORIGIN = { cx: 592, cy: 205 };

function arcPath(x1, y1, x2, y2, bend = -40) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + bend;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

function ArcRoute({ dest, originX, originY, linesVisible, active, delay }) {
  const pathRef = useRef(null);
  const [pathLen, setPathLen] = useState(600);
  const [dotPos, setDotPos] = useState({ x: originX, y: originY });
  const animRef = useRef(null);
  const startRef = useRef(null);

  const bend = dest.cx < originX ? -55 : dest.cy < originY - 30 ? -70 : -30;
  const d = arcPath(originX, originY, dest.cx, dest.cy, bend);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  // useEffect(() => {
  //   if (!linesVisible || !pathRef.current) return;
  //   const duration = 2800 + delay * 400;
  //   const animate = (ts) => {
  //     if (!startRef.current) startRef.current = ts;
  //     const elapsed = (ts - startRef.current) % (duration + 1200);
  //     if (elapsed < duration) {
  //       const t = elapsed / duration;
  //       const pt = pathRef.current.getPointAtLength(t * pathLen);
  //       setDotPos({ x: pt.x, y: pt.y });
  //     }
  //     animRef.current = requestAnimationFrame(animate);
  //   };
  //   const raf = setTimeout(() => { animRef.current = requestAnimationFrame(animate); }, delay * 300 + 1800);
  //   return () => { clearTimeout(raf); if (animRef.current) cancelAnimationFrame(animRef.current); };
  // }, [linesVisible, pathLen, delay]);


  useEffect(() => {
  if (!linesVisible) return;
  if (!pathRef.current) return;
  if (pathLen <= 0) return;

  const duration = 2800 + delay * 400;

  let animationId;

  const animate = (ts) => {
    // Path might be unmounted
    if (!pathRef.current) return;

    if (!startRef.current) {
      startRef.current = ts;
    }

    const elapsed = (ts - startRef.current) % (duration + 1200);

    if (elapsed < duration) {
      const t = elapsed / duration;
      const length = t * pathLen;

      const pt = pathRef.current.getPointAtLength(length);

      setDotPos({
        x: pt.x,
        y: pt.y,
      });
    }

    animationId = requestAnimationFrame(animate);
    animRef.current = animationId;
  };

  const timeout = setTimeout(() => {
    animationId = requestAnimationFrame(animate);
  }, delay * 300 + 1800);

  return () => {
    clearTimeout(timeout);

    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    startRef.current = null;
  };
}, [linesVisible, pathLen, delay]);
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(74,138,94,0.15)" strokeWidth="1.2" />
      <path
        ref={pathRef} d={d} fill="none"
        stroke="url(#routeGrad)"
        strokeWidth={active ? "2" : "1.4"}
        strokeDasharray={`${pathLen}`}
        strokeDashoffset={linesVisible ? "0" : `${pathLen}`}
        style={{ transition: `stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) ${delay * 0.35}s` }}
        strokeLinecap="round" opacity={active ? 1 : 0.7}
      />
      {linesVisible && (
        <circle cx={dotPos.x} cy={dotPos.y} r="2.5" fill="#d4bc8a" filter="url(#glow)" opacity="0.9" />
      )}
    </g>
  );
}

/* ── Hook: detect viewport width ── */
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

export default function Export() {
  const [active, setActive] = useState(null);
  const [linesVisible, setLinesVisible] = useState(false);
  const [nodesVisible, setNodesVisible] = useState(false);
  const width = useWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  useEffect(() => {
    const t1 = setTimeout(() => setLinesVisible(true), 400);
    const t2 = setTimeout(() => setNodesVisible(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section style={r.section}>
      <style>{`
        @media (max-width: 639px) {
          .cards-row  { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .stats-bar  { grid-template-columns: 1fr 1fr !important; gap: 0 !important; }
          .stat-item  { border-right: none !important; border-bottom: 1px solid rgba(184,160,112,0.12) !important; padding: 14px 8px !important; }
          .stat-item:nth-child(odd)  { border-right: 1px solid rgba(74,138,94,0.2) !important; }
          .stat-item:nth-child(3),
          .stat-item:nth-child(4)    { border-bottom: none !important; }
          .cta-row    { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
          .cta-btn    { width: 100% !important; justify-content: center !important; }
          .map-wrap   { padding: 8px 6px 2px !important; }
          .heading    { font-size: clamp(1.5rem,7vw,2.4rem) !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .cards-row  { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .stats-bar  { grid-template-columns: repeat(4,1fr) !important; }
        }
        .card-btn:hover  { transform: translateY(-3px); border-color: rgba(184,160,112,0.5) !important; background: rgba(35,72,48,0.75) !important; box-shadow: 0 8px 28px rgba(0,0,0,0.28), 0 0 18px rgba(184,160,112,0.07) !important; }
        .cta-btn:hover   { opacity: 0.88; transform: translateY(-1px); }
        * { box-sizing: border-box; }
      `}</style>

      {/* Decorative blobs */}
      <div style={r.glow1} />
      <div style={r.glow2} />
      <div style={r.noise} />

      <div style={r.container}>

        {/* ── Header ── */}
        <div style={r.header}>
          <div style={r.eyebrowRow}>
            <div style={r.eyebrowLine} />
            <span style={r.eyebrow}>Global Export Network</span>
            <div style={r.eyebrowLine} />
          </div>
          <h2 className="heading" style={r.heading}>
            Carved in India.<br />
            <em style={r.headingAccent}>Trusted Worldwide.</em>
          </h2>
          <p style={r.sub}>
            Granitura delivers premium natural granite from India's finest quarries
            to four of the world's most demanding markets — on time, every time.
          </p>
        </div>

        {/* ── Map ── */}
        <div className="map-wrap" style={r.mapWrap}>
          <svg
            viewBox="0 0 860 420" style={r.mapSvg}
            aria-label="Granitura world export map"
          >
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#b8a070" stopOpacity="0.3" />
                <stop offset="40%"  stopColor="#d4bc8a" stopOpacity="1" />
                <stop offset="100%" stopColor="#4a8a5e" stopOpacity="0.4" />
              </linearGradient>
              <radialGradient id="originGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#d4bc8a" stopOpacity="1" />
                <stop offset="60%"  stopColor="#b8a070" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#b8a070" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="destGlowGold" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#d4bc8a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d4bc8a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="destGlowGreen" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#4a8a5e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4a8a5e" stopOpacity="0" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {[80,140,200,260,320,380].map(y => (
              <line key={y} x1="20" y1={y} x2="840" y2={y} stroke="#2d5a3d" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 9"/>
            ))}
            {[80,160,240,320,400,480,560,640,720,800].map(x => (
              <line key={x} x1={x} y1="20" x2={x} y2="410" stroke="#2d5a3d" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 9"/>
            ))}

            {/* ── Landmasses ── */}
            {/* North America */}
            <path d="M68,62 L82,56 L105,52 L128,54 L148,50 L168,54 L190,58 L210,62 L225,70 L235,84 L240,98 L238,114 L230,128 L222,140 L215,150 L208,162 L200,172 L192,178 L180,182 L168,180 L154,172 L144,164 L132,158 L118,152 L104,148 L90,142 L76,132 L66,120 L60,106 L60,90 Z" fill="#253d2e" stroke="#2d5a3d" strokeWidth="0.8" opacity="0.85"/>
            <path d="M62,72 L52,68 L44,72 L46,80 L58,82 Z" fill="#253d2e" opacity="0.7"/>
            <path d="M290,28 L308,24 L322,30 L326,44 L318,56 L302,60 L288,54 L282,40 Z" fill="#253d2e" opacity="0.6"/>
            <path d="M160,180 L168,188 L172,198 L168,206 L162,200 L156,190 Z" fill="#253d2e" opacity="0.75"/>
            {/* South America */}
            <path d="M168,206 L180,202 L196,206 L210,214 L220,228 L226,246 L228,268 L222,290 L212,312 L200,330 L188,342 L176,346 L164,338 L156,320 L150,296 L150,270 L154,248 L158,228 L162,214 Z" fill="#253d2e" stroke="#2d5a3d" strokeWidth="0.8" opacity="0.82"/>
            <path d="M330,74 L342,70 L350,76 L346,84 L334,82 Z" fill="#253d2e" opacity="0.55"/>
            {/* UK */}
            <path d="M356,92 L366,88 L376,92 L378,102 L372,110 L362,112 L354,106 L352,98 Z" fill="#3a6b4a" stroke="#4a8a5e" strokeWidth="1" opacity="0.95"/>
            <path d="M348,100 L356,96 L358,106 L350,108 Z" fill="#2d5a3d" opacity="0.7"/>
            {/* Europe */}
            <path d="M376,90 L392,82 L412,80 L432,82 L448,88 L460,96 L464,108 L458,118 L448,124 L436,128 L424,130 L412,128 L400,124 L388,118 L378,110 L374,100 Z" fill="#253d2e" stroke="#2d5a3d" strokeWidth="0.8" opacity="0.85"/>
            <path d="M420,62 L434,54 L446,58 L448,72 L440,82 L428,84 L418,78 L416,68 Z" fill="#253d2e" opacity="0.75"/>
            {/* Africa */}
            <path d="M388,128 L408,126 L428,128 L448,134 L460,146 L466,162 L468,180 L466,200 L460,220 L452,240 L440,260 L426,276 L412,286 L396,290 L380,284 L368,268 L360,248 L356,224 L356,200 L360,178 L366,158 L372,142 L380,132 Z" fill="#253d2e" stroke="#2d5a3d" strokeWidth="0.8" opacity="0.82"/>
            <path d="M464,248 L472,240 L476,252 L474,266 L466,268 L460,258 Z" fill="#253d2e" opacity="0.6"/>
            {/* Middle East */}
            <path d="M468,140 L490,136 L512,138 L530,144 L542,156 L544,170 L538,184 L526,196 L512,204 L498,208 L484,206 L470,198 L460,184 L458,168 L462,154 Z" fill="#2d5a3d" stroke="#3a6b4a" strokeWidth="0.8" opacity="0.9"/>
            <path d="M510,116 L540,110 L566,114 L576,126 L570,138 L548,142 L522,140 L508,130 Z" fill="#253d2e" opacity="0.7"/>
            {/* India — highlighted */}
            <path d="M564,166 L582,160 L600,162 L614,170 L620,184 L618,200 L610,218 L598,232 L584,240 L570,238 L558,226 L550,210 L548,194 L552,178 Z" fill="#2d5a3d" stroke="#4a8a5e" strokeWidth="1.5" opacity="0.95"/>
            <path d="M590,244 L596,240 L598,250 L592,252 Z" fill="#2d5a3d" opacity="0.7"/>
            {/* Russia */}
            <path d="M430,52 L470,38 L520,30 L580,28 L640,34 L700,40 L750,48 L790,60 L800,76 L780,88 L740,96 L700,100 L660,104 L620,106 L580,104 L540,100 L500,96 L460,92 L430,84 L416,72 Z" fill="#253d2e" opacity="0.72"/>
            {/* China */}
            <path d="M620,106 L660,100 L700,102 L730,112 L744,126 L738,142 L720,154 L698,158 L674,156 L652,148 L636,136 L624,122 Z" fill="#253d2e" opacity="0.78"/>
            {/* SE Asia */}
            <path d="M648,160 L672,154 L694,158 L706,170 L700,184 L684,192 L668,192 L652,182 L644,170 Z" fill="#253d2e" opacity="0.72"/>
            <path d="M700,162 L712,158 L718,168 L716,184 L708,192 L700,186 L696,174 Z" fill="#253d2e" opacity="0.7"/>
            <path d="M680,226 L700,218 L720,220 L730,230 L720,238 L700,236 L682,230 Z" fill="#253d2e" opacity="0.6"/>
            <path d="M734,228 L754,222 L762,230 L756,240 L738,240 Z" fill="#253d2e" opacity="0.6"/>
            <path d="M746,104 L756,96 L764,100 L762,114 L752,118 L744,112 Z" fill="#253d2e" opacity="0.65"/>
            {/* Australia */}
            <path d="M696,286 L726,274 L758,272 L786,280 L800,298 L798,320 L784,338 L760,350 L732,352 L706,340 L690,320 L686,300 Z" fill="#253d2e" opacity="0.7"/>
            <path d="M798,342 L808,334 L812,346 L806,356 L798,352 Z" fill="#253d2e" opacity="0.55"/>

            {/* Equator */}
            <line x1="20" y1="230" x2="840" y2="230" stroke="#4a8a5e" strokeWidth="0.8" opacity="0.25" strokeDasharray="1 0"/>
            <text x="26" y="228" fontSize="7" fill="#4a8a5e" opacity="0.4" fontFamily="Arial,sans-serif">EQUATOR</text>

            {/* ── Arcs ── */}
            {DESTINATIONS.map((dest, i) => (
              <ArcRoute key={dest.id} dest={dest}
                originX={ORIGIN.cx} originY={ORIGIN.cy}
                linesVisible={linesVisible} nodesVisible={nodesVisible}
                active={active === dest.id} delay={i}
              />
            ))}

            {/* ── Origin node — India ── */}
            <circle cx={ORIGIN.cx} cy={ORIGIN.cy} r={30} fill="url(#originGlow)"
              opacity={nodesVisible ? 0.8 : 0} style={{ transition: "opacity 0.8s ease" }}/>
            {nodesVisible && (
              <circle cx={ORIGIN.cx} cy={ORIGIN.cy} r="14" fill="none" stroke="#d4bc8a" strokeWidth="1" opacity="0.4">
                <animate attributeName="r" values="10;22;10" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite"/>
              </circle>
            )}
            <circle cx={ORIGIN.cx} cy={ORIGIN.cy} r="8" fill="#d4bc8a" filter="url(#glow)"
              opacity={nodesVisible ? 1 : 0} style={{ transition: "opacity 0.5s ease" }}/>
            <circle cx={ORIGIN.cx} cy={ORIGIN.cy} r="4" fill="#fff"
              opacity={nodesVisible ? 1 : 0} style={{ transition: "opacity 0.5s ease" }}/>
            <text x={ORIGIN.cx} y={ORIGIN.cy - 16} textAnchor="middle" fontSize="8.5"
              fill="#d4bc8a" fontFamily="Georgia,serif" letterSpacing="1.5" fontWeight="bold"
              opacity={nodesVisible ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.3s" }}>
              INDIA
            </text>

            {/* ── Destination nodes ── */}
            {DESTINATIONS.map((d, i) => {
              const isActive = active === d.id;
              const glowId = d.color === "#d4bc8a" ? "destGlowGold" : "destGlowGreen";
              // nudge KSA label down to avoid UAE overlap
              const labelY = d.id === "saudi" ? d.cy + 18 : d.cy - 14;
              return (
                <g key={d.id} style={{ cursor: "pointer" }}
                  onClick={() => setActive(active === d.id ? null : d.id)}>
                  {isActive && nodesVisible && (
                    <circle cx={d.cx} cy={d.cy} r="10" fill="none" stroke={d.color} strokeWidth="1.5">
                      <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <circle cx={d.cx} cy={d.cy} r={isActive ? 28 : 22} fill={`url(#${glowId})`}
                    opacity={nodesVisible ? (isActive ? 1 : 0.65) : 0}
                    style={{ transition: `opacity 0.5s ease ${0.12 * i}s` }}/>
                  <circle cx={d.cx} cy={d.cy} r={isActive ? 8 : 6}
                    fill={isActive ? d.color : "#2d5a3d"} stroke={d.color}
                    strokeWidth={isActive ? "2" : "1.5"} filter="url(#glow)"
                    opacity={nodesVisible ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${0.12 * i}s, fill 0.3s` }}/>
                  <circle cx={d.cx} cy={d.cy} r="3" fill="#fff"
                    opacity={nodesVisible ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${0.12 * i}s` }}/>
                  <text x={d.cx} y={labelY} textAnchor="middle" fontSize="8"
                    fill={isActive ? d.color : "#c8dfd1"}
                    fontFamily="Georgia,serif" letterSpacing="1"
                    fontWeight={isActive ? "bold" : "normal"}
                    opacity={nodesVisible ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${0.15 * i}s, fill 0.3s` }}>
                    {d.short}
                  </text>
                </g>
              );
            })}
          </svg>

          <p style={r.mapCaption}>◦ Tap a node on the map or select a market below</p>
        </div>

        {/* ── Destination Cards ── */}
        <div className="cards-row" style={r.cardsRow}>
          {DESTINATIONS.map((d) => {
            const isActive = active === d.id;
            return (
              <button key={d.id} className="card-btn"
                style={{
                  ...r.card,
                  ...(isActive ? r.cardActive : {}),
                }}
                onClick={() => setActive(isActive ? null : d.id)}
              >
                <div style={r.cardTop}>
                  <span style={r.cardFlag}>{d.flag}</span>
                  <span style={{ ...r.cardBadge, borderColor: d.color, color: d.color }}>{d.short}</span>
                </div>
                <span style={r.cardLabel}>{d.label}</span>
                <div style={{ ...r.cardDivider, background: `linear-gradient(to right, ${d.color}, transparent)` }}/>
                <span style={{ ...r.cardStat, color: d.color }}>{d.stat}</span>
                <span style={r.cardStatLabel}>{d.statLabel}</span>

                {/* Expandable detail */}
                <div style={{
                  ...r.cardDetail,
                  maxHeight: isActive ? "120px" : "0",
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? "10px" : "0",
                }}>
                  {d.detail}
                </div>

                {/* Bottom accent line */}
                <div style={{ ...r.cardIndicator, opacity: isActive ? 1 : 0 }}/>
              </button>
            );
          })}
        </div>

        {/* ── Stats Bar ── */}
        <div className="stats-bar" style={r.statsBar}>
          {[
            { num: "4",       label: "Export Markets" },
            { num: "500+",    label: "Tons / Month" },
            { num: "ISO 9001",label: "Certified" },
            { num: "24 / 7",  label: "Export Desk" },
          ].map((s, i) => (
            <div key={s.label} className="stat-item" style={{
              ...r.statItem,
              borderRight: i < 3 ? "1px solid rgba(74,138,94,0.2)" : "none",
            }}>
              <span style={r.statNum}>{s.num}</span>
              <span style={r.statL}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="cta-row" style={r.ctaRow}>
          <p style={r.ctaText}>
            Ready to source premium granite for your next project?
          </p>
          <Link href="/export-quote" className="cta-btn" style={r.ctaBtn}>
            Request Export Quote&nbsp;&nbsp;→
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ─── Styles ─── */
const r = {
  section: {
    position: "relative",
    background: "linear-gradient(155deg, #0f2318 0%, #1a3a2a 40%, #0d1f14 100%)",
    padding: "clamp(44px,8vw,80px) clamp(16px,5vw,40px) clamp(44px,8vw,72px)",
    overflow: "hidden",
    fontFamily: "Georgia,'Times New Roman',serif",
  },
  noise: {
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
    opacity: 0.4,
  },
  glow1: {
    position: "absolute", width: "min(500px,80vw)", height: "min(500px,80vw)",
    borderRadius: "50%", top: "-100px", left: "-100px",
    background: "radial-gradient(circle, rgba(74,138,94,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glow2: {
    position: "absolute", width: "min(400px,70vw)", height: "min(400px,70vw)",
    borderRadius: "50%", bottom: "-80px", right: "-60px",
    background: "radial-gradient(circle, rgba(184,160,112,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1,
  },

  /* Header */
  header: { textAlign: "center", marginBottom: "clamp(28px,5vw,44px)" },
  eyebrowRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "14px", marginBottom: "18px",
  },
  eyebrowLine: {
    height: "1px", width: "clamp(28px,5vw,48px)",
    background: "linear-gradient(to right, transparent, #b8a070)",
  },
  eyebrow: {
    fontSize: "clamp(8px,2vw,10px)", letterSpacing: "3.5px",
    textTransform: "uppercase", color: "#b8a070",
    fontFamily: "Arial,sans-serif",
  },
  heading: {
    fontSize: "clamp(1.6rem,5vw,3.2rem)", fontWeight: "700",
    color: "#f9faf8", lineHeight: "1.12",
    marginBottom: "14px", letterSpacing: "-0.5px",
  },
  headingAccent: { color: "#d4bc8a", fontStyle: "italic", fontWeight: "400" },
  sub: {
    fontSize: "clamp(0.82rem,2.2vw,0.97rem)", color: "#c8dfd1",
    maxWidth: "540px", margin: "0 auto", lineHeight: "1.78",
    fontFamily: "Arial,sans-serif", fontWeight: "300",
  },

  /* Map */
  mapWrap: {
    background: "linear-gradient(180deg, rgba(10,26,16,0.85) 0%, rgba(15,35,24,0.7) 100%)",
    border: "1px solid rgba(74,138,94,0.25)", borderRadius: "6px",
    padding: "12px 12px 4px", marginBottom: "8px",
    boxShadow: "0 0 60px rgba(45,90,61,0.15), inset 0 1px 0 rgba(184,160,112,0.1)",
  },
  mapSvg: { width: "100%", height: "auto", display: "block" },
  mapCaption: {
    textAlign: "center", fontSize: "clamp(8px,2vw,10px)", color: "#4a6a54",
    fontFamily: "Arial,sans-serif", letterSpacing: "0.8px", padding: "6px 0 4px",
  },

  /* Cards */
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "12px", marginTop: "20px", marginBottom: "28px",
  },
  card: {
    background: "rgba(20,46,30,0.6)",
    border: "1px solid rgba(74,138,94,0.25)",
    borderRadius: "4px",
    padding: "clamp(14px,3vw,20px) clamp(12px,2.5vw,18px) clamp(12px,3vw,16px)",
    cursor: "pointer", textAlign: "left",
    display: "flex", flexDirection: "column", gap: "3px",
    transition: "border-color 0.3s, background 0.3s, transform 0.25s, box-shadow 0.3s",
    fontFamily: "inherit", color: "inherit",
    position: "relative", overflow: "hidden",
    WebkitTapHighlightColor: "transparent",
  },
  cardActive: {
    border: "1px solid rgba(184,160,112,0.55)",
    background: "rgba(35,72,48,0.7)",
    transform: "translateY(-3px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(184,160,112,0.08)",
  },
  cardTop: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", marginBottom: "6px",
  },
  cardFlag: { fontSize: "clamp(16px,4vw,22px)" },
  cardBadge: {
    fontSize: "clamp(7px,1.8vw,9px)", letterSpacing: "2px",
    fontFamily: "Arial,sans-serif", border: "1px solid",
    padding: "2px 6px", borderRadius: "2px",
  },
  cardLabel: {
    fontSize: "clamp(0.72rem,2vw,0.88rem)", fontWeight: "700",
    color: "#f9faf8", letterSpacing: "-0.1px",
  },
  cardDivider: { width: "24px", height: "1px", margin: "7px 0" },
  cardStat: {
    fontSize: "clamp(1rem,3vw,1.3rem)", fontWeight: "700",
    letterSpacing: "-0.5px", lineHeight: "1",
  },
  cardStatLabel: {
    fontSize: "clamp(8px,2vw,9.5px)", color: "#7a9080",
    fontFamily: "Arial,sans-serif", letterSpacing: "0.5px", marginTop: "1px",
  },
  cardDetail: {
    fontSize: "clamp(10px,2.2vw,11.5px)", color: "#c8dfd1",
    fontFamily: "Arial,sans-serif", lineHeight: "1.65", overflow: "hidden",
    transition: "max-height 0.4s ease, opacity 0.35s ease, margin-top 0.3s ease",
  },
  cardIndicator: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
    background: "linear-gradient(to right, #b8a070, #d4bc8a, transparent)",
    transition: "opacity 0.3s",
  },

  /* Stats bar */
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    borderTop: "1px solid rgba(184,160,112,0.15)",
    borderBottom: "1px solid rgba(184,160,112,0.15)",
    padding: "clamp(14px,3vw,22px) 0",
    marginBottom: "clamp(28px,5vw,40px)",
  },
  statItem: {
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "4px",
    padding: "0 clamp(4px,1.5vw,8px)",
  },
  statNum: {
    fontSize: "clamp(1.1rem,3.5vw,1.45rem)", fontWeight: "700",
    color: "#d4bc8a", letterSpacing: "-0.5px",
  },
  statL: {
    fontSize: "clamp(7px,1.8vw,9.5px)", color: "#7a9080",
    fontFamily: "Arial,sans-serif", letterSpacing: "0.8px",
    textAlign: "center", textTransform: "uppercase",
  },

  /* CTA */
  ctaRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", flexWrap: "wrap",
    gap: "clamp(14px,3vw,16px)",
  },
  ctaText: {
    fontSize: "clamp(0.82rem,2.2vw,0.97rem)", color: "#c8dfd1",
    fontFamily: "Arial,sans-serif", fontWeight: "300",
    maxWidth: "380px",
  },
  ctaBtn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(135deg, #a8904a 0%, #d4bc8a 50%, #a8904a 100%)",
    color: "#1a3a2a",
    padding: "clamp(11px,2.5vw,13px) clamp(20px,4vw,30px)",
    fontSize: "clamp(9px,2.2vw,11px)",
    fontFamily: "Arial,sans-serif", fontWeight: "700",
    letterSpacing: "2px", textTransform: "uppercase",
    textDecoration: "none", borderRadius: "2px",
    boxShadow: "0 4px 20px rgba(184,160,112,0.25)",
    transition: "opacity 0.2s, transform 0.2s",
    whiteSpace: "nowrap",
  },
};