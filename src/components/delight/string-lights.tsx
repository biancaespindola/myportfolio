const COLORS = ["#c1121f", "#e0a526", "#14532d", "#2f80ed"];
const BULBS = Array.from({ length: 24 }, (_, i) => ({
  cx: i * 50 + 25,
  color: COLORS[i % COLORS.length],
  delay: `${(i % 3) * 0.8}s`,
}));
const WIRE = `M0 4${BULBS.map((b) => ` Q ${b.cx} 18 ${b.cx + 25} 4`).join("")}`;

/** Twinkling fairy lights above the header, only in the festive theme. */
export function StringLights() {
  return (
    <div className="hidden h-[30px] overflow-hidden festive:block print:hidden!">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${BULBS.length * 50} 30`}
        preserveAspectRatio="none"
        className="block h-[30px] w-full"
      >
        <path d={WIRE} stroke="#2b1416" strokeWidth="2" fill="none" />
        {BULBS.map((b) => (
          <ellipse
            key={b.cx}
            cx={b.cx}
            cy={20}
            rx={5}
            ry={8}
            fill={b.color}
            className="animate-[twinkle_2.4s_ease-in-out_infinite]"
            style={{ animationDelay: b.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
