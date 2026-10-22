import React from 'react';

export const TriadDiagram: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 340 300"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connecting Triangle lines with black neo-brutalist border */}
        <polygon
          points="170,55 55,235 285,235"
          fill="#FFFFFF"
          stroke="#121826"
          strokeWidth="3.5"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(4px 4px 0px #121826)' }}
        />

        {/* Center Badge: CORE ARTIFACT */}
        <g transform="translate(170, 160)">
          <circle
            r="43"
            fill="#CEEBD9"
            stroke="#121826"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(3px 3px 0px #121826)' }}
          />
          <text
            x="0"
            y="-5"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="11.5"
            fontWeight="900"
            fill="#121826"
            letterSpacing="0.1em"
          >
            CORE
          </text>
          <text
            x="0"
            y="11"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="10"
            fontWeight="900"
            fill="#121826"
            letterSpacing="0.08em"
          >
            ARTIFACT
          </text>
        </g>

        {/* Top Node: Concurrency (Lilac) */}
        <g transform="translate(170, 50)">
          <circle
            r="34"
            fill="#DDD6FE"
            stroke="#121826"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(3px 3px 0px #121826)' }}
          />
          {/* Lock / Concurrency Icon */}
          <rect x="-10" y="-4" width="20" height="16" rx="3" fill="#121826" />
          <path
            d="M-6,-4 V-10 A6,6 0 0,1 6,-10 V-4"
            fill="none"
            stroke="#121826"
            strokeWidth="3"
          />
          <circle cx="0" cy="4" r="2" fill="#DDD6FE" />
        </g>

        {/* Left Node: Distributed Systems (Yellow) */}
        <g transform="translate(55, 235)">
          <circle
            r="34"
            fill="#FFB800"
            stroke="#121826"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(3px 3px 0px #121826)' }}
          />
          {/* Server / Cluster Icon */}
          <rect x="-12" y="-12" width="24" height="9" rx="2" fill="#121826" />
          <circle cx="-6" cy="-7.5" r="1.5" fill="#FFB800" />
          <rect x="-12" y="3" width="24" height="9" rx="2" fill="#121826" />
          <circle cx="-6" cy="7.5" r="1.5" fill="#FFB800" />
        </g>

        {/* Right Node: Agentic AI (Green / Mint) */}
        <g transform="translate(285, 235)">
          <circle
            r="34"
            fill="#A7F3D0"
            stroke="#121826"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(3px 3px 0px #121826)' }}
          />
          {/* AI / Bot Icon */}
          <rect x="-11" y="-8" width="22" height="18" rx="4" fill="#121826" />
          <circle cx="-4" cy="1" r="2.5" fill="#A7F3D0" />
          <circle cx="4" cy="1" r="2.5" fill="#A7F3D0" />
          <line x1="0" y1="-8" x2="0" y2="-13" stroke="#121826" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="-14" r="2" fill="#121826" />
        </g>

        {/* Side Labels */}
        {/* Left Sloping Side: CONSISTENCY */}
        <text
          x="100"
          y="140"
          textAnchor="middle"
          dy="0.35em"
          transform="rotate(-57.4, 100, 140)"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="10"
          fontWeight="900"
          fill="#121826"
          letterSpacing="0.09em"
        >
          CONSISTENCY
        </text>

        {/* Right Sloping Side: INTELLIGENCE */}
        <text
          x="240"
          y="140"
          textAnchor="middle"
          dy="0.35em"
          transform="rotate(57.4, 240, 140)"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="9.5"
          fontWeight="900"
          fill="#121826"
          letterSpacing="0.08em"
        >
          INTELLIGENCE
        </text>

        {/* Bottom Horizontal Side: EXECUTION */}
        <text
          x="170"
          y="272"
          textAnchor="middle"
          dy="0.35em"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="10.5"
          fontWeight="900"
          fill="#121826"
          letterSpacing="0.1em"
        >
          EXECUTION
        </text>
      </svg>
    </div>
  );
};
