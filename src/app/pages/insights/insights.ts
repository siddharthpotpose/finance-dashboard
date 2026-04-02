import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { INSIGHTS, SUMMARY_METRICS, EXPENSE_CATEGORIES } from '../../core/data/finance.data';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-insights',
  imports: [CommonModule],
  templateUrl: './insights.html',
  styleUrl: './insights.css',
})
export class Insights {
  private readonly store = inject(DashboardState);
  readonly settings = this.store.settings;
  readonly insights = INSIGHTS;
  readonly metrics = SUMMARY_METRICS;
  readonly expenseCategories = EXPENSE_CATEGORIES;
}
