import React from 'react';

export const HeroIllustration: React.FC = () => {
  const starBadges = [
    {
      letter: 'S',
      title: 'Situation',
      bg: '#FFB800',
      posClass: 'star-pos-s'
    },
    {
      letter: 'T',
      title: 'Task',
      bg: '#DDD6FE',
      posClass: 'star-pos-t'
    },
    {
      letter: 'A',
      title: 'Action',
      bg: '#A7F3D0',
      posClass: 'star-pos-a'
    },
    {
      letter: 'R',
      title: 'Result',
      bg: '#FDE047',
      posClass: 'star-pos-r'
    }
  ];

  return (
    <div className="hero-illustration-wrapper">
      {/* Neo-brutalist Chunky SWE Letters (SVG Layer) */}
      <svg
        viewBox="0 0 520 440"
        className="swe-letters-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="sweDropShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="4.5" dy="4.5" stdDeviation="0" floodColor="#121826" floodOpacity="1" />
          </filter>
          <filter id="sweDropShadowSm" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="3" dy="3" stdDeviation="0" floodColor="#121826" floodOpacity="1" />
          </filter>
        </defs>

        {/* Playful Neo-Brutalist Background Sparks & Floating Geometric Accents */}
        <g opacity="0.85">
          {/* Top-left Sparkle */}
          <path
            d="M 25 35 Q 25 48 12 48 Q 25 48 25 61 Q 25 48 38 48 Q 25 48 25 35 Z"
            fill="#FFB800"
            stroke="#121826"
            strokeWidth="2"
          />
          {/* Top-center Sparkle */}
          <path
            d="M 260 12 Q 260 22 250 22 Q 260 22 260 32 Q 260 22 270 22 Q 260 22 260 12 Z"
            fill="#DDD6FE"
            stroke="#121826"
            strokeWidth="1.8"
          />
          {/* Top-right Star Accent */}
          <circle cx="495" cy="35" r="7" fill="#FF7AC6" stroke="#121826" strokeWidth="2" />
          <circle cx="485" cy="20" r="3" fill="#121826" />

          {/* Lower Accents */}
          <circle cx="18" cy="260" r="6" fill="#A7F3D0" stroke="#121826" strokeWidth="2" />
          <rect x="502" y="260" width="10" height="10" rx="2" fill="#FFB800" stroke="#121826" strokeWidth="2" transform="rotate(25 507 265)" />
        </g>

        {/* ======================================================== */}
        {/* LETTER 'S' (LEFT COLUMN: Unmistakable Block Capital S)   */}
        {/* ======================================================== */}
        <g filter="url(#sweDropShadow)">
          {/* Black Outer Outline */}
          <path
            d="M 142 108 C 142 66, 120 48, 89 48 C 54 48, 34 72, 34 116 C 34 165, 66 188, 89 204 C 114 222, 144 246, 144 296 C 144 345, 122 384, 89 384 C 54 384, 34 358, 34 316"
            fill="none"
            stroke="#121826"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Yellow-Orange Vibrant Main Fill */}
          <path
            d="M 142 108 C 142 66, 120 48, 89 48 C 54 48, 34 72, 34 116 C 34 165, 66 188, 89 204 C 114 222, 144 246, 144 296 C 144 345, 122 384, 89 384 C 54 384, 34 358, 34 316"
            fill="none"
            stroke="#FFB800"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top Arch Playful Accent (Coral Pink Tile) */}
          <path
            d="M 142 108 C 142 85, 134 68, 118 56"
            fill="none"
            stroke="#FF7AC6"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Bottom Arch Playful Accent (Mint Green Tile) */}
          <path
            d="M 62 380 C 46 372, 34 352, 34 316"
            fill="none"
            stroke="#A7F3D0"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Decorative Comic Rivet Accents on S */}
          <circle cx="56" cy="88" r="5" fill="#121826" />
          <circle cx="56" cy="88" r="2" fill="#FFFFFF" />
          <circle cx="122" cy="275" r="5" fill="#121826" />
          <circle cx="122" cy="275" r="2" fill="#FFFFFF" />
        </g>

        {/* ======================================================== */}
        {/* LETTER 'W' (CENTER: Rises proudly behind head/shoulders) */}
        {/* ======================================================== */}
        <g filter="url(#sweDropShadow)">
          {/* Outer Black Stroke for W */}
          <path
            d="M 172 58 L 210 330 L 260 95 L 310 330 L 348 58"
            fill="none"
            stroke="#121826"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* W Stroke 1: Left Downward Arm (Sky Blue) */}
          <path
            d="M 172 58 L 210 330"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* W Stroke 2: Center-Left Upward Arm (Lavender) */}
          <path
            d="M 210 330 L 260 95"
            fill="none"
            stroke="#DDD6FE"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* W Stroke 3: Center-Right Downward Arm (Warm Yellow) */}
          <path
            d="M 260 95 L 310 330"
            fill="none"
            stroke="#FFB800"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* W Stroke 4: Right Upward Arm (Coral Pink) */}
          <path
            d="M 310 330 L 348 58"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* W Decorative Peak Accents (Visible above head) */}
          <g filter="url(#sweDropShadowSm)">
            <circle cx="172" cy="58" r="7" fill="#FFB800" stroke="#121826" strokeWidth="2.5" />
            <polygon points="260,80 268,98 252,98" fill="#A7F3D0" stroke="#121826" strokeWidth="2" />
            <circle cx="348" cy="58" r="7" fill="#38BDF8" stroke="#121826" strokeWidth="2.5" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* LETTER 'E' (RIGHT COLUMN: Chunky Neo-Brutalist Block E)  */}
        {/* ======================================================== */}
        <g filter="url(#sweDropShadow)">
          {/* Vertical Spine (Black Outline + Lavender/Mint Fill) */}
          <path
            d="M 390 62 L 390 395"
            fill="none"
            stroke="#121826"
            strokeWidth="36"
            strokeLinecap="round"
          />
          <path
            d="M 390 62 L 390 220"
            fill="none"
            stroke="#DDD6FE"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            d="M 390 220 L 390 395"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Top Arm (Coral Pink) */}
          <path
            d="M 390 62 L 485 62"
            fill="none"
            stroke="#121826"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <path
            d="M 390 62 L 485 62"
            fill="none"
            stroke="#FF7AC6"
            strokeWidth="26"
            strokeLinecap="round"
          />
          {/* Accent dot on Top Arm */}
          <circle cx="465" cy="62" r="5" fill="#FFB800" stroke="#121826" strokeWidth="2" />

          {/* Middle Arm (Yellow) */}
          <path
            d="M 390 220 L 468 220"
            fill="none"
            stroke="#121826"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M 390 220 L 468 220"
            fill="none"
            stroke="#FFB800"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <rect x="444" y="213" width="14" height="14" rx="3" fill="#A7F3D0" stroke="#121826" strokeWidth="2" />

          {/* Bottom Arm (Mint Green) */}
          <path
            d="M 390 378 L 488 378"
            fill="none"
            stroke="#121826"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <path
            d="M 390 378 L 488 378"
            fill="none"
            stroke="#A7F3D0"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <circle cx="468" cy="378" r="5" fill="#DDD6FE" stroke="#121826" strokeWidth="2" />
        </g>
      </svg>

      {/* ======================================================== */}
      {/* HARSHIL'S ACTUAL PORTRAIT (Foreground Cutout, Layered)   */}
      {/* ======================================================== */}
      <div className="harshil-portrait-frame">
        <img
          src="/images/harshil-portrait-cutout.png"
          alt="Harshil Rajyaguru - Software Engineer"
          className="harshil-portrait-img"
          loading="eager"
        />
      </div>

      {/* ======================================================== */}
      {/* FOUR FLOATING STAR PRINCIPLE BADGES (OUTSIDE PERIMETER)  */}
      {/* ======================================================== */}
      <div className="star-badges-layer" aria-label="STAR Interview Framework">
        {starBadges.map((badge) => (
          <div
            key={badge.letter}
            className={`star-pill-badge ${badge.posClass}`}
            title={`STAR: ${badge.title}`}
          >
            <span className="star-pill-circle" style={{ backgroundColor: badge.bg }}>
              {badge.letter}
            </span>
            <span className="star-pill-text">{badge.title}</span>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* DISTRIBUTED SYSTEMS TECHNICAL LABEL                      */}
      {/* ======================================================== */}
      <div className="tech-tag tech-tag-center">
        <span className="tech-tag-icon">&gt;_</span>
        <span className="tech-tag-text">DISTRIBUTED SYSTEMS</span>
      </div>

      <style>{`
        /* --- Container Stage --- */
        .hero-illustration-wrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 1.75rem auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        /* --- SVG SWE Letters Background --- */
        .swe-letters-svg {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
          z-index: 1;
        }

        /* --- Portrait Container in Foreground --- */
        .harshil-portrait-frame {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 66%;
          max-width: 325px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          z-index: 2;
        }

        .harshil-portrait-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          filter: drop-shadow(4px 4px 0px rgba(18, 24, 38, 0.95));
          transition: transform 0.25s ease;
        }

        .hero-illustration-wrapper:hover .harshil-portrait-img {
          transform: translateY(-3px) scale(1.01);
        }

        /* --- Distributed Systems Technical Label --- */
        .tech-tag-center {
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 6px 18px;
          border: 2px solid var(--border-dark, #121826);
          border-radius: 9999px;
          background-color: #121826;
          color: #A7F3D0;
          box-shadow: 2.5px 2.5px 0px rgba(18, 24, 38, 0.45);
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
          z-index: 10;
          pointer-events: auto;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .tech-tag-center:hover {
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 3.5px 3.5px 0px rgba(18, 24, 38, 0.55);
        }

        .tech-tag-icon {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          font-weight: 900;
          color: #A7F3D0;
          line-height: 1;
        }

        .tech-tag-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 800;
          color: #A7F3D0;
          letter-spacing: 0.06em;
          white-space: nowrap;
          line-height: 1;
        }

        /* --- Four STAR Badges (Framing Outside the Illustration) --- */
        .star-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background-color: #FFFFFF;
          border: 2px solid var(--border-dark, #121826);
          border-radius: 10px;
          box-shadow: 2.5px 2.5px 0px var(--border-dark, #121826);
          padding: 5px 11px;
          height: 35px;
          box-sizing: border-box;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          user-select: none;
          z-index: 5;
          pointer-events: auto;
        }

        .star-pill-badge:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 3.5px 3.5px 0px var(--border-dark, #121826);
        }

        .star-pill-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid var(--border-dark, #121826);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 900;
          color: var(--text-main, #121826);
          flex-shrink: 0;
          line-height: 1;
        }

        .star-pill-text {
          font-family: var(--font-heading, sans-serif);
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--text-main, #121826);
          letter-spacing: 0.02em;
          white-space: nowrap;
          line-height: 1;
        }

        /* Desktop & Tablet: Floating Around the OUTSIDE Perimeter */
        @media (min-width: 641px) {
          .star-badges-layer {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .star-pill-badge {
            position: absolute;
          }

          /* TOP LEFT: S — Situation (Above and outside S) */
          .star-pos-s {
            top: -22px;
            left: -28px;
          }

          /* TOP RIGHT: T — Task (Above and outside E) */
          .star-pos-t {
            top: -22px;
            right: -28px;
          }

          /* BOTTOM LEFT: A — Action (Bottom-left outside lettering & portrait) */
          .star-pos-a {
            bottom: 48px;
            left: -28px;
          }

          /* BOTTOM RIGHT: R — Result (Bottom-right outside lettering & portrait) */
          .star-pos-r {
            bottom: 48px;
            right: -28px;
          }
        }

        /* Mobile Screens (<= 640px): Clean Flow Below Illustration */
        @media (max-width: 640px) {
          .hero-illustration-wrapper {
            max-width: 330px;
            margin: 1.25rem auto 1rem auto;
            flex-direction: column;
          }

          .tech-tag-center {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            margin: 0.85rem auto 0 auto;
            display: inline-flex;
            box-shadow: 2.5px 2.5px 0px rgba(18, 24, 38, 0.45);
          }

          .tech-tag-center:hover {
            transform: translateY(-2px);
          }

          .star-badges-layer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.55rem;
            width: 100%;
            max-width: 280px;
            margin: 0.85rem auto 0 auto;
            position: static;
            pointer-events: auto;
          }

          .star-pill-badge {
            position: static;
            width: 100%;
            justify-content: center;
            height: 36px;
            padding: 4px 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .harshil-portrait-img,
          .star-pill-badge,
          .tech-tag-center {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};
