

import { StatCardProps } from "@/types";

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "22px 24px",
        flex: 1,
        minWidth: 140,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: accent || "#fff",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: -1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.5)",
          marginTop: 4,
          fontFamily: "'Syne', sans-serif",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: accent || "rgba(255,255,255,0.3)",
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}