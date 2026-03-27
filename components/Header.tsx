
"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "linear-gradient(135deg, #FF3B47, #B400FF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3 }}>
            FraudShield
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 1,
            }}
          >
            TRANSACTION INTELLIGENCE
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#34C85A",
              opacity: pulse ? 1 : 0.3,
              transition: "opacity 0.4s",
            }}
          />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            Live monitoring
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Analyst: V. Aboe
        </div>
      </div>
    </div>
  );
}