import {
  Account,
  AlertItem,
  Customer,
  ExpenseCategory,
  IncomeSource,
  Insight,
  Invoice,
  Metric,
  ReportCard,
  Transaction,
  TrendPoint
} from '../../models/finance.models';

export const SUMMARY_METRICS: Metric[] = [
  { id: 'revenue', label: 'Total Revenue', value: 1284200, change: 6.2, trend: 'up' },
  { id: 'expenses', label: 'Total Expenses', value: 823400, change: -2.8, trend: 'down' },
  { id: 'profit', label: 'Net Profit', value: 460800, change: 4.1, trend: 'up' },
  { id: 'cash', label: 'Cash Balance', value: 312900, change: 1.4, trend: 'up' },
  { id: 'invoice-paid', label: 'Invoices & Billing Paid', value: 21400, change: 3.1, trend: 'up' },
  { id: 'invoice-unpaid', label: 'Invoices & Billing Unpaid', value: 40300, change: -2.4, trend: 'down' },
  { id: 'receivable', label: 'Accounts Receivable', value: 142500, change: -1.9, trend: 'down' },
  { id: 'payable', label: 'Accounts Payable', value: 96500, change: 0.8, trend: 'up' }
];

export const INCOME_SOURCES: IncomeSource[] = [
  { name: 'Product Sales', amount: 540200, change: 4.2 },
  { name: 'Subscriptions', amount: 298600, change: 6.8 },
  { name: 'Consulting', amount: 214300, change: 2.1 },
  { name: 'Affiliates', amount: 112400, change: -1.3 }
];

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { name: 'Payroll', amount: 210400, percent: 28, color: '#F9B34C' },
  { name: 'Marketing', amount: 142900, percent: 19, color: '#39B7B5' },
  { name: 'Infrastructure', amount: 118600, percent: 16, color: '#6C8AE4' },
  { name: 'Operations', amount: 95400, percent: 13, color: '#7DDB95' },
  { name: 'Admin', amount: 75800, percent: 10, color: '#8C7BE7' },
  { name: 'Misc', amount: 59800, percent: 8, color: '#F58A8A' }
];

export const INCOME_EXPENSE_TREND: TrendPoint[] = [
  { label: 'Nov', income: 86, expense: 61 },
  { label: 'Dec', income: 92, expense: 66 },
  { label: 'Jan', income: 88, expense: 64 },
  { label: 'Feb', income: 96, expense: 68 },
  { label: 'Mar', income: 101, expense: 72 },
  { label: 'Apr', income: 108, expense: 74 }
];

export const TRANSACTIONS_SEED: Transaction[] = [
  {
    id: 'TX-9042',
    date: '2026-04-01',
    description: 'Stripe payout - Enterprise plan',
    amount: 18450,
    type: 'Credit',
    category: 'Subscriptions',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9041',
    date: '2026-04-01',
    description: 'AWS monthly infrastructure',
    amount: 6420,
    type: 'Debit',
    category: 'Infrastructure',
    status: 'Completed',
    account: 'Cloud Card'
  },
  {
    id: 'TX-9040',
    date: '2026-03-31',
    description: 'Payroll - March',
    amount: 48200,
    type: 'Debit',
    category: 'Payroll',
    status: 'Completed',
    account: 'Payroll Account'
  },
  {
    id: 'TX-9039',
    date: '2026-03-31',
    description: 'Consulting retainer - Orion Labs',
    amount: 12600,
    type: 'Credit',
    category: 'Consulting',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9038',
    date: '2026-03-30',
    description: 'Paid social - Q2 launch',
    amount: 5200,
    type: 'Debit',
    category: 'Marketing',
    status: 'Completed',
    account: 'Marketing Card'
  },
  {
    id: 'TX-9037',
    date: '2026-03-30',
    description: 'Invoice payment - Solstice Co.',
    amount: 23800,
    type: 'Credit',
    category: 'Product Sales',
    status: 'Completed',
    account: 'Receivables'
  },
  {
    id: 'TX-9036',
    date: '2026-03-29',
    description: 'Office lease - HQ',
    amount: 8400,
    type: 'Debit',
    category: 'Operations',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9035',
    date: '2026-03-29',
    description: 'Bank transfer - Escrow release',
    amount: 9800,
    type: 'Credit',
    category: 'Product Sales',
    status: 'Pending',
    account: 'Operating Account'
  },
  {
    id: 'TX-9034',
    date: '2026-03-28',
    description: 'International contractor - UI audit',
    amount: 3400,
    type: 'Debit',
    category: 'Operations',
    status: 'Completed',
    account: 'Operations Card'
  },
  {
    id: 'TX-9033',
    date: '2026-03-28',
    description: 'Subscription upgrade - VaultWorks',
    amount: 4200,
    type: 'Credit',
    category: 'Subscriptions',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9032',
    date: '2026-03-27',
    description: 'Travel advance - Client onsite',
    amount: 2100,
    type: 'Debit',
    category: 'Admin',
    status: 'Completed',
    account: 'Operations Card'
  },
  {
    id: 'TX-9031',
    date: '2026-03-27',
    description: 'Affiliate payout - Mar cycle',
    amount: 1900,
    type: 'Debit',
    category: 'Marketing',
    status: 'Pending',
    account: 'Marketing Card'
  },
  {
    id: 'TX-9030',
    date: '2026-03-26',
    description: 'Annual software licenses',
    amount: 7600,
    type: 'Debit',
    category: 'Infrastructure',
    status: 'Completed',
    account: 'Cloud Card'
  },
  {
    id: 'TX-9029',
    date: '2026-03-26',
    description: 'Stripe payout - Mid-market',
    amount: 15900,
    type: 'Credit',
    category: 'Subscriptions',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9028',
    date: '2026-03-25',
    description: 'Partnership revenue - Sable Inc.',
    amount: 8900,
    type: 'Credit',
    category: 'Affiliates',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9027',
    date: '2026-03-25',
    description: 'Equipment upgrade',
    amount: 5400,
    type: 'Debit',
    category: 'Operations',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9026',
    date: '2026-03-24',
    description: 'Refund - Legacy contract',
    amount: 1800,
    type: 'Debit',
    category: 'Admin',
    status: 'Failed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9025',
    date: '2026-03-24',
    description: 'Invoice payment - Northwind',
    amount: 21400,
    type: 'Credit',
    category: 'Product Sales',
    status: 'Completed',
    account: 'Receivables'
  },
  {
    id: 'TX-9024',
    date: '2026-03-23',
    description: 'Recruiting agency fee',
    amount: 3600,
    type: 'Debit',
    category: 'Admin',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9023',
    date: '2026-03-23',
    description: 'Consulting - Q1 strategy',
    amount: 9800,
    type: 'Credit',
    category: 'Consulting',
    status: 'Completed',
    account: 'Operating Account'
  },
  {
    id: 'TX-9022',
    date: '2026-03-22',
    description: 'Ad platform rebate',
    amount: 1200,
    type: 'Credit',
    category: 'Marketing',
    status: 'Completed',
    account: 'Marketing Card'
  },
  {
    id: 'TX-9021',
    date: '2026-03-22',
    description: 'Security audit',
    amount: 4100,
    type: 'Debit',
    category: 'Infrastructure',
    status: 'Completed',
    account: 'Cloud Card'
  },
  {
    id: 'TX-9020',
    date: '2026-03-21',
    description: 'Interest income - Treasury',
    amount: 640,
    type: 'Credit',
    category: 'Misc',
    status: 'Completed',
    account: 'Treasury'
  }
];

