import { Injectable, computed, effect, signal } from '@angular/core';
import {
  FilterState,
  Role,
  SettingsState,
  SortState,
  Theme,
  Transaction
} from '../models/finance.models';
import { TRANSACTIONS_SEED } from '../core/data/finance.data';
import { readJson, writeJson } from '../utils/storage.util';

const STORAGE_KEYS = {
  role: 'fd.role',
  theme: 'fd.theme',
  transactions: 'fd.transactions',
  filters: 'fd.filters',
  sort: 'fd.sort',
  settings: 'fd.settings'
};

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'All',
  status: 'All',
  type: 'All',
  dateFrom: '',
  dateTo: '',
  amountMin: '',
  amountMax: ''
};

const DEFAULT_SORT: SortState = {
  key: 'date',
  direction: 'desc'
};

const DEFAULT_SETTINGS: SettingsState = {
  currency: 'INR',
  taxRate: 18,
  fiscalYear: 'FY 2026',
  baseCategory: 'Operations'
};

@Injectable({ providedIn: 'root' })
export class DashboardState {
  readonly role = signal<Role>(readJson(STORAGE_KEYS.role, 'admin'));
  readonly theme = signal<Theme>(readJson(STORAGE_KEYS.theme, 'light'));
  readonly transactions = signal<Transaction[]>(
    readJson(STORAGE_KEYS.transactions, TRANSACTIONS_SEED)
  );
  readonly filters = signal<FilterState>(readJson(STORAGE_KEYS.filters, DEFAULT_FILTERS));
  readonly sort = signal<SortState>(readJson(STORAGE_KEYS.sort, DEFAULT_SORT));
  readonly settings = signal<SettingsState>(
    readJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );

  readonly filteredTransactions = computed(() => {
    const { search, category, status, type, dateFrom, dateTo, amountMin, amountMax } =
      this.filters();
    const searchValue = search.trim().toLowerCase();
    const min = amountMin ? Number(amountMin) : Number.NaN;
    const max = amountMax ? Number(amountMax) : Number.NaN;

    const parseDate = (d: string): number => {
      if (!d) return NaN;
      const parsed = new Date(d);
      if (!isNaN(parsed.getTime())) return parsed.getTime();
      const months: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
      const match = d.match(/^(\d{2})-(\w{3})-(\d{4})$/);
      if (match) {
        return new Date(Number(match[3]), months[match[2]], Number(match[1])).getTime();
      }
      return NaN;
    };

    const fromTime = dateFrom ? parseDate(dateFrom) : NaN;
    const toTime = dateTo ? parseDate(dateTo) : NaN;

    return this.transactions().filter((tx) => {
      if (searchValue) {
        const haystack = `${tx.id} ${tx.description} ${tx.category}`.toLowerCase();
        if (!haystack.includes(searchValue)) {
          return false;
        }
      }

      if (category !== 'All' && tx.category !== category) {
        return false;
      }

      if (status !== 'All' && tx.status !== status) {
        return false;
      }

      if (type !== 'All' && tx.type !== type) {
        return false;
      }

      const txTime = parseDate(tx.date);
      if (!isNaN(fromTime) && txTime < fromTime) {
        return false;
      }

      if (!isNaN(toTime) && txTime > toTime) {
        return false;
      }

      if (!Number.isNaN(min) && tx.amount < min) {
        return false;
      }

      if (!Number.isNaN(max) && tx.amount > max) {
        return false;
      }

      return true;
    });
  });

  readonly sortedTransactions = computed(() => {
    const { key, direction } = this.sort();
    const sorted = [...this.filteredTransactions()];

    sorted.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return sorted;
  });

  constructor() {
    if (!this.settings().currency || this.settings().currency === 'USD') {
      this.settings.update((current) => ({ ...current, currency: 'INR' }));
    }
    effect(() => writeJson(STORAGE_KEYS.role, this.role()));
    effect(() => writeJson(STORAGE_KEYS.theme, this.theme()));
    effect(() => writeJson(STORAGE_KEYS.transactions, this.transactions()));
    effect(() => writeJson(STORAGE_KEYS.filters, this.filters()));
    effect(() => writeJson(STORAGE_KEYS.sort, this.sort()));
    effect(() => writeJson(STORAGE_KEYS.settings, this.settings()));
  }

  setRole(role: Role): void {
    this.role.set(role);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  setFilters(filters: FilterState): void {
    this.filters.set(filters);
  }

  resetFilters(): void {
    this.filters.set(DEFAULT_FILTERS);
  }

  setSort(sort: SortState): void {
    this.sort.set(sort);
  }

  updateSettings(settings: SettingsState): void {
    this.settings.set(settings);
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.update((list) => [transaction, ...list]);
  }

  updateTransaction(transaction: Transaction): void {
    this.transactions.update((list) =>
      list.map((tx) => (tx.id === transaction.id ? transaction : tx))
    );
  }

  deleteTransaction(id: string): void {
    this.transactions.update((list) => list.filter((tx) => tx.id !== id));
  }
}
