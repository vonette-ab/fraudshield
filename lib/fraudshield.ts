
import type { Transaction, Customer, RiskReport } from "@/types";

export async function getTransactions(params?: {
  page?: number;
  pageSize?: number;
  status?: string;
}): Promise<Transaction[]> {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", String(params.page));
  if (params?.pageSize) query.set("pageSize", String(params.pageSize));
  if (params?.status) query.set("status", params.status);

  const res = await fetch(`/api/transactions?${query.toString()}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch transactions");
  }

  return res.json() as Promise<Transaction[]>;

}

export interface StatsSummary {
  totalVolume: number;
  flaggedCount: number;
  clearedCount: number;
}

export async function getStatsSummary(): Promise<StatsSummary> {
  const res = await fetch("/api/stats/summary");

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch stats summary");
  }

  return res.json();
}

export interface ReportPayload {
  transaction: {
    id: number;
  };
  riskScore: number;
  flagReason: string;
}

export interface ReportResponse {
  reportId: string;
  transactionId: string;
  status: string;
  createdAt: string;
}

export async function createReport(payload: ReportPayload): Promise<RiskReport> {
  const res = await fetch("/api/reports", {
    method: "POST",
    headers:  { "Content-Type": "application/json"},
    body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err= await res.json();
      throw new Error(err.error || "Failed to create report");

    }

    return res.json() as Promise<RiskReport>;
}