
"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { getTransactions, getStatsSummary, StatsSummary, createReport } from "@/lib/fraudshield";

import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import TransactionRow from "@/components/TransactionRow";
import DetailPanel from "@/components/DetailPanel";

const statusConfig = {
  flagged: { label: "Flagged", bg: "rgba(255,59,71,0.12)", color: "#FF3B47", dot: "#FF3B47" },
  blocked: { label: "Blocked", bg: "rgba(180,0,255,0.12)", color: "#B400FF", dot: "#B400FF" },
  review: { label: "In Review", bg: "rgba(255,149,0,0.12)", color: "#FF9500", dot: "#FF9500" },
  clear: { label: "Clear", bg: "rgba(52,200,90,0.12)", color: "#34C85A", dot: "#34C85A" },
};





export default function FraudDashboard() {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  
  
    const searchLower = search.toLowerCase();

  const filtered = transactionList.filter((t) => {
    const matchFilter = filter === "all" || t.status === filter;
    const matchSearch =
      (t.customerId ?? "").toLowerCase().includes(searchLower) ||
      (t.id?.toString() ?? "").toLowerCase().includes(searchLower);
    return matchFilter && matchSearch;
  });


  

 const counts = {

  flagged: transactionList.filter((t) => t.status === "flagged").length,
  blocked: transactionList.filter((t) => t.status === "blocked").length,
  review: transactionList.filter((t) => t.status === "review").length,
  clear: transactionList.filter((t) => t.status === "clear").length,
};


useEffect(() => {
  async function load() {
    try {
      setLoading(true);
      const data = await getTransactions({ page: 1, pageSize: 20 });
      if (data && data.length > 0) {
        setTransactionList(data);
        setSelected(data[0]);
      }
    } catch (err) {
      console.error("Failed to load transactions:", err);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);

useEffect(() => {
  async function loadStats() {
    try {
      const data = await getStatsSummary();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
      // Falls back to counts calculated from transactionList
    }
  }
  loadStats();
}, []);


const handleReport = async (transactionId:number) => {
  try {
    await createReport({
      transaction: { id: transactionId },
      riskScore: 0,
      flagReason: "Suspicious activity",
    });
    console.log("Report submitted successfully");
  }catch (err) {
    console.error("Failed to submit report", err)
  }
  
};

const handleApprove = (id: number) => {
  setTransactionList(prev => {
    const updated = prev.map(t =>
      t.id === id
        ? { ...t, status: "clear" as const, actionedBy: "V. Aboe", actionedAt: "Just now" }
        : t
    );
    setSelected(updated.find(t => t.id === id) ?? selected);
    return updated;
  });
};

const handleBlock = (id: number) => {
  setTransactionList(prev => {
    const updated = prev.map(t =>
      t.id === id
        ? { ...t, status: "blocked" as const, actionedBy: "V. Aboe", actionedAt: "Just now" }
        : t
    );
    setSelected(updated.find(t => t.id === id) ?? selected);
    return updated;
  });
};

const handleEscalate = (id: number) => {
  setTransactionList(prev => {
    const updated = prev.map(t =>
      t.id === id
        ? { ...t, status: "review" as const, escalatedTo: "Senior Analyst", actionedAt: "Just now" }
        : t
    );
    setSelected(updated.find(t => t.id === id) ?? selected);
    return updated;
  });
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        color: "#fff",
        fontFamily: "'Syne', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        .filter-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          transition: all 0.15s;
        }
        .filter-btn.active {
          border-color: #fff;
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
      `}</style>

      <Header />

      <div style={{ padding: "24px 32px 0", display: "flex", gap: 12 }}>

<StatCard label="Flagged"    value={counts.flagged}  accent="#FF3B47" sub="Needs action" />
<StatCard label="Blocked"    value={counts.blocked}  accent="#B400FF" sub="Auto-blocked" />
<StatCard label="In Review"  value={counts.review}   accent="#FF9500" sub="Awaiting decision" />
<StatCard label="Cleared"    value={counts.clear}    accent="#34C85A" sub="Today" />
<StatCard label="Total Volume" value={stats ? `GHS ${stats.totalVolume.toLocaleString()}` : "-"} sub="Last 24 hours" /></div>


        
        

      <div style={{ display: "flex", flex: 1, padding: "24px 32px", gap: 20 }}>
        <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {["all", "flagged", "blocked", "review", "clear"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : statusConfig[f as keyof typeof statusConfig]?.label}
                </button>
              ))}
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer or ID…"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "8px 14px",
                color: "#fff",
                fontSize: 13,
                outline: "none",
                fontFamily: "'Syne', sans-serif",
                width: 220,
              }}
            />
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 110px 80px 90px",
                padding: "12px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {["Customer", "Transaction", "Amount", "Risk", "Status"].map((h) => (
                <div
                  key={h}
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {loading ? (
              <div
                style={{
                  padding: "32px 20px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                }}
              >
                Loading transactions...
              </div>
            ) : transactionList.length === 0 ? (
              <div
                style={{
                  padding: "32px 20px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 13,
                }}
              >
                No transactions available.
              </div>
            ) : filtered.length === 0 ? (
              <div
                style={{
                  padding: "32px 20px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 13,
                }}
              >
                No transactions match your search.
              </div>
            ) : (
              filtered.map((txn, i) => (
                <div
                  key={txn.id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <TransactionRow
                    txn={txn}
                    isSelected={selected?.id === txn.id}
                    onClick={() => setSelected(txn)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {selected && (
  <DetailPanel
    transaction={selected}
    onApprove={handleApprove}
    onBlock={handleBlock}
    onEscalate={handleEscalate}
  />
)}
      </div>
    </div>
  );
}