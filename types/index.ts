
export type RiskStatus = "flagged" | "blocked" | "review" | "clear";

export interface Transaction {
  id: number;
  customerId: string;
  amount: number;
  currency: string;
  transactionType: string;
  location: string;
  deviceFingerprint: string;
  // Additional fields for frontend display
  time?: string;
  risk?: number;
  status?: RiskStatus;
  flags?: string[];
  actionedBy?: string;
  actionedAt?: string;
  escalatedTo?: string;
  note?: string;
}

export interface Customer {
  id?: number;
  accountNumber: string;
  fullName: string;
  location: string;
}

export interface RiskReport {
  id?: number;
  transaction: {
    id: number;
  };
  riskScore: number;
  flagReason: string;
}

export interface StatsSummary {
  totalVolume: number;
  flaggedCount: number;
  clearedCount: number;
}

export interface StatusConfig {
  label: string;
  bg: string;
  color: string;
  dot: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}

export interface RiskMeterProps {
  score: number;
}

export interface TransactionRowProps {
  txn: Transaction;
  isSelected: boolean;
  onClick: () => void;
}

export interface DetailPanelProps {
  transaction: Transaction;
  onApprove: (id: number) => void;
  onBlock: (id: number) => void;
  onEscalate: (id: number) => void;
}