export const INVOICES: Invoice[] = [
  { id: 'INV-3841', client: 'Northwind', amount: 21400, dueDate: '2026-04-08', status: 'Paid' },
  { id: 'INV-3840', client: 'Solstice Co.', amount: 18600, dueDate: '2026-04-10', status: 'Unpaid' },
  { id: 'INV-3839', client: 'Orion Labs', amount: 12500, dueDate: '2026-03-28', status: 'Overdue' },
  { id: 'INV-3838', client: 'Nexa Retail', amount: 9200, dueDate: '2026-04-14', status: 'Unpaid' }
];

export const CUSTOMERS: Customer[] = [
  { name: 'Northwind', totalSpent: 98200, outstanding: 0, lastTransaction: '2026-03-24' },
  { name: 'Solstice Co.', totalSpent: 78500, outstanding: 18600, lastTransaction: '2026-03-31' },
  { name: 'Orion Labs', totalSpent: 64200, outstanding: 12500, lastTransaction: '2026-03-31' },
  { name: 'VaultWorks', totalSpent: 51800, outstanding: 0, lastTransaction: '2026-03-28' }
];

export const ACCOUNTS: Account[] = [
  { name: 'Operating Account', type: 'Checking', balance: 184200, updated: '2026-04-01' },
  { name: 'Treasury', type: 'Savings', balance: 86500, updated: '2026-03-31' },
  { name: 'Payroll Account', type: 'Payroll', balance: 46200, updated: '2026-03-31' },
  { name: 'Marketing Card', type: 'Credit', balance: -16400, updated: '2026-03-30' }
];

export const REPORT_CARDS: ReportCard[] = [
  { title: 'Profit & Loss', value: 482600, change: 5.4, trend: 'up', range: 'YTD', spark: [32, 34, 31, 36, 39, 41] },
  { title: 'Cash Flow', value: 128900, change: -1.8, trend: 'down', range: 'Q2', spark: [28, 26, 29, 25, 24, 23] },
  { title: 'Runway', value: 14.2, change: 0.6, trend: 'up', range: 'Months', spark: [11, 12, 12.4, 13, 13.6, 14.2] }
];

export const INSIGHTS: Insight[] = [
  { title: 'Highest spend', detail: 'Payroll peaked at 28% of total expenses.' },
  { title: 'Monthly comparison', detail: 'Net margin improved 4.1% vs March.' },
  { title: 'Cash timing', detail: 'Receivables cycle shortened by 2.4 days.' }
];

export const ALERTS: AlertItem[] = [
  { level: 'high', message: 'Overdue invoice INV-3839 from Orion Labs.', time: '2d ago' },
  { level: 'medium', message: 'Marketing card utilization above 80%.', time: '5h ago' },
  { level: 'low', message: 'Treasury balance dipped under target.', time: 'Today' }
];
