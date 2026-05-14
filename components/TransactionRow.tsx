
import { TransactionRowProps } from "@/types";

const statusConfig = {
  flagged: { label: "Flagged", bg: "rgba(255,59,71,0.12)", color: "#FF3B47", dot: "#FF3B47" },
  blocked: { label: "Blocked", bg: "rgba(180,0,255,0.12)", color: "#B400FF", dot: "#B400FF" },
  review: { label: "In Review", bg: "rgba(255,149,0,0.12)", color: "#FF9500", dot: "#FF9500" },
  clear: { label: "Clear", bg: "rgba(52,200,90,0.12)", color: "#34C85A", dot: "#34C85A" },
};

const riskColor = (score: number): string => {
  if (score >= 80) return "#FF3B47";
  if (score >= 50) return "#FF9500";
  return "#34C85A";
};

export default function TransactionRow({
  txn,
  isSelected,
  onClick,
}: TransactionRowProps) {
  const sc =
    statusConfig[(txn.status as keyof typeof statusConfig) || "clear"] ??
    statusConfig.clear;

  return (
    <div
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 110px 80px 90px",
        padding: "14px 20px",
        cursor: "pointer",
        background: isSelected ? "rgba(255,255,255,0.05)" : "transparent",
        borderLeft: isSelected
          ? `2px solid ${sc.dot}`
          : "2px solid transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!isSelected)
          (e.currentTarget as HTMLDivElement).style.background =
            "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!isSelected)
          (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{txn.customerId}</div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            marginTop: 2,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {txn.id}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13 }}>{txn.transactionType}</div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            marginTop: 2,
          }}
        >
          {txn.location} · {txn.time}
        </div>
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'DM Mono', monospace",
          color: txn.risk >= 80 ? "#FF3B47" : "#fff",
        }}
      >
        GHS {txn.amount.toLocaleString()}
      </div>

      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: riskColor(txn.risk),
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {txn.risk}
        </div>
        <div
          style={{
            width: 50,
            height: 3,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            marginTop: 5,
          }}
        >
          <div
            style={{
              width: `${txn.risk}%`,
              height: "100%",
              background: riskColor(txn.risk),
              borderRadius: 2,
              transition: "width 0.4s",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            background: sc.bg,
            color: sc.color,
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {sc.label}
        </span>
      </div>
    </div>
  );
}