import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { INVOICES } from '../../core/data/finance.data';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule],
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class Invoices {
  private readonly store = inject(DashboardState);
  readonly settings = this.store.settings;
  readonly invoices = INVOICES;

  get totalPaid() {
    return this.invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  }

  get totalUnpaid() {
    return this.invoices.filter(i => i.status === 'Unpaid').reduce((s, i) => s + i.amount, 0);
  }

  get totalOverdue() {
    return this.invoices.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0);
  }
}
