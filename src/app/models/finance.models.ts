export type Role = 'admin' | 'viewer';
export type Theme = 'light' | 'dark';
export type TransactionType = 'Credit' | 'Debit';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

export interface IncomeSource {
  name: string;
  amount: number;
  change: number;
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  percent: number;
  color: string;
}

export interface TrendPoint {
  label: string;
  income: number;
  expense: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  status: TransactionStatus;
  account: string;
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface Customer {
  name: string;
  totalSpent: number;
  outstanding: number;
  lastTransaction: string;
}

export interface Account {
  name: string;
  type: string;
  balance: number;
  updated: string;
}

export interface ReportCard {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  range: string;
  spark: number[];
}

export interface Insight {
  title: string;
  detail: string;
}

export interface AlertItem {
  level: 'low' | 'medium' | 'high';
  message: string;
  time: string;
}

export interface FilterState {
  search: string;
  category: string;
  status: string;
  type: string;
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
}

export interface SortState {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
}

export interface SettingsState {
  currency: string;
  taxRate: number;
  fiscalYear: string;
  baseCategory: string;
}
