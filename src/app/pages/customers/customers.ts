import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CUSTOMERS } from '../../core/data/finance.data';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  private readonly store = inject(DashboardState);
  readonly settings = this.store.settings;
  readonly customers = CUSTOMERS;
}
