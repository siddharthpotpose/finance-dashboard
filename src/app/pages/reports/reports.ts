import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { REPORT_CARDS, INCOME_EXPENSE_TREND, EXPENSE_CATEGORIES } from '../../core/data/finance.data';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  private readonly store = inject(DashboardState);
  readonly settings = this.store.settings;
  readonly reportCards = REPORT_CARDS;
  readonly trendPoints = INCOME_EXPENSE_TREND;
  readonly expenseCategories = EXPENSE_CATEGORIES;

  expandedCard = signal<string | null>(null);

  toggleExpand(title: string): void {
    if (this.expandedCard() === title) {
      this.expandedCard.set(null);
    } else {
      this.expandedCard.set(title);
    }
  }
}
