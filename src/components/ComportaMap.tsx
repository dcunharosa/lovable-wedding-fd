import { useTranslation } from "@/i18n";

const blue = "hsl(220, 50%, 55%)";
const ocean = "hsl(220, 55%, 78%)";

const ComportaMap = () => {
  const { t } = useTranslation();

  return (
    <svg
      viewBox="0 0 800 1000"
      className="w-full mx-auto"
      role="img"
      aria-label={t.stay.mapAria}
    >
      <defs>
        {/* Gentle hand-drawn wobble for coastline */}
        <filter id="sketch" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" seed="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Very subtle wobble for markers */}
        <filter id="sketch-light" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" seed="5" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Ocean fill — left side of coastline */}
      <path
        d="
          M 0 0
          L 280 0
          C 270 60, 260 100, 250 140
          C 240 180, 230 220, 245 260
          C 260 300, 270 340, 265 380
          C 258 430, 240 470, 235 510
          C 228 560, 220 600, 215 640
          C 208 700, 195 740, 185 780
          C 175 830, 162 870, 150 920
          C 140 950, 130 980, 120 1000
          L 0 1000
          Z
        "
        fill={ocean}
        filter="url(#sketch)"
      />

      {/* Coastline stroke */}
      <path
        d="
          M 280 0
          C 270 60, 260 100, 250 140
          C 240 180, 230 220, 245 260
          C 260 300, 270 340, 265 380
          C 258 430, 240 470, 235 510
          C 228 560, 220 600, 215 640
          C 208 700, 195 740, 185 780
          C 175 830, 162 870, 150 920
          C 140 950, 130 980, 120 1000
        "
        fill="none"
        stroke={blue}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.25}
        filter="url(#sketch)"
      />

      {/* Wave marks in ocean */}
      {[180, 300, 480, 700, 860].map((y, i) => (
        <g key={y} opacity={0.3} filter="url(#sketch-light)">
          <path
            d={`M ${60 + i * 15} ${y} Q ${80 + i * 15} ${y - 8}, ${100 + i * 15} ${y} Q ${120 + i * 15} ${y + 8}, ${140 + i * 15} ${y}`}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Ocean label */}
      <text
        x="80"
        y="550"
        fill="rgba(255,255,255,0.5)"
        fontSize="18"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
        letterSpacing="6"
        transform="rotate(-78, 80, 550)"
      >
        OCEANO ATLÂNTICO
      </text>

      {/* Subtle dotted paths suggesting roads */}
      {[
        "M 310 270 Q 350 340, 410 400",
        "M 420 420 Q 400 480, 385 525",
        "M 420 420 Q 490 560, 555 700",
        "M 300 270 Q 290 180, 290 100",
        "M 380 530 Q 310 650, 245 755",
        "M 420 400 Q 530 300, 635 185",
      ].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={blue}
          opacity={0.1}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          filter="url(#sketch-light)"
        />
      ))}

      {/* --- Town markers --- */}
      {[
        { cx: 290, cy: 100, label: "Sol Tróia", tx: 310, ty: 106 },
        { cx: 300, cy: 270, label: "Carvalhal", tx: 320, ty: 276 },
        { cx: 380, cy: 530, label: "Muda", tx: 400, ty: 536 },
        { cx: 240, cy: 760, label: "Melides", tx: 260, ty: 766 },
        { cx: 560, cy: 710, label: "Grândola", tx: 580, ty: 716 },
        { cx: 640, cy: 180, label: "Alcácer do Sal", tx: 660, ty: 186 },
      ].map((town) => (
        <g key={town.label}>
          <circle cx={town.cx} cy={town.cy} r="5" fill={blue} opacity={0.5} filter="url(#sketch-light)" />
          <text x={town.tx} y={town.ty} fill={blue} opacity={0.75} fontSize="22" fontFamily="'Cormorant Garamond', serif" fontWeight="300">
            {town.label}
          </text>
        </g>
      ))}

      {/* --- Venue marker (Monte da Várzea) --- */}
      <g transform="translate(420, 410)">
        <path
          d="M0 -30 C-10 -30, -16 -22, -16 -14 C-16 -2, 0 14, 0 14 S16 -2, 16 -14 C16 -22, 10 -30, 0 -30 Z"
          fill={blue}
          opacity={0.85}
          filter="url(#sketch-light)"
        />
        <circle cx="0" cy="-16" r="5" fill="hsl(40, 30%, 95%)" />
      </g>
      <text
        x="445"
        y="400"
        fill={blue}
        fontSize="24"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="600"
        fontStyle="italic"
      >
        Monte da Várzea
      </text>
      <text
        x="445"
        y="422"
        fill={blue}
        opacity={0.45}
        fontSize="14"
        fontFamily="'Josefin Sans', sans-serif"
        letterSpacing="3"
      >
        {t.stay.weddingVenue}
      </text>
    </svg>
  );
};

export default ComportaMap;
