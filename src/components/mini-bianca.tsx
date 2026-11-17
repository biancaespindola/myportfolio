export type Outfit = "book" | "gamer" | "museum" | "royal" | "market" | "mug";

const C = {
  hair: "#3a2218",
  hairShine: "#6a4030",
  skin: "#f3c9a9",
  ink: "#2a1b2e",
  blush: "#f39ab3",
  gold: "#e8b84a",
  goldDark: "#b8862a",
  white: "#ffffff",
};

const sweater: Record<Outfit, string> = {
  book: "#f6efe6",
  gamer: "#3b3fa8",
  museum: "#276b5c",
  royal: "#b4235a",
  market: "#2a1b2e",
  mug: "#2a1b2e",
};

type Curl = [cx: number, cy: number, r: number];

// A halo of curls behind the face…
const backCurls: Curl[] = [
  [56, 92, 16],
  [50, 116, 15],
  [48, 140, 15],
  [52, 164, 14],
  [66, 182, 13],
  [144, 92, 16],
  [150, 116, 15],
  [152, 140, 15],
  [148, 164, 14],
  [134, 182, 13],
  [70, 62, 18],
  [100, 50, 20],
  [130, 62, 18],
];
// …ringlets framing the face…
const sideCurls: Curl[] = [
  [63, 102, 8],
  [60, 120, 8],
  [62, 138, 8],
  [137, 102, 8],
  [140, 120, 8],
  [138, 138, 8],
];
// …and a curly fringe with a middle part.
const fringeCurls: Curl[] = [
  [70, 76, 11],
  [82, 66, 11],
  [94, 62, 10],
  [106, 62, 10],
  [118, 66, 11],
  [130, 76, 11],
];

