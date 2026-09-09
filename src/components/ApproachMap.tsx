import { useTranslation } from "@/i18n";

// Drawn on the blue Venue section, so the ink is cream rather than the
// blue ComportaMap uses on its cream background.
const ink = "hsl(40, 30%, 97%)";

/**
 * The last 2 km to Monte da Várzea. Google Maps' venue pin sometimes routes
 * guests to the wrong approach, so this shows the turn-off on the EN 261-1
 * (38.284214, -8.708181) and the track heading north from it.
 */
const ApproachMap = () => {
  const { t } = useTranslation();

  return (
    <svg
      viewBox="0 0 560 720"
      className="w-full mx-auto"
      role="img"
      aria-label={t.venue.mapAria}
    >
      <defs>
        {/* Filter ids are document-global — namespaced so they don't collide
            with ComportaMap when both render on the single-page layout. */}
        <filter id="sketch-approach" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" seed="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="sketch-approach-light" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" seed="5" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* --- EN 261-1, running north-west to south-east --- */}
      <path
        d="
          M 70 55
          C 138 178, 196 296, 262 402
          C 312 484, 358 568, 392 640
          C 408 674, 424 700, 438 720
        "
        fill="none"
        stroke={ink}
        opacity={0.5}
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#sketch-approach)"
      />
      <text
        x="176"
        y="392"
        fill={ink}
        opacity={0.6}
        fontSize="17"
        fontFamily="'Josefin Sans', sans-serif"
        letterSpacing="3"
        transform="rotate(58, 176, 392)"
      >
        EN 261-1
      </text>

      {/* --- Carvalhal, top of the road --- */}
      <circle cx="70" cy="55" r="5" fill={ink} opacity={0.55} filter="url(#sketch-approach-light)" />
      <text
        x="88"
        y="48"
        fill={ink}
        opacity={0.75}
        fontSize="26"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="300"
      >
        Carvalhal
      </text>

      {/* --- Dirt track north from the turn-off to the venue --- */}
      <path
        d="
          M 392 640
          C 386 560, 396 480, 398 400
          C 400 330, 392 275, 410 232
        "
        fill="none"
        stroke={ink}
        opacity={0.6}
        strokeWidth="2.5"
        strokeDasharray="7 9"
        strokeLinecap="round"
        filter="url(#sketch-approach-light)"
      />
      {/* Direction of travel */}
      <path
        d="M 389 512 L 397 499 L 405 511"
        fill="none"
        stroke={ink}
        opacity={0.7}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sketch-approach-light)"
      />
      <text
        x="416"
        y="455"
        fill={ink}
        opacity={0.6}
        fontSize="19"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
      >
        {t.venue.mapDistance}
      </text>
      <text
        x="372"
        y="292"
        textAnchor="end"
        fill={ink}
        opacity={0.6}
        fontSize="19"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
      >
        {t.venue.mapFinalTurn}
      </text>

      {/* --- The turn-off: the pin guests should actually use --- */}
      <g filter="url(#sketch-approach-light)">
        <circle cx="392" cy="640" r="14" fill="none" stroke={ink} strokeWidth="2.5" />
        <circle cx="392" cy="640" r="5.5" fill={ink} />
      </g>
      <text
        x="366"
        y="634"
        textAnchor="end"
        fill={ink}
        fontSize="27"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="600"
        fontStyle="italic"
      >
        {t.venue.mapTurnOff}
      </text>
      <text
        x="366"
        y="658"
        textAnchor="end"
        fill={ink}
        opacity={0.6}
        fontSize="14"
        fontFamily="'Josefin Sans', sans-serif"
        letterSpacing="2.5"
      >
        {t.venue.mapTurnOffNote}
      </text>

      {/* --- Monte da Várzea --- */}
      <g transform="translate(410, 218)">
        <path
          d="M0 -30 C-10 -30, -16 -22, -16 -14 C-16 -2, 0 14, 0 14 S16 -2, 16 -14 C16 -22, 10 -30, 0 -30 Z"
          fill={ink}
          opacity={0.9}
          filter="url(#sketch-approach-light)"
        />
        <circle cx="0" cy="-16" r="5" fill="hsl(220, 50%, 65%)" />
      </g>
      <text
        x="382"
        y="200"
        textAnchor="end"
        fill={ink}
        fontSize="28"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="600"
        fontStyle="italic"
      >
        Monte da Várzea
      </text>

      {/* --- Compass --- */}
      <g opacity={0.45} filter="url(#sketch-approach-light)">
        <path d="M 516 92 L 516 46" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <path d="M 509 56 L 516 44 L 523 56" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text
          x="516"
          y="112"
          textAnchor="middle"
          fill={ink}
          fontSize="16"
          fontFamily="'Josefin Sans', sans-serif"
          letterSpacing="2"
        >
          N
        </text>
      </g>
    </svg>
  );
};

export default ApproachMap;
