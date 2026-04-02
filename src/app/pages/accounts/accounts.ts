import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ACCOUNTS } from '../../core/data/finance.data';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  private readonly store = inject(DashboardState);
  readonly settings = this.store.settings;
  readonly accounts = ACCOUNTS;

  get totalBalance() {
    return this.accounts.reduce((s, a) => s + a.balance, 0);
  }
}
