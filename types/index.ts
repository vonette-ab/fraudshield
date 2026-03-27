
export type RiskStatus = "flagged" | "blocked" | "review" | "clear";

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  type: string;
  location: string;
  time: string;
  risk: number;
  status: RiskStatus;
  flags: string[];
  actionedBy?: string;
  actionedAt?: string;
  escalatedTo?: string;
  note?: string;
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
  onApprove: (id: string) => void;
  onBlock: (id: string) => void;
  onEscalate: (id: string) => void;
}