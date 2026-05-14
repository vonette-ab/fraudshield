
"use client";


import { useState } from "react";
import { DetailPanelProps } from "@/types";
import RiskMeter from "./RiskMeter";

const statusConfig = {
  flagged: { label: "Flagged", bg: "rgba(255,59,71,0.12)", color: "#FF3B47", dot: "#FF3B47" },
  blocked: { label: "Blocked", bg: "rgba(180,0,255,0.12)", color: "#B400FF", dot: "#B400FF" },
  review: { label: "In Review", bg: "rgba(255,149,0,0.12)", color: "#FF9500", dot: "#FF9500" },
  clear: { label: "Clear", bg: "rgba(52,200,90,0.12)", color: "#34C85A", dot: "#34C85A" },
};

export default function DetailPanel({ transaction: txn, onApprove, onBlock, onEscalate  }: DetailPanelProps) {
  const sc =
    statusConfig[(txn.status as keyof typeof statusConfig) || "clear"] ??
    statusConfig.clear;
  const flags = txn.flags ?? [];
  
const [actionFeedback, setActionFeedback] = useState<string | null>(null);
const [note, setNote] = useState("");

 
  const handleAction = (label: string) => {
    setActionFeedback(`${label} recorded for ${txn.id}`);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  

  return (
    <div
      style={{
        width: 320,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <RiskMeter score={txn.risk ?? 0} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{txn.customerId}</div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              marginTop: 3,
            }}
          >
            {txn.id}
          </div>
          <div style={{ marginTop: 10 }}>
            <span
              style={{
                background: sc.bg,
                color: sc.color,
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {sc.label}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {(
          [
            ["Amount", `GHS ${txn.amount.toLocaleString()}`],
            ["Type", txn.transactionType],
            ["Location", txn.location],
            ["Time", txn.time],
          ] as [string, string][]
        ).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              {k}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>

      {flags.length > 0 && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 18,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            Risk Flags
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {flags.map((flag) => (
              <div
                key={flag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,59,71,0.08)",
                  border: "1px solid rgba(255,59,71,0.15)",
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
              >
                <span style={{ fontSize: 14 }}>⚠️</span>
                <span style={{ fontSize: 12, color: "#FF8B92" }}>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {txn.actionedBy && (
  <div style={{
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: 18,
  }}>
    <div style={{
      fontSize: 11,
      color: "rgba(255,255,255,0.35)",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10,
    }}>
      Audit Trail
    </div>
    <div style={{
      fontSize: 12,
      color: "rgba(255,255,255,0.5)",
    }}>
      {txn.actionedAt} — {txn.actionedBy} marked as {txn.status}
    </div>
  </div>
)}

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: "auto",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 4,
          }}
        >
          Analyst Actions
        </div>
        <textarea
  value={note}
  onChange={(e) => setNote(e.target.value)}
  placeholder="Add a note before actioning…"
  style={{
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 12,
    fontFamily: "'Syne', sans-serif",
    resize: "none",
    outline: "none",
    height: 80,
    marginBottom: 6,
  }}
/>

<button
  onClick={() => { onApprove(txn.id); setActionFeedback("Approval recorded"); }}
  style={{
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Syne', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    background: "#34C85A",
    color: "#000",
    transition: "opacity 0.15s",
    width: "100%",
  }}
>
  ✓ Approve Transaction
</button>

<button
  onClick={() => { onEscalate(txn.id); setActionFeedback("Escalated to Senior Analyst"); }}
  style={{
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,149,0,0.3)",
    cursor: "pointer",
    fontFamily: "'Syne', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    background: "rgba(255,149,0,0.15)",
    color: "#FF9500",
    transition: "opacity 0.15s",
    width: "100%",
  }}
>
  ⟳ Escalate to Senior
</button>

<button
  onClick={() => { onBlock(txn.id); setActionFeedback("Transaction blocked"); }}
  style={{
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,59,71,0.3)",
    cursor: "pointer",
    fontFamily: "'Syne', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    background: "rgba(255,59,71,0.12)",
    color: "#FF3B47",
    transition: "opacity 0.15s",
    width: "100%",
  }}
>
  ✕ Block Transaction
</button>
      </div>
    </div>

    
  );
}