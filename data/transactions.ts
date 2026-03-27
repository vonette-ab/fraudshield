 
import { Transaction, StatusConfig, RiskStatus } from "@/types";

export const transactions: Transaction[] = [
  {
    id: "TXN-00821",
    customer: "Pearl Yeboah",
    amount: 12450.0,
    type: "Wire Transfer",
    location: "Lagos, NG",
    time: "2 min ago",
    risk: 94,
    status: "flagged",
    flags: ["Unusual location", "High amount", "Off-hours"],
  },
  {
    id: "TXN-00820",
    customer: "Muyasir Abdul Salam",
    amount: 340.5,
    type: "Card Payment",
    location: "Accra, GH",
    time: "11 min ago",
    risk: 28,
    status: "clear",
    flags: [],
  },
  {
    id: "TXN-00819",
    customer: "Janet Odonkor",
    amount: 5800.0,
    type: "ATM Withdrawal",
    location: "Kumasi, GH",
    time: "18 min ago",
    risk: 71,
    status: "review",
    flags: ["Multiple withdrawals", "Velocity spike"],
  },
  {
    id: "TXN-00818",
    customer: "Emmanuel Sarkodie",
    amount: 990.0,
    type: "Card Payment",
    location: "Takoradi, GH",
    time: "32 min ago",
    risk: 61,
    status: "review",
    flags: ["Rounded amount", "New merchant"],
  },
  {
    id: "TXN-00817",
    customer: "Widom Teye",
    amount: 150.0,
    type: "Mobile Transfer",
    location: "Accra, GH",
    time: "45 min ago",
    risk: 15,
    status: "clear",
    flags: [],
  },
  {
    id: "TXN-00816",
    customer: "Prince Takyi",
    amount: 22100.0,
    type: "Wire Transfer",
    location: "Dubai, AE",
    time: "1 hr ago",
    risk: 97,
    status: "blocked",
    flags: ["Sanctioned region", "Structuring", "No history"],
  },
  {
    id: "TXN-00815",
    customer: "Yaw Osei",
    amount: 450.0,
    type: "Card Payment",
    location: "Accra, GH",
    time: "1 hr ago",
    risk: 20,
    status: "clear",
    flags: [],
  },
  {
    id: "TXN-00814",
    customer: "Akosua Frimpong",
    amount: 3200.0,
    type: "POS Payment",
    location: "Accra, GH",
    time: "2 hr ago",
    risk: 55,
    status: "review",
    flags: ["Unusual merchant category"],
  },
];

export const statusConfig: Record<RiskStatus, StatusConfig> = {
  flagged: {
    label: "Flagged",
    bg: "rgba(255,59,71,0.12)",
    color: "#FF3B47",
    dot: "#FF3B47",
  },
  blocked: {
    label: "Blocked",
    bg: "rgba(180,0,255,0.12)",
    color: "#B400FF",
    dot: "#B400FF",
  },
  review: {
    label: "In Review",
    bg: "rgba(255,149,0,0.12)",
    color: "#FF9500",
    dot: "#FF9500",
  },
  clear: {
    label: "Clear",
    bg: "rgba(52,200,90,0.12)",
    color: "#34C85A",
    dot: "#34C85A",
  },
};

export const riskColor = (score: number): string => {
  if (score >= 80) return "#FF3B47";
  if (score >= 50) return "#FF9500";
  return "#34C85A";
};