const curl = ([cx, cy, r]: Curl) => (
  <g key={`${cx}-${cy}`}>
    <circle cx={cx} cy={cy} r={r} fill={C.hair} />
    <path
      d={`M${cx - r * 0.45} ${cy} a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.45} ${r * 0.45}`}
      stroke={C.hairShine}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

/** Cute illustrated "mini Bianca"; one character, a different outfit per fun fact. */
export function MiniBianca({ outfit }: { outfit: Outfit }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="104" r="86" fill="var(--color-primary-soft)" />

      {/* Curly hair, behind everything */}
      <path
        d="M54 96 Q48 42 100 38 Q152 42 146 96 Q156 140 148 180 L52 180 Q44 140 54 96 Z"
        fill={C.hair}
      />
      {backCurls.map(curl)}

      {/* Shoulders */}
      <path
        d="M46 200 Q48 152 100 148 Q152 152 154 200 Z"
        fill={sweater[outfit]}
      />
      {outfit === "market" && (
        <path
          d="M70 150 Q100 166 130 150 Q132 162 124 168 Q100 178 76 168 Q68 162 70 150 Z"
          fill="#8e1b32"
        />
      )}
      <rect x="91" y="126" width="18" height="24" rx="8" fill={C.skin} />

      {/* Face */}
      <ellipse cx="100" cy="100" rx="37" ry="38" fill={C.skin} />
      <ellipse cx="80" cy="113" rx="7" ry="4.5" fill={C.blush} opacity="0.75" />
      <ellipse
        cx="120"
        cy="113"
        rx="7"
        ry="4.5"
        fill={C.blush}
        opacity="0.75"
      />
      <ellipse cx="86" cy="101" rx="5" ry="6.2" fill={C.ink} />
      <ellipse cx="114" cy="101" rx="5" ry="6.2" fill={C.ink} />
      <circle cx="88" cy="98.6" r="2" fill={C.white} />
      <circle cx="116" cy="98.6" r="2" fill={C.white} />
      <path
        d="M80.5 97 L77 94.5 M91.5 97 L95 94.5 M108.5 97 L105 94.5 M119.5 97 L123 94.5"
        stroke={C.ink}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M78 91 Q86 86 93 90 M107 90 Q114 86 122 91"
        stroke={C.hair}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M86 115 Q100 133 114 115 Q100 120 86 115 Z" fill="#b4235a" />
      <path
        d="M89.5 116.6 Q100 121.5 110.5 116.6"
        stroke={C.white}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="63.5" cy="112" r="2.4" fill={C.gold} />
      <circle cx="136.5" cy="112" r="2.4" fill={C.gold} />

      {sideCurls.map(curl)}
      {outfit !== "mug" && fringeCurls.map(curl)}

      {outfit === "royal" && (
        <g>
          <path
            d="M70 58 L74 28 L88 44 L100 22 L112 44 L126 28 L130 58 Z"
            fill={C.gold}
            stroke={C.goldDark}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="45" r="4" fill="#b4235a" />
          <circle cx="83" cy="50" r="3" fill="#276b5c" />
          <circle cx="117" cy="50" r="3" fill="#276b5c" />
        </g>
      )}

      {outfit === "market" && (
        <g stroke="#7a4a2a" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M72 56 Q62 38 56 24 M64 40 Q54 38 48 32" />
          <path d="M128 56 Q138 38 144 24 M136 40 Q146 38 152 32" />
          <circle cx="80" cy="56" r="5" fill="#2f7a3a" stroke="none" />
          <circle cx="120" cy="56" r="5" fill="#c1121f" stroke="none" />
        </g>
      )}

      {outfit === "mug" && (
        <g>
          <path d="M58 82 Q56 32 100 30 Q144 32 142 82 Z" fill="#c1121f" />
          <rect x="54" y="74" width="92" height="16" rx="8" fill="#a50f1a" />
          <path
            d="M68 80 h64"
            stroke="#c1121f"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </g>
      )}

      {outfit === "gamer" && (
        <g>
          <path
            d="M58 66 Q100 50 142 66"
            stroke={C.ink}
            strokeWidth="6"
            fill="none"
          />
          <rect
            x="76"
            y="46"
            width="48"
            height="22"
            rx="10"
            fill="#5b3fd9"
            stroke={C.ink}
            strokeWidth="3"
          />
          <path
            d="M84 52 Q92 50 98 54"
            stroke={C.white}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </g>
      )}

      {/* Things she's holding */}
      {outfit === "book" && (
        <g>
          <path
            d="M100 170 Q82 160 62 164 L62 196 Q82 192 100 200 Z"
            fill={C.white}
            stroke="#b4235a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M100 170 Q118 160 138 164 L138 196 Q118 192 100 200 Z"
            fill={C.white}
            stroke="#b4235a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M70 174 h22 M70 182 h22 M108 174 h22 M108 182 h18"
            stroke="#c9b8c6"
            strokeWidth="2"
          />
        </g>
      )}

      {outfit === "gamer" && (
        <g>
          <path
            d="M66 172 Q66 160 80 160 H120 Q134 160 134 172 L138 190 Q138 198 128 196 L118 186 H82 L72 196 Q62 198 62 190 Z"
            fill={C.ink}
          />
          <path
            d="M80 168 v12 M74 174 h12"
            stroke={C.white}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="118" cy="170" r="3.2" fill="#c1121f" />
          <circle cx="125" cy="177" r="3.2" fill={C.gold} />
        </g>
      )}

      {outfit === "museum" && (
        <g>
          <rect
            x="70"
            y="160"
            width="60"
            height="40"
            rx="3"
            fill={C.gold}
            stroke={C.goldDark}
            strokeWidth="3"
          />
          <rect x="78" y="167" width="44" height="28" fill="#cfe5f2" />
          <path
            d="M78 195 L92 178 L102 188 L110 180 L122 195 Z"
            fill="#276b5c"
          />
          <circle cx="114" cy="173" r="4" fill={C.gold} />
        </g>
      )}

      {outfit === "mug" && (
        <g>
          <path
            d="M126 168 q16 0 16 12 q0 12 -16 12"
            stroke="#1f2a6b"
            strokeWidth="5"
            fill="none"
          />
          <rect x="84" y="160" width="44" height="40" rx="6" fill="#1f2a6b" />
          <path
            d="M92 172 l4 4 m0 -4 l-4 4 M108 182 l4 4 m0 -4 l-4 4 M118 168 l3 3 m0 -3 l-3 3"
            stroke={C.white}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M98 158 q-4 -8 0 -14 M108 158 q-4 -8 0 -14"
            stroke="#c9b8c6"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}
