
import { TransactionRowProps } from "@/types";
import { statusConfig, riskColor } from "@/data/transactions";

export default function TransactionRow({
  txn,
  isSelected,
  onClick,
}: TransactionRowProps) {
  const sc = statusConfig[txn.status];

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
        <div style={{ fontSize: 13, fontWeight: 600 }}>{txn.customer}</div>
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
        <div style={{ fontSize: 13 }}>{txn.type}</div>
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