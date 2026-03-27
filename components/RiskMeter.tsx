
"use client";

import { useState, useEffect } from "react";
import { RiskMeterProps } from "@/types";
import { riskColor } from "@/data/transactions";

export default function RiskMeter({ score }: RiskMeterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 3;
      setDisplay(Math.min(start, score));
      if (start < score) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 200);
    return () => clearTimeout(t);
  }, [score]);

  const color = riskColor(score);
  const r = 38;
  const cx = 48;
  const cy = 48;
  const circ = 2 * Math.PI * r;
  const offset = circ - (display / 100) * circ;

  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="7"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.05s",
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        }}
      />
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="17"
        fontWeight="700"
        fontFamily="'DM Mono', monospace"
      >
        {display}
      </text>
      <text
        x={cx}
        y={cy + 17}
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="8"
        fontFamily="'Syne', sans-serif"
        letterSpacing="1"
      >
        RISK
      </text>
    </svg>
  );
}