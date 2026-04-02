import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ACCOUNTS,
  ALERTS,
  CUSTOMERS,
  EXPENSE_CATEGORIES,
  INCOME_EXPENSE_TREND,
  INCOME_SOURCES,
  INSIGHTS,
  INVOICES,
  REPORT_CARDS,
  SUMMARY_METRICS
} from '../../core/data/finance.data';
import { ExportService } from '../../services/export.service';
import { DashboardState, DEFAULT_FILTERS } from '../../state/dashboard.state';
import { ExpenseCategory, FilterState, Metric, SettingsState, SortState, Transaction, TransactionStatus, TransactionType } from '../../models/finance.models';
import { Transactions } from '../transactions/transactions';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,Transactions],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  @ViewChild('transactionsSection') private transactionsSection?: ElementRef<HTMLElement>;
  private readonly store = inject(DashboardState);
  private readonly exportService = inject(ExportService);
  private readonly fb = inject(FormBuilder);

  readonly metrics = SUMMARY_METRICS;
  readonly metricPairs = this.buildMetricPairs(this.metrics);
  readonly incomeSources = INCOME_SOURCES;
  readonly expenseCategories = EXPENSE_CATEGORIES;
  readonly trendPoints = INCOME_EXPENSE_TREND;
  readonly invoices = INVOICES;
  readonly customers = CUSTOMERS;
  readonly accounts = ACCOUNTS;
  readonly totalBalance = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  readonly reportCards = REPORT_CARDS;
  readonly insights = INSIGHTS;
  readonly alerts = ALERTS;
  readonly totalExpense = this.expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  readonly expenseDonutGradient = this.buildExpenseDonutGradient(this.expenseCategories);

  readonly role = this.store.role;
  readonly settings = this.store.settings;
  readonly filters = this.store.filters;

  readonly isAdmin = computed(() => this.role() === 'admin');
  readonly sort = this.store.sort;
  readonly transactions = this.store.sortedTransactions;

  readonly filteredCount = computed(() => this.transactions().length);

  readonly recentTransactions = computed(() => this.transactions().slice(0, 6));
  readonly debitTotal = computed(() =>
    this.store.transactions().filter((tx) => tx.type === 'Debit')
      .reduce((sum, tx) => sum + tx.amount, 0)
  );
  readonly creditTotal = computed(() =>
    this.store.transactions().filter((tx) => tx.type === 'Credit')
      .reduce((sum, tx) => sum + tx.amount, 0)
  );
  readonly statusCounts = computed(() => {
    const counts: Record<TransactionStatus, number> = {
      Completed: 0,
      Pending: 0,
      Failed: 0
    };
    this.store.transactions().forEach((tx) => {
      counts[tx.status] += 1;
    });
    return counts;
  });

  formatMoney(amount: number): string {
    const currency = this.settings().currency || 'INR';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  }

  applyTypeFilter(type: TransactionType): void {
    const current = this.store.filters();
    const nextType = current.type === type ? 'All' : type;
    this.store.setFilters({ ...current, type: nextType });
  }

  applyStatusFilter(status: TransactionStatus): void {
    const current = this.store.filters();
    const nextStatus = current.status === status ? 'All' : status;
    this.store.setFilters({ ...current, status: nextStatus });
  }

  scrollToTransactions(): void {
    const el = this.transactionsSection?.nativeElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private buildMetricPairs(metrics: Metric[]): { id: string; items: Metric[] }[] {
    const pairs: { id: string; items: Metric[] }[] = [];
    for (let i = 0; i < metrics.length; i += 2) {
      const items = metrics.slice(i, i + 2);
      const id = items.map((item) => item.id).join('-');
      pairs.push({ id, items });
    }
    return pairs;
  }


  private buildExpenseDonutGradient(categories: ExpenseCategory[]): string {
    let start = 0;
    const segments = categories.map((cat) => {
      const end = Math.min(start + cat.percent, 100);
      const segment = `${cat.color} ${start}% ${end}%`;
      start = end;
      return segment;
    });
    if (start < 100) {
      segments.push(`var(--panel-muted) ${start}% 100%`);
    }
    return `conic-gradient(${segments.join(', ')})`;
  }

  exportCsv(): void {
    const rows = this.transactions().map((tx) => ({
      id: tx.id,
      date: tx.date,
      description: tx.description,
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      status: tx.status,
      account: tx.account
    }));
    this.exportService.downloadCsv('transactions.csv', rows);
  }
}
